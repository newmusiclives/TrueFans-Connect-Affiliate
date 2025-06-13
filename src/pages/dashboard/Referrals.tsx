import { useState, useEffect } from 'react'
import { Users, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'

interface ReferralUser {
  id: string
  username: string | null
  role: string
  created_at: string
  level: number
}

export function Referrals() {
  const { profile } = useAuth()
  const [referrals, setReferrals] = useState<ReferralUser[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<'created_at' | 'username' | 'role'>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    const fetchReferrals = async () => {
      if (!profile) return

      try {
        // Get direct referrals (level 1)
        const { data: directReferrals, error: directError } = await supabase
          .from('affiliate_tree')
          .select(`
            user_id,
            level,
            profiles:user_id (
              id,
              username,
              role,
              created_at
            )
          `)
          .eq('parent_id', profile.id)
          .eq('level', 1)

        if (directError) throw directError

        // Get indirect referrals (level 2)
        const { data: indirectReferrals, error: indirectError } = await supabase
          .from('affiliate_tree')
          .select(`
            user_id,
            level,
            profiles:user_id (
              id,
              username,
              role,
              created_at
            )
          `)
          .eq('grandparent_id', profile.id)
          .eq('level', 2)

        if (indirectError) throw indirectError

        // Combine and format the results
        const formattedReferrals = [
          ...(directReferrals || []).map(ref => ({
            id: ref.profiles.id,
            username: ref.profiles.username,
            role: ref.profiles.role,
            created_at: ref.profiles.created_at,
            level: ref.level
          })),
          ...(indirectReferrals || []).map(ref => ({
            id: ref.profiles.id,
            username: ref.profiles.username,
            role: ref.profiles.role,
            created_at: ref.profiles.created_at,
            level: ref.level
          }))
        ]

        setReferrals(formattedReferrals)
      } catch (error) {
        console.error('Error fetching referrals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReferrals()
  }, [profile])

  const handleSort = (field: 'created_at' | 'username' | 'role') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedReferrals = [...referrals].sort((a, b) => {
    if (sortField === 'created_at') {
      return sortDirection === 'asc'
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else if (sortField === 'username') {
      const usernameA = a.username || ''
      const usernameB = b.username || ''
      return sortDirection === 'asc'
        ? usernameA.localeCompare(usernameB)
        : usernameB.localeCompare(usernameA)
    } else if (sortField === 'role') {
      return sortDirection === 'asc'
        ? a.role.localeCompare(b.role)
        : b.role.localeCompare(a.role)
    }
    return 0
  })

  const directReferrals = sortedReferrals.filter(ref => ref.level === 1)
  const indirectReferrals = sortedReferrals.filter(ref => ref.level === 2)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Referrals</h1>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-lg font-semibold text-primary-600">{referrals.length}</span>
          </div>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
          <h2 className="font-medium text-primary-800 mb-2">Two-Tier Affiliate System</h2>
          <p className="text-primary-700 text-sm">
            You earn 2.5% commission on donations from users you directly refer (Tier 1) and 2.5% from users they refer (Tier 2).
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Direct Referrals (Tier 1)</h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : directReferrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('username')}
                    >
                      <div className="flex items-center">
                        User
                        {sortField === 'username' && (
                          sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('role')}
                    >
                      <div className="flex items-center">
                        Role
                        {sortField === 'role' && (
                          sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('created_at')}
                    >
                      <div className="flex items-center">
                        Joined
                        {sortField === 'created_at' && (
                          sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {directReferrals.map((referral) => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                            {referral.username ? referral.username.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {referral.username || 'Anonymous User'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                          {referral.role.charAt(0).toUpperCase() + referral.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2.5%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No direct referrals yet</h3>
              <p className="text-gray-500 mb-4">Share your affiliate link to start earning commissions</p>
              <a href="/dashboard/affiliate-tools" className="text-primary-600 font-medium">
                Get your affiliate link →
              </a>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Indirect Referrals (Tier 2)</h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : indirectReferrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {indirectReferrals.map((referral) => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600">
                            {referral.username ? referral.username.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {referral.username || 'Anonymous User'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800">
                          {referral.role.charAt(0).toUpperCase() + referral.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2.5%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No indirect referrals yet</h3>
              <p className="text-gray-500">
                When your direct referrals invite others, they'll appear here
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Grow Your Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/dashboard/affiliate-tools" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-primary-100 rounded-lg mr-3">
              <Share2 className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Get Sharing Tools</h3>
              <p className="text-sm text-gray-500">Access your affiliate link and promotional materials</p>
            </div>
          </a>
          
          <a href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-secondary-100 rounded-lg mr-3">
              <ExternalLink className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Affiliate Marketing Guide</h3>
              <p className="text-sm text-gray-500">Learn strategies to maximize your referrals</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
