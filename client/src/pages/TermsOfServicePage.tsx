import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold font-inter mb-2 text-white">Terms of Service</h1>
          <p className="text-gray-400 text-sm mb-8">Effective Date: April 11, 2026 | Last Updated: April 11, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-300">

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using the website at <strong className="text-white">jamesdev.pro</strong>, submitting a contact form, or purchasing any service from JamesDevPro ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.
              </p>
              <p className="mt-2">
                JamesDevPro is operated by James D, an independent AI automation consultant based in Broward County, Florida.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Services Provided</h2>
              <p>JamesDevPro provides the following consulting and technical services:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li>Emergency workflow rescue and automation repair</li>
                <li>Agentic AI system design and deployment</li>
                <li>Private LLM infrastructure setup and configuration</li>
                <li>Business workflow automation (n8n, Make.com, Zapier)</li>
                <li>Legal firm automation (MyCase, Clio integration)</li>
                <li>AI integration consulting</li>
              </ul>
              <p className="mt-2">
                The specific scope, deliverables, timeline, and pricing for each engagement will be agreed upon between the parties before work commences, either via email, proposal, or contract.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Payment Terms</h2>
              <h3 className="text-lg font-semibold text-white mb-2">Emergency Audit ($200)</h3>
              <p>Payment is collected upfront via Stripe before the audit session begins. The $200 Emergency Audit covers a 2-hour diagnostic session resulting in a written diagnosis and action plan. No refunds once the session has commenced.</p>

              <h3 className="text-lg font-semibold text-white mb-2 mt-4">Rescue Retainer ($500)</h3>
              <p>The Rescue Retainer packages a prioritized engagement block. Unused retainer hours may be applied to future work within 60 days of purchase. No cash refunds after work has begun.</p>

              <h3 className="text-lg font-semibold text-white mb-2 mt-4">Agentic Starter Package ($1,500)</h3>
              <p>A 50% deposit is required to begin work. The remaining balance is due upon project completion. Refunds of the deposit are available only if work has not yet commenced.</p>

              <h3 className="text-lg font-semibold text-white mb-2 mt-4">Hourly Work ($75–$150/hr)</h3>
              <p>Billed in 1-hour minimum increments. Invoices are due within 7 days of issuance.</p>

              <p className="mt-4">All payments are processed securely through Stripe. We do not store credit card information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Refund Policy</h2>
              <p>
                Given the nature of technical consulting, refunds are generally not available once work has commenced. If you believe a service was not delivered as described, contact us at <a href="mailto:hello@jamesdev.pro" className="text-primary hover:underline">hello@jamesdev.pro</a> within 7 days of service delivery. We will work in good faith to resolve any disputes.
              </p>
              <p className="mt-2">
                For scheduling cancellations via Cal.com: cancellations made more than 24 hours before a scheduled session will be rescheduled at no charge. No-shows or cancellations within 24 hours may forfeit the session.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Intellectual Property</h2>
              <p>
                Upon full payment, you receive ownership of all custom code, workflows, and automation systems we build specifically for your project. We retain the right to describe the general nature of work performed in our portfolio and marketing materials (without revealing confidential business information).
              </p>
              <p className="mt-2">
                Pre-existing tools, frameworks, and methodologies we use remain the property of their respective owners. All content on jamesdev.pro (text, images, design) is © JamesDevPro and may not be reproduced without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Confidentiality</h2>
              <p>
                We treat all client business information, system architecture, and data shared with us as strictly confidential. We will not disclose your proprietary information to third parties without your consent, except as required by law.
              </p>
              <p className="mt-2">
                If your project requires a formal Non-Disclosure Agreement (NDA), we are happy to execute one prior to beginning work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Limitation of Liability</h2>
              <p>
                JamesDevPro's liability for any claim arising from our services is limited to the total amount paid by you for the specific service giving rise to the claim. We are not liable for indirect, incidental, consequential, or punitive damages.
              </p>
              <p className="mt-2">
                Emergency response services are provided under time pressure. While we make every effort to diagnose and resolve issues accurately, we cannot guarantee specific outcomes in emergency scenarios beyond our reasonable control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Governing Law</h2>
              <p>
                These Terms of Service are governed by the laws of the State of Florida. Any disputes shall be resolved in the courts of Broward County, Florida, and you consent to personal jurisdiction there.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Changes to Terms</h2>
              <p>
                We may update these Terms of Service at any time. The "Last Updated" date reflects the most recent revision. Continued use of our services after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. Contact</h2>
              <p>Questions about these terms? Contact us at:</p>
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

export default TermsOfServicePage;
