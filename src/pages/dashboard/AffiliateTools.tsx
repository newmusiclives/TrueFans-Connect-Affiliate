import { useState } from 'react'
import { Copy, Check, Share2, Twitter, Facebook, Mail, Link as LinkIcon } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function AffiliateTools() {
  const { profile } = useAuth()
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('link')
  
  if (!profile) return null
  
  const affiliateLink = `${window.location.origin}/signup?ref=${profile.affiliate_code}`
  
  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Support your favorite musicians and earn rewards with TrueFans! Sign up using my link: ${affiliateLink}`)}`
  
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}`
  
  const emailShareUrl = `mailto:?subject=${encodeURIComponent('Join TrueFans - Support Musicians & Earn Rewards')}&body=${encodeURIComponent(`Hey,\n\nI thought you might be interested in TrueFans, a platform where you can support your favorite musicians directly and earn rewards for sharing.\n\nSign up using my link: ${affiliateLink}\n\nThanks!`)}`

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Affiliate Tools</h1>
        
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-6 text-white mb-8">
          <div className="flex items-center mb-4">
            <Share2 className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">Your Affiliate Link</h2>
          </div>
          <p className="mb-4 text-white/90">
            Share this link to earn 2.5% commission on all donations made by users you refer!
          </p>
          <div className="flex items-center">
            <div className="bg-white/20 rounded-l-lg py-2 px-4 flex-grow overflow-x-auto whitespace-nowrap">
              <code className="text-white">{affiliateLink}</code>
            </div>
            <button
              onClick={handleCopy}
              className="bg-white text-primary-600 hover:bg-gray-100 py-2 px-4 rounded-r-lg flex items-center transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('link')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'link'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Share Link
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'social'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Social Media
              </button>
              <button
                onClick={() => setActiveTab('embed')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'embed'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Embed Codes
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === 'link' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Share your unique affiliate link via email, messaging apps, or anywhere else to start earning commissions.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                    Share on Twitter
                  </a>
                  
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Facebook className="h-4 w-4 mr-2 text-[#4267B2]" />
                    Share on Facebook
                  </a>
                  
                  <a
                    href={emailShareUrl}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    Share via Email
                  </a>
                </div>
              </div>
            )}
            
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sample Posts</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 mb-2">
                      🎵 Support your favorite musicians directly and earn rewards with TrueFans! Use my link to sign up: {affiliateLink} #MusicCommunity #SupportArtists
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`🎵 Support your favorite musicians directly and earn rewards with TrueFans! Use my link to sign up: ${affiliateLink} #MusicCommunity #SupportArtists`)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="text-primary-600 text-sm font-medium flex items-center"
                    >
                      {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                      {copied ? 'Copied' : 'Copy text'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">#TrueFans</span>
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">#SupportArtists</span>
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">#MusicCommunity</span>
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">#IndieMusic</span>
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">#MusicLovers</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'embed' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">HTML Button</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-2">
                    <pre className="text-sm text-gray-700 overflow-x-auto">
                      {`<a href="${affiliateLink}" target="_blank" style="display:inline-block;background:#8b5cf6;color:white;font-weight:600;padding:8px 16px;border-radius:4px;text-decoration:none;">Join TrueFans</a>`}
                    </pre>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`<a href="${affiliateLink}" target="_blank" style="display:inline-block;background:#8b5cf6;color:white;font-weight:600;padding:8px 16px;border-radius:4px;text-decoration:none;">Join TrueFans</a>`)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="text-primary-600 text-sm font-medium flex items-center mt-2"
                    >
                      {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                      {copied ? 'Copied' : 'Copy code'}
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <a 
                      href={affiliateLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-primary-600 text-white font-semibold px-4 py-2 rounded-md"
                    >
                      Join TrueFans
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Text Link</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="text-sm text-gray-700 overflow-x-auto">
                      {`<a href="${affiliateLink}" target="_blank">Support musicians and earn rewards with TrueFans</a>`}
                    </pre>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`<a href="${affiliateLink}" target="_blank">Support musicians and earn rewards with TrueFans</a>`)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="text-primary-600 text-sm font-medium flex items-center mt-2"
                    >
                      {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                      {copied ? 'Copied' : 'Copy code'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 flex items-center mb-2">
            <LinkIcon className="h-4 w-4 mr-1 text-primary-600" />
            Your Affiliate Stats
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Track the performance of your affiliate links and see how much you've earned.
          </p>
          <a href="/dashboard/referrals" className="text-primary-600 text-sm font-medium">
            View detailed statistics →
          </a>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Affiliate Tips</h2>
        <ul className="space-y-3">
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium text-xs mr-3 mt-0.5">
              1
            </div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Be authentic:</span> Share why you love TrueFans with your audience.
            </p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium text-xs mr-3 mt-0.5">
              2
            </div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Target music lovers:</span> Focus on people who are passionate about supporting artists.
            </p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium text-xs mr-3 mt-0.5">
              3
            </div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Use multiple channels:</span> Share your link on social media, email, and your website.
            </p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium text-xs mr-3 mt-0.5">
              4
            </div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Highlight the benefits:</span> Explain how TrueFans helps both artists and fans.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
