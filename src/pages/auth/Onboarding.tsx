import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Users, Building, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/lib/supabase/database.types'

export function Onboarding() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole | null>(null)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const roleOptions = [
    {
      value: 'musician' as UserRole,
      icon: Music,
      title: 'Musician',
      description: 'Receive tips and grow your fanbase',
      color: 'from-purple-500 to-purple-600'
    },
    {
      value: 'fan' as UserRole,
      icon: Users,
      title: 'Fan',
      description: 'Support artists and earn from referrals',
      color: 'from-pink-500 to-pink-600'
    },
    {
      value: 'venue' as UserRole,
      icon: Building,
      title: 'Venue',
      description: 'Host shows and earn from artist success',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const handleComplete = async () => {
    if (!user || !role || !username) return

    setLoading(true)
    setError('')

    try {
      // Get referral code from localStorage
      const referralCode = localStorage.getItem('referral_code')
      let referrerId = null

      // Find referrer if code exists
      if (referralCode) {
        const { data: referrer } = await supabase
          .from('profiles')
          .select('id')
          .eq('affiliate_code', referralCode)
          .single()

        referrerId = referrer?.id
        localStorage.removeItem('referral_code')
      }

      // Update profile using the context method
      await updateProfile({
        role,
        username,
        referred_by: referrerId
      })

      // Create affiliate tree entries if referred
      if (referrerId) {
        await createAffiliateTree(user.id, referrerId)
      }

      // Navigate based on role
      const destinations = {
        musician: '/musician/setup',
        fan: '/discover',
        venue: '/venue/setup'
      }

      navigate(destinations[role])
    } catch (err: any) {
      console.error('Onboarding error:', err)
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const createAffiliateTree = async (userId: string, referrerId: string) => {
    try {
      // Get referrer's parent (for 2-tier tracking)
      const { data: referrerTree } = await supabase
        .from('affiliate_tree')
        .select('parent_id')
        .eq('user_id', referrerId)
        .single()

      // Create user's affiliate tree entry
      await supabase
        .from('affiliate_tree')
        .insert({
          user_id: userId,
          parent_id: referrerId,
          grandparent_id: referrerTree?.parent_id || null,
          level: 1
        })

      // If the referrer has a parent (grandparent to the new user)
      if (referrerTree?.parent_id) {
        // Create a second-tier relationship
        await supabase
          .from('affiliate_tree')
          .insert({
            user_id: userId,
            parent_id: referrerTree.parent_id,
            level: 2
          })
      }
    } catch (err) {
      console.error('Error creating affiliate tree:', err)
      // We don't want to fail the whole onboarding if just the affiliate part fails
      // So we log the error but don't throw it
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">Step {step} of 2</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-400 to-secondary-400 transition-all duration-300"
              style={{ width: `${step * 50}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">
                How will you use TrueFans?
              </h2>
              
              <div className="space-y-4">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRole(option.value)}
                    className={`w-full p-6 rounded-xl transition-all duration-200 ${
                      role === option.value
                        ? 'bg-white/30 scale-105 shadow-lg'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color}`}>
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4 text-left">
                        <h3 className="text-white font-semibold text-lg">
                          {option.title}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!role}
                className="w-full mt-8 bg-gradient-to-r from-accent-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Continue
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">
                Choose your username
              </h2>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                placeholder="Enter username"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              />

              <p className="text-white/70 text-sm mt-2">
                This will be your unique TrueFans URL: truefans.com/{username || 'username'}
              </p>

              {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!username || loading}
                  className="flex-1 bg-gradient-to-r from-accent-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Setting up...' : 'Complete Setup'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
