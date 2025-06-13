import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Music, Users, Building, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function SignUp() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, signUp, signInWithSpotify } = useAuth()
  const [referralCode] = useState(searchParams.get('ref') || '')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      setLoading(true)
      await signUp(email, password, referralCode)
      // Auth state will update automatically and redirect
    } catch (err) {
      console.error('Signup error:', err)
      setError('Failed to sign up. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSpotifySignUp = async () => {
    try {
      setLoading(true)
      await signInWithSpotify(referralCode)
    } catch (err) {
      console.error('Spotify signup error:', err)
      setError('Failed to sign up with Spotify. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Join TrueFans
        </h1>
        
        {referralCode && (
          <p className="text-primary-200 text-center mb-6">
            You've been invited! Sign up to support your favorite artists.
          </p>
        )}

        <div className="space-y-4 mb-8">
          <div className="bg-white/20 rounded-lg p-4">
            <Music className="w-8 h-8 text-primary-300 mb-2" />
            <h3 className="text-white font-semibold">For Musicians</h3>
            <p className="text-primary-200 text-sm">
              Receive instant tips from fans at shows and online
            </p>
          </div>

          <div className="bg-white/20 rounded-lg p-4">
            <Users className="w-8 h-8 text-secondary-300 mb-2" />
            <h3 className="text-white font-semibold">For Fans</h3>
            <p className="text-secondary-200 text-sm">
              Support artists directly and earn from referrals
            </p>
          </div>

          <div className="bg-white/20 rounded-lg p-4">
            <Building className="w-8 h-8 text-accent-300 mb-2" />
            <h3 className="text-white font-semibold">For Venues</h3>
            <p className="text-accent-200 text-sm">
              Help artists thrive and earn from every show
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-100 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400"
                placeholder="••••••••"
                minLength={8}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/70" />
                ) : (
                  <Eye className="h-5 w-5 text-white/70" />
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up with Email'}
          </button>
        </form>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-white/20 absolute w-full"></div>
          <div className="bg-transparent px-4 relative text-white/60 text-sm">or</div>
        </div>

        <button
          onClick={handleSpotifySignUp}
          disabled={loading}
          className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Sign Up with Spotify
        </button>

        <p className="text-primary-200 text-center text-sm mt-6">
          Already have an account? <Link to="/signin" className="text-accent-300 hover:text-accent-200">Sign in</Link>
        </p>

        <p className="text-primary-200 text-center text-sm mt-4">
          Earn 5% commission on all donations from artists you refer!
        </p>
      </div>
    </div>
  )
}
