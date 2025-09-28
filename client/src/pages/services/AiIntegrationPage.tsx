import React from 'react';
import { Button } from '../../components/ui/button';
import { OpenAI, Make } from '@lobehub/icons';

const AiIntegrationPage: React.FC = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-robot text-4xl text-accent mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">AI-Powered Automation</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Go beyond simple automation. Leverage OpenAI and Claude to add intelligent decision-making and data processing to your workflows.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4 text-white">Make Your Systems Think</h2>
              <p className="text-gray-300 mb-4">
                Standard automation is about following rules. AI-powered automation is about making decisions. I integrate cutting-edge AI models into your workflows to handle complex tasks that normally require human judgment.
              </p>
              <p className="text-gray-300">
                From summarizing documents to categorizing customer inquiries, AI can unlock the next level of efficiency.
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg border border-white/10">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="AI Integration" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Intelligent Automation Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-brain text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Intelligent Data Processing</h4>
                <p className="text-sm text-gray-400">Automatically extract, analyze, and summarize information from documents, emails, and other unstructured data sources.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Natural Language Understanding</h4>
                <p className="text-sm text-gray-400">Build systems that can understand and categorize customer inquiries, route support tickets, and even draft responses.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lightbulb text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Automated Decision Making</h4>
                <p className="text-sm text-gray-400">Create workflows that can make complex, context-aware decisions based on your business rules and historical data.</p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Powered by Leading AI Models</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
              <OpenAI.Avatar size={32} />
              <p className="font-bold text-2xl text-gray-400">Claude</p>
              <Make.Color size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Unlock a Smarter Way to Work</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Find out how AI can provide a competitive edge for your business.
          </p>
          <Button size="lg" data-cal-link="ratio/30min" data-cal-config='{"layout":"month_view"}'>
            Book a Strategy Session
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AiIntegrationPage;