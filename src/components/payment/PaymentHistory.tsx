import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { format } from 'date-fns'
import { Loader2, Music, Calendar, Disc } from 'lucide-react'

export function PaymentHistory() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [donations, setDonations] = useState<any[]>([])
  const [payouts, setPayouts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'donations' | 'payouts'>('donations')

  useEffect(() => {
    if (user) {
      fetchPaymentHistory()
    }
  }, [user])

  const fetchPaymentHistory = async () => {
    setLoading(true)
    
    try {
      // Fetch donations made by the user
      const { data: donationData, error: donationError } = await supabase
        .from('donations')
        .select(`
          *,
          musicians (
            id,
            stage_name,
            profiles (
              username,
              avatar_url
            )
          ),
          shows (
            id,
            venue_name,
            datetime
          ),
          songs (
            id,
            title,
            album_art_url
          )
        `)
        .eq('fan_id', user?.id)
        .order('created_at', { ascending: false })
      
      if (donationError) throw donationError
      
      // Fetch payouts received by the user (if they're a musician or affiliate)
      const { data: payoutData, error: payoutError } = await supabase
        .from('payouts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
      
      if (payoutError) throw payoutError
      
      setDonations(donationData || [])
      setPayouts(payoutData || [])
    } catch (error) {
      console.error('Error fetching payment history:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'donations'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Donations Made ({donations.length})
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'payouts'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Payouts Received ({payouts.length})
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'donations' && (
          <>
            {donations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>You haven't made any donations yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div key={donation.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        {donation.musicians?.profiles?.avatar_url ? (
                          <img
                            src={donation.musicians.profiles.avatar_url}
                            alt={donation.musicians.stage_name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Music className="w-5 h-5 text-purple-600" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium">{donation.musicians?.stage_name}</h4>
                          <p className="text-sm text-gray-500">
                            {format(new Date(donation.created_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">${donation.amount.toFixed(2)}</p>
                        <p className="text-xs text-green-600">
                          ${donation.artist_payout.toFixed(2)} to artist
                        </p>
                      </div>
                    </div>

                    {(donation.shows || donation.songs) && (
                      <div className="mt-3 pt-3 border-t">
                        {donation.shows && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Show at {donation.shows.venue_name}</span>
                          </div>
                        )}
                        {donation.songs && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Disc className="w-4 h-4 mr-2" />
                            <span>Song: {donation.songs.title}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {donation.message && (
                      <div className="mt-3 pt-3 border-t text-sm italic text-gray-600">
                        "{donation.message}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'payouts' && (
          <>
            {payouts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>You haven't received any payouts yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {payouts.map((payout) => (
                  <div key={payout.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">
                          {payout.payout_type === 'donation' ? 'Artist Payout' : 'Affiliate Commission'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {format(new Date(payout.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">${payout.amount.toFixed(2)}</p>
                        <p className={`text-xs ${
                          payout.status === 'completed' 
                            ? 'text-green-600' 
                            : payout.status === 'failed'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}>
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
