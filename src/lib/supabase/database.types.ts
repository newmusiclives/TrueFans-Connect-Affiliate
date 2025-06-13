export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      musicians: {
        Row: Musician
        Insert: Omit<Musician, 'created_at' | 'total_earnings' | 'total_donations'>
        Update: Partial<Omit<Musician, 'id' | 'created_at'>>
      }
      shows: {
        Row: Show
        Insert: Omit<Show, 'created_at' | 'total_donations' | 'donation_count'>
        Update: Partial<Omit<Show, 'id' | 'created_at'>>
      }
      songs: {
        Row: Song
        Insert: Omit<Song, 'created_at'>
        Update: Partial<Omit<Song, 'id' | 'created_at'>>
      }
      donations: {
        Row: Donation
        Insert: Omit<Donation, 'id' | 'created_at'>
        Update: Partial<Omit<Donation, 'id' | 'created_at'>>
      }
      affiliates: {
        Row: Affiliate
        Insert: Omit<Affiliate, 'created_at' | 'total_earnings'>
        Update: Partial<Omit<Affiliate, 'id' | 'created_at'>>
      }
    }
  }
}

export interface Profile {
  id: string
  created_at: string
  username: string | null
  avatar_url: string | null
  email: string | null
  user_type: 'musician' | 'fan' | 'venue' | 'affiliate' | null
  referral_code: string | null
  referred_by: string | null
}

export interface Musician {
  id: string
  created_at: string
  stage_name: string
  bio: string | null
  genres: string[] | null
  spotify_id: string | null
  spotify_data: any | null
  total_earnings: number
  total_donations: number
  manifest_account_id: string | null
  payment_details: any | null
}

export interface Show {
  id: string
  created_at: string
  musician_id: string
  venue_name: string
  venue_location: any
  datetime: string
  description: string | null
  is_active: boolean
  qr_code_url: string | null
  bandsintown_id: string | null
  total_donations: number
  donation_count: number
}

export interface Song {
  id: string
  created_at: string
  musician_id: string
  title: string
  spotify_id: string | null
  spotify_data: any | null
}

export interface Donation {
  id: string
  created_at: string
  musician_id: string
  fan_id: string | null
  show_id: string | null
  song_id: string | null
  amount: number
  message: string | null
  status: 'pending' | 'completed' | 'failed'
  transaction_id: string | null
  artist_payout: number
  platform_fee: number
  affiliate_tier1_fee: number | null
  affiliate_tier1_id: string | null
  affiliate_tier2_fee: number | null
  affiliate_tier2_id: string | null
}

export interface Affiliate {
  id: string
  created_at: string
  name: string
  description: string | null
  website: string | null
  logo_url: string | null
  total_earnings: number
  manifest_account_id: string | null
  payment_details: any | null
}
