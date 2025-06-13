import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { Music } from 'lucide-react'

export function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Process the OAuth callback
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          throw sessionError
        }
        
        if (session?.user) {
          // Check if user needs onboarding
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username, role')
            .eq('id', session.user.id)
            .single()
          
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching profile:', profileError)
          }

          // Get referral code from localStorage if it exists
          const referralCode = localStorage.getItem('referral_code')
          
          // If this is a new user or they need to complete onboarding
          if (!profile?.username || !profile?.role) {
            // If there was a referral, store it in the database
            if (referralCode) {
              // Find the referrer's ID
              const { data: referrer } = await supabase
                .from('profiles')
                .select('id')
                .eq('affiliate_code', referralCode)
                .single()
              
              if (referrer) {
                // Update the user's profile with the referrer
                await supabase
                  .from('profiles')
                  .update({ referred_by: referrer.id })
                  .eq('id', session.user.id)
              }
            }
            
            navigate('/onboarding')
          } else {
            navigate('/dashboard')
          }
          
          // Clear the referral code from localStorage
          localStorage.removeItem('referral_code')
        } else {
          navigate('/signin')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        setError('Authentication failed. Please try again.')
        setTimeout(() => navigate('/signin'), 3000)
      }
    }

    handleCallback()
  }, [navigate])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => navigate('/signin')}
          className="btn btn-primary"
        >
          Return to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <Music className="h-12 w-12 text-primary-600 mb-4 animate-pulse" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Authenticating...</h2>
      <p className="text-gray-600">Please wait while we set up your account.</p>
      <div className="mt-6 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  )
}
