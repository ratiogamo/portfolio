import React from 'react';
import { Button } from '../../components/ui/button';

const AgenticArchitecturePage: React.FC = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-robot text-4xl text-accent mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Agentic Architecture Deployment</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Custom AI agents that don't just automate — they think, decide, and execute. Built on n8n, MCP servers, and autonomous orchestration frameworks.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-inter mb-4 text-white">Your Business Runs Itself</h2>
              <p className="text-gray-300 mb-4">
                Traditional automation follows rules. Agentic architecture makes decisions. I deploy AI agent systems that can research, analyze, draft, and act — with human oversight where you need it, full autonomy where you don't.
              </p>
              <p className="text-gray-300">
                From multi-step research agents to intelligent customer response systems, these aren't chatbots — they're autonomous business operators.
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg border border-white/10">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" alt="Agentic Architecture" className="rounded-lg shadow-md" />
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">What I Build</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-project-diagram text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">n8n Orchestration</h4>
                <p className="text-sm text-gray-400">Self-hosted n8n instances with custom nodes, complex branching logic, error handling, and AI-powered decision points throughout your workflows.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-plug text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">MCP Server Development</h4>
                <p className="text-sm text-gray-400">Custom Model Context Protocol servers that give AI agents direct access to your business tools — CRM, email, databases, APIs — with proper auth and guardrails.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-brain text-2xl text-accent"></i>
                </div>
                <h4 className="font-bold mb-2 text-white">Autonomous Agent Systems</h4>
                <p className="text-sm text-gray-400">Multi-agent architectures where specialized AI agents collaborate — research agents, writing agents, analysis agents — coordinated by an orchestrator.</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-2xl font-bold font-inter text-center mb-8 text-white">Real-World Deployments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Lead Research Agent</h4>
                <p className="text-sm text-gray-400">Scrapes job boards, scores leads against your ICP, generates personalized outreach — runs 24/7 without supervision.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Email Triage Agent</h4>
                <p className="text-sm text-gray-400">Reads incoming email, categorizes by urgency, drafts responses, escalates critical items — handles 80% of inbox automatically.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Document Processing Pipeline</h4>
                <p className="text-sm text-gray-400">Ingests contracts, extracts key terms, flags risks, populates CRM fields — turns hours of paralegal work into minutes.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-bold text-white mb-2">Property Maintenance Backend</h4>
                <p className="text-sm text-gray-400">Automated tenant request intake, vendor dispatch, cost tracking, and compliance reporting for property managers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Ready for Autonomous Operations?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let's architect an AI agent system that runs your business while you focus on growth.
          </p>
          <Button size="lg" data-cal-link="ratio/30min" data-cal-config='{"layout":"month_view"}'>
            Book Architecture Session
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AgenticArchitecturePage;
