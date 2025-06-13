interface ManifestResponse {
  success: boolean
  data?: any
  error?: string | Error
}

export class ManifestService {
  private apiUrl = 'https://api.manifestfinancial.co/v1'
  private apiKey = import.meta.env.VITE_MANIFEST_API_KEY

  private async request(endpoint: string, method: string, data?: any): Promise<ManifestResponse> {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: data ? JSON.stringify(data) : undefined
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'API request failed')
      }

      return {
        success: true,
        data: responseData
      }
    } catch (error) {
      console.error('Manifest API error:', error)
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error')
      }
    }
  }

  async createAccount(params: {
    userId: string
    email: string
    type: 'musician' | 'affiliate'
    businessInfo?: {
      name: string
      type: string
    }
  }): Promise<ManifestResponse> {
    const payload = {
      external_id: params.userId,
      email: params.email,
      account_type: params.type === 'musician' ? 'individual' : 'business',
      business_info: params.businessInfo
    }

    return this.request('/accounts', 'POST', payload)
  }

  async processDonation(params: {
    amount: number
    musicianId: string
    fanId?: string
    showId?: string
    songId?: string
    message?: string
    paymentMethodToken: string
  }): Promise<ManifestResponse> {
    const payload = {
      amount: params.amount * 100, // Convert to cents
      recipient_id: params.musicianId,
      payment_method_token: params.paymentMethodToken,
      metadata: {
        fan_id: params.fanId,
        show_id: params.showId,
        song_id: params.songId,
        message: params.message
      }
    }

    return this.request('/payments', 'POST', payload)
  }
}
