import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Music, MapPin, Filter, Users } from 'lucide-react'

interface Artist {
  id: string
  username: string
  avatar_url: string
  bio: string
  genre: string
  location: string
  followers: number
}

export function Artists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  
  const genres = ['All Genres', 'Electronic', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Pop', 'R&B', 'Country', 'Folk']
  
  useEffect(() => {
    // In a real app, we would fetch artists from the API
    // For demo purposes, we'll use mock data
    const fetchArtists = async () => {
      try {
        // Mock data for demonstration
        const mockArtists = [
          {
            id: '1',
            username: 'ElectroBeats',
            avatar_url: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Electronic music producer creating beats that move your soul.',
            genre: 'Electronic',
            location: 'Los Angeles, CA',
            followers: 1243
          },
          {
            id: '2',
            username: 'RockLegend',
            avatar_url: 'https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Classic rock with a modern twist. Bringing guitar solos back.',
            genre: 'Rock',
            location: 'Seattle, WA',
            followers: 2567
          },
          {
            id: '3',
            username: 'JazzMaster',
            avatar_url: 'https://images.pexels.com/photos/3323694/pexels-photo-3323694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Saxophone virtuoso exploring the boundaries of modern jazz.',
            genre: 'Jazz',
            location: 'New Orleans, LA',
            followers: 987
          },
          {
            id: '4',
            username: 'BeatMaker',
            avatar_url: 'https://images.pexels.com/photos/1656589/pexels-photo-1656589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Hip hop producer crafting the soundtrack to urban life.',
            genre: 'Hip Hop',
            location: 'Atlanta, GA',
            followers: 3421
          },
          {
            id: '5',
            username: 'ClassicalVibes',
            avatar_url: 'https://images.pexels.com/photos/4472061/pexels-photo-4472061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Pianist bringing classical compositions to new audiences.',
            genre: 'Classical',
            location: 'Boston, MA',
            followers: 765
          },
          {
            id: '6',
            username: 'PopSensation',
            avatar_url: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Creating catchy pop anthems that stick in your head.',
            genre: 'Pop',
            location: 'Miami, FL',
            followers: 5432
          },
          {
            id: '7',
            username: 'SoulfulSinger',
            avatar_url: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'R&B vocalist with a voice that touches the soul.',
            genre: 'R&B',
            location: 'Philadelphia, PA',
            followers: 1876
          },
          {
            id: '8',
            username: 'CountryRoads',
            avatar_url: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Authentic country music straight from the heartland.',
            genre: 'Country',
            location: 'Nashville, TN',
            followers: 2134
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
  
  // Filter artists based on search query and selected genre
  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesGenre = selectedGenre === '' || selectedGenre === 'All Genres' || artist.genre === selectedGenre
    
    return matchesSearch && matchesGenre
  })
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Artists</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Find and support your favorite musicians directly. TrueFans connects you with artists from all genres and helps you support their creative journey.
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search artists by name, bio, or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 appearance-none"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Artists Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map(artist => (
            <Link 
              key={artist.id} 
              to={`/musician/${artist.id}`} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-64">
                <img
                  src={artist.avatar_url}
                  alt={artist.username}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-xl font-bold">{artist.username}</h2>
                  <div className="flex items-center text-white text-sm mt-1">
                    <Music className="h-3 w-3 mr-1" />
                    {artist.genre}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{artist.bio}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {artist.location}
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-3 w-3 mr-1" />
                    {artist.followers.toLocaleString()}
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
            Try adjusting your search or filter to find artists.
          </p>
        </div>
      )}
      
      {/* Featured Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Genre</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {genres.filter(genre => genre !== 'All Genres').map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`relative h-32 rounded-lg overflow-hidden group ${
                selectedGenre === genre ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-800 opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-bold">{genre}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Are you an artist?</h2>
          <p className="text-lg mb-6">
            Join TrueFans to connect with your audience, receive direct support, and grow your fanbase.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Create Artist Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
