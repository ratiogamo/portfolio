import React from 'react';
import { Button } from '../../components/ui/button';

const EmergencySupportPage: React.FC = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-bolt text-4xl text-red-500 mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Emergency Workflow Rescue</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your automation broke. Your team is blocked. Revenue is leaking. I diagnose and fix broken Zapier, Make.com, n8n, and AppSheet workflows — fast.
          </p>
          <div className="mt-6">
            <a href="tel:+19545944040" className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg animate-pulse">
              🚨 Call Now: 954-594-4040
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4 text-white">When Your Workflow Breaks at 2AM</h2>
              <p className="text-gray-300 mb-4">
                A broken automation doesn't just stop one process — it cascades. Missed client notifications. Lost leads. Duplicated data. Angry stakeholders. I've seen it all, and I fix it the same day.
              </p>
              <p className="text-gray-300">
                I specialize in untangling the mess that happens when automations built by someone else (or by you, no judgment) stop working. Broken Zapier zaps, failing Make.com scenarios, silent n8n errors, corrupted Airtable/AppSheet databases.
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg border border-red-500/20">
              <div className="space-y-4">
                <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                  <p className="text-red-200 font-bold">⏱️ Response Time</p>
                  <p className="text-red-100 text-2xl font-bold">Same Day</p>
                </div>
                <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                  <p className="text-red-200 font-bold">💰 Emergency Audit</p>
                  <p className="text-red-100 text-2xl font-bold">$200 / 2 Hours</p>
                </div>
                <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                  <p className="text-red-200 font-bold">🔧 Fix Rate</p>
                  <p className="text-red-100 text-2xl font-bold">$75-150/hr</p>
                </div>
              </div>
            </div>
          </div>

          {/* What I Rescue */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">What I Rescue</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-unlink text-2xl text-red-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Broken Integrations</h4>
                <p className="text-sm text-gray-400">Zapier zaps that silently fail. Make.com scenarios throwing errors. n8n workflows that stopped running after an update. I diagnose and fix the root cause.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-database text-2xl text-red-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Corrupted Data Pipelines</h4>
                <p className="text-sm text-gray-400">Duplicated records, missing data, broken sync. I trace the pipeline, fix the corruption, and implement safeguards to prevent recurrence.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-fire-extinguisher text-2xl text-red-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">System Failures</h4>
                <p className="text-sm text-gray-400">Critical system crashes, data recovery, and infrastructure stabilization. I get you back online and build redundancy so it doesn't happen again.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-red-900/20 backdrop-blur-md border-2 border-red-500/40 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Your Workflow Is Broken Right Now?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Don't wait for it to cascade. Get immediate diagnosis and repair.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+19545944040">
              <Button size="lg" className="bg-red-600 hover:bg-red-500 text-white">
                <i className="fas fa-phone mr-2"></i>Call Emergency Line
              </Button>
            </a>
            <a href="https://buy.stripe.com/8x25kD6AB0AD7N06226oo0t" target="_blank" rel="noreferrer">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                💳 Pay $200 Emergency Audit
              </Button>
            </a>
            <a href="https://buy.stripe.com/00wfZh2kl9790ky2PQ6oo0u" target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                💼 $500 Rescue Retainer
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencySupportPage;