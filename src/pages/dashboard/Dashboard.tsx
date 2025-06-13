import { Routes, Route, Link } from 'react-router-dom'
import { Home, Music, Users, DollarSign, Settings, Share2, BarChart } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Overview } from './Overview'
import { Profile } from './Profile'
import { Earnings } from './Earnings'
import { Referrals } from './Referrals'
import { AffiliateTools } from './AffiliateTools'
import { DashboardSettings } from './Settings'

export function Dashboard() {
  const { profile } = useAuth()
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-1">
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 bg-gray-100"
                >
                  <Home className="mr-3 h-5 w-5 text-gray-500" />
                  Overview
                </Link>
                
                {profile?.role === 'musician' && (
                  <Link
                    to="/dashboard/music"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <Music className="mr-3 h-5 w-5 text-gray-500" />
                    My Music
                  </Link>
                )}
                
                <Link
                  to="/dashboard/earnings"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <DollarSign className="mr-3 h-5 w-5 text-gray-500" />
                  Earnings
                </Link>
                
                <Link
                  to="/dashboard/referrals"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Users className="mr-3 h-5 w-5 text-gray-500" />
                  My Referrals
                </Link>
                
                <Link
                  to="/dashboard/affiliate-tools"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Share2 className="mr-3 h-5 w-5 text-gray-500" />
                  Affiliate Tools
                </Link>
                
                {profile?.role === 'venue' && (
                  <Link
                    to="/dashboard/analytics"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <BarChart className="mr-3 h-5 w-5 text-gray-500" />
                    Analytics
                  </Link>
                )}
                
                <Link
                  to="/dashboard/settings"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Settings className="mr-3 h-5 w-5 text-gray-500" />
                  Settings
                </Link>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-4">
            <Routes>
              <Route index element={<Overview />} />
              <Route path="profile" element={<Profile />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="affiliate-tools" element={<AffiliateTools />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
