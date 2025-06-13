import { CheckCircle } from 'lucide-react'

export function VenueBenefits() {
  const benefits = [
    {
      title: "Increased Revenue",
      description: "Venues partnered with TrueFans see an average 15% increase in ticket sales and 22% increase in bar revenue on nights featuring TrueFans artists.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Simplified Booking Process",
      description: "Our streamlined booking platform connects you directly with pre-vetted artists, reducing the time and effort spent on finding and scheduling talent.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Expanded Audience Reach",
      description: "Tap into TrueFans' growing community of music enthusiasts who actively seek out venues featuring their favorite artists.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Enhanced Venue Profile",
      description: "Showcase your venue to thousands of artists and fans with a customized profile highlighting your unique features and amenities.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Reduced No-Shows",
      description: "Our integrated ticketing system with automated reminders has shown to reduce artist and attendee no-shows by up to 35%.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Data-Driven Insights",
      description: "Access detailed analytics on attendance, demographics, and revenue to optimize your booking strategy and maximize profitability.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Marketing Support",
      description: "Benefit from TrueFans' promotional tools, including social media integration, email marketing, and targeted advertising to local music fans.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Quality Assurance",
      description: "All TrueFans artists undergo a vetting process, ensuring you book reliable, professional performers who deliver quality entertainment.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Flexible Payment Options",
      description: "Choose from various payment models including fixed fees, percentage splits, or hybrid arrangements that work best for your venue.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      title: "Dedicated Support",
      description: "Access our venue success team for personalized assistance with bookings, technical issues, or any questions that arise.",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    }
  ]

  const testimonials = [
    {
      quote: "Since partnering with TrueFans, we've seen a 30% increase in our weeknight attendance. The quality of artists and the streamlined booking process has been a game-changer for our venue.",
      author: "Michael Rodriguez",
      position: "Owner, The Sound Garden",
      venue: "Portland, OR"
    },
    {
      quote: "The analytics dashboard alone is worth the partnership. We've been able to identify our most profitable nights and adjust our strategy accordingly, resulting in a significant boost to our bottom line.",
      author: "Sarah Johnson",
      position: "Manager, Electric Avenue",
      venue: "Miami, FL"
    },
    {
      quote: "As a small jazz club, finding the right talent was always challenging. TrueFans has connected us with amazing artists who perfectly match our venue's vibe and have helped us build a loyal customer base.",
      author: "Robert Williams",
      position: "Proprietor, Jazz Corner",
      venue: "New Orleans, LA"
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Venue Benefits</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Partner with TrueFans to transform your venue into a thriving hub for music discovery and artist development.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Venues Choose TrueFans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-purple-700 text-white p-6">
              <h2 className="text-2xl font-bold">Calculate Your Potential ROI</h2>
              <p className="mt-2">See how partnering with TrueFans can impact your venue's bottom line</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Input Your Venue Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Average Shows Per Month
                      </label>
                      <input 
                        type="number" 
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="8"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Average Attendance Per Show
                      </label>
                      <input 
                        type="number" 
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="75"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Average Revenue Per Attendee ($)
                      </label>
                      <input 
                        type="number" 
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="35"
                      />
                    </div>
                    
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                      Calculate Potential
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Potential Results</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">$21,000</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Projected Monthly Revenue with TrueFans</p>
                      <p className="text-2xl font-bold text-green-600">$24,150</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">Potential Annual Increase</p>
                      <p className="text-3xl font-bold text-green-600">$37,800</p>
                    </div>
                    
                    <p className="text-xs text-gray-500 italic">
                      *Projections based on average performance data from existing TrueFans venue partners. Individual results may vary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Venue Partners Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex-1">
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.position}</p>
                  <p className="text-gray-500">{testimonial.venue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Venue?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join hundreds of successful venues already partnering with TrueFans to increase revenue, streamline operations, and discover amazing talent.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/venues" 
                className="bg-white text-purple-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Sign Up Now
              </a>
              <a 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
