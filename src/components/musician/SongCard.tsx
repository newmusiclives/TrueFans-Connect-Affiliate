import { Link } from 'react-router-dom'
import { Disc, Heart } from 'lucide-react'

interface SongCardProps {
  song: {
    id: string
    title: string
    album_name?: string | null
    album_art_url?: string | null
    preview_url?: string | null
    donation_count: number
    total_donations: number
  }
  musicianId: string
}

export function SongCard({ song, musicianId }: SongCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {song.album_art_url ? (
          <img 
            src={song.album_art_url} 
            alt={song.title}
            className="w-full aspect-square object-cover"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
            <Disc className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {song.preview_url && (
          <button 
            className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            onClick={() => {
              const audio = new Audio(song.preview_url)
              audio.play()
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{song.title}</h3>
        {song.album_name && (
          <p className="text-sm text-gray-600 mb-3 truncate">{song.album_name}</p>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-purple-600">${song.total_donations.toFixed(2)}</span> from {song.donation_count} fans
          </div>
          
          <Link
            to={`/song/${song.id}/donate`}
            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
          >
            <Heart className="w-4 h-4 mr-1" />
            Support
          </Link>
        </div>
      </div>
    </div>
  )
}
