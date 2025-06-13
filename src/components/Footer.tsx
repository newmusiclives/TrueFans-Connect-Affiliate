import { Link } from 'react-router-dom'
import { Music, Users, Building, Heart, Info } from 'lucide-react'

export function Footer() {
  const handleScrollToTop = () => {
    // Scroll to top when clicking links
    window.scrollTo(0, 0)
  }

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">TrueFans</h2>
            <p className="text-primary-100">
              The revolutionary music platform where success spreads like wildfire through our 2-tier affiliate system.
            </p>
            <div className="mt-4 flex items-center">
              <Heart className="h-5 w-5 text-accent-500 mr-2" />
              <span className="text-primary-200">Made with love for musicians</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Artists</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/signup?type=artist" 
                  className="text-primary-200 hover:text-white flex items-center"
                  onClick={handleScrollToTop}
                >
                  <Music className="h-4 w-4 mr-2" />
                  Artist Signup
                </Link>
              </li>
              <li>
                <Link 
                  to="/artist-resources" 
                  className="text-primary-200 hover:text-white"
                  onClick={handleScrollToTop}
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/success-stories" 
                  className="text-primary-200 hover:text-white"
                  onClick={handleScrollToTop}
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link 
                  to="/artist-faq" 
                  className="text-primary-200 hover:text-white"
                  onClick={handleScrollToTop}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Fans</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/signup?type=fan" 
                  className="text-primary-200 hover:text-white flex items-center"
                  onClick={handleScrollToTop}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Fan Signup
                </Link>
              </li>
              <li>
                <Link 
                  to="/artists" 
                  className="text-primary-200 hover:text-white"
                  onClick={handleScrollToTop}
                >
                  Discover Artists
                </Link>
              </li>
              <li>
                <Link 
                  to="/fan-faq" 
                  className="text-primary-200 hover:text-white"
                  onClick={handleScrollToTop}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Venues</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/venues" className="text-primary-200 hover:text-white flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Venue Signup
                </Link>
              </li>
              <li>
                <Link to="/venue-benefits" className="text-primary-200 hover:text-white">
                  Benefits
                </Link>
              </li>
              <li>
                <Link to="/venue-resources" className="text-primary-200 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/venue-faq" className="text-primary-200 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/our-story" className="text-primary-200 hover:text-white flex items-center" onClick={handleScrollToTop}>
                  <Info className="h-4 w-4 mr-2" />
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-primary-200 hover:text-white" onClick={handleScrollToTop}>
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white" onClick={handleScrollToTop}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/affiliate-program" className="text-primary-200 hover:text-white" onClick={handleScrollToTop}>
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-200 hover:text-white" onClick={handleScrollToTop}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-200 hover:text-white" onClick={handleScrollToTop}>
                  Privacy & Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-200 text-sm">
            <div>© TrueFans Connect is a subsidiary of New Music Lives.</div>
            <div>Owned and operated by Lightwork Digital. © 2025 New Music Lives. All Rights Reserved.</div>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link to="/terms" className="text-primary-200 hover:text-white text-sm">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-200 hover:text-white text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
