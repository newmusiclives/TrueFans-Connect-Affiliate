/*
  # Create musician and song tables
  
  1. New Tables
    - `musicians`
      - `id` (uuid, primary key, references profiles)
      - `stage_name` (text)
      - `bio` (text)
      - `genres` (text array)
      - `spotify_artist_id` (text)
      - `spotify_data` (jsonb)
      - `manifest_account_id` (text)
      - `manifest_account_status` (text)
      - `total_earnings` (decimal)
      - `total_donations` (integer)
      - `created_at` (timestamptz)
    - `songs`
      - `id` (uuid, primary key)
      - `musician_id` (uuid, references musicians)
      - `spotify_track_id` (text, unique)
      - `title` (text)
      - `artist_name` (text)
      - `album_name` (text)
      - `album_art_url` (text)
      - `preview_url` (text)
      - `duration_ms` (integer)
      - `popularity` (integer)
      - `audio_features` (jsonb)
      - `play_count` (integer)
      - `donation_count` (integer)
      - `total_donations` (decimal)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on both tables
    - Add policies for musicians to manage their own data
    - Add policies for public read access to songs
*/

-- Musicians table with Spotify integration
CREATE TABLE IF NOT EXISTS musicians (
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

-- Songs with Spotify data
CREATE TABLE IF NOT EXISTS songs (
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
CREATE INDEX IF NOT EXISTS idx_songs_musician ON songs(musician_id);
CREATE INDEX IF NOT EXISTS idx_songs_spotify ON songs(spotify_track_id);
CREATE INDEX IF NOT EXISTS idx_musicians_spotify ON musicians(spotify_artist_id);

-- Enable Row Level Security
ALTER TABLE musicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

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