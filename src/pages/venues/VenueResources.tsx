import { Download, FileText, Video, Book, Calendar, Users, Link, ChevronRight } from 'lucide-react'

export function VenueResources() {
  const resources = [
    {
      category: "Guides & Templates",
      items: [
        {
          title: "Venue Optimization Guide",
          description: "Learn how to maximize your space, improve acoustics, and create the optimal environment for live music.",
          icon: <FileText className="h-6 w-6 text-purple-600" />,
          link: "#",
          type: "PDF",
          size: "4.2 MB"
        },
        {
          title: "Artist Contract Template",
          description: "A legally-reviewed template for booking agreements between venues and performers.",
          icon: <FileText className="h-6 w-6 text-purple-600" />,
          link: "#",
          type: "DOCX",
          size: "320 KB"
        },
        {
          title: "Promotional Calendar Template",
          description: "Plan and track your marketing efforts for upcoming shows with this comprehensive calendar.",
          icon: <Calendar className="h-6 w-6 text-purple-600" />,
          link: "#",
          type: "XLSX",
          size: "1.8 MB"
        },
        {
          title: "Sound Equipment Checklist",
          description: "Ensure you have all the necessary equipment for different types of performances.",
          icon: <FileText className="h-6 w-6 text-purple-600" />,
          link: "#",
          type: "PDF",
          size: "2.1 MB"
        }
      ]
    },
    {
      category: "Video Tutorials",
      items: [
        {
          title: "TrueFans Platform Walkthrough",
          description: "A comprehensive guide to using all features of the TrueFans venue dashboard.",
          icon: <Video className="h-6 w-6 text-purple-600" />,
          link: "#",
          duration: "18:24"
        },
        {
          title: "Effective Artist Outreach",
          description: "Strategies for connecting with and booking the right artists for your venue.",
          icon: <Video className="h-6 w-6 text-purple-600" />,
          link: "#",
          duration: "12:37"
        },
        {
          title: "Maximizing Show Attendance",
          description: "Proven techniques to fill your venue and create a vibrant atmosphere.",
          icon: <Video className="h-6 w-6 text-purple-600" />,
          link: "#",
          duration: "15:52"
        },
        {
          title: "Setting Up Your Submission Form",
          description: "Step-by-step guide to creating and embedding your artist submission form.",
          icon: <Video className="h-6 w-6 text-purple-600" />,
          link: "#",
          duration: "8:45"
        }
      ]
    },
    {
      category: "Industry Reports",
      items: [
        {
          title: "Live Music Trends 2023",
          description: "Comprehensive analysis of current trends in the live music industry.",
          icon: <Book className="h-6 w-6 text-purple-600" />,
          link: "#",
          type: "PDF",
          size: "8.7 MB"
        },
        {
          title: "Post-Pandemic Venue Recovery",
          description: "Strategies and case studies for venues rebuilding after COVID-19 disruptions.",
          icon: <Book className="h-6 w-6 text-purple-600" />,
          link: "#",
          type: "PDF",
          size: "6.3 MB"
        },
        {
          title: "Music Genre Popularity by Region",
          description: "Data-driven insights into which genres perform best in different geographic areas.",
          icon: <Book className="h-6 w-6 text-purple-600" />,
          link: "#",
          type: "PDF",
          size: "5.1 MB"
        }
      ]
    },
    {
      category: "Webinars & Events",
      items: [
        {
          title: "Quarterly Venue Success Webinar",
          description: "Join our experts for tips, strategies, and Q&A sessions focused on venue success.",
          icon: <Users className="h-6 w-6 text-purple-600" />,
          link: "#",
          date: "Next: June 15, 2023"
        },
        {
          title: "Venue Tech Innovation Summit",
          description: "Annual virtual conference showcasing the latest technologies for music venues.",
          icon: <Users className="h-6 w-6 text-purple-600" />,
          link: "#",
          date: "September 22-23, 2023"
        },
        {
          title: "Regional Networking Events",
          description: "Connect with other venue owners and industry professionals in your area.",
          icon: <Users className="h-6 w-6 text-purple-600" />,
          link: "#",
          date: "Various dates"
        }
      ]
    },
    {
      category: "Partner Resources",
      items: [
        {
          title: "Sound Equipment Discounts",
          description: "Exclusive deals on professional audio equipment through our partners.",
          icon: <Link className="h-6 w-6 text-purple-600" />,
          link: "#"
        },
        {
          title: "Ticketing Integration Guide",
          description: "Connect TrueFans with popular ticketing platforms for seamless operations.",
          icon: <Link className="h-6 w-6 text-purple-600" />,
          link: "#"
        },
        {
          title: "Insurance Provider Directory",
          description: "Vetted insurance providers specializing in music venue coverage.",
          icon: <Link className="h-6 w-6 text-purple-600" />,
          link: "#"
        },
        {
          title: "Marketing Agency Network",
          description: "Connect with agencies experienced in promoting music venues and events.",
          icon: <Link className="h-6 w-6 text-purple-600" />,
          link: "#"
        }
      ]
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Venue Resources</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Access exclusive tools, guides, and industry insights to help your venue thrive in the music ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Resources Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-purple-100 flex items-center justify-center">
                <FileText className="h-16 w-16 text-purple-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2023 Venue Success Playbook</h3>
                <p className="text-gray-600 mb-4">
                  Our comprehensive guide to running a profitable and vibrant music venue in today's market.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800"
                >
                  Download Now
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-indigo-100 flex items-center justify-center">
                <Video className="h-16 w-16 text-indigo-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Venue Marketing Masterclass</h3>
                <p className="text-gray-600 mb-4">
                  A 5-part video series on effective marketing strategies specifically for music venues.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800"
                >
                  Watch Series
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-pink-100 flex items-center justify-center">
                <Calendar className="h-16 w-16 text-pink-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Calendar Template</h3>
                <p className="text-gray-600 mb-4">
                  Streamline your booking process with our customizable calendar and management system.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800"
                >
                  Get Template
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resource Categories */}
        {resources.map((category, index) => (
          <div key={index} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{category.category}</h2>
            
            <div className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          {item.type && <span className="mr-3">{item.type}</span>}
                          {item.size && <span>{item.size}</span>}
                          {item.duration && <span>{item.duration}</span>}
                          {item.date && <span>{item.date}</span>}
                        </div>
                        
                        <a 
                          href={item.link} 
                          className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800"
                        >
                          {item.type ? "Download" : "View"}
                          {item.type ? (
                            <Download className="ml-2 h-4 w-4" />
                          ) : (
                            <ChevronRight className="ml-2 h-4 w-4" />
                          )}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Resource Request */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't Find What You Need?</h2>
            <p className="text-gray-600 mb-6">
              Our venue success team is here to help. Request specific resources or schedule a consultation to address your unique challenges.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Request Resources
              </a>
              <a 
                href="/venue-faq" 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                View FAQs
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
