/*
  # Ensure profiles table exists
  
  1. Actions
    - Check if profiles table exists
    - Create profiles table if it doesn't exist
    - Create user_role enum if it doesn't exist
    - Enable RLS and create policies
*/

-- First, check if profiles table exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    -- Create user_role enum type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
      CREATE TYPE user_role AS ENUM ('musician', 'fan', 'venue', 'admin');
    END IF;

    -- Create profiles table first
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