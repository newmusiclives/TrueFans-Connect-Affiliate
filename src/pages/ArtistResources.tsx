import { Link } from 'react-router-dom'
import { BookOpen, Download, FileText, Video, Music, Lightbulb, DollarSign, Share2 } from 'lucide-react'

export function ArtistResources() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Artist Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to succeed on TrueFans and beyond. Grow your fanbase, 
            increase your revenue, and take your music career to the next level.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Getting Started */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold">Getting Started</h2>
            </div>
            <p className="text-gray-300 mb-4">
              New to TrueFans? Learn how to set up your profile, upload music, and start building your fanbase.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Complete Profile Guide</span>
              </li>
              <li className="flex items-center">
                <Video className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Platform Walkthrough Video</span>
              </li>
              <li className="flex items-center">
                <Music className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Music Upload Best Practices</span>
              </li>
            </ul>
          </div>

          {/* Growth Strategies */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-8 w-8 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold">Growth Strategies</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Proven tactics to grow your audience and build a loyal fanbase that supports your music.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Fan Engagement Playbook</span>
              </li>
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Social Media Cross-Promotion</span>
              </li>
              <li className="flex items-center">
                <Video className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Building Your Brand Workshop</span>
              </li>
            </ul>
          </div>

          {/* Monetization */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="flex items-center mb-4">
              <DollarSign className="h-8 w-8 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold">Monetization</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Turn your passion into profit with our innovative affiliate system and fan support tools.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Affiliate System Explained</span>
              </li>
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Pricing Your Music & Merch</span>
              </li>
              <li className="flex items-center">
                <Video className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Revenue Maximization Strategies</span>
              </li>
            </ul>
          </div>

          {/* Promotion */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="flex items-center mb-4">
              <Share2 className="h-8 w-8 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold">Promotion</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Get your music heard by more people with our promotion tools and strategies.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Release Promotion Checklist</span>
              </li>
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Email Marketing Templates</span>
              </li>
              <li className="flex items-center">
                <Video className="h-4 w-4 text-indigo-400 mr-2" />
                <span>TrueFans Algorithm Deep Dive</span>
              </li>
            </ul>
          </div>

          {/* Legal & Rights */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold">Legal & Rights</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Protect your music and understand your rights as an artist on our platform.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Copyright Basics Guide</span>
              </li>
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Licensing Your Music</span>
              </li>
              <li className="flex items-center">
                <Download className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Sample Contract Templates</span>
              </li>
            </ul>
          </div>

          {/* Technical Help */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all">
            <div className="flex items-center mb-4">
              <Download className="h-8 w-8 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold">Technical Help</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Get technical support and learn how to make the most of TrueFans' features.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Audio Quality Guidelines</span>
              </li>
              <li className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Profile Optimization Tips</span>
              </li>
              <li className="flex items-center">
                <Video className="h-4 w-4 text-indigo-400 mr-2" />
                <span>Troubleshooting Common Issues</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">The Complete TrueFans Artist Playbook</h3>
              <p className="text-gray-300 mb-6">
                Our comprehensive guide to succeeding on TrueFans. From setting up your profile to 
                maximizing your revenue through our affiliate system.
              </p>
              <button className="bg-white text-indigo-900 font-bold py-3 px-6 rounded-lg hover:bg-indigo-100 transition-colors flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download PDF (4.2MB)
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Artist Success Webinar Series</h3>
              <p className="text-gray-300 mb-6">
                Join our weekly webinars featuring successful TrueFans artists sharing their strategies,
                tips, and answering your questions live.
              </p>
              <button className="bg-white text-indigo-900 font-bold py-3 px-6 rounded-lg hover:bg-indigo-100 transition-colors flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Register for Free
              </button>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Need Personalized Help?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our artist support team is here to help you succeed. Reach out with any questions or 
            schedule a one-on-one consultation to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
              Contact Support
            </Link>
            <Link to="/artist-consultation" className="bg-transparent border border-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-900 transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
