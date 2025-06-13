import { useState, useEffect } from 'react'
import { Heart, TrendingUp, Users, Music, DollarSign, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { useDashboardStats } from '@/hooks/useDashboardStats'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { format, startOfDay } from 'date-fns'
import { Link } from 'react-router-dom'

export function MusicianDashboard() {
  const { user } = useAuth()
  const { stats, loading } = useDashboardStats(user?.id || '')
  const [musician, setMusician] = useState<any>(null)
  const [liveShow, setLiveShow] = useState<any>(null)

  useEffect(() => {
    if (user) {
      fetchMusicianData()
      checkLiveShow()
    }
  }, [user])

  const fetchMusicianData = async () => {
    const { data } = await supabase
      .from('musicians')
      .select(`
        *,
        profiles (username, avatar_url)
      `)
      .eq('id', user!.id)
      .single()
    
    setMusician(data)
  }

  const checkLiveShow = async () => {
    const { data: activeShow } = await supabase
      .from('shows')
      .select('*')
      .eq('musician_id', user!.id)
      .eq('is_active', true)
      .single()

    setLiveShow(activeShow)
  }

  if (loading || !musician) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader musician={musician} liveShow={liveShow} />

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Today's Earnings"
            value={`$${stats.todayEarnings.toFixed(2)}`}
            trend={stats.todayEarnings > 0 ? `+${stats.todayEarnings.toFixed(2)}` : '0'}
            color="green"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Monthly Earnings"
            value={`$${stats.monthlyEarnings.toFixed(2)}`}
            color="purple"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            label="Total Fans"
            value={stats.totalFans.toString()}
            color="pink"
          />
          <StatCard
            icon={<Heart className="w-6 h-6" />}
            label="Donations Today"
            value={stats.recentDonations.filter(d => 
              new Date(d.created_at) > startOfDay(new Date())
            ).length.toString()}
            color="red"
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EarningsChart data={stats.earningsChart} />
          <RecentDonations donations={stats.recentDonations} />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  )
}

// Dashboard Header Component
function DashboardHeader({ musician, liveShow }: any) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {musician.stage_name}!</h1>
            <p className="text-purple-100 mt-1">
              {liveShow ? `Live at ${liveShow.venue_name}` : 'Ready to rock? Go live at your next show!'}
            </p>
          </div>
          {liveShow && (
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2" />
                <span className="font-semibold">LIVE NOW</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, label, value, trend, color }: any) {
  const colorClasses: Record<string, string> = {
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    pink: 'from-pink-400 to-pink-600',
    red: 'from-red-400 to-red-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} text-white`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}

// Earnings Chart Component
function EarningsChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Weekly Earnings</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#9333ea" 
              strokeWidth={2}
              dot={{ fill: '#9333ea' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Recent Donations Component
function RecentDonations({ donations }: { donations: any[] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Recent Tips</h2>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {donations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No tips yet. Share your QR code at shows!
          </p>
        ) : (
          donations.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">
                    ${donation.amount} from {donation.profiles?.username || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {donation.shows?.venue_name || donation.songs?.title || 'General tip'}
                  </p>
                  {donation.message && (
                    <p className="text-sm text-gray-500 italic">"{donation.message}"</p>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(donation.created_at), 'h:mm a')}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Quick Actions Component
function QuickActions() {
  const actions = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Manage Shows",
      description: "Import shows and get QR codes",
      href: "/musician/shows",
      color: "purple"
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "My Music",
      description: "View and manage your songs",
      href: "/musician/music",
      color: "pink"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Share & Earn",
      description: "Invite artists and earn 5%",
      href: "/musician/affiliate",
      color: "indigo"
    }
  ]

  const colorClasses: Record<string, string> = {
    purple: 'from-purple-600 to-purple-700',
    pink: 'from-pink-600 to-pink-700',
    indigo: 'from-indigo-600 to-indigo-700'
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <Link
          key={action.title}
          to={action.href}
          className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${colorClasses[action.color]} text-white mb-4`}>
            {action.icon}
          </div>
          <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
          <p className="text-gray-600 text-sm">{action.description}</p>
        </Link>
      ))}
    </div>
  )
}
