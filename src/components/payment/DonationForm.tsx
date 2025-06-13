import { useState } from 'react'
import { useManifest } from '@/hooks/useManifest'
import { useAuth } from '@/contexts/AuthContext'

interface DonationFormProps {
  musicianId: string
  showId?: string
  songId?: string
  onSuccess?: (donation: any) => void
  onError?: (error: string) => void
}

export function DonationForm({ 
  musicianId, 
  showId, 
  songId, 
  onSuccess, 
  onError 
}: DonationFormProps) {
  const { user } = useAuth()
  const { processDonation, loading, error } = useManifest()
  const [amount, setAmount] = useState<number>(5)
  const [message, setMessage] = useState<string>('')
  const [paymentToken, setPaymentToken] = useState<string>('')
  const [showCustomAmount, setShowCustomAmount] = useState(false)
  
  // Predefined amounts
  const amounts = [5, 10, 20, 50]
  
  // Mock function to simulate payment method token generation
  const generatePaymentToken = async () => {
    // In a real implementation, this would integrate with Manifest's SDK
    // to tokenize the payment method
    return 'pm_' + Math.random().toString(36).substring(2, 15)
  }
  
  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount)
    setShowCustomAmount(false)
  }
  
  const handleCustomAmountToggle = () => {
    setShowCustomAmount(true)
    setAmount(0)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (amount <= 0) {
      onError?.('Please enter a valid amount')
      return
    }
    
    try {
      // Generate payment token (in real implementation, this would come from a payment form)
      const token = await generatePaymentToken()
      setPaymentToken(token)
      
      // Process the donation
      const result = await processDonation({
        amount,
        musicianId,
        fanId: user?.id,
        showId,
        songId,
        message,
        paymentMethodToken: token
      })
      
      if (result.success && result.donation) {
        onSuccess?.(result.donation)
        // Reset form
        setAmount(5)
        setMessage('')
        setShowCustomAmount(false)
      } else {
        onError?.(result.error?.toString() || 'Failed to process donation')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      onError?.(errorMessage)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Support this artist</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Amount
          </label>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className={`py-3 px-4 rounded-md border ${
                  amount === amt && !showCustomAmount
                    ? 'bg-purple-100 border-purple-500 text-purple-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleAmountSelect(amt)}
              >
                ${amt}
              </button>
            ))}
          </div>
          
          <button
            type="button"
            className={`text-sm text-purple-600 hover:text-purple-800 mb-4 ${
              showCustomAmount ? 'font-bold' : ''
            }`}
            onClick={handleCustomAmountToggle}
          >
            Enter custom amount
          </button>
          
          {showCustomAmount && (
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount || ''}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            rows={3}
            placeholder="Add a message of support..."
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || amount <= 0}
          className={`w-full py-3 px-4 rounded-md font-medium text-white ${
            loading
              ? 'bg-purple-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {loading ? 'Processing...' : `Donate $${amount.toFixed(2)}`}
        </button>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          80% goes directly to the artist. 5% supports our affiliate program.
        </p>
      </form>
    </div>
  )
}
