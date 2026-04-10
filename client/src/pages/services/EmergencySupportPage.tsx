import React from 'react';
import { Button } from '../../components/ui/button';

const EmergencySupportPage: React.FC = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-phone-volume text-4xl text-orange-500 mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Emergency IT Support & Help Desk</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Rapid, on-site emergency IT support for critical issues across Miami-Dade, Broward, and Palm Beach, with guaranteed response times.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4 text-white">When Downtime is Not an Option</h2>
              <p className="text-gray-300 mb-4">
                Critical IT failures can bring your business to a standstill. My emergency response service is designed for one thing: to get you back up and running as fast as possible, minimizing financial loss and reputational damage.
              </p>
              <p className="text-gray-300">
                With a guaranteed response time of under 2 hours in South Florida, expert help is always just a call away.
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg border border-white/10">
              <img src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="Emergency Support" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Our Emergency Response Protocol</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shipping-fast text-2xl text-orange-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Rapid On-Site Dispatch</h4>
                <p className="text-sm text-gray-400">Guaranteed on-site presence in under 2 hours for businesses in Miami-Dade, Broward, and Palm Beach counties.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-diagnoses text-2xl text-orange-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Immediate Triage & Diagnosis</h4>
                <p className="text-sm text-gray-400">Quickly identify the root cause of the failure to formulate the most effective recovery plan and prevent recurrence.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-database text-2xl text-orange-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">System & Data Recovery</h4>
                <p className="text-sm text-gray-400">Expert execution of disaster recovery protocols to restore critical systems and ensure data integrity with minimal loss.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Facing an IT Crisis?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Don't wait. Get immediate, expert help to resolve your critical IT issues now.
          </p>
          <a href="tel:+1-305-555-HELP">
            <Button size="lg">
              <i className="fas fa-phone mr-2"></i> Call Emergency Support
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default EmergencySupportPage;