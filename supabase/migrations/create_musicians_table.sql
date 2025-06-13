/*
  # Create musicians table
  
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
  2. Security
    - Enable RLS on musicians table
    - Add policies for musicians to manage their own data
    - Add policies for public read access
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_musicians_spotify ON musicians(spotify_artist_id);

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