import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, MapPin, Briefcase, Clock, Check } from 'lucide-react'

export function Careers() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const jobs = [
    {
      id: 'full-stack-developer',
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      description: "We're looking for a Full Stack Developer to help build and scale our platform. You'll work on both frontend and backend systems, implementing new features and improving existing ones.",
      responsibilities: [
        'Develop and maintain web applications using React, TypeScript, and Node.js',
        'Design and implement RESTful APIs and database schemas',
        'Collaborate with product managers, designers, and other engineers',
        'Write clean, maintainable, and well-tested code',
        'Participate in code reviews and technical discussions'
      ],
      requirements: [
        '3+ years of experience in full stack development',
        'Strong proficiency in React, TypeScript, and Node.js',
        'Experience with SQL and NoSQL databases',
        'Familiarity with cloud services (AWS, GCP, or Azure)',
        'Strong problem-solving skills and attention to detail'
      ]
    },
    {
      id: 'product-designer',
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote (US)',
      type: 'Full-time',
      description: "We're seeking a talented Product Designer to help create intuitive and engaging experiences for our users. You'll work closely with product managers and engineers to design features that delight our community.",
      responsibilities: [
        'Create wireframes, prototypes, and high-fidelity designs',
        'Conduct user research and usability testing',
        'Develop and maintain our design system',
        'Collaborate with engineers to ensure proper implementation',
        'Iterate on designs based on user feedback and data'
      ],
      requirements: [
        '3+ years of experience in product design',
        'Strong portfolio demonstrating UX/UI design skills',
        'Proficiency in design tools like Figma or Sketch',
        'Experience with design systems and component libraries',
        'Understanding of accessibility standards and best practices'
      ]
    },
    {
      id: 'music-partnerships-manager',
      title: 'Music Partnerships Manager',
      department: 'Business Development',
      location: 'Austin, TX or Remote (US)',
      type: 'Full-time',
      description: "We're looking for a Music Partnerships Manager to help grow our artist community. You'll work with musicians, venues, and music industry professionals to expand our platform's reach and impact.",
      responsibilities: [
        'Identify and recruit artists to join the TrueFans platform',
        'Build relationships with venues, promoters, and music industry professionals',
        'Represent TrueFans at music industry events and conferences',
        'Develop and execute partnership strategies to grow our community',
        'Gather feedback from artists and venues to improve our platform'
      ],
      requirements: [
        '3+ years of experience in the music industry',
        'Strong network of contacts in the independent music scene',
        'Excellent communication and negotiation skills',
        'Understanding of the challenges facing independent artists',
        'Passion for creating a more equitable music industry'
      ]
    },
    {
      id: 'community-manager',
      title: 'Community Manager',
      department: 'Marketing',
      location: 'Remote (US)',
      type: 'Full-time',
      description: "We're seeking a Community Manager to foster engagement and growth within our user community. You'll be the voice of TrueFans across social media and other channels, building relationships with our users and promoting our mission.",
      responsibilities: [
        "Manage TrueFans' social media presence across platforms",
        'Create engaging content that highlights our artists and platform features',
        'Respond to user inquiries and feedback',
        'Organize virtual and in-person community events',
        'Analyze community metrics and implement strategies for growth'
      ],
      requirements: [
        '2+ years of experience in community management or social media',
        'Strong writing and communication skills',
        'Experience with social media management tools',
        'Understanding of social media analytics and growth strategies',
        'Passion for music and supporting independent artists'
      ]
    }
  ]

  const toggleJob = (id: string) => {
    if (expandedJob === id) {
      setExpandedJob(null)
    } else {
      setExpandedJob(id)
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us revolutionize the music industry by creating a more equitable platform for artists, fans, and venues.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-primary-400">Our Mission</h3>
            <p className="text-gray-300">
              At TrueFans Connect, we{"'"}re building a platform that empowers independent musicians to make a living doing what they love, while creating meaningful connections with their fans.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-primary-400">Our Values</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Fairness and transparency in everything we do</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Community-driven growth and support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Innovation that serves artists and fans</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Respect for creativity and artistic expression</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-primary-400">Our Benefits</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Competitive salary and equity packages</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Flexible remote work options</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Unlimited PTO and flexible working hours</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Health, dental, and vision insurance</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Professional development budget</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-400 mr-2 mt-1" />
                <span>Concert tickets and music festival allowance</span>
              </li>
            </ul>
          </div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                <button
                  onClick={() => toggleJob(job.id)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-700 transition"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span className="flex items-center text-gray-400 text-sm">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedJob === job.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedJob === job.id && (
                  <div className="p-6 border-t border-gray-700">
                    <p className="mb-6 text-gray-300">{job.description}</p>
                    
                    <h4 className="font-semibold text-lg mb-3">Responsibilities:</h4>
                    <ul className="list-disc pl-5 mb-6 text-gray-300 space-y-1">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <h4 className="font-semibold text-lg mb-3">Requirements:</h4>
                    <ul className="list-disc pl-5 mb-6 text-gray-300 space-y-1">
                      {job.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md font-medium transition">
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="bg-gray-800 rounded-lg p-8 shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Don{"'"}t see the right position?</h2>
          <p className="mb-6 text-gray-300">
            We{"'"}re always looking for talented individuals who are passionate about our mission. Send us your resume and tell us how you can contribute to TrueFans Connect.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md font-medium transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
