import { useState } from 'react'
import { PaymentHistory } from '@/components/payment/PaymentHistory'
import { AffiliateStats } from '@/components/payment/AffiliateStats'

export function ProfileDonations() {
  const [activeTab, setActiveTab] = useState<'history' | 'affiliate'>('history')
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Financial Activity</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment History
            </button>
            <button
              onClick={() => setActiveTab('affiliate')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'affiliate'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Affiliate Program
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'history' && <PaymentHistory />}
      {activeTab === 'affiliate' && <AffiliateStats />}
    </div>
  )
}
