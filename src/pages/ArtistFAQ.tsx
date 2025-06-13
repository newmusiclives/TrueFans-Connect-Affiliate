import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
  category: string
}

export function ArtistFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const faqItems: FAQItem[] = [
    // Getting Started
    {
      question: "How do I sign up as an artist on TrueFans?",
      answer: "Signing up is easy! Click the 'Artist Signup' button in the navigation menu or footer. You'll need to create an account, verify your email, and complete your artist profile with information about your music, bio, and social links.",
      category: "getting-started"
    },
    {
      question: "Is TrueFans free for artists?",
      answer: "Yes, creating an artist account on TrueFans is completely free. We only make money when you do - we take a 15% platform fee from donations and music sales. You keep 80% of all revenue, with the remaining 5% going to your affiliate network (2.5% each to tier 1 and tier 2 affiliates).",
      category: "getting-started"
    },
    {
      question: "What information do I need to set up my artist profile?",
      answer: "To create a complete artist profile, you'll need: a profile photo, cover image, artist bio, genre tags, social media links, and at least one music track or album to share. You can also connect your Spotify account to automatically import your existing music catalog.",
      category: "getting-started"
    },
    {
      question: "Can I edit my profile after creating it?",
      answer: "Absolutely! You can update your profile information, add or remove music, change your images, and modify your bio at any time through your artist dashboard.",
      category: "getting-started"
    },

    // Music & Content
    {
      question: "What file formats do you accept for music uploads?",
      answer: "TrueFans accepts MP3, WAV, FLAC, and AAC file formats for music uploads. For optimal streaming quality and file size balance, we recommend 320kbps MP3 files.",
      category: "music-content"
    },
    {
      question: "Can I upload videos to TrueFans?",
      answer: "Yes, you can upload video content in MP4, MOV, or WebM formats. This is great for music videos, behind-the-scenes content, or exclusive performances for your fans.",
      category: "music-content"
    },
    {
      question: "Is there a limit to how much music I can upload?",
      answer: "Free accounts can upload up to 50 tracks or 3 hours of music content. For artists needing more storage, our Pro tier offers unlimited uploads for a small monthly fee.",
      category: "music-content"
    },
    {
      question: "Can I sell my music directly on TrueFans?",
      answer: "Yes! You can set prices for individual tracks, albums, or offer subscription-based access to your content. You can also accept direct donations from fans who want to support your work.",
      category: "music-content"
    },

    // Affiliate System
    {
      question: "How does the TrueFans affiliate system work?",
      answer: "Our 2-tier affiliate system works like this: When a fan shares your music and someone supports you through their link, they earn a 2.5% commission (tier 1). If that new fan shares your music and brings in more supporters, the original fan also earns a 2.5% tier 2 commission. This creates a powerful incentive for fans to promote your music.",
      category: "affiliate"
    },
    {
      question: "Do I have to participate in the affiliate program?",
      answer: "The affiliate system is a core part of TrueFans and is automatically enabled for all artists. It's designed to help your music spread organically while ensuring you keep the majority (80%) of all revenue.",
      category: "affiliate"
    },
    {
      question: "Can I adjust the commission rates for my affiliates?",
      answer: "The standard commission structure is fixed at 2.5% for tier 1 and 2.5% for tier 2 affiliates. This balanced approach has proven most effective for artist growth while maintaining fair compensation.",
      category: "affiliate"
    },
    {
      question: "How do fans become my affiliates?",
      answer: "Any fan who creates a TrueFans account can automatically become your affiliate by sharing your music through their unique sharing links. There's no separate signup process - the system works seamlessly in the background.",
      category: "affiliate"
    },

    // Payments & Revenue
    {
      question: "How and when do I get paid?",
      answer: "TrueFans processes payments to artists on the 1st and 15th of each month for all earnings that have cleared the payment processing period. You can receive payments via direct deposit, PayPal, or Stripe.",
      category: "payments"
    },
    {
      question: "What payment methods can fans use to support me?",
      answer: "Fans can support you using credit/debit cards, PayPal, Apple Pay, Google Pay, and various cryptocurrency options. We're constantly adding new payment methods to make supporting artists as easy as possible.",
      category: "payments"
    },
    {
      question: "Is there a minimum payout threshold?",
      answer: "Yes, the minimum payout threshold is $20. Once your earnings reach this amount, they'll be included in the next scheduled payment cycle.",
      category: "payments"
    },
    {
      question: "Do I need to pay taxes on my TrueFans earnings?",
      answer: "Yes, earnings from TrueFans are considered income and are subject to taxes based on your country's regulations. We provide year-end tax summaries and, for US-based artists earning over $600 annually, we'll issue a 1099 form.",
      category: "payments"
    },

    // Growth & Promotion
    {
      question: "How can I promote my music on TrueFans?",
      answer: "Beyond our affiliate system, you can use our built-in promotional tools like featured spots on your profile, email campaigns to your fans, limited-time offers, and cross-promotion with other artists. Our Artist Resources section has detailed guides on effective promotion strategies.",
      category: "growth"
    },
    {
      question: "Does TrueFans help promote artists on the platform?",
      answer: "Yes! We regularly feature artists in our discovery section, newsletter, and social media channels. Artists with active profiles, regular content updates, and growing fan engagement are more likely to be featured.",
      category: "growth"
    },
    {
      question: "Can I see analytics about my fans and music performance?",
      answer: "Absolutely. Your artist dashboard provides comprehensive analytics including listener demographics, geographic distribution, play counts, revenue breakdowns, affiliate performance, and engagement metrics to help you understand and grow your audience.",
      category: "growth"
    },
    {
      question: "How do I connect with venues for live performances?",
      answer: "TrueFans has a dedicated Venues section where music venues can discover artists. You can also use our BandsInTown integration to manage your tour schedule and promote upcoming shows to your fans.",
      category: "growth"
    },

    // Technical Support
    {
      question: "What should I do if I'm having technical issues?",
      answer: "For technical support, visit our Help Center or contact our support team directly at support@truefans.com. We aim to respond to all inquiries within 24 hours. For urgent issues, you can use the live chat feature in your artist dashboard.",
      category: "technical"
    },
    {
      question: "Can I integrate TrueFans with my existing website or social media?",
      answer: "Yes! We provide embeddable widgets for your website, integration with major social platforms, and API access for custom integrations. You can also use our single-click sharing tools to promote your TrueFans content across all your channels.",
      category: "technical"
    },
    {
      question: "Is my music protected on TrueFans?",
      answer: "We take copyright protection seriously. All uploaded content is fingerprinted to prevent unauthorized use, and we implement DRM protection options for artists who want additional security. You always retain full ownership of your music.",
      category: "technical"
    },
    {
      question: "What are the recommended image sizes for my profile?",
      answer: "For optimal display across all devices, we recommend: Profile photo - 500x500px (square), Cover image - 1500x500px (3:1 ratio), Album/track artwork - 1000x1000px (square). All images should be in JPG or PNG format.",
      category: "technical"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Artist FAQ</h1>
          <p className="text-xl text-gray-300">
            Find answers to the most common questions about using TrueFans as an artist.
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
              activeCategory === 'music-content' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('music-content')}
          >
            Music & Content
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'affiliate' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('affiliate')}
          >
            Affiliate System
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'payments' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('payments')}
          >
            Payments
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'growth' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('growth')}
          >
            Growth & Promotion
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'technical' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('technical')}
          >
            Technical Support
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
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="/artist-resources" 
              className="bg-transparent border border-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-900 transition-colors"
            >
              Browse Resources
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
