import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Users, TrendingUp, Award, Check, ChevronDown } from 'lucide-react'

export function AffiliateProgram() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const toggleFaq = (id: string) => {
    if (expandedFaq === id) {
      setExpandedFaq(null)
    } else {
      setExpandedFaq(id)
    }
  }

  const faqs = [
    {
      id: 'how-paid',
      question: 'How and when do I get paid?',
      answer: 'Affiliate earnings are calculated daily and paid out monthly. You can track your earnings in real-time through your affiliate dashboard. Payments are processed on the 15th of each month for the previous month\'s earnings, provided you\'ve reached the minimum payout threshold of $25. We offer payment via direct deposit, PayPal, or store credit (with a 10% bonus).'
    },
    {
      id: 'tracking',
      question: 'How does affiliate tracking work?',
      answer: 'Our system uses a combination of cookies and account-based tracking to ensure you get credit for referrals. When someone clicks your affiliate link, we place a 90-day cookie on their device. If they create an account or make a donation within that period, you\'ll receive credit. Additionally, if they create an account through your link, you\'ll be permanently linked as their referrer for all future donations.'
    },
    {
      id: 'tier2',
      question: 'What is the two-tier affiliate system?',
      answer: 'Our two-tier system means you earn commissions not only from people you directly refer (tier 1), but also from people they refer (tier 2). You earn 2.5% on all donations made by your direct referrals, and an additional 2.5% on donations made by people they refer. This creates a network effect that can significantly increase your earnings over time.'
    },
    {
      id: 'promote',
      question: 'How can I promote TrueFans effectively?',
      answer: 'The most effective promotion comes from authentic recommendations. Share your personal experiences with the platform, highlight specific artists you\'ve discovered, and explain how the platform benefits both artists and fans. You can use our marketing materials, including banners and social media templates, available in your affiliate dashboard. Creating content that showcases the platform\'s features and benefits can also be highly effective.'
    },
    {
      id: 'restrictions',
      question: 'Are there any restrictions on how I can promote TrueFans?',
      answer: 'Yes, there are some guidelines to ensure ethical promotion. You cannot use misleading claims, spam, or unsolicited emails to promote TrueFans. You also cannot bid on our branded keywords in search engines or represent yourself as the official TrueFans platform. Additionally, we prohibit promotion on sites with adult, violent, or discriminatory content. Please review our full Affiliate Terms for complete details.'
    },
    {
      id: 'artist-affiliate',
      question: 'Can artists be affiliates too?',
      answer: 'Absolutely! Artists can and should become affiliates. When you share your TrueFans profile with your audience, you\'ll earn affiliate commissions on any donations they make to other artists on the platform. This creates an additional revenue stream beyond your direct donations. Many of our most successful affiliates are artists who actively promote the platform to their fans.'
    }
  ]

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Affiliate Program</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Earn while supporting independent musicians through our innovative two-tier affiliate system.
          </p>
          <div className="mt-8">
            <a
              href="/signup?type=affiliate"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium text-lg transition"
            >
              Join the Affiliate Program
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gray-800 rounded-lg p-8 shadow-xl text-center"
          >
            <div className="bg-indigo-600 rounded-full p-4 inline-flex mb-6">
              <DollarSign className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Earn 5% Commission</h3>
            <p className="text-gray-300">
              Receive 2.5% on direct referrals and another 2.5% on their referrals through our two-tier system.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gray-800 rounded-lg p-8 shadow-xl text-center"
          >
            <div className="bg-indigo-600 rounded-full p-4 inline-flex mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Two-Tier Structure</h3>
            <p className="text-gray-300">
              Benefit from a network effect as your referrals bring in more music lovers to the platform.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gray-800 rounded-lg p-8 shadow-xl text-center"
          >
            <div className="bg-indigo-600 rounded-full p-4 inline-flex mb-6">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Lifetime Earnings</h3>
            <p className="text-gray-300">
              Earn from every donation your referrals make, for as long as they use the platform.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gray-800 rounded-lg p-8 shadow-xl text-center"
          >
            <div className="bg-indigo-600 rounded-full p-4 inline-flex mb-6">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Support Musicians</h3>
            <p className="text-gray-300">
              Help independent artists thrive while earning rewards for spreading the word.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gray-800 rounded-lg p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <ol className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sign Up as an Affiliate</h3>
                  <p className="text-gray-300">
                    Join our affiliate program for free. All you need is a TrueFans account and you're ready to start earning.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Share Your Unique Link</h3>
                  <p className="text-gray-300">
                    Get your personalized affiliate link and share it with your audience through social media, your website, or direct messages.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Your Network Grows</h3>
                  <p className="text-gray-300">
                    When people sign up through your link, they become your tier 1 referrals. When they refer others, those become your tier 2 referrals.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Earn Commissions</h3>
                  <p className="text-gray-300">
                    You earn 2.5% on all donations made by your tier 1 referrals and another 2.5% on donations made by your tier 2 referrals.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                  <span className="font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Get Paid Monthly</h3>
                  <p className="text-gray-300">
                    Track your earnings in real-time and receive monthly payouts for all the donations your network generates.
                  </p>
                </div>
              </li>
            </ol>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gray-800 rounded-lg p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Why Become an Affiliate?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  <strong className="text-white">Passive Income:</strong> Earn ongoing commissions from your network's activity on the platform.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  <strong className="text-white">Support Musicians:</strong> Help independent artists receive fair compensation for their work.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  <strong className="text-white">Network Effect:</strong> Benefit from the growth of your referral network over time.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  <strong className="text-white">No Costs or Risks:</strong> Free to join with no minimum performance requirements.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  <strong className="text-white">Marketing Resources:</strong> Access promotional materials to help you succeed.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  <strong className="text-white">Real-Time Tracking:</strong> Monitor your performance and earnings through a comprehensive dashboard.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  <strong className="text-white">Community Impact:</strong> Be part of revolutionizing how musicians are supported in the digital age.
                </span>
              </li>
            </ul>
            
            <div className="mt-8 p-6 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Success Story</h3>
              <p className="text-gray-300 italic mb-4">
                "I started sharing TrueFans with my music blog readers, and within 6 months, I had over 200 active referrals. Now I earn over $1,200 monthly from my network's donations to artists. The best part is knowing I'm helping musicians get paid fairly while earning passive income."
              </p>
              <p className="text-right text-gray-400">— Sarah K., Music Blogger</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-700 transition"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFaq === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <div className="p-6 border-t border-gray-700">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="bg-indigo-900 rounded-lg p-8 shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
            Join our affiliate program today and start earning commissions while supporting independent musicians. It's free to join and you can start sharing immediately.
          </p>
          <a
            href="/signup?type=affiliate"
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium text-lg transition"
          >
            Become an Affiliate
          </a>
        </div>
      </div>
    </div>
  )
}
