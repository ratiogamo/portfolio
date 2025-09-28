import React from 'react';
import { Button } from '../../components/ui/button';

const AiIntegrationPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-accent/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <i className="fas fa-robot text-4xl text-accent mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4">AI-Powered Automation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Go beyond simple automation. Leverage OpenAI and Claude to add intelligent decision-making and data processing to your workflows.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4">Make Your Systems Think</h2>
              <p className="text-gray-600 mb-4">
                Standard automation is about following rules. AI-powered automation is about making decisions. I integrate cutting-edge AI models into your workflows to handle complex tasks that normally require human judgment.
              </p>
              <p className="text-gray-600">
                From summarizing documents to categorizing customer inquiries, AI can unlock the next level of efficiency.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="AI Integration" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8">Intelligent Automation Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-brain text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2">Intelligent Data Processing</h4>
                <p className="text-sm text-gray-600">Automatically extract, analyze, and summarize information from documents, emails, and other unstructured data sources.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2">Natural Language Understanding</h4>
                <p className="text-sm text-gray-600">Build systems that can understand and categorize customer inquiries, route support tickets, and even draft responses.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lightbulb text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2">Automated Decision Making</h4>
                <p className="text-sm text-gray-600">Create workflows that can make complex, context-aware decisions based on your business rules and historical data.</p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-2xl font-bold font-inter text-center mb-8">Powered by Leading AI Models</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
              <img src="https://asset.brandfetch.io/id632aa18c/id234f236d.svg" alt="OpenAI" className="h-8" title="OpenAI" />
              <p className="font-bold text-2xl text-gray-400">Claude</p>
              <img src="https://asset.brandfetch.io/id20mCI55N/idS_f-26h4.svg" alt="Make.com" className="h-8" title="Make.com" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4">Unlock a Smarter Way to Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find out how AI can provide a competitive edge for your business.
          </p>
          <Button size="lg" data-cal-link="ratio/30min">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AiIntegrationPage;