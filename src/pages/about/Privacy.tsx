import { useState } from 'react'
import { motion } from 'framer-motion'

export function Privacy() {
  const [activeSection, setActiveSection] = useState('introduction')
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information', title: 'Information We Collect' },
    { id: 'usage', title: 'How We Use Information' },
    { id: 'sharing', title: 'Information Sharing' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'security', title: 'Data Security' },
    { id: 'rights', title: 'Your Privacy Rights' },
    { id: 'children', title: 'Children\'s Privacy' },
    { id: 'international', title: 'International Transfers' },
    { id: 'changes', title: 'Changes to Policy' },
    { id: 'contact', title: 'Contact Information' }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy & Cookie Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Last Updated: June 15, 2025
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="sticky top-24 bg-gray-800 rounded-lg p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-6">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`block w-full text-left px-4 py-2 rounded-md transition ${
                      activeSection === section.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              {activeSection === 'introduction' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="introduction">1. Introduction</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      TrueFans Connect ("TrueFans," "we," "us," or "our") is committed to protecting your privacy. This Privacy & Cookie Policy ("Policy") explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").
                    </p>
                    <p>
                      Please read this Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Policy. This Policy is incorporated into and subject to our Terms of Service.
                    </p>
                    <p>
                      If you do not agree with the terms of this Policy, please do not access or use the Service.
                    </p>
                    <p>
                      We reserve the right to make changes to this Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Policy. Any changes or modifications will be effective immediately upon posting the updated Policy on the Service. You are encouraged to periodically review this Policy to stay informed of updates.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'information' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="information">2. Information We Collect</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      We collect information about you in various ways when you use our Service. This information is necessary to provide you with our services and to comply with our legal obligations. The types of information we may collect include:
                    </p>
                    <h3>2.1 Personal Information</h3>
                    <p>
                      Personal information is data that can be used to identify you directly or indirectly. We may collect the following personal information:
                    </p>
                    <ul>
                      <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, password, and user type (Artist, Fan, Venue, or Affiliate).</li>
                      <li><strong>Profile Information:</strong> Depending on your user type, we may collect additional information such as profile pictures, biography, location, and social media links.</li>
                      <li><strong>Artist-Specific Information:</strong> For Artists, we may collect information about your music, performances, and other content you choose to share.</li>
                      <li><strong>Payment Information:</strong> When you make or receive payments through the Service, we collect payment information, which may include credit card details, bank account information, billing address, and transaction history.</li>
                      <li><strong>Communication Information:</strong> If you contact us directly, we may collect additional information you provide in your communications.</li>
                    </ul>
                    <h3>2.2 Usage Information</h3>
                    <p>
                      We automatically collect certain information about how you interact with our Service. This information may include:
                    </p>
                    <ul>
                      <li><strong>Device Information:</strong> Information about your device, including IP address, device type, operating system, browser type, and device identifiers.</li>
                      <li><strong>Usage Data:</strong> Information about your interactions with the Service, such as the pages or content you view, the time spent on those pages, the links you click, and the features you use.</li>
                      <li><strong>Location Information:</strong> With your permission, we may collect precise location information from your device.</li>
                      <li><strong>Log Data:</strong> Information that your browser or device automatically sends whenever you visit our Service, including your IP address, browser type and settings, access times, and referring website addresses.</li>
                    </ul>
                    <h3>2.3 Information from Third Parties</h3>
                    <p>
                      We may receive information about you from third parties, including:
                    </p>
                    <ul>
                      <li><strong>Social Media Platforms:</strong> If you choose to link your social media accounts to our Service, we may receive information from those platforms.</li>
                      <li><strong>Music Platforms:</strong> If you connect your Spotify or other music platform accounts, we may receive information about your music, playlists, and listening habits.</li>
                      <li><strong>Payment Processors:</strong> We receive information from our payment processors regarding your transactions.</li>
                      <li><strong>Analytics Providers:</strong> We use analytics providers to help us understand how users interact with our Service.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeSection === 'usage' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="usage">3. How We Use Information</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      We use the information we collect for various purposes, including:
                    </p>
                    <h3>3.1 Providing and Improving the Service</h3>
                    <ul>
                      <li>To provide, maintain, and improve the Service</li>
                      <li>To process transactions and manage your account</li>
                      <li>To respond to your comments, questions, and requests</li>
                      <li>To develop new products, services, features, and functionality</li>
                      <li>To monitor and analyze trends, usage, and activities in connection with the Service</li>
                      <li>To detect, prevent, and address technical issues</li>
                    </ul>
                    <h3>3.2 Communication</h3>
                    <ul>
                      <li>To communicate with you about the Service, including sending you updates, security alerts, and administrative messages</li>
                      <li>To respond to your inquiries and provide customer support</li>
                      <li>To send you marketing communications about our products, services, and promotions, if you have opted in to receive such communications</li>
                    </ul>
                    <h3>3.3 Personalization</h3>
                    <ul>
                      <li>To personalize your experience with the Service</li>
                      <li>To recommend content, artists, or features that may interest you</li>
                      <li>To tailor the advertisements and content you see</li>
                    </ul>
                    <h3>3.4 Legal and Safety Purposes</h3>
                    <ul>
                      <li>To comply with legal obligations</li>
                      <li>To enforce our Terms of Service and other policies</li>
                      <li>To protect the rights, property, and safety of TrueFans, our users, and others</li>
                      <li>To prevent, detect, and investigate fraud, security breaches, and potentially prohibited or illegal activities</li>
                    </ul>
                    <h3>3.5 Affiliate Program</h3>
                    <ul>
                      <li>To track referrals and calculate affiliate commissions</li>
                      <li>To provide analytics and reporting to affiliates about their performance</li>
                    </ul>
                    <p>
                      We may combine the information we collect from you with information obtained from other sources to help us improve the overall accuracy and completeness of the information and to help us better tailor our interactions with you.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'sharing' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="sharing">4. Information Sharing</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      We may share your information in the following circumstances:
                    </p>
                    <h3>4.1 With Your Consent</h3>
                    <p>
                      We may share your information when you give us explicit consent to do so.
                    </p>
                    <h3>4.2 Service Providers</h3>
                    <p>
                      We may share your information with third-party service providers who perform services on our behalf, such as:
                    </p>
                    <ul>
                      <li>Payment processing</li>
                      <li>Data analysis</li>
                      <li>Email delivery</li>
                      <li>Hosting services</li>
                      <li>Customer service</li>
                      <li>Marketing assistance</li>
                    </ul>
                    <p>
                      These service providers are contractually obligated to use your information only as necessary to provide services to us and in accordance with this Policy.
                    </p>
                    <h3>4.3 Affiliates</h3>
                    <p>
                      We may share your information with our affiliates (companies that control, are controlled by, or are under common control with TrueFans) for purposes consistent with this Policy.
                    </p>
                    <h3>4.4 Business Transfers</h3>
                    <p>
                      If TrueFans is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you of any change in ownership or uses of your information.
                    </p>
                    <h3>4.5 Legal Requirements</h3>
                    <p>
                      We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
                    </p>
                    <h3>4.6 Protection of Rights</h3>
                    <p>
                      We may disclose your information to protect the rights, property, or safety of TrueFans, our users, or others, including exchanging information with other companies and organizations for fraud protection and credit risk reduction.
                    </p>
                    <h3>4.7 Public Information</h3>
                    <p>
                      Any information you post publicly on the Service, such as Artist profiles, public comments, or public messages, will be available to other users of the Service and may be visible to the public.
                    </p>
                    <h3>4.8 Aggregate or De-identified Information</h3>
                    <p>
                      We may share aggregate or de-identified information about users with third parties for marketing, advertising, research, or similar purposes. This information does not identify you personally.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'cookies' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="cookies">5. Cookies & Tracking</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      We use cookies and similar tracking technologies to track activity on our Service and hold certain information.
                    </p>
                    <h3>5.1 What Are Cookies</h3>
                    <p>
                      Cookies are small data files that are placed on your device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
                    </p>
                    <h3>5.2 Types of Cookies We Use</h3>
                    <ul>
                      <li><strong>Essential Cookies:</strong> These cookies are necessary for the Service to function properly and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.</li>
                      <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Service. They help us to know which pages are the most and least popular and see how visitors move around the Service.</li>
                      <li><strong>Functionality Cookies:</strong> These cookies enable the Service to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
                      <li><strong>Targeting Cookies:</strong> These cookies may be set through our Service by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</li>
                      <li><strong>Social Media Cookies:</strong> These cookies are set by social media services that we have added to the Service to enable you to share our content with your friends and networks.</li>
                    </ul>
                    <h3>5.3 Other Tracking Technologies</h3>
                    <p>
                      In addition to cookies, we may use other similar technologies, such as web beacons, pixels, and mobile identifiers, to track your use of our Service.
                    </p>
                    <h3>5.4 Your Choices</h3>
                    <p>
                      Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Service.
                    </p>
                    <h3>5.5 Do Not Track</h3>
                    <p>
                      Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want to have your online activity tracked. Due to the lack of a common understanding of how to interpret the DNT signal, our Service does not currently respond to browser DNT signals.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'security' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="security">6. Data Security</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      We take the security of your information seriously and use appropriate technical and organizational measures to protect your information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
                    </p>
                    <p>
                      However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                    </p>
                    <h3>6.1 Security Measures</h3>
                    <p>
                      Some of the security measures we implement include:
                    </p>
                    <ul>
                      <li>Encryption of sensitive information</li>
                      <li>Secure Socket Layer (SSL) technology</li>
                      <li>Regular security assessments and audits</li>
                      <li>Access controls and authentication procedures</li>
                      <li>Regular backups</li>
                      <li>Employee training on data security</li>
                    </ul>
                    <h3>6.2 Data Retention</h3>
                    <p>
                      We will retain your information for as long as your account is active or as needed to provide you with our services. We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
                    </p>
                    <h3>6.3 Account Security</h3>
                    <p>
                      You are responsible for maintaining the secrecy of your unique password and account information. We encourage you to use a strong, unique password and to sign out of your account after each session.
                    </p>
                    <h3>6.4 Data Breach</h3>
                    <p>
                      In the event of a data breach that affects your personal information, we will notify you and the relevant authorities as required by applicable law.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'rights' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="rights">7. Your Privacy Rights</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      Depending on your location, you may have certain rights regarding your personal information. These may include:
                    </p>
                    <h3>7.1 Access and Portability</h3>
                    <p>
                      You have the right to access the personal information we hold about you and to receive a copy of your information in a structured, commonly used, and machine-readable format.
                    </p>
                    <h3>7.2 Correction</h3>
                    <p>
                      You have the right to correct inaccurate or incomplete personal information we hold about you.
                    </p>
                    <h3>7.3 Deletion</h3>
                    <p>
                      You have the right to request the deletion of your personal information in certain circumstances, such as when the information is no longer necessary for the purposes for which it was collected.
                    </p>
                    <h3>7.4 Restriction and Objection</h3>
                    <p>
                      You have the right to restrict or object to our processing of your personal information in certain circumstances.
                    </p>
                    <h3>7.5 Withdrawal of Consent</h3>
                    <p>
                      Where we rely on your consent to process your personal information, you have the right to withdraw your consent at any time.
                    </p>
                    <h3>7.6 Complaint</h3>
                    <p>
                      You have the right to lodge a complaint with a supervisory authority if you believe that our processing of your personal information violates applicable law.
                    </p>
                    <h3>7.7 How to Exercise Your Rights</h3>
                    <p>
                      To exercise your rights, please contact us using the information provided in the "Contact Information" section below. We will respond to your request within the timeframe required by applicable law.
                    </p>
                    <p>
                      Please note that we may need to verify your identity before processing your request. In some cases, we may need to keep certain information for recordkeeping purposes, to complete transactions, or to comply with our legal obligations.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'children' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="children">8. Children's Privacy</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      Our Service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will promptly delete that information.
                    </p>
                    <p>
                      If you are a parent or guardian and you believe that your child has provided us with personal information without your consent, please contact us using the information provided in the "Contact Information" section below.
                    </p>
                    <p>
                      In some jurisdictions, the age threshold may be higher. If you are a parent or guardian and you are concerned about your child's use of our Service, please contact us.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'international' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="international">9. International Transfers</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      TrueFans is based in the United States, and we process and store information on servers located in the United States. If you are located outside the United States, your information may be transferred to, stored, and processed in the United States or other countries where our service providers are located.
                    </p>
                    <p>
                      By using our Service, you consent to the transfer of your information to the United States and other countries which may have different data protection rules than those of your country.
                    </p>
                    <h3>9.1 Data Transfer Mechanisms</h3>
                    <p>
                      When we transfer personal information from the European Economic Area (EEA), the United Kingdom, or Switzerland to the United States or other countries that may not have an adequate level of data protection, we use appropriate safeguards, such as:
                    </p>
                    <ul>
                      <li>Standard Contractual Clauses approved by the European Commission</li>
                      <li>Binding Corporate Rules</li>
                      <li>Other legally approved transfer mechanisms</li>
                    </ul>
                    <h3>9.2 European Users</h3>
                    <p>
                      If you are located in the EEA, the United Kingdom, or Switzerland, you have certain rights under applicable data protection laws, including the General Data Protection Regulation (GDPR). These rights are described in the "Your Privacy Rights" section above.
                    </p>
                    <p>
                      For users in the EEA, the United Kingdom, or Switzerland, the legal basis for processing your information includes:
                    </p>
                    <ul>
                      <li>Performance of a contract when we provide you with the Service</li>
                      <li>Compliance with a legal obligation</li>
                      <li>Our legitimate interests, such as improving our Service and preventing fraud</li>
                      <li>Your consent, where applicable</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeSection === 'changes' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="changes">10. Changes to Policy</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      We may update this Policy from time to time. We will notify you of any changes by posting the new Policy on this page and updating the "Last Updated" date at the top of this Policy.
                    </p>
                    <p>
                      You are advised to review this Policy periodically for any changes. Changes to this Policy are effective when they are posted on this page.
                    </p>
                    <p>
                      If we make material changes to this Policy, we will notify you either through the email address you have provided us or by placing a prominent notice on our website.
                    </p>
                    <p>
                      Your continued use of the Service after we post any modifications to the Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Policy.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'contact' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="contact">11. Contact Information</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      If you have any questions about this Privacy & Cookie Policy, please contact us at:
                    </p>
                    <p>
                      TrueFans Connect<br />
                      123 Music Lane<br />
                      Austin, TX 78704<br />
                      United States
                    </p>
                    <p>
                      Email: privacy@truefansconnect.com<br />
                      Phone: (512) 555-1234
                    </p>
                    <p>
                      For privacy-related inquiries, you can also contact our Data Protection Officer at dpo@truefansconnect.com.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
