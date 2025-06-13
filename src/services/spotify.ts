import { supabase } from '@/lib/supabase/client'

interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{ name: string }>
  album: {
    name: string
    images: Array<{ url: string }>
  }
  preview_url: string | null
  duration_ms: number
  popularity: number
}

interface SpotifyAudioFeatures {
  danceability: number
  energy: number
  key: number
  loudness: number
  mode: number
  speechiness: number
  acousticness: number
  instrumentalness: number
  liveness: number
  valence: number
  tempo: number
}

export class SpotifyService {
  private token: string | null = null

  constructor() {
    this.initializeToken()
  }

  private async initializeToken() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.provider_token) {
      this.token = session.provider_token
    }
  }

  async getTopTracks(limit = 50): Promise<SpotifyTrack[]> {
    if (!this.token) throw new Error('No Spotify token available')

    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=medium_term`,
      {
        headers: { 'Authorization': `Bearer ${this.token}` }
      }
    )

    if (!response.ok) throw new Error('Failed to fetch Spotify tracks')

    const data = await response.json()
    return data.items
  }

  async getAudioFeatures(trackIds: string[]): Promise<Record<string, SpotifyAudioFeatures>> {
    if (!this.token || trackIds.length === 0) return {}

    const response = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`,
      {
        headers: { 'Authorization': `Bearer ${this.token}` }
      }
    )

    if (!response.ok) return {}

    const data = await response.json()
    const features: Record<string, SpotifyAudioFeatures> = {}
    
    data.audio_features?.forEach((feature: SpotifyAudioFeatures & { id: string }) => {
      if (feature) {
        features[feature.id] = feature
      }
    })

    return features
  }

  async getCurrentUserProfile() {
    if (!this.token) throw new Error('No Spotify token available')

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${this.token}` }
    })

    if (!response.ok) throw new Error('Failed to fetch Spotify profile')

    return response.json()
  }

  async importMusicianCatalog(musicianId: string) {
    try {
      // Get user's Spotify profile
      const spotifyProfile = await this.getCurrentUserProfile()
      
      // Get top tracks
      const tracks = await this.getTopTracks()
      const trackIds = tracks.map(t => t.id)
      
      // Get audio features for all tracks
      const audioFeatures = await this.getAudioFeatures(trackIds)

      // Update musician profile with Spotify data
      await supabase
        .from('musicians')
        .update({
          spotify_artist_id: spotifyProfile.id,
          spotify_data: {
            display_name: spotifyProfile.display_name,
            followers: spotifyProfile.followers?.total || 0,
            images: spotifyProfile.images
          }
        })
        .eq('id', musicianId)

      // Prepare songs for batch insert
      const songs = tracks.map(track => ({
        musician_id: musicianId,
        spotify_track_id: track.id,
        title: track.name,
        artist_name: track.artists[0]?.name || 'Unknown',
        album_name: track.album.name,
        album_art_url: track.album.images[0]?.url || null,
        preview_url: track.preview_url,
        duration_ms: track.duration_ms,
        popularity: track.popularity,
        audio_features: audioFeatures[track.id] || null
      }))

      // Upsert songs (update if exists, insert if new)
      const { data, error } = await supabase
        .from('songs')
        .upsert(songs, { 
          onConflict: 'spotify_track_id',
          ignoreDuplicates: false 
        })
        .select()

      if (error) throw error

      return { success: true, imported: data.length }
    } catch (error) {
      console.error('Spotify import error:', error)
      return { success: false, error }
    }
  }
}
