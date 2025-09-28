import React from 'react';
import { Button } from '../../components/ui/button';

const NetworkSecurityPage: React.FC = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-shield-alt text-4xl text-blue-500 mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Network Security & Infrastructure</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Protect your business from cyber threats with comprehensive network security solutions, including firewall management and proactive monitoring.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4 text-white">Your First Line of Defense</h2>
              <p className="text-gray-300 mb-4">
                In today's digital landscape, a single vulnerability can be catastrophic. I design, implement, and manage multi-layered security strategies to protect your critical data, applications, and network infrastructure from evolving threats.
              </p>
              <p className="text-gray-300">
                Secure your business, ensure compliance, and gain peace of mind.
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg border border-white/10">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="Network Security" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Our Security Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-fire-alt text-2xl text-blue-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Firewall & Gateway Security</h4>
                <p className="text-sm text-gray-400">Configuration and management of next-generation firewalls to control network traffic and block malicious activity.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-crosshairs text-2xl text-blue-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Threat Monitoring & Response</h4>
                <p className="text-sm text-gray-400">24/7 monitoring of your network for suspicious activity, with rapid response protocols to neutralize threats.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-network-wired text-2xl text-blue-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Infrastructure Optimization</h4>
                <p className="text-sm text-gray-400">Design and implementation of secure, scalable, and high-performance network infrastructure for your office.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Secure Your Business Today</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Don't wait for a breach to happen. Let's perform a complimentary security assessment to identify and address your vulnerabilities.
          </p>
          <Button size="lg" data-cal-link="ratio/30min">
            Request a Security Assessment
          </Button>
        </div>
      </section>
    </div>
  );
};

export default NetworkSecurityPage;