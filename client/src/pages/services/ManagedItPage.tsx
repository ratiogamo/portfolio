import React from 'react';
import { Button } from '../../components/ui/button';

const ManagedItPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-red-500/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <i className="fas fa-server text-4xl text-red-500 mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4">Managed IT Services & Support</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proactive, 24/7 managed IT support for South Florida businesses. We monitor your systems around the clock to prevent downtime before it happens.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4">Your On-Call, Expert IT Department</h2>
              <p className="text-gray-600 mb-4">
                Focus on running your business, not your IT. I provide comprehensive IT management that acts as an extension of your team, handling everything from server maintenance to user support with a focus on security and reliability.
              </p>
              <p className="text-gray-600">
                Serving Miami-Dade, Broward, and Palm Beach counties with local, expert support.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="Managed IT" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8">Comprehensive IT Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-2xl text-red-500"></i>
                </div>
                <h4 className="font-bold mb-2">24/7 Proactive Monitoring</h4>
                <p className="text-sm text-gray-600">I monitor your network, servers, and workstations around the clock to detect and resolve issues before they impact your business.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-hdd text-2xl text-red-500"></i>
                </div>
                <h4 className="font-bold mb-2">Server & Backup Management</h4>
                <p className="text-sm text-gray-600">Complete management of your physical and cloud servers, including regular maintenance, updates, and verified backups.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-headset text-2xl text-red-500"></i>
                </div>
                <h4 className="font-bold mb-2">Unlimited Help Desk Support</h4>
                <p className="text-sm text-gray-600">Your team gets fast, friendly, and effective support for all their IT needs, both remotely and on-site when necessary.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4">Get Reliable, Proactive IT Support</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Stop worrying about IT issues and focus on what you do best. Let's build a stable and secure IT foundation for your business.
          </p>
          <Button size="lg" data-cal-link="ratio/30min">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ManagedItPage;