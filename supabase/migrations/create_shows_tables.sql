/*
  # Create shows and show_donations tables
  
  1. New Tables
    - `shows`
      - `id` (uuid, primary key)
      - `musician_id` (uuid, references musicians)
      - `bandsintown_event_id` (text, unique)
      - `venue_name` (text)
      - `venue_location` (jsonb)
      - `datetime` (timestamptz)
      - `ticket_url` (text)
      - `lineup` (text array)
      - `qr_code` (uuid, unique)
      - `total_donations` (decimal)
      - `donation_count` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    - `show_donations`
      - `id` (uuid, primary key)
      - `show_id` (uuid, references shows)
      - `fan_id` (uuid, references profiles)
      - `amount` (decimal)
      - `message` (text)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on both tables
    - Add policies for musicians to manage their own shows
    - Add policies for public read access to shows
    - Add policies for fans to create donations
  3. Indexes
    - Index on shows(musician_id, datetime DESC)
    - Index on shows(qr_code)
    - Index on show_donations(show_id)
  4. Realtime
    - Enable realtime for show_donations table
*/

-- Shows table with QR codes
CREATE TABLE IF NOT EXISTS shows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  musician_id UUID REFERENCES musicians(id) ON DELETE CASCADE,
  bandsintown_event_id TEXT UNIQUE,
  venue_name TEXT NOT NULL,
  venue_location JSONB NOT NULL,
  datetime TIMESTAMPTZ NOT NULL,
  ticket_url TEXT,
  lineup TEXT[],
  qr_code UUID DEFAULT gen_random_uuid() UNIQUE,
  total_donations DECIMAL(10,2) DEFAULT 0,
  donation_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Show donations for tracking
CREATE TABLE IF NOT EXISTS show_donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
  fan_id UUID REFERENCES profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_shows_musician ON shows(musician_id, datetime DESC);
CREATE INDEX IF NOT EXISTS idx_shows_qr ON shows(qr_code);
CREATE INDEX IF NOT EXISTS idx_show_donations_show ON show_donations(show_id);

-- Enable Row Level Security
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE show_donations ENABLE ROW LEVEL SECURITY;

-- Policies for shows table
CREATE POLICY "Musicians can manage their own shows"
  ON shows
  FOR ALL
  TO authenticated
  USING (musician_id = auth.uid());

CREATE POLICY "Public can view shows"
  ON shows
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for show_donations table
CREATE POLICY "Fans can create donations"
  ON show_donations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own donations"
  ON show_donations
  FOR SELECT
  TO authenticated
  USING (fan_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM shows WHERE shows.id = show_id AND shows.musician_id = auth.uid()));

-- Enable realtime for live donations
BEGIN;
  -- Check if the publication exists
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
    ) THEN
      CREATE PUBLICATION supabase_realtime;
    END IF;
  END $$;
  
  -- Add table to publication
  ALTER PUBLICATION supabase_realtime ADD TABLE show_donations;
COMMIT;