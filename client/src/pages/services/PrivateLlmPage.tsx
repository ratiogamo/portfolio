import React from 'react';
import { Button } from '../../components/ui/button';

const PrivateLlmPage: React.FC = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-lock text-4xl text-blue-500 mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Private LLM Infrastructure</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Enterprise-grade AI without data leakage. Self-hosted language models on your own infrastructure — full control, zero compromise.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4 text-white">Your AI. Your Data. Your Server.</h2>
              <p className="text-gray-300 mb-4">
                Every prompt you send to ChatGPT goes to someone else's server. For businesses handling sensitive data — legal, medical, financial — that's a liability. I deploy private LLM infrastructure where your data never leaves your control.
              </p>
              <p className="text-gray-300">
                Local models. Private VPS. Custom fine-tuning. Zero external API calls for sensitive operations.
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg border border-white/10">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="Private LLM Infrastructure" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Infrastructure Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-server text-2xl text-blue-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">VPS Deployment</h4>
                <p className="text-sm text-gray-400">Purpose-built virtual private servers optimized for LLM inference. GPU provisioning, load balancing, and auto-scaling configured for your workload.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-microchip text-2xl text-blue-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Local Model Hosting</h4>
                <p className="text-sm text-gray-400">Deploy and manage open-source models (Llama, Mistral, Phi) on your infrastructure. Quantization, fine-tuning, and prompt engineering included.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-2xl text-blue-500"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Privacy-First API Layer</h4>
                <p className="text-sm text-gray-400">Custom API gateway that routes sensitive operations to local models and non-sensitive tasks to cloud providers — best of both worlds.</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Who Needs This</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Law Firms</h4>
                <p className="text-sm text-gray-400">Attorney-client privilege demands data sovereignty. Process case documents, draft motions, and analyze contracts without external API exposure.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Healthcare Practices</h4>
                <p className="text-sm text-gray-400">HIPAA compliance requires data control. Transcribe appointments, process intake forms, and generate clinical notes on-premises.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Financial Services</h4>
                <p className="text-sm text-gray-400">SEC and FINRA regulations limit cloud AI use. Analyze filings, flag compliance issues, and process KYC documents locally.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Property Management</h4>
                <p className="text-sm text-gray-400">Automated maintenance tracking, tenant communication, and vendor coordination with sensitive tenant data kept in-house.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Take Control of Your AI</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Stop sending your sensitive data to someone else's server. Let's deploy AI that you own.
          </p>
          <Button size="lg" data-cal-link="ratio/30min" data-cal-config='{"layout":"month_view"}'>
            Book Infrastructure Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PrivateLlmPage;
