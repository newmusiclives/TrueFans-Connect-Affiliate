import { useState } from 'react'
import { ManifestService } from '@/services/manifest'

export function useManifest() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const manifestService = new ManifestService()

  const createAccount = async (params: {
    userId: string
    email: string
    type: 'musician' | 'affiliate'
    businessInfo?: {
      name: string
      type: string
    }
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await manifestService.createAccount(params)
      
      if (!result.success) {
        throw new Error(result.error?.toString() || 'Failed to create account')
      }
      
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const processDonation = async (params: {
    amount: number
    musicianId: string
    fanId?: string
    showId?: string
    songId?: string
    message?: string
    paymentMethodToken: string
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await manifestService.processDonation(params)
      
      if (!result.success) {
        throw new Error(result.error?.toString() || 'Failed to process donation')
      }
      
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    createAccount,
    processDonation,
    loading,
    error
  }
}
