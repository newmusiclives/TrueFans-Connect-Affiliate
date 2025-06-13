import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Music, Calendar, MapPin, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

export function ShowTip() {
  const { qrCode } = useParams<{ qrCode: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [show, setShow] = useState<any>(null)
  const [musician, setMusician] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [amount, setAmount] = useState(5)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (qrCode) {
      fetchShowDetails()
    }
  }, [qrCode])

  const fetchShowDetails = async () => {
    try {
      // Fetch show details
      const { data: showData, error: showError } = await supabase
        .from('shows')
        .select('*')
        .eq('qr_code', qrCode)
        .single()

      if (showError) throw showError

      setShow(showData)

      // Fetch musician details
      const { data: musicianData, error: musicianError } = await supabase
        .from('musicians')
        .select('*')
        .eq('id', showData.musician_id)
        .single()

      if (musicianError) throw musicianError

      setMusician(musicianData)
    } catch (err: any) {
      console.error('Error fetching show details:', err)
      setError('Show not found or no longer active')
    } finally {
      setLoading(false)
    }
  }

  const handleTip = async () => {
    if (!user) {
      // Redirect to login
      navigate('/login', { state: { returnTo: `/tip/show/${qrCode}` } })
      return
    }

    if (!show || amount <= 0) return

    setSubmitting(true)

    try {
      // Create donation record
      const { error: donationError } = await supabase
        .from('show_donations')
        .insert({
          show_id: show.id,
          fan_id: user.id,
          amount,
          message: message.trim() || null
        })

      if (donationError) throw donationError

      // Update show totals
      const { error: showUpdateError } = await supabase
        .from('shows')
        .update({
          total_donations: show.total_donations + amount,
          donation_count: show.donation_count + 1
        })
        .eq('id', show.id)

      if (showUpdateError) throw showUpdateError

      // Update musician totals
      const { error: musicianUpdateError } = await supabase
        .from('musicians')
        .update({
          total_earnings: musician.total_earnings + amount,
          total_donations: musician.total_donations + 1
        })
        .eq('id', musician.id)

      if (musicianUpdateError) throw musicianUpdateError

      setSuccess(true)
    } catch (err: any) {
      console.error('Error submitting tip:', err)
      setError('Failed to process your tip. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Show Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your ${amount} tip to {musician.stage_name} has been sent successfully.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700"
          >
            Discover More Artists
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <h1 className="text-2xl font-bold mb-1">Tip {musician?.stage_name}</h1>
            <p>Live at {show?.venue_name}</p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(show?.datetime), 'EEEE, MMMM d @ h:mm a')}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              {show?.venue_location.city}, {show?.venue_location.region}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Tip Amount
              </label>
              <div className="flex gap-2">
                {[5, 10, 20, 50].map((value) => (
                  <button
                    key={value}
                    onClick={() => setAmount(value)}
                    className={`flex-1 py-3 rounded-lg font-semibold ${
                      amount === value
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>
              
              <div className="mt-3">
                <label className="block text-gray-700 text-sm mb-1">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1"
                    step="1"
                    className="w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Add a Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Great show! Keep it up!"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
              />
            </div>
            
            <button
              onClick={handleTip}
              disabled={submitting || amount <= 0}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                  Processing...
                </span>
              ) : (
                `Send $${amount} Tip`
              )}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              80% goes directly to the artist, 5% to affiliates, 15% platform fee
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
