import { useState, useEffect } from 'react'
import { Plus, Calendar, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { ShowsImport } from '@/components/musician/ShowsImport'
import { ShowsList } from '@/components/musician/ShowsList'
import type { Musician } from '@/lib/supabase/database.types'

export function ShowsManagement() {
  const { user } = useAuth()
  const [musician, setMusician] = useState<Musician | null>(null)
  const [loading, setLoading] = useState(true)
  const [showImport, setShowImport] = useState(false)

  useEffect(() => {
    const fetchMusicianProfile = async () => {
      if (!user) return
      
      try {
        const { data, error } = await supabase
          .from('musicians')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (error) throw error
        
        setMusician(data)
      } catch (err) {
        console.error('Error fetching musician profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMusicianProfile()
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
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Shows Management</h2>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Import Shows
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ShowsList musicianId={musician.id} />
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
              <h3 className="text-xl font-bold mb-4">Upcoming Shows</h3>
              <p className="text-gray-600 mb-6">
                Import your shows from BandsInTown to start receiving tips at live events
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                  <span>Sync your tour schedule</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <RefreshCw className="w-5 h-5 mr-3 text-purple-600" />
                  <span>Automatically updates with BandsInTown</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowImport(true)}
                className="w-full mt-6 bg-gray-100 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
              >
                Import Shows
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
