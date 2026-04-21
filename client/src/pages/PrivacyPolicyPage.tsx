import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold font-inter mb-2 text-white">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-8">Effective Date: April 11, 2026 | Last Updated: April 11, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-300">

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Who We Are</h2>
              <p>
                JamesDevPro ("we," "us," or "our") is an AI automation consulting business operated by James D, based in Broward County, Florida. Our website is located at <strong className="text-white">jamesdev.pro</strong>. We provide emergency workflow rescue, agentic AI deployment, and private LLM infrastructure services.
              </p>
              <p className="mt-2">
                For privacy-related inquiries, contact us at: <a href="mailto:hello@jamesdev.pro" className="text-primary hover:underline">hello@jamesdev.pro</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-white mb-2">Information You Provide Directly</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Name, email address, and phone number when you submit the contact form</li>
                <li>Service type, urgency level, and location preferences from the contact form</li>
                <li>Payment information processed by Stripe (we do not store card data directly)</li>
                <li>Booking details when you schedule via Cal.com</li>
                <li>Any messages or project descriptions you share with us</li>
              </ul>
              <h3 className="text-lg font-semibold text-white mb-2 mt-4">Information Collected Automatically</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>IP address, browser type, and operating system</li>
                <li>Pages viewed and time spent on our site (if analytics are enabled)</li>
                <li>Referral sources (how you found us)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>To respond to your inquiry or service request</li>
                <li>To process payments via Stripe's secure payment infrastructure</li>
                <li>To schedule and manage consultations through Cal.com</li>
                <li>To send service-related communications (project updates, invoices)</li>
                <li>To improve our website and service offerings</li>
                <li>To comply with legal obligations</li>
              </ul>
              <p className="mt-2">We do not sell, rent, or share your personal information with third parties for their marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Third-Party Services</h2>
              <p>We use the following third-party services, each with their own privacy policies:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li><strong className="text-white">Stripe</strong> — Payment processing (<a href="https://stripe.com/privacy" target="_blank" rel="noreferrer" className="text-primary hover:underline">stripe.com/privacy</a>)</li>
                <li><strong className="text-white">Cal.com</strong> — Appointment scheduling (<a href="https://cal.com/privacy" target="_blank" rel="noreferrer" className="text-primary hover:underline">cal.com/privacy</a>)</li>
                <li><strong className="text-white">Netlify</strong> — Website hosting and form processing (<a href="https://www.netlify.com/privacy/" target="_blank" rel="noreferrer" className="text-primary hover:underline">netlify.com/privacy</a>)</li>
                <li><strong className="text-white">Google Fonts</strong> — Typography delivery (may load from Google's CDN)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Data Retention</h2>
              <p>
                We retain contact form submissions and client information for a period of 3 years following our last interaction, or as required by applicable law. Payment records are retained as required by tax and accounting regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal data (subject to legal retention requirements)</li>
                <li>Object to or restrict our processing of your data</li>
                <li>Request a portable copy of your data</li>
              </ul>
              <p className="mt-2">To exercise any of these rights, email us at <a href="mailto:hello@jamesdev.pro" className="text-primary hover:underline">hello@jamesdev.pro</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Florida Privacy Rights</h2>
              <p>
                As a Florida-based business, we comply with applicable Florida privacy laws. Florida residents may contact us to request information about any personal data we have collected about them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Security</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your personal information. All payment transactions are processed by Stripe using industry-standard TLS encryption. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page will reflect any changes. Continued use of our site after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, contact us at:
              </p>
              <div className="mt-3 bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-white font-semibold">JamesDevPro</p>
                <p>Email: <a href="mailto:hello@jamesdev.pro" className="text-primary hover:underline">hello@jamesdev.pro</a></p>
                <p>Phone: <a href="tel:+19545944040" className="text-primary hover:underline">954-594-4040</a></p>
                <p>Location: Broward County, Florida</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
