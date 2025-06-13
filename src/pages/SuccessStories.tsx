import { Star, Music, DollarSign, Users, TrendingUp } from 'lucide-react'

export function SuccessStories() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Artist Success Stories</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real artists. Real results. Discover how musicians like you are using TrueFans to grow their audience,
            increase their income, and take control of their careers.
          </p>
        </div>

        {/* Featured Success Story */}
        <div className="mb-20">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 z-10"></div>
            <img 
              src="https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg" 
              alt="Sarah James performing on stage" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <h2 className="text-4xl font-bold mb-4">Sarah James: From Local Gigs to National Tour</h2>
                <p className="text-xl mb-6">
                  "TrueFans completely transformed my career. The affiliate system helped me grow my audience 
                  exponentially, and I've increased my monthly income by 400%. I'm now able to tour nationally 
                  and connect with fans I never would have reached otherwise."
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                    <Users className="h-5 w-5 text-indigo-400 mr-2" />
                    <span>Fanbase: 25,000+</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                    <DollarSign className="h-5 w-5 text-indigo-400 mr-2" />
                    <span>Monthly Revenue: $8,500</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                    <TrendingUp className="h-5 w-5 text-indigo-400 mr-2" />
                    <span>Growth: 400% in 12 months</span>
                  </div>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Read Sarah's Full Story
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Success Story 1 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1327430/pexels-photo-1327430.jpeg" 
                alt="Marcus Lee performing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Music className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-400">Indie Rock</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Marcus Lee</h3>
              <p className="text-gray-300 mb-4">
                "I was struggling to make ends meet before TrueFans. Now my music supports me full-time, 
                and I've built a community that truly values my work."
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">400% Revenue Increase</div>
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">12,000+ Fans</div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Read Story
              </button>
            </div>
          </div>

          {/* Success Story 2 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg" 
                alt="Elena Vega performing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Music className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-400">Electronic</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Elena Vega</h3>
              <p className="text-gray-300 mb-4">
                "The affiliate system is genius. My fans are now my marketing team, and we all benefit. 
                My income has tripled in just 6 months."
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">300% Revenue Increase</div>
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">8,500+ Fans</div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Read Story
              </button>
            </div>
          </div>

          {/* Success Story 3 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg" 
                alt="The Resonants band" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Music className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-400">Folk Band</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">The Resonants</h3>
              <p className="text-gray-300 mb-4">
                "As a band, we were skeptical at first, but TrueFans has become our primary income source. 
                We've funded our last two albums entirely through the platform."
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">$45K Album Funding</div>
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">15,000+ Fans</div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Read Story
              </button>
            </div>
          </div>

          {/* Success Story 4 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg" 
                alt="DJ Pulse performing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Music className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-400">DJ / Producer</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">DJ Pulse</h3>
              <p className="text-gray-300 mb-4">
                "TrueFans helped me turn my weekend hobby into my main career. I've connected with fans 
                worldwide and now play international festivals."
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">Global Audience</div>
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">$6K Monthly Income</div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Read Story
              </button>
            </div>
          </div>

          {/* Success Story 5 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg" 
                alt="Luna Ray performing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Music className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-400">Singer-Songwriter</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Luna Ray</h3>
              <p className="text-gray-300 mb-4">
                "I was about to give up on music before finding TrueFans. Now I have a sustainable 
                career and the creative freedom I always dreamed of."
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">Quit Day Job</div>
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">7,500+ Fans</div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Read Story
              </button>
            </div>
          </div>

          {/* Success Story 6 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" 
                alt="Rhythm Collective band" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Music className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-400">Jazz Ensemble</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Rhythm Collective</h3>
              <p className="text-gray-300 mb-4">
                "As a niche jazz group, we struggled to find our audience. TrueFans connected us with jazz 
                lovers worldwide who are willing to support our music."
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">Niche Success</div>
                <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">5,000+ Dedicated Fans</div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Read Story
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">TrueFans By The Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">$4.2M+</div>
              <div className="text-xl text-indigo-200">Paid to Artists</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">12,500+</div>
              <div className="text-xl text-indigo-200">Active Artists</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">320%</div>
              <div className="text-xl text-indigo-200">Avg. Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">80%</div>
              <div className="text-xl text-indigo-200">Artist Commission</div>
            </div>
          </div>
        </div>

        {/* Join CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of artists who are taking control of their music careers with TrueFans.
            Our platform is designed to help you succeed.
          </p>
          <a 
            href="/signup?type=artist" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors inline-block"
            onClick={() => window.scrollTo(0, 0)}
          >
            Start Your TrueFans Journey
          </a>
        </div>
      </div>
    </div>
  )
}
