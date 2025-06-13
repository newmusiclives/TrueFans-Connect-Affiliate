import { useState } from 'react'
import { Calendar, MapPin, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import { BandsInTownService } from '@/services/bandsintown'
import { format } from 'date-fns'
import type { Show } from '@/lib/supabase/database.types'

interface ShowsImportProps {
  musicianId: string
  stageName: string
  onComplete?: (shows: Show[]) => void
}

export function ShowsImport({ musicianId, stageName, onComplete }: ShowsImportProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [importedShows, setImportedShows] = useState<Show[]>([])
  const [error, setError] = useState('')

  const handleImport = async () => {
    setLoading(true)
    setStatus('idle')
    setError('')

    const bandsInTown = new BandsInTownService()
    const result = await bandsInTown.importShows(stageName, musicianId)

    if (result.success) {
      setStatus('success')
      setImportedShows(result.shows || [])
      onComplete?.(result.shows || [])
    } else {
      setStatus('error')
      setError(result.error || 'Failed to import shows')
    }

    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Import Your Shows</h3>
      
      {status === 'idle' && (
        <>
          <p className="text-gray-600 mb-6">
            Connect your BandsInTown events to start receiving tips at live shows
          </p>
          
          <button
            onClick={handleImport}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                Searching for shows...
              </span>
            ) : (
              'Import from BandsInTown'
            )}
          </button>
        </>
      )}

      {status === 'success' && (
        <div className="space-y-4">
          <div className="flex items-center text-green-600 mb-4">
            <CheckCircle className="w-6 h-6 mr-2" />
            <span className="font-semibold">
              Imported {importedShows.length} upcoming shows!
            </span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {importedShows.map((show) => (
              <div key={show.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
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
                  </div>
                  {show.ticket_url && (
                    <a
                      href={show.ticket_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span>{error}</span>
          </div>
          <button
            onClick={handleImport}
            className="text-purple-600 hover:text-purple-700 underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
