import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
  category: string
}

export function VenueFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const faqItems: FAQItem[] = [
    // Getting Started
    {
      question: "How do I register my venue with TrueFans?",
      answer: "To register your venue, visit the Venue Signup page and complete the application form. You'll need to provide details about your venue including capacity, equipment, and photos. Our team will review your application and typically approve it within 2-3 business days.",
      category: "getting-started"
    },
    {
      question: "Is there a fee to list my venue on TrueFans?",
      answer: "TrueFans offers a tiered membership structure for venues. We have a free basic listing option, as well as premium tiers that offer additional features like priority placement, advanced analytics, and dedicated support. You can start with a free listing and upgrade at any time.",
      category: "getting-started"
    },
    {
      question: "What information do I need to provide about my venue?",
      answer: "To create a comprehensive venue profile, you'll need to provide: venue name, address, capacity, available equipment, stage dimensions, photos of your space, operating hours, booking policies, genre preferences, and contact information. The more detailed your profile, the more attractive it will be to artists.",
      category: "getting-started"
    },
    {
      question: "How long does the approval process take?",
      answer: "Most venue applications are reviewed and approved within 2-3 business days. For premium tier applications, we conduct a more thorough verification which may include a virtual tour or phone consultation, which can take up to 5 business days.",
      category: "getting-started"
    },

    // Booking & Management
    {
      question: "How does the booking process work?",
      answer: "TrueFans offers two booking workflows: 1) Artists can submit booking requests directly to your venue through our platform, which you can approve or decline. 2) You can browse artists and proactively invite them to perform at your venue. All communication, scheduling, and contract management happens within the TrueFans platform.",
      category: "booking"
    },
    {
      question: "Can I set specific criteria for artists who can book my venue?",
      answer: "Yes, you can set detailed criteria including genre preferences, minimum follower count, performance experience level, and availability requirements. Our matching algorithm will prioritize artists who meet your criteria, saving you time in the selection process.",
      category: "booking"
    },
    {
      question: "How are contracts and payments handled?",
      answer: "TrueFans provides customizable contract templates that comply with industry standards. Once both parties agree to terms, the contract is digitally signed within the platform. For payments, you can choose to handle them directly or use our integrated payment processing system, which provides security and automatic record-keeping for both parties.",
      category: "booking"
    },
    {
      question: "What happens if an artist cancels a performance?",
      answer: "Our platform includes a cancellation policy that you can customize for your venue. If an artist cancels within your specified timeframe, they may be subject to penalties as outlined in your policy. TrueFans also offers a quick-replacement feature to help you find alternative artists on short notice.",
      category: "booking"
    },

    // Promotion & Marketing
    {
      question: "How does TrueFans help promote events at my venue?",
      answer: "When you book artists through TrueFans, your events are automatically promoted to our user base, with targeted notifications to fans of similar artists and genres in your area. We also provide promotional tools including customizable event pages, social media integration, and email marketing templates.",
      category: "promotion"
    },
    {
      question: "Can I integrate TrueFans with my existing marketing channels?",
      answer: "Yes, TrueFans offers integration with major social media platforms, email marketing services, and website widgets. You can easily share events across your channels and embed TrueFans content directly on your website to drive engagement and ticket sales.",
      category: "promotion"
    },
    {
      question: "Does TrueFans offer any advertising options for venues?",
      answer: "Premium tier venues can access our targeted advertising platform to promote specific events or their venue in general. Our ads reach music fans based on location, genre preferences, and listening habits, ensuring your marketing budget is spent efficiently.",
      category: "promotion"
    },
    {
      question: "How can I track the effectiveness of promotions?",
      answer: "Our analytics dashboard provides comprehensive data on event page views, ticket clicks, social shares, and attendance tracking. You can see which promotional channels are driving the most engagement and adjust your strategy accordingly.",
      category: "promotion"
    },

    // Technical & Platform
    {
      question: "Can I integrate TrueFans with my ticketing system?",
      answer: "Yes, TrueFans integrates with major ticketing platforms including Eventbrite, Ticketmaster, and TicketWeb. If you use a different system, our API allows for custom integrations. This ensures a seamless experience for fans purchasing tickets while maintaining your existing ticketing workflow.",
      category: "technical"
    },
    {
      question: "How do I set up the artist submission form on my website?",
      answer: "In your venue dashboard, navigate to 'Submission Form' and customize the fields, appearance, and requirements. Once configured, you'll receive an embed code to place on your website. The form automatically feeds submissions into your TrueFans dashboard for easy review and response.",
      category: "technical"
    },
    {
      question: "What kind of analytics does TrueFans provide for venues?",
      answer: "Our analytics suite includes attendance tracking, demographic information about attendees, revenue analysis, performance comparisons across different nights/genres, artist performance metrics, and marketing effectiveness data. Premium tiers receive additional insights like regional trends and predictive booking recommendations.",
      category: "technical"
    },
    {
      question: "Is TrueFans compatible with mobile devices?",
      answer: "Yes, the TrueFans venue dashboard is fully responsive and works on all devices. We also offer a dedicated venue manager mobile app (iOS and Android) that allows you to manage bookings, communicate with artists, and track event performance on the go.",
      category: "technical"
    },

    // Financial & Business
    {
      question: "What are the revenue models for venues on TrueFans?",
      answer: "Venues can choose from several revenue models: traditional flat fee for artists, percentage-based splits of ticket sales, minimum guarantee plus percentage, or custom arrangements. The platform supports all these models and provides clear financial reporting for each event.",
      category: "financial"
    },
    {
      question: "How does TrueFans help venues increase their revenue?",
      answer: "Beyond connecting you with quality artists, TrueFans helps increase revenue through: targeted marketing to music fans in your area, data-driven recommendations on optimal pricing, insights on which genres/nights perform best for your venue, and tools to increase food/beverage sales during events.",
      category: "financial"
    },
    {
      question: "Are there any transaction fees for using TrueFans?",
      answer: "If you use our integrated payment processing for ticket sales or artist payments, there is a standard 2.9% + $0.30 transaction fee. Venues on premium tiers receive reduced rates. There are no fees if you handle payments outside our platform.",
      category: "financial"
    },
    {
      question: "How can I upgrade or downgrade my venue membership?",
      answer: "You can change your membership tier at any time through your venue dashboard under 'Account Settings.' Upgrades take effect immediately, while downgrades will take effect at the end of your current billing cycle. Our team is available to help you determine which tier best suits your venue's needs.",
      category: "financial"
    },

    // Support & Resources
    {
      question: "What kind of support does TrueFans offer to venues?",
      answer: "All venues receive access to our knowledge base, community forums, and email support. Premium tier venues also receive priority support, dedicated account managers, and access to our venue success team who can provide personalized guidance on optimizing your booking strategy and venue operations.",
      category: "support"
    },
    {
      question: "Are there resources to help me optimize my venue for performances?",
      answer: "Yes, TrueFans provides extensive resources including guides on sound optimization, stage setup, lighting recommendations, staff training materials, and venue layout best practices. Premium members can also request virtual consultations with our venue specialists.",
      category: "support"
    },
    {
      question: "How can I connect with other venue owners?",
      answer: "TrueFans hosts a private community for venue owners and managers where you can share experiences, ask questions, and network with peers. We also organize regional meetups and an annual venue conference to facilitate in-person connections and learning opportunities.",
      category: "support"
    },
    {
      question: "What should I do if I have a dispute with an artist?",
      answer: "TrueFans provides a structured dispute resolution process. First, we encourage direct communication through our messaging system. If that doesn't resolve the issue, our venue support team can mediate the discussion. For serious disputes, we offer a formal resolution process in accordance with the terms outlined in your booking agreement.",
      category: "support"
    }
  ]

  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Venue FAQ</h1>
          <p className="text-xl text-gray-300">
            Find answers to common questions about partnering your venue with TrueFans.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('all')}
          >
            All Questions
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'getting-started' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('getting-started')}
          >
            Getting Started
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'booking' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('booking')}
          >
            Booking & Management
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'promotion' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('promotion')}
          >
            Promotion & Marketing
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'technical' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('technical')}
          >
            Technical & Platform
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'financial' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('financial')}
          >
            Financial & Business
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'support' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('support')}
          >
            Support & Resources
          </button>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-lg">{item.question}</span>
                {openItem === index ? (
                  <ChevronUp className="h-5 w-5 text-indigo-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-indigo-400" />
                )}
              </button>
              {openItem === index && (
                <div className="px-6 pb-4 text-gray-300">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6">
            Our venue success team is ready to help you get the most out of your TrueFans partnership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="/venue-resources" 
              className="bg-transparent border border-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-900 transition-colors"
            >
              View Resources
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
