import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, Users, TrendingUp, DollarSign } from 'lucide-react'

export function AffiliateStats() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalEarnings: 0,
    pendingEarnings: 0,
    referredUsers: 0,
    tier1Earnings: 0,
    tier2Earnings: 0,
    recentEarnings: [] as any[]
  })
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (user) {
      fetchAffiliateData()
    }
  }, [user])

  const fetchAffiliateData = async () => {
    setLoading(true)
    
    try {
      // Get user profile with affiliate code
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()
      
      if (profileError) throw profileError
      setProfile(profileData)
      
      // Count referred users
      const { count: referredCount, error: referredError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', profileData.affiliate_code)
      
      if (referredError) throw referredError
      
      // Get affiliate earnings
      const { data: earningsData, error: earningsError } = await supabase
        .from('affiliate_earnings')
        .select('*')
        .eq('affiliate_id', user?.id)
      
      if (earningsError) throw earningsError
      
      // Calculate stats
      const totalEarnings = earningsData?.reduce((sum, item) => sum + item.amount, 0) || 0
      const pendingEarnings = earningsData
        ?.filter(item => item.status === 'pending')
        .reduce((sum, item) => sum + item.amount, 0) || 0
      
      const tier1Earnings = earningsData
        ?.filter(item => item.tier === 1)
        .reduce((sum, item) => sum + item.amount, 0) || 0
      
      const tier2Earnings = earningsData
        ?.filter(item => item.tier === 2)
        .reduce((sum, item) => sum + item.amount, 0) || 0
      
      // Get recent earnings (last 5)
      const recentEarnings = earningsData
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5) || []
      
      setStats({
        totalEarnings,
        pendingEarnings,
        referredUsers: referredCount || 0,
        tier1Earnings,
        tier2Earnings,
        recentEarnings
      })
    } catch (error) {
      console.error('Error fetching affiliate data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <h2 className="text-xl font-bold mb-1">Affiliate Dashboard</h2>
        <p className="text-white/80">Earn by referring musicians and fans</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Your Affiliate Link</h3>
          <div className="flex">
            <input
              type="text"
              value={`https://truefans.com/join?ref=${profile?.affiliate_code}`}
              readOnly
              className="flex-1 px-4 py-2 border rounded-l-lg bg-gray-50"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://truefans.com/join?ref=${profile?.affiliate_code}`)
                alert('Affiliate link copied to clipboard!')
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
            >
              Copy
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Total Earnings</p>
                <p className="text-2xl font-bold text-purple-900">${stats.totalEarnings.toFixed(2)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Referred Users</p>
                <p className="text-2xl font-bold text-blue-900">{stats.referredUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Pending Earnings</p>
                <p className="text-2xl font-bold text-green-900">${stats.pendingEarnings.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Earnings Breakdown</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tier 1 Referrals (2.5%)</span>
              <span className="font-medium">${stats.tier1Earnings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tier 2 Referrals (2.5%)</span>
              <span className="font-medium">${stats.tier2Earnings.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Recent Earnings</h3>
          {stats.recentEarnings.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <p>No earnings yet. Start sharing your affiliate link!</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentEarnings.map((earning) => (
                    <tr key={earning.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(earning.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${earning.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Tier {earning.tier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          earning.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : earning.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
