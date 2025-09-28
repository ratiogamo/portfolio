import React from 'react';
import { Button } from '../../components/ui/button';

const LegalTechPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-secondary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <i className="fas fa-balance-scale text-4xl text-secondary mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4">Legal Firm Automation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specialized automation for law firms. Streamline client intake, document management, and case workflows with MyCase and Clio.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4">Focus on Billable Hours, Not Paperwork</h2>
              <p className="text-gray-600 mb-4">
                Your firm's success depends on maximizing billable hours and providing excellent client service. I build custom automation systems that integrate directly with your legal practice management software to handle the administrative burden.
              </p>
              <p className="text-gray-600">
                Reduce errors, improve compliance, and give your clients a modern, efficient experience.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="Legal Automation" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8">Specialized Legal Tech Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-file-signature text-2xl text-secondary"></i>
                </div>
                <h4 className="font-bold mb-2">Automated Client Intake</h4>
                <p className="text-sm text-gray-600">Seamlessly capture client data, generate engagement letters, and create case files in your system without manual entry.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-file-alt text-2xl text-secondary"></i>
                </div>
                <h4 className="font-bold mb-2">Intelligent Document Management</h4>
                <p className="text-sm text-gray-600">Automatically generate, file, and share case documents, ensuring consistency and compliance across your firm.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-calendar-check text-2xl text-secondary"></i>
                </div>
                <h4 className="font-bold mb-2">Case Workflow Automation</h4>
                <p className="text-sm text-gray-600">Create automated workflows for deadlines, client communication, and billing reminders to keep every case on track.</p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-2xl font-bold font-inter text-center mb-8">Deep Integration with Your Legal Software</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
              <img src="https://asset.brandfetch.io/idq5bIuPAc/id50b344Gs.svg" alt="Clio" className="h-8" title="Clio" />
              <p className="font-bold text-2xl text-gray-400">MyCase</p>
              <img src="https://asset.brandfetch.io/id20mCI55N/idS_f-26h4.svg" alt="Make.com" className="h-8" title="Make.com" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4">Modernize Your Law Practice</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover how automation can increase your firm's profitability and client satisfaction.
          </p>
          <Button size="lg" data-cal-link="ratio/30min">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LegalTechPage;