import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { SpotifyService } from '@/services/spotify'

export function MusicianSetup() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form data
  const [stageName, setStageName] = useState('')
  const [bio, setBio] = useState('')
  const [genres, setGenres] = useState<string[]>([])
  
  // Import status
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle')
  const [importedCount, setImportedCount] = useState(0)

  const genreOptions = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'EDM', 
    'Jazz', 'Classical', 'Alternative', 'Indie', 'Folk', 'Metal'
  ]

  const handleCreateProfile = async () => {
    if (!user || !stageName) return

    setLoading(true)
    setError('')

    try {
      const { error: musicianError } = await supabase
        .from('musicians')
        .insert({
          id: user.id,
          stage_name: stageName,
          bio,
          genres
        })

      if (musicianError) throw musicianError

      setStep(2)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSpotifyImport = async () => {
    if (!user) return

    setImportStatus('importing')
    const spotify = new SpotifyService()
    
    const result = await spotify.importMusicianCatalog(user.id)
    
    if (result.success) {
      setImportStatus('success')
      setImportedCount(result.imported || 0)
      setTimeout(() => navigate('/musician/dashboard'), 2000)
    } else {
      setImportStatus('error')
      setError('Failed to import music. Please try again.')
    }
  }

  const toggleGenre = (genre: string) => {
    setGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 p-4">
      <div className="max-w-2xl mx-auto pt-10">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">
                Set up your musician profile
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Stage Name
                  </label>
                  <input
                    type="text"
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                    placeholder="How fans know you"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell fans about your music journey..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Genres (select up to 3)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {genreOptions.map(genre => (
                      <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        disabled={!genres.includes(genre) && genres.length >= 3}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          genres.includes(genre)
                            ? 'bg-accent-600 text-white'
                            : 'bg-white/20 text-white/70 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleCreateProfile}
                disabled={!stageName || loading}
                className="w-full mt-8 bg-gradient-to-r from-accent-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Profile...' : 'Continue to Music Import'}
              </button>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500/20 rounded-full mb-6">
                  <Music className="w-8 h-8 text-accent-400" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">
                  Import Your Music
                </h2>

                <p className="text-white/70 mb-8">
                  Connect your Spotify catalog to start receiving tips on your songs
                </p>

                {importStatus === 'idle' && (
                  <button
                    onClick={handleSpotifyImport}
                    className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <Upload className="w-5 h-5 mr-2" />
                      Import from Spotify
                    </div>
                  </button>
                )}

                {importStatus === 'importing' && (
                  <div className="space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto" />
                    <p className="text-white">Importing your music catalog...</p>
                  </div>
                )}

                {importStatus === 'success' && (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 text-accent-400 mx-auto" />
                    <p className="text-white text-lg">
                      Successfully imported {importedCount} songs!
                    </p>
                    <p className="text-white/70">Redirecting to your dashboard...</p>
                  </div>
                )}

                {importStatus === 'error' && (
                  <div className="space-y-4">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
                    <p className="text-red-200">{error}</p>
                    <button
                      onClick={handleSpotifyImport}
                      className="text-white underline"
                    >
                      Try again
                    </button>
                  </div>
                )}

                <button
                  onClick={() => navigate('/musician/dashboard')}
                  className="mt-8 text-white/70 underline text-sm"
                >
                  Skip for now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
