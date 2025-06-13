import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Calendar, Music, Copy, Check, ExternalLink } from 'lucide-react'

interface Venue {
  id: string
  name: string
  image_url: string
  description: string
  location: string
  capacity: number
  upcoming_shows: number
  website: string
}

export function Venues() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'browse' | 'submit'>('browse')
  const [formCode, setFormCode] = useState<string>('')
  const [formCustomization, setFormCustomization] = useState({
    title: 'Submit Your Music',
    description: 'We\'re always looking for great artists to perform at our venue.',
    primaryColor: '#7c3aed',
    logo: true,
    fields: {
      name: true,
      email: true,
      phone: true,
      website: true,
      socialLinks: true,
      musicLinks: true,
      genre: true,
      bio: true,
      availableDates: true,
      message: true
    }
  })
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    // In a real app, we would fetch venues from the API
    // For demo purposes, we'll use mock data
    const fetchVenues = async () => {
      try {
        // Mock data for demonstration
        const mockVenues = [
          {
            id: '1',
            name: 'The Sound Garden',
            image_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'An intimate venue showcasing indie artists and local talent in a garden setting.',
            location: 'Portland, OR',
            capacity: 250,
            upcoming_shows: 8,
            website: 'https://soundgarden.example.com'
          },
          {
            id: '2',
            name: 'Electric Avenue',
            image_url: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'High-energy nightclub featuring electronic music and world-class DJs.',
            location: 'Miami, FL',
            capacity: 800,
            upcoming_shows: 12,
            website: 'https://electricavenue.example.com'
          },
          {
            id: '3',
            name: 'Jazz Corner',
            image_url: 'https://images.pexels.com/photos/2444860/pexels-photo-2444860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Historic jazz club with nightly performances from established and emerging artists.',
            location: 'New Orleans, LA',
            capacity: 150,
            upcoming_shows: 14,
            website: 'https://jazzcorner.example.com'
          },
          {
            id: '4',
            name: 'The Basement',
            image_url: 'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Underground venue known for showcasing alternative and punk rock bands.',
            location: 'Seattle, WA',
            capacity: 300,
            upcoming_shows: 6,
            website: 'https://thebasement.example.com'
          },
          {
            id: '5',
            name: 'Harmony Hall',
            image_url: 'https://images.pexels.com/photos/1327430/pexels-photo-1327430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Elegant concert hall hosting classical, folk, and acoustic performances.',
            location: 'Boston, MA',
            capacity: 500,
            upcoming_shows: 5,
            website: 'https://harmonyhall.example.com'
          },
          {
            id: '6',
            name: 'Rhythm & Blues',
            image_url: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Soulful venue dedicated to R&B, soul, and blues artists with a vintage atmosphere.',
            location: 'Chicago, IL',
            capacity: 350,
            upcoming_shows: 9,
            website: 'https://rhythmandblues.example.com'
          },
          {
            id: '7',
            name: 'Nashville Nights',
            image_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Authentic country music venue featuring both established stars and rising talent.',
            location: 'Nashville, TN',
            capacity: 400,
            upcoming_shows: 11,
            website: 'https://nashvillenights.example.com'
          },
          {
            id: '8',
            name: 'The Amphitheater',
            image_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Outdoor venue hosting major concerts and festivals with stunning natural backdrops.',
            location: 'Denver, CO',
            capacity: 5000,
            upcoming_shows: 4,
            website: 'https://amphitheater.example.com'
          }
        ]
        
        setVenues(mockVenues)
      } catch (error) {
        console.error('Error fetching venues:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchVenues()
  }, [])

  useEffect(() => {
    // Generate embed code based on customization
    const generateEmbedCode = () => {
      const code = `<iframe 
  src="https://truefans.com/embed/submission-form/${encodeURIComponent(JSON.stringify(formCustomization))}" 
  width="100%" 
  height="600px" 
  style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" 
  title="TrueFans Music Submission Form">
</iframe>`
      setFormCode(code)
    }

    generateEmbedCode()
  }, [formCustomization])
  
  // Filter venues based on search query
  const filteredVenues = venues.filter(venue => {
    return venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           venue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           venue.location.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Venues</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Discover music venues partnered with TrueFans or create a customized music submission form for your venue's website.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('browse')}
            className={`${
              activeTab === 'browse'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Browse Venues
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`${
              activeTab === 'submit'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Music Submission Form
          </button>
        </nav>
      </div>
      
      {activeTab === 'browse' ? (
        <>
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search venues by name, description, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Venues Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVenues.map(venue => (
                <div 
                  key={venue.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={venue.image_url}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{venue.name}</h2>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      {venue.location}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{venue.description}</p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-gray-500">
                        <Music className="h-4 w-4 mr-1" />
                        <span>Capacity: {venue.capacity}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{venue.upcoming_shows} upcoming</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a 
                        href={venue.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Visit Website
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No venues found</h3>
              <p className="text-gray-500">
                Try adjusting your search to find venues.
              </p>
            </div>
          )}
          
          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Own or manage a venue?</h2>
              <p className="text-lg mb-6">
                Partner with TrueFans to discover new talent, streamline your booking process, and connect with musicians.
              </p>
              <button
                onClick={() => setActiveTab('submit')}
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Create Submission Form
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customize Your Music Submission Form</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customization Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <label htmlFor="form-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Form Title
                </label>
                <input
                  type="text"
                  id="form-title"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                  value={formCustomization.title}
                  onChange={(e) => setFormCustomization({...formCustomization, title: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="form-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Form Description
                </label>
                <textarea
                  id="form-description"
                  rows={3}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                  value={formCustomization.description}
                  onChange={(e) => setFormCustomization({...formCustomization, description: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="primary-color" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="primary-color"
                    className="h-10 w-10 border border-gray-300 rounded-md mr-2"
                    value={formCustomization.primaryColor}
                    onChange={(e) => setFormCustomization({...formCustomization, primaryColor: e.target.value})}
                  />
                  <input
                    type="text"
                    className="block flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                    value={formCustomization.primaryColor}
                    onChange={(e) => setFormCustomization({...formCustomization, primaryColor: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display TrueFans Logo
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                      formCustomization.logo ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                    onClick={() => setFormCustomization({...formCustomization, logo: !formCustomization.logo})}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        formCustomization.logo ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm text-gray-500">
                    {formCustomization.logo ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Form Fields</h3>
                <div className="space-y-3">
                  {Object.entries(formCustomization.fields).map(([field, enabled]) => (
                    <div key={field} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`field-${field}`}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        checked={enabled}
                        onChange={() => {
                          setFormCustomization({
                            ...formCustomization,
                            fields: {
                              ...formCustomization.fields,
                              [field]: !enabled
                            }
                          })
                        }}
                      />
                      <label htmlFor={`field-${field}`} className="ml-2 block text-sm text-gray-700 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Preview and Code */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  {formCustomization.logo && (
                    <div className="flex justify-center mb-4">
                      <span className="text-xl font-bold" style={{color: formCustomization.primaryColor}}>TrueFans</span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2" style={{color: formCustomization.primaryColor}}>
                    {formCustomization.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">{formCustomization.description}</p>
                  
                  <div className="space-y-4">
                    {formCustomization.fields.name && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Artist/Band Name</label>
                        <input type="text" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" disabled />
                      </div>
                    )}
                    
                    {formCustomization.fields.email && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" disabled />
                      </div>
                    )}
                    
                    {formCustomization.fields.genre && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                        <select className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" disabled>
                          <option>Select a genre</option>
                        </select>
                      </div>
                    )}
                    
                    {/* More fields would be shown here based on selection */}
                    
                    <button
                      className="w-full py-2 px-4 rounded-md text-white font-medium"
                      style={{backgroundColor: formCustomization.primaryColor}}
                      disabled
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">Embed Code</h3>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap">{formCode}</pre>
                </div>
                
                <p className="mt-2 text-sm text-gray-500">
                  Copy this code and paste it into your website where you want the submission form to appear.
                </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      To receive submissions, you need to <Link to="/signup" className="font-medium underline">create a venue account</Link> or <Link to="/login" className="font-medium underline">log in</Link> to your existing account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
