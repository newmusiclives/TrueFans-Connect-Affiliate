import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { startOfDay, endOfDay, subDays, format } from 'date-fns'

interface DashboardStats {
  todayEarnings: number
  monthlyEarnings: number
  totalFans: number
  activeSong: string | null
  recentDonations: any[]
  earningsChart: Array<{
    date: string
    amount: number
  }>
}

export function useDashboardStats(musicianId: string) {
  const [stats, setStats] = useState<DashboardStats>({
    todayEarnings: 0,
    monthlyEarnings: 0,
    totalFans: 0,
    activeSong: null,
    recentDonations: [],
    earningsChart: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (musicianId) {
      fetchStats()
      const unsubscribe = subscribeToLiveDonations()
      
      return () => {
        unsubscribe()
      }
    }
  }, [musicianId])

  const fetchStats = async () => {
    setLoading(true)
    
    try {
      const now = new Date()
      const todayStart = startOfDay(now)
      const monthStart = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1))

      // Fetch today's earnings
      const { data: todayData } = await supabase
        .from('donations')
        .select('artist_payout')
        .eq('musician_id', musicianId)
        .eq('status', 'completed')
        .gte('created_at', todayStart.toISOString())
      
      const todayEarnings = todayData?.reduce((sum, d) => sum + Number(d.artist_payout), 0) || 0

      // Fetch monthly earnings
      const { data: monthlyData } = await supabase
        .from('donations')
        .select('artist_payout')
        .eq('musician_id', musicianId)
        .eq('status', 'completed')
        .gte('created_at', monthStart.toISOString())
      
      const monthlyEarnings = monthlyData?.reduce((sum, d) => sum + Number(d.artist_payout), 0) || 0

      // Count unique fans
      const { count: fansCount } = await supabase
        .from('donations')
        .select('fan_id', { count: 'exact', head: true })
        .eq('musician_id', musicianId)
        .not('fan_id', 'is', null)

      // Fetch recent donations with details
      const { data: recentDonations } = await supabase
        .from('donations')
        .select(`
          *,
          profiles!donations_fan_id_fkey (username, avatar_url),
          songs (title),
          shows (venue_name)
        `)
        .eq('musician_id', musicianId)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(10)

      // Generate chart data for last 7 days
      const chartData = await generateChartData(musicianId, now)

      setStats({
        todayEarnings,
        monthlyEarnings,
        totalFans: fansCount || 0,
        activeSong: null,
        recentDonations: recentDonations || [],
        earningsChart: chartData
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateChartData = async (musicianId: string, now: Date) => {
    const chartData = []
    
    for (let i = 6; i >= 0; i--) {
      const date = subDays(now, i)
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)

      const { data: dayData } = await supabase
        .from('donations')
        .select('artist_payout')
        .eq('musician_id', musicianId)
        .eq('status', 'completed')
        .gte('created_at', dayStart.toISOString())
        .lte('created_at', dayEnd.toISOString())

      const dayTotal = dayData?.reduce((sum, d) => sum + Number(d.artist_payout), 0) || 0

      chartData.push({
        date: format(date, 'MMM d'),
        amount: dayTotal
      })
    }

    return chartData
  }

  const subscribeToLiveDonations = () => {
    const channel = supabase
      .channel(`musician-donations:${musicianId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'donations',
          filter: `musician_id=eq.${musicianId}`
        },
        async (payload) => {
          // Fetch complete donation data with relationships
          const { data: donation } = await supabase
            .from('donations')
            .select(`
              *,
              profiles!donations_fan_id_fkey (username, avatar_url),
              songs (title),
              shows (venue_name)
            `)
            .eq('id', payload.new.id)
            .single()

          if (donation) {
            // Update stats with new donation
            setStats(prev => ({
              ...prev,
              todayEarnings: prev.todayEarnings + Number(donation.artist_payout),
              monthlyEarnings: prev.monthlyEarnings + Number(donation.artist_payout),
              recentDonations: [donation, ...prev.recentDonations].slice(0, 10),
              totalFans: donation.fan_id && !prev.recentDonations.some(d => d.fan_id === donation.fan_id) 
                ? prev.totalFans + 1 
                : prev.totalFans,
              earningsChart: updateTodayInChart(prev.earningsChart, Number(donation.artist_payout))
            }))

            // Show notification
            showDonationNotification(donation)
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }

  const updateTodayInChart = (chart: any[], amount: number) => {
    const today = format(new Date(), 'MMM d')
    return chart.map(day => 
      day.date === today 
        ? { ...day, amount: day.amount + amount }
        : day
    )
  }

  return { stats, loading, refetch: fetchStats }
}

// Notification helper
export function showDonationNotification(donation: any) {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in'
  notification.innerHTML = `
    <div class="flex items-center">
      <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
      </svg>
      <span>$${donation.amount} from ${donation.profiles?.username || 'Anonymous'}</span>
    </div>
  `
  document.body.appendChild(notification)

  // Remove after animation
  setTimeout(() => {
    notification.classList.add('animate-slide-out')
    setTimeout(() => notification.remove(), 300)
  }, 5000)
}
