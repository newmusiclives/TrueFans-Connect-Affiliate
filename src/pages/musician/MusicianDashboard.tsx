import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Music, Calendar, DollarSign, Users, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { ShowsImport } from '@/components/musician/ShowsImport'
import type { Musician, Show } from '@/lib/supabase/database.types'

export function MusicianDashboard() {
  const { user } = useAuth()
  const [musician, setMusician] = useState<Musician | null>(null)
  const [upcomingShows, setUpcomingShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [showImport, setShowImport] = useState(false)

  useEffect(() => {
    const fetchMusicianData = async () => {
      if (!user) return
      
      try {
        // Fetch musician profile
        const { data: musicianData, error: musicianError } = await supabase
          .from('musicians')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (musicianError) throw musicianError
        
        setMusician(musicianData)
        
        // Fetch upcoming shows
        const { data: showsData, error: showsError } = await supabase
          .from('shows')
          .select('*')
          .eq('musician_id', user.id)
          .gte('datetime', new Date().toISOString())
          .order('datetime', { ascending: true })
          .limit(3)
        
        if (showsError) throw showsError
        
        setUpcomingShows(showsData || [])
      } catch (err) {
        console.error('Error fetching musician data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMusicianData()
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
      </div>
    )
  }

  if (!musician) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">Musician profile not found</p>
          <p className="text-sm text-red-500">
            Please complete your musician profile setup first
          </p>
          <Link
            to="/musician/setup"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Complete Setup
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Welcome, {musician.stage_name}!</h2>
        <p className="text-gray-600">Manage your music and connect with fans</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <Music className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Earnings</h3>
              <p className="text-2xl font-bold">${musician.total_earnings.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Tips</h3>
              <p className="text-2xl font-bold">{musician.total_donations}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upcoming Shows</h3>
              <p className="text-2xl font-bold">{upcomingShows.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Shows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Upcoming Shows</h3>
            <Link
              to="/musician/shows"
              className="text-purple-600 hover:text-purple-700 flex items-center text-sm"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {upcomingShows.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-4">You don't have any upcoming shows</p>
              <button
                onClick={() => setShowImport(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Import Shows
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingShows.map((show) => (
                <div key={show.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{show.venue_name}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(show.datetime).toLocaleDateString()} at {new Date(show.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {(show.venue_location as any).city}, {(show.venue_location as any).region}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium text-green-600">
                        ${show.total_donations.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {show.donation_count} tips
                      </div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          show.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {show.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          {showImport ? (
            <ShowsImport 
              musicianId={musician.id} 
              stageName={musician.stage_name}
              onComplete={() => setShowImport(false)}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link
                  to="/musician/shows"
                  className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
                >
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                    <span>Manage Shows</span>
                  </div>
                </Link>
                
                <button
                  onClick={() => setShowImport(true)}
                  className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
                >
                  <div className="flex items-center">
                    <Music className="w-5 h-5 mr-3 text-purple-600" />
                    <span>Import Shows</span>
                  </div>
                </button>
                
                <Link
                  to="/musician/profile"
                  className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-purple-600" />
                    <span>Edit Profile</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
