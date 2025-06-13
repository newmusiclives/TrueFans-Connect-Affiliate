import { Link } from 'react-router-dom'
import { Music, Users, Building, ArrowRight, Star, DollarSign, Share2, Headphones, Ticket, Award } from 'lucide-react'

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Right Money Now and Fans Forever
              </h1>
              <p className="text-xl text-primary-100">
                Join the revolutionary music platform where success spreads like wildfire through our 2-tier affiliate system.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="btn bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg">
                  Join TrueFans
                </Link>
                <Link to="/how-it-works" className="btn bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg">
                  How It Works
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-500 rounded-full opacity-30 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary-500 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <Music className="w-8 h-8 text-accent-400 mb-2" />
                    <h3 className="font-semibold">Artists</h3>
                    <p className="text-sm text-primary-100">Receive 80% of all donations</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Users className="w-8 h-8 text-secondary-400 mb-2" />
                    <h3 className="font-semibold">Fans</h3>
                    <p className="text-sm text-primary-100">Earn 2.5% commission</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Building className="w-8 h-8 text-primary-400 mb-2" />
                    <h3 className="font-semibold">Venues</h3>
                    <p className="text-sm text-primary-100">Earn 2.5% commission</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <DollarSign className="w-8 h-8 text-green-400 mb-2" />
                    <h3 className="font-semibold">Platform</h3>
                    <p className="text-sm text-primary-100">Only 15% fee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How TrueFans Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our 2-tier affiliate system creates a powerful network effect that benefits everyone in the music ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Headphones className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Artists</h3>
              <p className="text-gray-600 mb-4">
                Create your profile, share your music, and receive direct support from fans. Keep 80% of all donations.
              </p>
              <Link to="/how-it-works" className="text-primary-600 font-medium flex items-center justify-center">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Fans</h3>
              <p className="text-gray-600 mb-4">
                Support your favorite artists directly and earn 2.5% commission when you refer others to the platform.
              </p>
              <Link to="/how-it-works" className="text-secondary-600 font-medium flex items-center justify-center">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Ticket className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Venues</h3>
              <p className="text-gray-600 mb-4">
                Become a talent scout and earn 2.5% commission on donations to artists you've helped discover.
              </p>
              <Link to="/how-it-works" className="text-accent-600 font-medium flex items-center justify-center">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose TrueFans</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We're building a sustainable ecosystem where everyone benefits from the success of artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Fair Revenue Split</h3>
                <p className="mt-2 text-gray-600">
                  Artists receive 80% of all donations, while affiliates earn 5% combined commission.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <Share2 className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">2-Tier Affiliate System</h3>
                <p className="mt-2 text-gray-600">
                  Earn from your direct referrals and from the people they refer, creating a powerful network effect.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <Star className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Community-Driven</h3>
                <p className="mt-2 text-gray-600">
                  Our platform is built on the principle that when artists succeed, everyone in their community benefits.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <Music className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Spotify Integration</h3>
                <p className="mt-2 text-gray-600">
                  Connect your Spotify account to showcase your music and reach more fans.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <Building className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Venue Partnerships</h3>
                <p className="mt-2 text-gray-600">
                  Venues can promote artists and earn commission, creating a win-win relationship.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Fan Engagement</h3>
                <p className="mt-2 text-gray-600">
                  Fans can directly support their favorite artists and be rewarded for spreading the word.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Join the Revolution?</h2>
            <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
              Sign up today and become part of the music ecosystem that rewards everyone fairly.
            </p>
            <div className="mt-8">
              <Link to="/signup" className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
