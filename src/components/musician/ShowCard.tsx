import { Link } from 'react-router-dom'
import { Calendar, MapPin, Heart, Users } from 'lucide-react'
import { format } from 'date-fns'
import QRCode from 'qrcode.react'

interface ShowCardProps {
  show: {
    id: string
    venue_name: string
    venue_location: {
      city: string
      region: string
    }
    datetime: string
    qr_code: string
    lineup?: string[] | null
    donation_count: number
    total_donations: number
  }
  musicianId: string
}

export function ShowCard({ show, musicianId }: ShowCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2">{show.venue_name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{format(new Date(show.datetime), 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0 opacity-0" />
            <span>{format(new Date(show.datetime), 'h:mm a')}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{show.venue_location.city}, {show.venue_location.region}</span>
          </div>
          
          {show.lineup && show.lineup.length > 0 && (
            <div className="flex items-start text-gray-600">
              <Users className="w-4 h-4 mr-2 flex-shrink-0 mt-1" />
              <div>
                <span className="block text-xs text-gray-500 mb-1">Lineup:</span>
                <div className="flex flex-wrap gap-1">
                  {show.lineup.map((artist, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-purple-600">${show.total_donations.toFixed(2)}</span> from {show.donation_count} fans
          </div>
          
          <Link
            to={`/donate/${show.qr_code}`}
            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
          >
            <Heart className="w-4 h-4 mr-1" />
            Support
          </Link>
        </div>
        
        <div className="border-t pt-4 flex justify-center">
          <div className="text-center">
            <div className="mb-2">
              <QRCode 
                value={`https://truefans.com/donate/${show.qr_code}`} 
                size={120}
                level="H"
                renderAs="svg"
                includeMargin={false}
                fgColor="#6b21a8"
              />
            </div>
            <p className="text-xs text-gray-500">Scan to support this show</p>
          </div>
        </div>
      </div>
    </div>
  )
}
