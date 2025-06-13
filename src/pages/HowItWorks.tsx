import { Link } from 'react-router-dom'
import { Music, Users, Building, ArrowRight, Share2, DollarSign, Star, Zap, Heart } from 'lucide-react'

export function HowItWorks() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How TrueFans Works</h1>
            <p className="text-xl text-primary-100 mb-8">
              Our revolutionary 2-tier affiliate system creates a powerful network effect that benefits everyone in the music ecosystem.
            </p>
            <div className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm">
              <Zap className="w-5 h-5 mr-2 text-accent-400" />
              <span className="text-lg font-medium">80% to Artists • 5% to Affiliates • 15% Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* For Artists Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-6">
                <Music className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">For Artists</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 mt-1 mr-4">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                    <p className="text-gray-600">
                      Sign up and create your artist profile. Connect your Spotify account to automatically import your music and shows.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 mt-1 mr-4">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Share Your QR Code</h3>
                    <p className="text-gray-600">
                      Generate unique QR codes for your shows and songs. Display them at venues, on merchandise, or share them online.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 mt-1 mr-4">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Receive Direct Support</h3>
                    <p className="text-gray-600">
                      Fans can scan your QR code to send you direct financial support. You keep 80% of all donations.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 mt-1 mr-4">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Build Your Network</h3>
                    <p className="text-gray-600">
                      Grow your fan base and connect with venues. The more people in your network, the more support you'll receive.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/signup?type=artist" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700">
                  Sign up as an artist <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-500 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary-500 rounded-full opacity-20 animate-pulse-slow"></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Artist Benefits</h3>
                  <p className="text-primary-100">Keep more of what you earn with our fair revenue model</p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-start">
                    <DollarSign className="w-5 h-5 text-green-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">80% Revenue Share</h4>
                      <p className="text-gray-600 text-sm">You keep 80% of all donations, significantly higher than industry standards.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Share2 className="w-5 h-5 text-green-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Affiliate Network</h4>
                      <p className="text-gray-600 text-sm">Fans and venues are incentivized to promote your music through our affiliate system.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-green-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Direct Fan Connection</h4>
                      <p className="text-gray-600 text-sm">Build meaningful relationships with your supporters without intermediaries.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Star className="w-5 h-5 text-green-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Full Ownership</h4>
                      <p className="text-gray-600 text-sm">Maintain 100% ownership of your music and creative control.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Fans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary-500 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-500 rounded-full opacity-20 animate-pulse-slow"></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Fan Benefits</h3>
                  <p className="text-secondary-100">Support artists you love and earn rewards</p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-start">
                    <Heart className="w-5 h-5 text-pink-500 mt-1 mr-3" fill="currentColor" />
                    <div>
                      <h4 className="font-semibold">Direct Impact</h4>
                      <p className="text-gray-600 text-sm">Your support goes directly to the artists you love, helping them create more music.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <DollarSign className="w-5 h-5 text-pink-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Earn Commissions</h4>
                      <p className="text-gray-600 text-sm">Receive 2.5% commission when you refer others to the platform or to specific artists.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Share2 className="w-5 h-5 text-pink-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Two-Tier Rewards</h4>
                      <p className="text-gray-600 text-sm">Earn from your direct referrals and from the people they refer, creating a network effect.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Star className="w-5 h-5 text-pink-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Exclusive Content</h4>
                      <p className="text-gray-600 text-sm">Get access to special content and experiences from your favorite artists.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-full mb-6">
                <Users className="w-6 h-6 text-secondary-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">For Fans</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 mt-1 mr-4">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                    <p className="text-gray-600">
                      Sign up for TrueFans to start supporting your favorite artists and earning rewards.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 mt-1 mr-4">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Support Artists</h3>
                    <p className="text-gray-600">
                      Scan QR codes at shows or on songs to send direct financial support to musicians you love.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 mt-1 mr-4">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Share Your Link</h3>
                    <p className="text-gray-600">
                      Get your unique affiliate link and share it with friends. When they sign up or donate, you earn commission.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 mt-1 mr-4">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                    <p className="text-gray-600">
                      Receive 2.5% commission on donations made through your referrals, plus 2.5% on their referrals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/signup?type=fan" className="inline-flex items-center text-secondary-600 font-semibold hover:text-secondary-700">
                  Sign up as a fan <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Venues Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full mb-6">
                <Building className="w-6 h-6 text-accent-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">For Venues</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-600 mt-1 mr-4">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Register Your Venue</h3>
                    <p className="text-gray-600">
                      Create a venue profile on TrueFans to start hosting and promoting artists.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-600 mt-1 mr-4">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Host Musicians</h3>
                    <p className="text-gray-600">
                      Book TrueFans artists for your venue and help promote their shows.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-600 mt-1 mr-4">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Display QR Codes</h3>
                    <p className="text-gray-600">
                      Place artist QR codes around your venue to encourage fan support during shows.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-600 mt-1 mr-4">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Earn Commission</h3>
                    <p className="text-gray-600">
                      Receive 2.5% commission on all donations made to artists you've helped discover and promote.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/signup?type=venue" className="inline-flex items-center text-accent-600 font-semibold hover:text-accent-700">
                  Sign up as a venue <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-500 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-500 rounded-full opacity-20 animate-pulse-slow"></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-accent-600 to-accent-700 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Venue Benefits</h3>
                  <p className="text-accent-100">Become a talent scout and earn while supporting artists</p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-start">
                    <DollarSign className="w-5 h-5 text-accent-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Additional Revenue</h4>
                      <p className="text-gray-600 text-sm">Earn 2.5% commission on donations to artists you've helped discover.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-accent-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Attract More Fans</h4>
                      <p className="text-gray-600 text-sm">TrueFans artists bring their dedicated fan base to your venue.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Music className="w-5 h-5 text-accent-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Discover Talent</h4>
                      <p className="text-gray-600 text-sm">Find and support emerging artists before they become mainstream.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Star className="w-5 h-5 text-accent-500 mt-1 mr-3" />
                    <div>
                      <h4 className="font-semibold">Community Building</h4>
                      <p className="text-gray-600 text-sm">Become a hub for the local music community and culture.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate System Explained */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our 2-Tier Affiliate System Explained</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TrueFans creates a powerful network effect through our unique affiliate structure that rewards everyone in the music ecosystem.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-4 text-lg font-medium text-gray-900">How It Works</span>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tier 1: Direct Referrals</h3>
              <p className="text-gray-600 mb-4">
                When you refer someone to TrueFans (either a fan, artist, or venue), you earn 2.5% commission on all donations they make or receive.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">Your Commission</span>
                  <span className="font-semibold text-purple-900">2.5%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tier 2: Indirect Referrals</h3>
              <p className="text-gray-600 mb-4">
                You also earn 2.5% commission on donations made or received by people referred by your direct referrals, creating a powerful network effect.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">Your Commission</span>
                  <span className="font-semibold text-purple-900">2.5%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Revenue Distribution</h3>
              <p className="text-gray-600 mb-4">
                For each donation, the artist receives 80%, affiliates receive up to 5% combined, and the platform takes only 15%.
              </p>
              <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">Artist</span>
                  <span className="font-semibold text-purple-900">80%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">Affiliates (Tier 1 + 2)</span>
                  <span className="font-semibold text-purple-900">5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">Platform</span>
                  <span className="font-semibold text-purple-900">15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about TrueFans and how our platform works.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">How do artists get paid?</h3>
              <p className="text-gray-600">
                Artists receive 80% of all donations made to them. Payments are processed through our secure financial partner, Manifest, and deposited directly to the artist's connected bank account.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">How do I earn affiliate commissions?</h3>
              <p className="text-gray-600">
                Share your unique affiliate link with others. When they sign up and make or receive donations, you earn 2.5% commission. You also earn 2.5% from people they refer, creating a two-tier reward system.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Is there a minimum payout threshold?</h3>
              <p className="text-gray-600">
                Yes, the minimum payout threshold is $20. Once your earnings reach this amount, they will be automatically transferred to your connected bank account during the next payment cycle.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Can I use TrueFans if I'm not in the US?</h3>
              <p className="text-gray-600">
                Yes! TrueFans is available worldwide. However, payment methods and processing times may vary depending on your country. Check our international support page for specific details.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">How do QR codes work?</h3>
              <p className="text-gray-600">
                Artists and venues can generate unique QR codes for shows, songs, or general support. Fans can scan these codes with their phone camera, which takes them directly to a donation page for that specific artist or event.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">What makes TrueFans different from other platforms?</h3>
              <p className="text-gray-600">
                TrueFans is the only platform with a two-tier affiliate system that rewards everyone in the music ecosystem. We offer higher payouts to artists (80% vs. the industry standard of 55-70%) and create a network effect that benefits fans and venues too.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Revolution?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Sign up today and become part of the music ecosystem that rewards everyone fairly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup?type=artist" className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg">
                Join as Artist
              </Link>
              <Link to="/signup?type=fan" className="btn bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg">
                Join as Fan
              </Link>
              <Link to="/signup?type=venue" className="btn bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg">
                Join as Venue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
