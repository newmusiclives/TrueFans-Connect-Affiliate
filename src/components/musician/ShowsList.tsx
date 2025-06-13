import { useState, useEffect } from 'react'
import { Calendar, MapPin, ExternalLink, QrCode, DollarSign, Users } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase/client'
import type { Show } from '@/lib/supabase/database.types'

interface ShowsListProps {
  musicianId: string
}

export function ShowsList({ musicianId }: ShowsListProps) {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeShow, setActiveShow] = useState<Show | null>(null)
  const [showQrModal, setShowQrModal] = useState(false)

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const { data, error } = await supabase
          .from('shows')
          .select('*')
          .eq('musician_id', musicianId)
          .order('datetime', { ascending: true })
          .gte('datetime', new Date().toISOString())
        
        if (error) throw error
        
        setShows(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [musicianId])

  const toggleShowActive = async (show: Show) => {
    try {
      const { error } = await supabase
        .from('shows')
        .update({ is_active: !show.is_active })
        .eq('id', show.id)
      
      if (error) throw error
      
      // Update local state
      setShows(prev => prev.map(s => 
        s.id === show.id ? { ...s, is_active: !s.is_active } : s
      ))
    } catch (err: any) {
      console.error('Error toggling show status:', err)
    }
  }

  const openQrModal = (show: Show) => {
    setActiveShow(show)
    setShowQrModal(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        Error loading shows: {error}
      </div>
    )
  }

  if (shows.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-500 mb-4">You don't have any upcoming shows</p>
        <p className="text-sm text-gray-400">
          Import your shows from BandsInTown to start receiving tips at live events
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Upcoming Shows</h3>
      
      <div className="space-y-4">
        {shows.map((show) => (
          <div 
            key={show.id} 
            className={`border rounded-lg p-4 transition-all ${
              show.is_active 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold">{show.venue_name}</h4>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(show.datetime), 'MMM d, yyyy @ h:mm a')}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {(show.venue_location as any).city}, {(show.venue_location as any).region}
                </div>
                
                {show.donation_count > 0 && (
                  <div className="mt-2 flex space-x-4">
                    <div className="flex items-center text-sm text-green-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      ${show.total_donations.toFixed(2)}
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <Users className="w-4 h-4 mr-1" />
                      {show.donation_count} {show.donation_count === 1 ? 'tip' : 'tips'}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => openQrModal(show)}
                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
                  title="Show QR Code"
                >
                  <QrCode className="w-5 h-5" />
                </button>
                
                {show.ticket_url && (
                  <a
                    href={show.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                    title="Ticket Link"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {show.is_active ? 'Show is active - fans can tip!' : 'Show is inactive'}
              </div>
              
              <button
                onClick={() => toggleShowActive(show)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  show.is_active
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {show.is_active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {showQrModal && activeShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Show QR Code</h3>
            <p className="text-gray-600 mb-4">
              Share this QR code with fans at your show to receive tips
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${window.location.origin}/tip/${activeShow.qr_code}`} 
                alt="Tip QR Code" 
                className="w-48 h-48"
              />
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Tip URL:
              </p>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm break-all">
                {window.location.origin}/tip/{activeShow.qr_code}
              </code>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
