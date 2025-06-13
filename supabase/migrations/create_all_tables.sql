/*
  # Create all tables in proper order
  
  1. New Tables
    - `profiles` - User profiles with roles
    - `musicians` - Musician-specific profiles with Spotify integration
    - `songs` - Songs with Spotify data
    - `shows` - Live shows with BandsInTown integration
    - `show_donations` - Donations made during shows
  
  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
  
  3. Indexes
    - Create indexes for efficient queries
  
  4. Realtime
    - Enable realtime for show_donations table
*/

-- Create all tables in a single transaction to ensure proper order
BEGIN;

-- First, check if user_role enum type exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('musician', 'fan', 'venue', 'admin');
  END IF;
END $$;

-- Create profiles table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    CREATE TABLE profiles (
      id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
      email TEXT UNIQUE NOT NULL,
      username TEXT,
      role user_role NOT NULL,
      avatar_url TEXT,
      affiliate_code TEXT NOT NULL,
      referred_by TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      is_active BOOLEAN DEFAULT TRUE
    );

    -- Enable Row Level Security
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);

    CREATE POLICY "Users can update their own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);

    CREATE POLICY "Public can view profiles"
      ON profiles
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Create musicians table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'musicians') THEN
    CREATE TABLE musicians (
      id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
      stage_name TEXT NOT NULL,
      bio TEXT,
      genres TEXT[],
      spotify_artist_id TEXT,
      spotify_data JSONB,
      manifest_account_id TEXT,
      manifest_account_status TEXT DEFAULT 'pending',
      total_earnings DECIMAL(10,2) DEFAULT 0,
      total_donations INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX idx_musicians_spotify ON musicians(spotify_artist_id);

    -- Enable Row Level Security
    ALTER TABLE musicians ENABLE ROW LEVEL SECURITY;

    -- Policies for musicians table
    CREATE POLICY "Musicians can manage their own profile"
      ON musicians
      FOR ALL
      TO authenticated
      USING (auth.uid() = id);

    CREATE POLICY "Public can view musician profiles"
      ON musicians
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Create songs table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'songs') THEN
    CREATE TABLE songs (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      musician_id UUID REFERENCES musicians(id) ON DELETE CASCADE,
      spotify_track_id TEXT UNIQUE,
      title TEXT NOT NULL,
      artist_name TEXT,
      album_name TEXT,
      album_art_url TEXT,
      preview_url TEXT,
      duration_ms INTEGER,
      popularity INTEGER,
      audio_features JSONB,
      play_count INTEGER DEFAULT 0,
      donation_count INTEGER DEFAULT 0,
      total_donations DECIMAL(10,2) DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX idx_songs_musician ON songs(musician_id);
    CREATE INDEX idx_songs_spotify ON songs(spotify_track_id);

    -- Enable Row Level Security
    ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

    -- Policies for songs table
    CREATE POLICY "Musicians can manage their own songs"
      ON songs
      FOR ALL
      TO authenticated
      USING (musician_id = auth.uid());

    CREATE POLICY "Public can view songs"
      ON songs
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Create shows table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shows') THEN
    CREATE TABLE shows (
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

    -- Indexes
    CREATE INDEX idx_shows_musician ON shows(musician_id, datetime DESC);
    CREATE INDEX idx_shows_qr ON shows(qr_code);

    -- Enable Row Level Security
    ALTER TABLE shows ENABLE ROW LEVEL SECURITY;

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
  END IF;
END $$;

-- Create show_donations table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'show_donations') THEN
    CREATE TABLE show_donations (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
      fan_id UUID REFERENCES profiles(id),
      amount DECIMAL(10,2) NOT NULL,
      message TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX idx_show_donations_show ON show_donations(show_id);

    -- Enable Row Level Security
    ALTER TABLE show_donations ENABLE ROW LEVEL SECURITY;

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
  END IF;
END $$;

-- Enable realtime for live donations if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
  ) THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
  
  -- Check if table is already in publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'show_donations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE show_donations;
  END IF;
END $$;

COMMIT;