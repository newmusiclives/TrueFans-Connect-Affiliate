import { MapPin, Users, DollarSign } from 'lucide-react'

interface LiveShowBannerProps {
  show: {
    venue_name: string
    venue_location: any
    datetime: string
    donation_count: number
    total_donations: number
  }
}

export function LiveShowBanner({ show }: LiveShowBannerProps) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2" />
            <span className="text-sm font-medium uppercase tracking-wide">Live Now</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{show.venue_name}</h3>
          <div className="flex items-center text-green-100">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {show.venue_location.city}, {show.venue_location.region}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center justify-end text-2xl font-bold mb-1">
            <DollarSign className="w-6 h-6" />
            {show.total_donations.toFixed(2)}
          </div>
          <div className="flex items-center text-green-100 text-sm">
            <Users className="w-4 h-4 mr-1" />
            {show.donation_count} tips tonight
          </div>
        </div>
      </div>
    </div>
  )
}
