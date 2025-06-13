/*
  # Add donations and payouts tables with affiliate tracking
  
  1. New Tables
    - `donations` - Records all donations with affiliate tracking
      - `id` (uuid, primary key)
      - `fan_id` (uuid, references profiles)
      - `musician_id` (uuid, references musicians)
      - `show_id` (uuid, references shows)
      - `song_id` (uuid, references songs)
      - `amount` (decimal)
      - `platform_fee` (decimal)
      - `artist_payout` (decimal)
      - `affiliate_tier1_payout` (decimal)
      - `affiliate_tier2_payout` (decimal)
      - `message` (text)
      - `payment_intent_id` (text)
      - `transfer_id` (text)
      - `status` (text)
      - `created_at` (timestamptz)
    
    - `payouts` - Tracks all payouts to artists and affiliates
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `payout_type` (text)
      - `amount` (decimal)
      - `manifest_transfer_id` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `completed_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add appropriate policies for each table
  
  3. Indexes
    - Create indexes for efficient queries
  
  4. Realtime
    - Enable realtime for donations table
*/

-- Create donations table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'donations') THEN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE donations (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      fan_id UUID REFERENCES profiles(id),
      musician_id UUID REFERENCES musicians(id) NOT NULL,
      show_id UUID REFERENCES shows(id),
      song_id UUID REFERENCES songs(id),
      amount DECIMAL(10,2) NOT NULL,
      platform_fee DECIMAL(10,2) NOT NULL,
      artist_payout DECIMAL(10,2) NOT NULL,
      affiliate_tier1_payout DECIMAL(10,2) DEFAULT 0,
      affiliate_tier2_payout DECIMAL(10,2) DEFAULT 0,
      message TEXT,
      payment_intent_id TEXT,
      transfer_id TEXT,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX idx_donations_musician ON donations(musician_id, created_at DESC);
    CREATE INDEX idx_donations_status ON donations(status);
    
    -- Enable Row Level Security
    ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

    -- Policies for donations table
    CREATE POLICY "Musicians can view their donations"
      ON donations
      FOR SELECT
      TO authenticated
      USING (musician_id = auth.uid());
      
    CREATE POLICY "Fans can view their donations"
      ON donations
      FOR SELECT
      TO authenticated
      USING (fan_id = auth.uid());
      
    CREATE POLICY "Admins can view all donations"
      ON donations
      FOR ALL
      TO authenticated
      USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
  END IF;
END $$;

-- Create payouts table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payouts') THEN
    CREATE TABLE payouts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES profiles(id) NOT NULL,
      payout_type TEXT NOT NULL CHECK (payout_type IN ('donation', 'affiliate')),
      amount DECIMAL(10,2) NOT NULL,
      manifest_transfer_id TEXT,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      completed_at TIMESTAMPTZ
    );

    -- Indexes
    CREATE INDEX idx_payouts_user ON payouts(user_id, status);
    
    -- Enable Row Level Security
    ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

    -- Policies for payouts table
    CREATE POLICY "Users can view their own payouts"
      ON payouts
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
      
    CREATE POLICY "Admins can manage all payouts"
      ON payouts
      FOR ALL
      TO authenticated
      USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
  END IF;
END $$;

-- Add manifest_account_id to profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'manifest_account_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN manifest_account_id TEXT;
  END IF;
END $$;

-- Enable realtime for donations
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
  ) THEN
    -- Check if table is already in publication
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime' AND tablename = 'donations'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE donations;
    END IF;
  END IF;
END $$;