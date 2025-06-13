/*
  # Create profiles table
  
  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `username` (text, nullable)
      - `role` (user_role enum)
      - `avatar_url` (text, nullable)
      - `affiliate_code` (text)
      - `referred_by` (text, nullable)
      - `created_at` (timestamptz)
      - `is_active` (boolean)
  2. Security
    - Enable RLS on profiles table
    - Add policies for users to manage their own profiles
    - Add policy for public read access to profiles
*/

-- Create user_role enum type if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('musician', 'fan', 'venue', 'admin');
  END IF;
END $$;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
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