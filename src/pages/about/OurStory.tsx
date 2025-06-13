import { useState } from 'react'
import { motion } from 'framer-motion'

export function OurStory() {
  const [activeSection, setActiveSection] = useState('vision')

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="bg-gradient-to-b from-primary-900 to-primary-800 min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-primary-300 max-w-3xl mx-auto">
            How TrueFans Connect is revolutionizing the music industry through community, technology, and a passion for supporting independent artists.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-1/3">
            <div className="sticky top-24 bg-primary-800 rounded-lg p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-6">Explore Our Journey</h3>
              <nav className="space-y-2">
                {['vision', 'beginning', 'growth', 'today', 'future'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`block w-full text-left px-4 py-2 rounded-md transition ${
                      activeSection === section
                        ? 'bg-primary-600 text-white'
                        : 'text-primary-300 hover:bg-primary-700'
                    }`}
                  >
                    {section === 'vision' && 'Our Vision'}
                    {section === 'beginning' && 'The Beginning'}
                    {section === 'growth' && 'Growth & Evolution'}
                    {section === 'today' && 'Where We Are Today'}
                    {section === 'future' && 'The Future'}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="md:w-2/3">
            {activeSection === 'vision' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-lg p-8 shadow-xl mb-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-primary-600">Our Vision</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    At TrueFans Connect, we believe in a music industry where artists are fairly compensated for their work, fans can directly support the musicians they love, and venues can thrive by hosting talented performers.
                  </p>
                  <p>
                    Our vision is to create an ecosystem where success spreads organically through community support, powered by our innovative two-tier affiliate system that rewards everyone who helps an artist grow.
                  </p>
                  <p>
                    We're building a world where independent musicians can make a living doing what they love, without sacrificing their artistic integrity or giving away the majority of their earnings to middlemen.
                  </p>
                  <blockquote className="border-l-4 border-primary-500 pl-4 italic my-8">
                    "Music is the universal language that connects us all. We're just making sure that connection is fair, transparent, and beneficial for everyone involved."
                    <footer className="text-right mt-2">— Founder, TrueFans Connect</footer>
                  </blockquote>
                </div>
              </motion.div>
            )}

            {activeSection === 'beginning' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-lg p-8 shadow-xl mb-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-primary-600">The Beginning</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    TrueFans Connect was born out of frustration with the existing music industry model. Our founders, a mix of musicians, tech entrepreneurs, and music lovers, saw firsthand how difficult it was for talented artists to make a living from their music.
                  </p>
                  <p>
                    In 2022, after a late-night jam session and conversation about the broken economics of streaming, the idea for TrueFans was sketched on the back of a napkin: a platform where fans could directly support artists, and where that support could spread virally through a community-based affiliate system.
                  </p>
                  <p>
                    The initial concept was simple: create a platform where 80% of all donations go directly to artists, with 5% distributed to the fans who help spread the word through our two-tier affiliate system, and only 15% going to platform maintenance and growth.
                  </p>
                  <p>
                    Within months, we had assembled a team of developers, designers, and music industry experts who shared our vision. By early 2023, the first version of TrueFans Connect was launched with a small group of indie artists in Austin, Texas.
                  </p>
                </div>
              </motion.div>
            )}

            {activeSection === 'growth' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-lg p-8 shadow-xl mb-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-primary-600">Growth & Evolution</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    The response to our initial launch exceeded all expectations. Artists loved the fair compensation model, fans appreciated the direct connection to musicians they admired, and the affiliate system created a natural incentive for music lovers to spread the word.
                  </p>
                  <p>
                    Throughout 2023, we expanded our feature set based on user feedback:
                  </p>
                  <ul>
                    <li>Integration with Spotify to help artists showcase their existing catalog</li>
                    <li>Partnership with BandsInTown to display upcoming shows</li>
                    <li>Development of our QR code donation system for live performances</li>
                    <li>Creation of the venue portal to help music venues discover and book rising artists</li>
                  </ul>
                  <p>
                    By the end of 2023, we had grown from our initial test group to over 5,000 artists and 50,000 fans across the United States. Each success story fueled our determination to keep improving the platform.
                  </p>
                  <p>
                    In early 2024, we secured our first round of funding from investors who believed in our mission of creating a more equitable music industry. This allowed us to expand our team and accelerate our development roadmap.
                  </p>
                </div>
              </motion.div>
            )}

            {activeSection === 'today' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-lg p-8 shadow-xl mb-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-primary-600">Where We Are Today</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    Today, TrueFans Connect is a thriving community of musicians, fans, and venues united by a shared love of music and a commitment to supporting independent artists.
                  </p>
                  <p>
                    Our platform now features:
                  </p>
                  <ul>
                    <li>A robust artist profile system with Spotify integration</li>
                    <li>Seamless donation processing with our innovative affiliate tracking</li>
                    <li>Live event support through QR code donations</li>
                    <li>A venue discovery system that helps connect artists with performance opportunities</li>
                    <li>Detailed analytics for artists to understand their audience and growth</li>
                  </ul>
                  <p>
                    We're proud that the average TrueFans artist earns 5x more per stream equivalent than they would on traditional streaming platforms. Many of our artists have been able to quit their day jobs and focus on music full-time, supported by their true fans.
                  </p>
                  <p>
                    Our community now spans all 50 states and is beginning to expand internationally, with over 25,000 artists and 250,000 active fans on the platform.
                  </p>
                </div>
              </motion.div>
            )}

            {activeSection === 'future' && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-lg p-8 shadow-xl mb-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-primary-600">The Future</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    As we look to the future, our mission remains unchanged: to create the most artist-friendly platform in the music industry while building a community that values and supports musical creativity.
                  </p>
                  <p>
                    Our roadmap for the coming years includes:
                  </p>
                  <ul>
                    <li>Expansion to international markets across Europe, Asia, and South America</li>
                    <li>Development of a mobile app to make supporting artists even easier</li>
                    <li>Integration of merchandise sales with the same fair revenue sharing model</li>
                    <li>Creation of a TrueFans festival showcasing platform artists</li>
                    <li>Launch of a record label alternative that provides services without taking ownership of artists' music</li>
                  </ul>
                  <p>
                    We believe that the future of music is direct artist support, community engagement, and fair compensation. TrueFans Connect is leading the way toward this new paradigm, one fan and one artist at a time.
                  </p>
                  <p>
                    Join us in revolutionizing the music industry. Whether you're an artist looking for a better way to connect with fans, a music lover wanting to support your favorite musicians, or a venue seeking to host amazing talent, TrueFans Connect is building a better future for music.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="bg-primary-800 rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Join Our Journey</h2>
              <p className="mb-6">
                We're always looking for passionate people to join our mission of revolutionizing the music industry. Whether you're an artist, a fan, or interested in joining our team, we'd love to connect with you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/signup?type=artist"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md font-medium transition"
                >
                  Join as an Artist
                </a>
                <a
                  href="/signup?type=fan"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md font-medium transition"
                >
                  Join as a Fan
                </a>
                <a
                  href="/careers"
                  className="px-6 py-3 border border-primary-600 hover:bg-primary-900 rounded-md font-medium transition"
                >
                  View Careers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
