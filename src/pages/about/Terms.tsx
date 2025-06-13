import { useState } from 'react'
import { motion } from 'framer-motion'

export function Terms() {
  const [activeSection, setActiveSection] = useState('introduction')
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'definitions', title: 'Definitions' },
    { id: 'account', title: 'Account Registration' },
    { id: 'content', title: 'User Content' },
    { id: 'conduct', title: 'Acceptable Use' },
    { id: 'payments', title: 'Payments & Donations' },
    { id: 'affiliate', title: 'Affiliate Program' },
    { id: 'intellectual', title: 'Intellectual Property' },
    { id: 'termination', title: 'Termination' },
    { id: 'disclaimer', title: 'Disclaimers' },
    { id: 'limitation', title: 'Limitation of Liability' },
    { id: 'indemnification', title: 'Indemnification' },
    { id: 'governing', title: 'Governing Law' },
    { id: 'changes', title: 'Changes to Terms' },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
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
                      Welcome to TrueFans Connect ("TrueFans," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of the TrueFans website, mobile applications, and services (collectively, the "Service").
                    </p>
                    <p>
                      By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service. These Terms constitute a legally binding agreement between you and TrueFans Connect, which is owned and operated by New Music Lives, a subsidiary of Lightwork Digital.
                    </p>
                    <p>
                      Please read these Terms carefully, as they contain important information about your legal rights, remedies, and obligations. By using the Service, you agree to these Terms and our Privacy Policy, which is incorporated by reference.
                    </p>
                    <p>
                      TrueFans Connect provides a platform that enables musicians ("Artists") to connect with their supporters ("Fans"), receive donations, and participate in our affiliate program. We also provide tools for music venues ("Venues") to discover and book Artists.
                    </p>
                    <p>
                      PLEASE NOTE THAT SECTION 14 CONTAINS AN ARBITRATION CLAUSE AND CLASS ACTION WAIVER. BY AGREEING TO THESE TERMS, YOU AGREE TO RESOLVE ALL DISPUTES THROUGH BINDING INDIVIDUAL ARBITRATION, WHICH MEANS THAT YOU WAIVE ANY RIGHT TO HAVE THE DISPUTE DECIDED BY A JUDGE OR JURY, AND YOU WAIVE ANY RIGHT TO PARTICIPATE IN COLLECTIVE ACTION, WHETHER THAT BE A CLASS ACTION, CLASS ARBITRATION, OR REPRESENTATIVE ACTION.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'definitions' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="definitions">2. Definitions</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      Throughout these Terms, we use certain defined terms:
                    </p>
                    <ul>
                      <li>
                        <strong>"Service"</strong> refers to the TrueFans Connect platform, including our website, mobile applications, and all services provided therein.
                      </li>
                      <li>
                        <strong>"User"</strong> refers to any individual who accesses or uses the Service, including Artists, Fans, Venues, and Affiliates.
                      </li>
                      <li>
                        <strong>"Artist"</strong> refers to a User who creates a profile on the Service to showcase their music, receive donations, and connect with Fans.
                      </li>
                      <li>
                        <strong>"Fan"</strong> refers to a User who uses the Service to discover Artists, make donations, and engage with music content.
                      </li>
                      <li>
                        <strong>"Venue"</strong> refers to a User who uses the Service to discover and book Artists for performances.
                      </li>
                      <li>
                        <strong>"Affiliate"</strong> refers to a User who participates in our affiliate program to earn commissions by referring new Users to the Service.
                      </li>
                      <li>
                        <strong>"Content"</strong> refers to all text, graphics, images, music, software, audio, video, information, or other materials that are posted, uploaded, or otherwise made available on the Service.
                      </li>
                      <li>
                        <strong>"User Content"</strong> refers to Content that Users provide to be made available through the Service, including Artist profiles, music, and other materials.
                      </li>
                      <li>
                        <strong>"Donation"</strong> refers to a monetary contribution made by a Fan to an Artist through the Service.
                      </li>
                      <li>
                        <strong>"Commission"</strong> refers to the percentage of a Donation that is retained by TrueFans or paid to Affiliates.
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeSection === 'account' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="account">3. Account Registration</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      To access certain features of the Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information about yourself. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify TrueFans of any unauthorized use of your account.
                    </p>
                    <p>
                      You must be at least 18 years old to create an account. If you are under 18 but at least 13 years old, you may use the Service only with the involvement and consent of a parent or legal guardian.
                    </p>
                    <p>
                      You may not have more than one active account. You may not transfer your account to anyone else without our prior written permission.
                    </p>
                    <p>
                      We reserve the right to disable your account if we determine, in our sole discretion, that you have violated these Terms, including by providing inaccurate, outdated, or incomplete information.
                    </p>
                    <h3>3.1 Artist Accounts</h3>
                    <p>
                      If you register as an Artist, you represent and warrant that you have the right to distribute and receive donations for the music and other content you provide through the Service. You are responsible for ensuring that your Artist profile and all content you provide comply with these Terms and all applicable laws.
                    </p>
                    <h3>3.2 Venue Accounts</h3>
                    <p>
                      If you register as a Venue, you represent and warrant that you have the authority to act on behalf of the venue you represent and to book Artists for performances at that venue.
                    </p>
                    <h3>3.3 Affiliate Accounts</h3>
                    <p>
                      If you participate in our affiliate program, you agree to comply with the additional terms and conditions specific to the affiliate program, which are incorporated by reference into these Terms.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'content' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="content">4. User Content</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      The Service allows Users to post, upload, and share Content. You retain all rights in and to your User Content, subject to the licenses granted below.
                    </p>
                    <h3>4.1 Content License</h3>
                    <p>
                      By making any User Content available through the Service, you grant to TrueFans a non-exclusive, transferable, sublicensable, worldwide, royalty-free license to use, copy, modify, create derivative works based upon, distribute, publicly display, and publicly perform your User Content in connection with operating and providing the Service.
                    </p>
                    <h3>4.2 Content Representations and Warranties</h3>
                    <p>
                      You are solely responsible for your User Content and the consequences of posting or publishing it. By posting or publishing User Content, you represent and warrant that:
                    </p>
                    <ul>
                      <li>You are the creator and owner of the User Content or have the necessary licenses, rights, consents, and permissions to authorize TrueFans to use your User Content as described in these Terms.</li>
                      <li>Your User Content, and the use of it by TrueFans as contemplated by these Terms, does not and will not: (i) infringe, violate, or misappropriate any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; (ii) slander, defame, libel, or invade the right of privacy, publicity, or other property rights of any person; or (iii) violate any applicable law or regulation.</li>
                    </ul>
                    <h3>4.3 Content Removal</h3>
                    <p>
                      We reserve the right, but are not obligated, to review, monitor, or remove User Content at our sole discretion at any time and for any reason, without notice to you.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'conduct' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="conduct">5. Acceptable Use</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      You agree not to engage in any of the following prohibited activities:
                    </p>
                    <ul>
                      <li>Using the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
                      <li>Harassing, threatening, intimidating, or stalking any other User of the Service.</li>
                      <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
                      <li>Interfering with or disrupting the Service or servers or networks connected to the Service.</li>
                      <li>Attempting to gain unauthorized access to the Service, user accounts, or computer systems or networks connected to the Service.</li>
                      <li>Collecting or harvesting any information from the Service, including user account information, without permission.</li>
                      <li>Posting or transmitting any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                      <li>Posting or transmitting any content that contains viruses, corrupted files, or any other similar software or programs that may damage the operation of another's computer.</li>
                      <li>Engaging in any automated use of the system, such as using scripts to add friends or send comments or messages.</li>
                      <li>Interfering with, disrupting, or creating an undue burden on the Service or the networks or services connected to the Service.</li>
                      <li>Attempting to bypass any measures of the Service designed to prevent or restrict access to the Service, or any portion of the Service.</li>
                      <li>Using the Service in a manner inconsistent with any and all applicable laws and regulations.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeSection === 'payments' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="payments">6. Payments & Donations</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      TrueFans facilitates Donations from Fans to Artists. By making a Donation, you agree to the following terms:
                    </p>
                    <h3>6.1 Donation Distribution</h3>
                    <p>
                      When a Fan makes a Donation to an Artist, the funds are distributed as follows:
                    </p>
                    <ul>
                      <li>80% of the Donation amount goes to the Artist.</li>
                      <li>2.5% of the Donation amount goes to the Tier 1 Affiliate (if applicable).</li>
                      <li>2.5% of the Donation amount goes to the Tier 2 Affiliate (if applicable).</li>
                      <li>15% of the Donation amount is retained by TrueFans as a platform fee.</li>
                    </ul>
                    <p>
                      If there are no Affiliates associated with a Donation, TrueFans retains the full 20% platform fee.
                    </p>
                    <h3>6.2 Payment Processing</h3>
                    <p>
                      TrueFans uses third-party payment processors to process Donations. By making a Donation, you agree to comply with the terms and conditions of these payment processors, in addition to these Terms.
                    </p>
                    <h3>6.3 Refunds</h3>
                    <p>
                      All Donations are final and non-refundable, except in cases of unauthorized use or technical error. If you believe a Donation was made in error or without authorization, please contact us immediately.
                    </p>
                    <h3>6.4 Taxes</h3>
                    <p>
                      Artists and Affiliates are responsible for reporting and paying any taxes on income received through the Service. TrueFans will provide appropriate tax documentation as required by law.
                    </p>
                    <h3>6.5 Payment Holds</h3>
                    <p>
                      TrueFans reserves the right to place a hold on payments or Donations if we suspect fraudulent activity or a violation of these Terms. We will investigate any such activity and may require additional information from you before releasing the hold.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'affiliate' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="affiliate">7. Affiliate Program</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      TrueFans offers an affiliate program that allows Users to earn commissions by referring new Users to the Service. By participating in the affiliate program, you agree to the following terms:
                    </p>
                    <h3>7.1 Affiliate Structure</h3>
                    <p>
                      Our affiliate program uses a two-tier structure:
                    </p>
                    <ul>
                      <li>Tier 1: You earn a 2.5% commission on all Donations made by Users you directly refer to the Service.</li>
                      <li>Tier 2: You earn a 2.5% commission on all Donations made by Users referred by your Tier 1 referrals.</li>
                    </ul>
                    <h3>7.2 Affiliate Tracking</h3>
                    <p>
                      Referrals are tracked through unique affiliate links and cookies. A User must click on your affiliate link and create an account within 90 days to be considered your referral. Once a User is linked to your affiliate account, you will receive commissions on their Donations for as long as they remain active on the platform.
                    </p>
                    <h3>7.3 Commission Payments</h3>
                    <p>
                      Commissions are calculated daily and paid monthly, provided you have reached the minimum payout threshold of $25. Payments are made by the 15th of each month for the previous month's earnings.
                    </p>
                    <h3>7.4 Prohibited Affiliate Activities</h3>
                    <p>
                      As an Affiliate, you agree not to:
                    </p>
                    <ul>
                      <li>Use misleading or deceptive tactics to promote TrueFans.</li>
                      <li>Send unsolicited emails (spam) to promote your affiliate link.</li>
                      <li>Bid on TrueFans branded keywords in search engines.</li>
                      <li>Represent yourself as the official TrueFans platform.</li>
                      <li>Promote TrueFans on sites with adult, violent, or discriminatory content.</li>
                      <li>Create fake accounts or engage in fraudulent activities to generate commissions.</li>
                    </ul>
                    <h3>7.5 Termination of Affiliate Status</h3>
                    <p>
                      TrueFans reserves the right to terminate your participation in the affiliate program at any time for any reason, including but not limited to violation of these Terms. Upon termination, any unpaid commissions may be forfeited.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'intellectual' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="intellectual">8. Intellectual Property</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      The Service and its original content, features, and functionality are owned by TrueFans and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                    </p>
                    <h3>8.1 TrueFans Content</h3>
                    <p>
                      The TrueFans name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of TrueFans or its affiliates or licensors. You may not use such marks without the prior written permission of TrueFans.
                    </p>
                    <h3>8.2 Third-Party Content</h3>
                    <p>
                      The Service may contain links to third-party websites, services, or content that are not owned or controlled by TrueFans. TrueFans has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that TrueFans shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
                    </p>
                    <h3>8.3 Copyright Infringement</h3>
                    <p>
                      If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide TrueFans's copyright agent with the following information:
                    </p>
                    <ul>
                      <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest.</li>
                      <li>A description of the copyrighted work that you claim has been infringed.</li>
                      <li>A description of where the material that you claim is infringing is located on the Service.</li>
                      <li>Your address, telephone number, and email address.</li>
                      <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                      <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                    </ul>
                    <p>
                      TrueFans's copyright agent for notice of claims of copyright infringement can be reached at copyright@truefansconnect.com.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'termination' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="termination">9. Termination</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      TrueFans reserves the right to terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                    </p>
                    <p>
                      Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                    </p>
                    <p>
                      All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'disclaimer' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="disclaimer">10. Disclaimers</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TRUEFANS AND ITS AFFILIATES, SUBSIDIARIES, PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                    <p>
                      TRUEFANS MAKES NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR REQUIREMENTS, (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'limitation' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="limitation">11. Limitation of Liability</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      IN NO EVENT SHALL TRUEFANS, ITS AFFILIATES, SUBSIDIARIES, PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
                    </p>
                    <p>
                      IN NO EVENT SHALL TRUEFANS'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING OR USING THE SERVICE DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
                    </p>
                    <p>
                      SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU. THESE TERMS GIVE YOU SPECIFIC LEGAL RIGHTS, AND YOU MAY ALSO HAVE OTHER RIGHTS WHICH VARY FROM JURISDICTION TO JURISDICTION.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'indemnification' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="indemnification">12. Indemnification</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      You agree to defend, indemnify, and hold harmless TrueFans, its affiliates, subsidiaries, partners, officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Service; (ii) your violation of any term of these Terms; (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right; or (iv) any claim that your User Content caused damage to a third party. This defense and indemnification obligation will survive these Terms and your use of the Service.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'governing' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="governing">13. Governing Law</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      These Terms shall be governed and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions.
                    </p>
                    <p>
                      Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'changes' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="changes">14. Changes to Terms</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      TrueFans reserves the right, at its sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on the Service and updating the "Last Updated" date at the top of these Terms.
                    </p>
                    <p>
                      Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new Terms, you must stop using the Service.
                    </p>
                    <p>
                      It is your responsibility to review these Terms periodically for changes. We encourage you to review these Terms whenever you access the Service.
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
                  <h2 className="text-3xl font-bold mb-6 text-indigo-400" id="contact">15. Contact Information</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p>
                      If you have any questions about these Terms, please contact us at:
                    </p>
                    <p>
                      TrueFans Connect<br />
                      123 Music Lane<br />
                      Austin, TX 78704<br />
                      United States
                    </p>
                    <p>
                      Email: legal@truefansconnect.com<br />
                      Phone: (512) 555-1234
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
