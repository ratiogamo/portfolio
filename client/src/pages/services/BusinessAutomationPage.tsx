import React from 'react';
import { Button } from '../../components/ui/button';
import n8nLogo from '../../assets/logos/N8n-logo-new.png';
import zapierLogo from '../../assets/logos/Zapier-Logo.png';
import { Make } from '@lobehub/icons';

const BusinessAutomationPage: React.FC = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-cogs text-4xl text-primary mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Business Workflow Automation</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Eliminate manual tasks, connect your business tools, and save thousands of hours with custom automation solutions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4 text-white">Stop Wasting Time on Repetitive Work</h2>
              <p className="text-gray-300 mb-4">
                Your team's time is too valuable for manual data entry and repetitive tasks. I design and implement robust automation systems that handle the busywork, freeing your team to focus on high-impact activities that drive growth.
              </p>
              <p className="text-gray-300">
                From client onboarding to financial reporting, we can streamline any process.
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg border border-white/10">
              <img src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="Automation Workflow" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Core Automation Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-sitemap text-2xl text-primary"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Process Analysis & Design</h4>
                <p className="text-sm text-gray-400">I analyze your existing workflows to identify bottlenecks and design optimized, automated processes from the ground up.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-plug text-2xl text-primary"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Platform Integration</h4>
                <p className="text-sm text-gray-400">I connect all your essential business tools (CRM, email, project management, etc.) into a single, seamless system.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tools text-2xl text-primary"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Ongoing Support & Optimization</h4>
                <p className="text-sm text-gray-400">Automation isn't 'set it and forget it.' I provide ongoing support to ensure your systems run smoothly and adapt to your business needs.</p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Expertise in Leading Platforms</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
              <Make.Color size={32} />
              <img src={zapierLogo} alt="Zapier" className="h-8 filter brightness-0 invert" title="Zapier" />
              <img src={n8nLogo} alt="n8n" className="h-8 filter brightness-0 invert" title="n8n" />
              <img src="https://asset.brandfetch.io/idL3_22r2I/idY2vBEc_d.svg" alt="Airtable" className="h-8" title="Airtable" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Ready to Automate Your Business?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let's discuss how we can streamline your operations and boost efficiency with custom automation solutions.
          </p>
          <Button size="lg" data-cal-link="ratio/30min">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BusinessAutomationPage;