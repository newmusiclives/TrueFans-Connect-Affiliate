import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Music, Calendar, MapPin, DollarSign, Share2, Heart, ExternalLink, Users } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Artist {
  id: string
  username: string
  avatar_url: string
  bio: string
  genre: string
  location: string
  followers: number
  spotifyUrl: string
  instagramUrl: string
  events: {
    id: string
    title: string
    date: string
    venue: string
    location: string
  }[]
  tracks: {
    id: string
    title: string
    duration: string
    imageUrl: string
  }[]
}

export function ArtistProfile() {
  const { username } = useParams<{ username: string }>()
  const { profile } = useAuth()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)
  const [donationAmount, setDonationAmount] = useState(5)
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [donationSuccess, setDonationSuccess] = useState(false)
  
  useEffect(() => {
    // In a real app, we would fetch the artist data from the API
    // For demo purposes, we'll use mock data
    const fetchArtist = async () => {
      try {
        // Mock data for demonstration
        const mockArtist = {
          id: '1',
          username: username || 'ElectroBeats',
          avatar_url: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          bio: 'Electronic music producer creating beats that move your soul. Based in Los Angeles, I blend traditional electronic sounds with modern influences to create a unique sonic experience.',
          genre: 'Electronic',
          location: 'Los Angeles, CA',
          followers: 1243,
          spotifyUrl: 'https://spotify.com',
          instagramUrl: 'https://instagram.com',
          events: [
            {
              id: 'e1',
              title: 'Summer Beats Festival',
              date: '2025-07-15',
              venue: 'Echo Park',
              location: 'Los Angeles, CA'
            },
            {
              id: 'e2',
              title: 'Club Night',
              date: '2025-06-22',
              venue: 'The Roxy',
              location: 'Los Angeles, CA'
            },
            {
              id: 'e3',
              title: 'Electronic Showcase',
              date: '2025-08-05',
              venue: 'The Fonda Theatre',
              location: 'Los Angeles, CA'
            }
          ],
          tracks: [
            {
              id: 't1',
              title: 'Midnight Dreams',
              duration: '3:45',
              imageUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            {
              id: 't2',
              title: 'Electric Sunset',
              duration: '4:12',
              imageUrl: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            {
              id: 't3',
              title: 'Urban Rhythm',
              duration: '3:28',
              imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            {
              id: 't4',
              title: 'Neon Lights',
              duration: '5:01',
              imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
          ]
        }
        
        setArtist(mockArtist)
      } catch (error) {
        console.error('Error fetching artist:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchArtist()
  }, [username])
  
  const handleDonate = () => {
    setShowDonationModal(true)
  }
  
  const handleDonationSubmit = () => {
    // In a real app, we would process the donation
    // For demo purposes, we'll just show a success message
    setShowDonationModal(false)
    setDonationSuccess(true)
    setTimeout(() => setDonationSuccess(false), 5000)
  }
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="h-64 w-64 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
  
  if (!artist) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Music className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Artist not found</h3>
          <p className="text-gray-500 mb-4">
            The artist you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/discover" className="text-primary-600 font-medium">
            Discover other artists →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Artist Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-shrink-0">
          <img
            src={artist.avatar_url}
            alt={artist.username}
            className="h-64 w-64 object-cover rounded-lg shadow-md"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{artist.username}</h1>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDonate}
                className="btn btn-primary flex items-center"
              >
                <DollarSign className="h-4 w-4 mr-1" />
                Support Artist
              </button>
              
              <button className="btn btn-outline flex items-center">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>
              
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-6 flex-wrap gap-y-2">
            <span className="inline-flex items-center mr-6">
              <Music className="h-4 w-4 mr-1" />
              {artist.genre}
            </span>
            
            <span className="inline-flex items-center mr-6">
              <MapPin className="h-4 w-4 mr-1" />
              {artist.location}
            </span>
            
            <span className="inline-flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {artist.followers.toLocaleString()} followers
            </span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-600">{artist.bio}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify
            </a>
            
            <a
              href={artist.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
            >
              <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artist.events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
                
                <div className="flex justify-between items-center">
                  <button className="btn btn-sm btn-primary">Get Tickets</button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Latest Tracks */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Tracks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artist.tracks.map(track => (
            <div key={track.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 group">
              <div className="relative aspect-square">
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button className="h-16 w-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{track.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{track.duration}</span>
                  <button className="text-gray-400 hover:text-primary-600">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Support {artist.username}</h2>
            
            <p className="text-gray-600 mb-6">
              Your support helps {artist.username} continue creating amazing music. Choose an amount to donate:
            </p>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[5, 10, 25, 50, 100].map(amount => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount)}
                  className={`py-2 px-4 rounded-md ${
                    donationAmount === amount
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  ${amount}
                </button>
              ))}
              <button
                onClick={() => setDonationAmount(0)}
                className={`py-2 px-4 rounded-md ${
                  donationAmount === 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Custom
              </button>
            </div>
            
            {donationAmount === 0 && (
              <div className="mb-6">
                <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter custom amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="customAmount"
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                    min="1"
                    step="1"
                    onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDonationModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              
              <button
                onClick={handleDonationSubmit}
                className="btn btn-primary"
                disabled={donationAmount <= 0}
              >
                Donate ${donationAmount}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Donation Success Message */}
      {donationSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50 animate-fade-in-up">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>Thank you for supporting {artist.username}! Your donation of ${donationAmount} has been received.</p>
          </div>
        </div>
      )}
    </div>
  )
}
