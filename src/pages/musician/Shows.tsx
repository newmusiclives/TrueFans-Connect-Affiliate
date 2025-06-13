import { useState, useEffect } from 'react'
import { Calendar, Music, DollarSign, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { ShowsImport } from '@/components/musician/ShowsImport'
import { ShowQRCode } from '@/components/shows/ShowQRCode'
import { format } from 'date-fns'
import type { Show } from '@/lib/supabase/database.types'

export function MusicianShows() {
  const { user, profile } = useAuth()
  const [shows, setShows] = useState<Show[]>([])
  const [musician, setMusician] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)

  useEffect(() => {
    if (user) {
      fetchMusicianData()
      fetchShows()
    }
  }, [user])

  const fetchMusicianData = async () => {
    const { data } = await supabase
      .from('musicians')
      .select('*')
      .eq('id', user!.id)
      .single()
    
    setMusician(data)
  }

  const fetchShows = async () => {
    const { data } = await supabase
      .from('shows')
      .select('*')
      .eq('musician_id', user!.id)
      .order('datetime', { ascending: true })

    setShows(data || [])
    setLoading(false)
  }

  const activateShow = async (showId: string) => {
    await supabase
      .from('shows')
      .update({ is_active: true })
      .eq('id', showId)

    // Deactivate other shows
    await supabase
      .from('shows')
      .update({ is_active: false })
      .eq('musician_id', user!.id)
      .neq('id', showId)

    fetchShows()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Shows</h1>

        {shows.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No shows yet</h2>
              <p className="text-gray-600">Import your upcoming shows to start receiving tips</p>
            </div>
            
            {musician && (
              <ShowsImport
                musicianId={user!.id}
                stageName={musician.stage_name}
                onComplete={() => fetchShows()}
              />
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Upcoming Shows</h2>
              
              {shows.map((show) => {
                const isUpcoming = new Date(show.datetime) > new Date()
                const isToday = format(new Date(show.datetime), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                
                return (
                  <div
                    key={show.id}
                    onClick={() => setSelectedShow(show)}
                    className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-lg ${
                      selectedShow?.id === show.id ? 'ring-2 ring-purple-500' : ''
                    } ${!isUpcoming ? 'opacity-60' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{show.venue_name}</h3>
                        <p className="text-gray-600 text-sm">
                          {(show.venue_location as any).city}, {(show.venue_location as any).region}
                        </p>
                      </div>
                      {show.is_active && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          LIVE
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(show.datetime), 'MMM d, yyyy @ h:mm a')}
                      {isToday && (
                        <span className="ml-2 text-purple-600 font-semibold">TODAY</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {show.donation_count || 0} tips
                        </span>
                        <span className="flex items-center text-green-600 font-semibold">
                          <DollarSign className="w-4 h-4" />
                          {show.total_donations || 0}
                        </span>
                      </div>

                      {isUpcoming && !show.is_active && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            activateShow(show.id)
                          }}
                          className="text-sm bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700"
                        >
                          Go Live
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
              
              <button
                onClick={() => musician && fetchShows()}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                Import More Shows
              </button>
            </div>

            <div>
              {selectedShow ? (
                <div className="sticky top-4">
                  <ShowQRCode
                    show={selectedShow}
                    musicianName={musician?.stage_name || profile?.username || 'Artist'}
                  />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl p-8 text-center">
                  <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a show to view its QR code</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
