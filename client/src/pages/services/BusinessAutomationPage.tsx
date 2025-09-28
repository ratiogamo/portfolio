import React from 'react';
import { Button } from '../../components/ui/button';

const BusinessAutomationPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <i className="fas fa-cogs text-4xl text-primary mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4">Business Workflow Automation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Eliminate manual tasks, connect your business tools, and save thousands of hours with custom automation solutions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4">Stop Wasting Time on Repetitive Work</h2>
              <p className="text-gray-600 mb-4">
                Your team's time is too valuable for manual data entry and repetitive tasks. I design and implement robust automation systems that handle the busywork, freeing your team to focus on high-impact activities that drive growth.
              </p>
              <p className="text-gray-600">
                From client onboarding to financial reporting, we can streamline any process.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <img src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="Automation Workflow" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8">Core Automation Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-sitemap text-2xl text-primary"></i>
                </div>
                <h4 className="font-bold mb-2">Process Analysis & Design</h4>
                <p className="text-sm text-gray-600">I analyze your existing workflows to identify bottlenecks and design optimized, automated processes from the ground up.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-plug text-2xl text-primary"></i>
                </div>
                <h4 className="font-bold mb-2">Platform Integration</h4>
                <p className="text-sm text-gray-600">I connect all your essential business tools (CRM, email, project management, etc.) into a single, seamless system.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tools text-2xl text-primary"></i>
                </div>
                <h4 className="font-bold mb-2">Ongoing Support & Optimization</h4>
                <p className="text-sm text-gray-600">Automation isn't 'set it and forget it.' I provide ongoing support to ensure your systems run smoothly and adapt to your business needs.</p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-2xl font-bold font-inter text-center mb-8">Expertise in Leading Platforms</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
              <img src="https://asset.brandfetch.io/id20mCI55N/idS_f-26h4.svg" alt="Make.com" className="h-8" title="Make.com" />
              <img src="https://asset.brandfetch.io/id43z7j17s/id5d95e60f.svg" alt="Zapier" className="h-8" title="Zapier" />
              <p className="font-bold text-2xl text-gray-400">n8n</p>
              <img src="https://asset.brandfetch.io/idL3_22r2I/idY2vBEc_d.svg" alt="Airtable" className="h-8" title="Airtable" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4">Ready to Automate Your Business?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
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