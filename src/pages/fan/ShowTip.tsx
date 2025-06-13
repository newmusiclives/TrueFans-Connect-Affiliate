import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Music, DollarSign, Send, Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import type { Show, Musician } from '@/lib/supabase/database.types'

export function ShowTip() {
  const { qrCode } = useParams<{ qrCode: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [show, setShow] = useState<Show | null>(null)
  const [musician, setMusician] = useState<Musician | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Tip form
  const [amount, setAmount] = useState(5)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const presetAmounts = [5, 10, 20, 50]

  useEffect(() => {
    const fetchShowDetails = async () => {
      if (!qrCode) return
      
      try {
        // Fetch show by QR code
        const { data: showData, error: showError } = await supabase
          .from('shows')
          .select('*')
          .eq('qr_code', qrCode)
          .single()
        
        if (showError) throw showError
        if (!showData) throw new Error('Show not found')
        
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
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchShowDetails()
  }, [qrCode])

  const handleSubmitTip = async () => {
    if (!user || !show) return
    
    setSubmitting(true)
    
    try {
      // Create the donation record
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
      const { error: updateError } = await supabase
        .from('shows')
        .update({
          total_donations: show.total_donations + amount,
          donation_count: show.donation_count + 1
        })
        .eq('id', show.id)
      
      if (updateError) throw updateError
      
      // Update musician totals
      const { error: musicianError } = await supabase
        .from('musicians')
        .update({
          total_earnings: musician ? musician.total_earnings + amount : amount,
          total_donations: musician ? musician.total_donations + 1 : 1
        })
        .eq('id', show.musician_id)
      
      if (musicianError) throw musicianError
      
      setSuccess(true)
      
      // Reset form
      setAmount(5)
      setMessage('')
      
      // Redirect after success
      setTimeout(() => {
        navigate('/fan/dashboard')
      }, 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
      </div>
    )
  }

  if (error || !show || !musician) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-red-50 rounded-xl border border-red-200">
        <h2 className="text-xl font-bold text-red-700 mb-4">Error</h2>
        <p className="text-red-600">{error || 'Show or musician not found'}</p>
        <button
          onClick={() => navigate('/fan/dashboard')}
          className="mt-6 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  if (!show.is_active) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
        <h2 className="text-xl font-bold text-yellow-700 mb-4">Show Not Active</h2>
        <p className="text-yellow-600">
          This show is not currently accepting tips. Please try again later or contact the artist.
        </p>
        <button
          onClick={() => navigate('/fan/dashboard')}
          className="mt-6 w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-green-50 rounded-xl border border-green-200">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-green-700 mb-4">Thank You!</h2>
          <p className="text-green-600 mb-6">
            Your tip of ${amount.toFixed(2)} to {musician.stage_name} has been sent successfully!
          </p>
          
          <p className="text-sm text-green-500">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center mb-4">
            <Music className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Live Show Tip</h2>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">{musician.stage_name}</h3>
          
          <div className="flex items-center text-white/80 text-sm mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            {format(new Date(show.datetime), 'MMM d, yyyy @ h:mm a')}
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {show.venue_name}, {(show.venue_location as any).city}
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip Amount
            </label>
            
            <div className="grid grid-cols-4 gap-2 mb-3">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`py-2 rounded-lg text-center transition-all ${
                    amount === preset
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message to your tip..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 resize-none"
            />
          </div>
          
          <button
            onClick={handleSubmitTip}
            disabled={submitting || amount < 1 || !user}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {submitting ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send ${amount.toFixed(2)} Tip
              </>
            )}
          </button>
          
          {!user && (
            <p className="mt-3 text-sm text-red-600 text-center">
              You need to be logged in to send a tip
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
