import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Users, DollarSign, Share2, ExternalLink } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'

export function Overview() {
  const { profile } = useAuth()
  const [referralCount, setReferralCount] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!profile) return

      try {
        // Get referral count
        const { count: refCount, error: refError } = await supabase
          .from('affiliate_tree')
          .select('*', { count: 'exact', head: true })
          .eq('parent_id', profile.id)

        if (refError) throw refError

        // Get total earnings
        const { data: earnings, error: earningsError } = await supabase
          .from('affiliate_earnings')
          .select('amount')
          .eq('affiliate_id', profile.id)
          .eq('status', 'paid')

        if (earningsError) throw earningsError

        setReferralCount(refCount || 0)
        setTotalEarnings(
          earnings?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0
        )
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [profile])

  if (!profile) return null

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Referrals</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{referralCount}</p>
                )}
              </div>
              <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="h-5 w-5 text-primary-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/referrals" className="text-sm text-primary-600 font-medium flex items-center">
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                {loading ? (
                  <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</p>
                )}
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/earnings" className="text-sm text-primary-600 font-medium flex items-center">
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Affiliate Code</p>
                <p className="text-2xl font-bold text-gray-900">{profile.affiliate_code}</p>
              </div>
              <div className="p-2 bg-secondary-100 rounded-lg">
                <Share2 className="h-5 w-5 text-secondary-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/affiliate-tools" className="text-sm text-primary-600 font-medium flex items-center">
                Get sharing tools <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/discover" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg mr-3">
                <Music className="h-5 w-5 text-primary-600" />
              </div>
              <span className="font-medium">Discover Artists</span>
            </div>
          </Link>

          <Link to="/dashboard/affiliate-tools" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="p-2 bg-secondary-100 rounded-lg mr-3">
                <Share2 className="h-5 w-5 text-secondary-600" />
              </div>
              <span className="font-medium">Share Your Link</span>
            </div>
          </Link>

          {profile.role === 'musician' && (
            <Link to="/dashboard/music" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
              <div className="flex items-center">
                <div className="p-2 bg-accent-100 rounded-lg mr-3">
                  <Music className="h-5 w-5 text-accent-600" />
                </div>
                <span className="font-medium">Manage Music</span>
              </div>
            </Link>
          )}

          <Link to="/dashboard/settings" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="p-2 bg-gray-200 rounded-lg mr-3">
                <Settings className="h-5 w-5 text-gray-600" />
              </div>
              <span className="font-medium">Account Settings</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="mr-3 text-primary-600">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Affiliate Marketing Guide</h3>
              <p className="text-sm text-gray-500">Learn how to maximize your earnings</p>
            </div>
          </a>
          
          <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="mr-3 text-primary-600">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Success Stories</h3>
              <p className="text-sm text-gray-500">See how others are using TrueFans</p>
            </div>
          </a>
          
          <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="mr-3 text-primary-600">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Help Center</h3>
              <p className="text-sm text-gray-500">Get answers to common questions</p>
            </div>
          </a>
          
          <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="mr-3 text-primary-600">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Community Forum</h3>
              <p className="text-sm text-gray-500">Connect with other TrueFans users</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
