import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Music, Filter, X } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

interface Artist {
  id: string
  username: string
  avatar_url: string | null
  bio: string | null
}

export function Discover() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genreFilter, setGenreFilter] = useState<string | null>(null)
  
  const genres = ['Rock', 'Pop', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Folk', 'R&B']

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        // In a real app, we would filter by role='musician'
        // For demo purposes, we'll just get some profiles
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(12)
        
        if (error) throw error
        
        // Mock data for demonstration
        const mockArtists = [
          {
            id: '1',
            username: 'ElectroBeats',
            avatar_url: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Electronic music producer creating beats that move your soul.',
            genre: 'Electronic'
          },
          {
            id: '2',
            username: 'JazzMaster',
            avatar_url: 'https://images.pexels.com/photos/4472061/pexels-photo-4472061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Jazz saxophonist with a passion for improvisation and classic sounds.',
            genre: 'Jazz'
          },
          {
            id: '3',
            username: 'RockLegend',
            avatar_url: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Guitar-driven rock music that will make you want to headbang.',
            genre: 'Rock'
          },
          {
            id: '4',
            username: 'PopSensation',
            avatar_url: 'https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Creating catchy pop tunes that will be stuck in your head for days.',
            genre: 'Pop'
          },
          {
            id: '5',
            username: 'ClassicalVibes',
            avatar_url: 'https://images.pexels.com/photos/4472322/pexels-photo-4472322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Pianist bringing classical compositions to life with a modern twist.',
            genre: 'Classical'
          },
          {
            id: '6',
            username: 'HipHopFlow',
            avatar_url: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Rapper with lyrical prowess and beats that hit hard.',
            genre: 'Hip Hop'
          },
          {
            id: '7',
            username: 'FolkTales',
            avatar_url: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Storyteller through folk music, bringing tales of old to new audiences.',
            genre: 'Folk'
          },
          {
            id: '8',
            username: 'SoulfulSinger',
            avatar_url: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'R&B vocalist with a voice that touches the heart and soul.',
            genre: 'R&B'
          }
        ]
        
        setArtists(mockArtists)
      } catch (error) {
        console.error('Error fetching artists:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchArtists()
  }, [])
  
  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (artist.bio && artist.bio.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesGenre = !genreFilter || artist.genre === genreFilter
    
    return matchesSearch && matchesGenre
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover Artists</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find and support talented musicians directly through our platform.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search artists by name or description"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={genreFilter || ''}
            onChange={(e) => setGenreFilter(e.target.value || null)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map(artist => (
            <Link
              key={artist.id}
              to={`/artists/${artist.username}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                {artist.avatar_url ? (
                  <img
                    src={artist.avatar_url}
                    alt={artist.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-100">
                    <Music className="h-12 w-12 text-primary-600" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-white font-bold text-lg">{artist.username}</h2>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary-500 text-white mt-1">
                    {artist.genre}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {artist.bio || 'No bio available'}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-primary-600 font-medium text-sm">View Profile</span>
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Music className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No artists found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}
