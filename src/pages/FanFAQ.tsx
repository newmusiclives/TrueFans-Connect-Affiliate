import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
  category: string
}

export function FanFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const faqItems: FAQItem[] = [
    // Getting Started
    {
      question: "How do I sign up as a fan on TrueFans?",
      answer: "Signing up is easy! Click the 'Fan Signup' button in the navigation menu or footer. You'll need to create an account with your email and password, verify your email, and then you can start discovering and supporting your favorite artists.",
      category: "getting-started"
    },
    {
      question: "Is TrueFans free for fans?",
      answer: "Yes, creating a fan account on TrueFans is completely free. There are no subscription fees to join or browse the platform. You only pay when you choose to support artists by purchasing music or making donations.",
      category: "getting-started"
    },
    {
      question: "What information do I need to set up my fan profile?",
      answer: "To create a basic fan profile, you'll need an email address and password. You can enhance your profile by adding a profile photo, bio, and linking your social media accounts. The more complete your profile, the better your experience will be when interacting with artists and other fans.",
      category: "getting-started"
    },
    {
      question: "Can I edit my profile after creating it?",
      answer: "Absolutely! You can update your profile information, change your profile picture, modify your bio, and update your preferences at any time through your account settings.",
      category: "getting-started"
    },

    // Discovering Music
    {
      question: "How do I discover new artists on TrueFans?",
      answer: "TrueFans offers multiple ways to discover new music: browse our curated 'Discover' section, search by genre or location, check out trending artists, or see what artists your friends are supporting. Our recommendation engine also suggests artists based on your listening history and preferences.",
      category: "discovering"
    },
    {
      question: "Can I follow my favorite artists?",
      answer: "Yes! Following artists allows you to receive notifications about new releases, upcoming shows, and exclusive content. Just visit an artist's profile and click the 'Follow' button to stay updated with their latest activities.",
      category: "discovering"
    },
    {
      question: "How do I find local artists or shows in my area?",
      answer: "Use our location-based search feature to discover artists and venues near you. You can filter by distance, genre, and upcoming shows. We also integrate with BandsInTown to provide comprehensive information about live performances in your area.",
      category: "discovering"
    },
    {
      question: "Can I create playlists on TrueFans?",
      answer: "Yes, you can create custom playlists with music from any artists on the platform. Your playlists can be private or public, allowing you to share your favorite discoveries with friends and other music fans.",
      category: "discovering"
    },

    // Supporting Artists
    {
      question: "How can I support artists on TrueFans?",
      answer: "There are multiple ways to support artists: purchase their music (singles or albums), make direct donations, attend their shows, subscribe to their premium content, or share their music with your network through our affiliate system.",
      category: "supporting"
    },
    {
      question: "What payment methods can I use to support artists?",
      answer: "TrueFans accepts credit/debit cards, PayPal, Apple Pay, Google Pay, and various cryptocurrency options. We're constantly adding new payment methods to make supporting artists as easy as possible.",
      category: "supporting"
    },
    {
      question: "How much of my payment goes to the artist?",
      answer: "Artists receive 80% of all revenue from your support. The remaining 20% is split between the platform fee (15%) and the affiliate network (5%, with 2.5% each to tier 1 and tier 2 affiliates). This structure ensures artists receive the majority of your support while incentivizing music sharing.",
      category: "supporting"
    },
    {
      question: "Can I get a refund for my purchases or donations?",
      answer: "For digital content purchases, refunds are available within 24 hours if you haven't downloaded or streamed the content. Donations are generally non-refundable as they go directly to supporting the artist. For specific issues, please contact our support team.",
      category: "supporting"
    },

    // Affiliate System
    {
      question: "What is the TrueFans affiliate system?",
      answer: "Our 2-tier affiliate system rewards fans for sharing music they love. When you share an artist's music and someone supports them through your link, you earn a 2.5% commission (tier 1). If that new fan shares the music and brings in more supporters, you also earn a 2.5% tier 2 commission. This creates a powerful incentive for fans to promote music they love.",
      category: "affiliate"
    },
    {
      question: "How do I become an affiliate?",
      answer: "Every fan with a TrueFans account is automatically part of the affiliate system. Simply share music using the share buttons on any artist's profile, track, or album. The system automatically tracks supporters who come through your unique sharing links.",
      category: "affiliate"
    },
    {
      question: "How and when do I get paid for affiliate earnings?",
      answer: "Affiliate earnings are processed on the 1st and 15th of each month for all earnings that have cleared the payment processing period. You can receive payments via direct deposit, PayPal, or have your earnings applied as credit toward future purchases on TrueFans.",
      category: "affiliate"
    },
    {
      question: "Is there a minimum payout threshold for affiliate earnings?",
      answer: "Yes, the minimum payout threshold is $20. Once your earnings reach this amount, they'll be included in the next scheduled payment cycle. Earnings below this threshold will accumulate until reaching the minimum.",
      category: "affiliate"
    },

    // Account & Privacy
    {
      question: "How does TrueFans protect my privacy?",
      answer: "We take privacy seriously. Your personal information is encrypted and securely stored. We never share your data with third parties without your consent. You can control your privacy settings, including what information is visible to artists and other fans, through your account settings.",
      category: "account"
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account at any time through your account settings. This will permanently remove your profile and personal information from our system. Note that any purchases you've made will remain with your library, and you'll need to contact support if you wish to regain access after deletion.",
      category: "account"
    },
    {
      question: "How do I change my email or password?",
      answer: "You can update your email address and password through your account settings. For security reasons, you'll need to verify your current password before making these changes. If you've forgotten your password, use the 'Forgot Password' link on the login page.",
      category: "account"
    },
    {
      question: "Can I link my TrueFans account to my social media?",
      answer: "Yes, you can connect your TrueFans account to various social media platforms. This makes sharing music easier and helps you find friends who are also on TrueFans. You can manage these connections in your account settings.",
      category: "account"
    },

    // Technical Support
    {
      question: "What should I do if I'm having technical issues?",
      answer: "For technical support, visit our Help Center or contact our support team directly at support@truefans.com. We aim to respond to all inquiries within 24 hours. For common issues, check our troubleshooting guides which cover most frequently encountered problems.",
      category: "technical"
    },
    {
      question: "How do I report inappropriate content or behavior?",
      answer: "You can report inappropriate content or behavior by clicking the 'Report' button available on all profiles, comments, and content. Our moderation team reviews all reports and takes appropriate action according to our community guidelines.",
      category: "technical"
    },
    {
      question: "Can I use TrueFans on my mobile device?",
      answer: "Yes! TrueFans is fully optimized for mobile browsers, and we also offer dedicated apps for iOS and Android. You can download these from the Apple App Store or Google Play Store for the best mobile experience.",
      category: "technical"
    },
    {
      question: "What are the system requirements for using TrueFans?",
      answer: "TrueFans works on any modern web browser (Chrome, Firefox, Safari, Edge) and requires a stable internet connection. For the best experience, we recommend using the latest version of your preferred browser and having JavaScript enabled.",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fan FAQ</h1>
          <p className="text-xl text-gray-300">
            Find answers to the most common questions about using TrueFans as a music fan.
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
              activeCategory === 'discovering' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('discovering')}
          >
            Discovering Music
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === 'supporting' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('supporting')}
          >
            Supporting Artists
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
              activeCategory === 'account' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory('account')}
          >
            Account & Privacy
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
              href="/how-it-works" 
              className="bg-transparent border border-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-900 transition-colors"
            >
              Learn How It Works
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
