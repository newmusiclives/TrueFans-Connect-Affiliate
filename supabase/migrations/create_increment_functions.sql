/*
  # Create database functions for atomic increments
  
  1. New Functions
    - `increment` - Generic increment function for any numeric column
    - `increment_show_donations` - Increment show donation stats
    - `increment_song_donations` - Increment song donation stats
    - `increment_musician_earnings` - Increment musician earnings
  
  2. Purpose
    - Provide atomic increment operations for concurrent updates
    - Prevent race conditions when updating counters
*/

-- Create generic increment function
CREATE OR REPLACE FUNCTION increment(row_total numeric)
RETURNS numeric AS $$
BEGIN
  RETURN row_total + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to increment show donations
CREATE OR REPLACE FUNCTION increment_show_donations(p_show_id UUID, p_amount DECIMAL)
RETURNS void AS $$
BEGIN
  UPDATE shows
  SET 
    total_donations = total_donations + p_amount,
    donation_count = donation_count + 1
  WHERE id = p_show_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to increment song donations
CREATE OR REPLACE FUNCTION increment_song_donations(p_song_id UUID, p_amount DECIMAL)
RETURNS void AS $$
BEGIN
  UPDATE songs
  SET 
    total_donations = total_donations + p_amount,
    donation_count = donation_count + 1
  WHERE id = p_song_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to increment musician earnings
CREATE OR REPLACE FUNCTION increment_musician_earnings(p_musician_id UUID, p_amount DECIMAL)
RETURNS void AS $$
BEGIN
  UPDATE musicians
  SET 
    total_earnings = total_earnings + p_amount,
    total_donations = total_donations + 1
  WHERE id = p_musician_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;