/*
  # Create songs table
  
  1. New Tables
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
    - Enable RLS on songs table
    - Add policies for musicians to manage their own songs
    - Add policies for public read access
*/

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