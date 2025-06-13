import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, Music, Calendar, MapPin, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { ManifestService } from '@/services/manifest'
import { useAuth } from '@/contexts/AuthContext'
import { format } from 'date-fns'

export function Donate() {
  const { qrCode } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Show data
  const [show, setShow] = useState<any>(null)
  const [musician, setMusician] = useState<any>(null)
  
  // Donation form
  const [amount, setAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  
  const presetAmounts = [5, 10, 20, 50]

  useEffect(() => {
    if (qrCode) {
      fetchShowData()
    }
  }, [qrCode])

  const fetchShowData = async () => {
    try {
      // Get show by QR code
      const { data: showData, error: showError } = await supabase
        .from('shows')
        .select(`
          *,
          musicians (
            id,
            stage_name,
            profiles (
              username,
              avatar_url
            )
          )
        `)
        .eq('qr_code', qrCode)
        .single()

      if (showError) throw showError

      setShow(showData)
      setMusician(showData.musicians)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching show:', error)
      navigate('/404')
    }
  }

  const handleDonate = async () => {
    if (!show || !musician) return

    setProcessing(true)

    const finalAmount = customAmount ? parseFloat(customAmount) : amount

    // In production, this would integrate with Manifest's payment UI
    const manifest = new ManifestService()
    const result = await manifest.processDonation({
      amount: finalAmount,
      musicianId: musician.id,
      fanId: user?.id,
      showId: show.id,
      message,
      paymentMethodToken: 'pm_test_token' // From Manifest Elements
    })

    if (result.success) {
      setSuccess(true)
      
      // Animate success
      setTimeout(() => {
        if (user) {
          navigate('/profile/donations')
        } else {
          navigate('/discover')
        }
      }, 3000)
    } else {
      alert('Payment failed. Please try again.')
    }

    setProcessing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Heart className="w-10 h-10 text-green-600" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            Your support means everything to {musician.stage_name}
          </p>
          <div className="animate-pulse text-purple-600">
            <p className="text-sm">Redirecting...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              {musician?.profiles?.avatar_url ? (
                <img
                  src={musician.profiles.avatar_url}
                  alt={musician.stage_name}
                  className="w-16 h-16 rounded-full border-2 border-white/30"
                />
              ) : (
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Music className="w-8 h-8" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold">{musician?.stage_name}</h2>
                <p className="text-white/80">@{musician?.profiles?.username}</p>
              </div>
            </div>
          </div>

          {/* Show info */}
          <div className="p-6 bg-gray-50 border-b">
            <h3 className="font-semibold mb-3">{show?.venue_name}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(show?.datetime), 'EEEE, MMMM d @ h:mm a')}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {show?.venue_location?.city}, {show?.venue_location?.region}
              </div>
            </div>
          </div>

          {/* Donation form */}
          <div className="p-6">
            <h3 className="font-semibold mb-4">Choose amount</h3>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {presetAmounts.map(preset => (
                <button
                  key={preset}
                  onClick={() => {
                    setAmount(preset)
                    setCustomAmount('')
                  }}
                  className={`py-3 rounded-lg font-semibold transition-all ${
                    amount === preset && !customAmount
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setAmount(0)
                }}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-purple-500"
                min="1"
                max="999"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add a message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your music is amazing!"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                rows={3}
              />
            </div>

            {/* Payout breakdown */}
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-purple-900 mb-2">
                Your ${customAmount || amount} tip supports:
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">Artist receives</span>
                  <span className="font-semibold text-purple-900">
                    ${((customAmount ? parseFloat(customAmount) : amount) * 0.8).toFixed(2)} (80%)
                  </span>
                </div>
                <div className="flex justify-between text-purple-600">
                  <span>Platform & affiliates</span>
                  <span>${((customAmount ? parseFloat(customAmount) : amount) * 0.2).toFixed(2)} (20%)</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleDonate}
              disabled={processing || (!amount && !customAmount)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  Send Support
                </>
              )}
            </button>

            {!user && (
              <p className="text-center text-sm text-gray-600 mt-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign up
                </button>
                {' '}to track your support & earn rewards
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
