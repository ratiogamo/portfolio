import React, { useState } from 'react';
import { Link } from 'wouter';
import { usePageSEO } from '../hooks/usePageSEO';

const industries = [
  {
    id: 'legal',
    icon: 'fa-balance-scale',
    name: 'Law Firms & Legal Tech',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-400',
    borderClass: 'border-blue-500/40',
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-400',
    tagBg: 'bg-blue-500/15',
    tagText: 'text-blue-300',
    dot: 'bg-blue-400',
    fit: [
      'Drowning in manual client intake (MyCase, Clio, Lawmatics)',
      'Paralegals copy-pasting between 3+ systems daily',
      'Missing follow-ups costing settled cases',
      'Need AI-powered document review without cloud exposure',
      'Ready to automate billing, scheduling, and status updates',
    ],
    notFit: 'Solo practitioners with fewer than 3 active matters per week.',
    result: '8–15 hrs/week saved per staff member. Intake errors reduced to near-zero.',
  },
  {
    id: 'agencies',
    icon: 'fa-bullhorn',
    name: 'Marketing & Creative Agencies',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-400',
    borderClass: 'border-pink-500/40',
    iconBg: 'bg-pink-500/10',
    iconText: 'text-pink-400',
    tagBg: 'bg-pink-500/15',
    tagText: 'text-pink-300',
    dot: 'bg-pink-400',
    fit: [
      'Manually generating client reports every week/month',
      'Onboarding new clients takes days instead of hours',
      'Zapier chains that break constantly and silently',
      'Need AI-generated content pipelines fit to your brand voice',
      'Want agentic ad monitoring and budget reallocation',
    ],
    notFit: 'Solopreneurs running a single client retainer.',
    result: 'Client reporting automated end-to-end. Onboarding cut from 3 days to 4 hours.',
  },
  {
    id: 'ecommerce',
    icon: 'fa-shopping-cart',
    name: 'eCommerce & Retail',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-400',
    borderClass: 'border-emerald-500/40',
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    tagBg: 'bg-emerald-500/15',
    tagText: 'text-emerald-300',
    dot: 'bg-emerald-400',
    fit: [
      'Inventory sync between Shopify, warehouse, and 3PLs is manual',
      'Customer support volume is outpacing your team',
      'Returns and exchanges handled ad-hoc, inconsistently',
      'Want AI chatbots with real product knowledge',
      'Need automated review generation and reputation management',
    ],
    notFit: 'Dropshippers doing under $10K/mo in revenue.',
    result: 'Support ticket volume reduced 60%. Inventory sync errors eliminated.',
  },
  {
    id: 'saas',
    icon: 'fa-code',
    name: 'SaaS & Tech Companies',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-400',
    borderClass: 'border-violet-500/40',
    iconBg: 'bg-violet-500/10',
    iconText: 'text-violet-400',
    tagBg: 'bg-violet-500/15',
    tagText: 'text-violet-300',
    dot: 'bg-violet-400',
    fit: [
      'Need private LLM infra without sending data to OpenAI',
      'Internal tooling is still manual scripts and spreadsheets',
      'Want AI-powered customer success and churn prevention',
      'Need MCP servers for internal agentic systems',
      'Building products that require embedded AI',
    ],
    notFit: 'Pre-revenue startups with no product-market fit yet.',
    result: 'Private AI infrastructure deployed in <2 weeks. Zero data leaves your VPS.',
  },
  {
    id: 'healthcare',
    icon: 'fa-heartbeat',
    name: 'Healthcare & Medical',
    color: 'red',
    gradient: 'from-red-500 to-orange-400',
    borderClass: 'border-red-500/40',
    iconBg: 'bg-red-500/10',
    iconText: 'text-red-400',
    tagBg: 'bg-red-500/15',
    tagText: 'text-red-300',
    dot: 'bg-red-400',
    fit: [
      'Patient intake, scheduling, and reminders are all manual',
      'Staff spending hours on insurance verification calls',
      'Need HIPAA-aware, on-premise AI (private by design)',
      'Referral management lives in a spreadsheet',
      'Want AI that reads intake forms and flags priority cases',
    ],
    notFit: 'Practices not yet using any practice management software.',
    result: 'No-show rate cut by 35%. Staff reclaims 10+ hrs/week on admin.',
  },
  {
    id: 'realestate',
    icon: 'fa-home',
    name: 'Real Estate & Property',
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-400',
    borderClass: 'border-amber-500/40',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    tagBg: 'bg-amber-500/15',
    tagText: 'text-amber-300',
    dot: 'bg-amber-400',
    fit: [
      'Lead follow-up is slow or inconsistent',
      'CRM (KVCore, Follow Up Boss, LionDesk) barely used',
      'Transaction coordination is a manual email chain',
      'Want automated listing syndication and status updates',
      'Need AI agents that qualify and nurture leads 24/7',
    ],
    notFit: 'Individual agents doing fewer than 2 transactions per month.',
    result: 'Lead response time under 90 seconds. Agents close 20% more deals.',
  },
];

const IdealClientPage: React.FC = () => {
  usePageSEO({
    title: 'Is JamesDev Right For You? — Fractional Automation Architect',
    description: 'We partner with law firms, agencies, eCommerce, SaaS, healthcare, and real estate companies ready to automate at scale. See if your business fits.',
    canonical: 'https://jamesdev.pro/ideal-client',
  });

  const [activeId, setActiveId] = useState('legal');
  const active = industries.find((i) => i.id === activeId)!;

  return (
    <div className="py-16 space-y-16">
      {/* Hero */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-14 text-center relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <span className="relative inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full font-medium text-xs sm:text-sm mb-6">
            <i className="fas fa-user-check mr-2 text-primary" />
            Client Fit Assessment
          </span>

          <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-5 text-white leading-tight">
            Is JamesDev{' '}
            <span className="text-gradient animate-gradient">Right For You?</span>
          </h1>
          <p className="relative text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            We don't take every client. We partner with businesses that are operationally ready to automate — and serious about making it the last time they deal with this problem.
          </p>

          <div className="relative flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><i className="fas fa-check-circle text-green-400" />50+ companies automated</span>
            <span className="flex items-center gap-1.5"><i className="fas fa-check-circle text-green-400" />6 industries served</span>
            <span className="flex items-center gap-1.5"><i className="fas fa-check-circle text-green-400" />$2M+ in labor costs eliminated</span>
          </div>
        </div>
      </section>

      {/* We can help if */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-white mb-3">We Can Help You If…</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">Across industries, the businesses we work with best share the same DNA.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            { icon: 'fa-fire', text: 'You have a proven product or service and want to scale without hiring linearly.' },
            { icon: 'fa-tools', text: 'Your team spends 10+ hours per week on tasks that should be automated.' },
            { icon: 'fa-shield-alt', text: 'You care about data privacy and want AI without sending data to third-party clouds.' },
            { icon: 'fa-chart-line', text: 'You\'re results-driven and understand automation is an investment, not a cost.' },
            { icon: 'fa-handshake', text: 'You\'re looking for a long-term partner — not a one-time fix.' },
            { icon: 'fa-lightbulb', text: 'You\'re open to rethinking workflows — not just digitizing broken ones.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <i className={`fas ${item.icon} text-primary`} />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Selector */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center bg-white/5 border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
            <i className="fas fa-industry mr-2 text-primary" />
            By Industry
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-white">
            Find Your <span className="text-gradient animate-gradient">Industry Fit</span>
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
            Select your industry to see specific pain points we solve and typical results.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {industries.map((ind) => {
            const isActive = activeId === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? `${ind.iconBg} ${ind.iconText} ${ind.borderClass}`
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <i className={`fas ${ind.icon} text-xs`} />
                {ind.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className={`bg-black/30 backdrop-blur-md border ${active.borderClass} rounded-2xl overflow-hidden transition-all duration-300`}>
          <div className={`h-1 bg-gradient-to-r ${active.gradient}`} />
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${active.iconBg} ring-2 ring-white/10`}>
                <i className={`fas ${active.icon} text-xl ${active.iconText}`} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white font-inter">{active.name}</h3>
                <span className={`inline-flex items-center gap-1.5 ${active.tagBg} ${active.tagText} px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${active.dot} animate-pulse`} />
                  Active Vertical
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-400" />
                  You're a great fit if you…
                </h4>
                <ul className="space-y-3">
                  {active.fit.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <i className="fas fa-check text-green-400 text-xs mt-1 shrink-0" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="fas fa-minus-circle text-red-400" />
                    Not a fit if…
                  </h4>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">{active.notFit}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="fas fa-chart-line text-primary" />
                    Typical Results
                  </h4>
                  <div className={`${active.iconBg} border ${active.borderClass} rounded-xl p-4`}>
                    <p className={`${active.iconText} text-sm font-medium`}>{active.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not a Fit Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold font-inter text-white mb-6 text-center">
            This Engagement Isn't Right For Everyone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Businesses hunting for the cheapest option — we aren\'t it, and we don\'t apologize for that.',
              'Owners who want to hand off all responsibility — this is a partnership, not a vending machine.',
              'Clients who aren\'t ready to share data, document processes, or be responsive.',
              'Anyone not serious about implementation — automation ideas with no execution budget.',
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                <i className="fas fa-ban text-red-400 text-xs mt-1 shrink-0" />
                <p className="text-gray-400 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="bg-black/20 backdrop-blur-md border border-primary/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold font-inter text-white mb-4">Sound Like a Fit?</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto text-sm">
              Book a free 30-minute strategy call. We'll diagnose where automation can cut costs, reclaim time, and build something that lasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                data-cal-link="ratio/30min"
                data-cal-config='{"layout":"month_view"}'
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold transition-all duration-300"
              >
                📅 Book Free Strategy Call
              </button>
              <Link
                href="/promise"
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 text-center"
              >
                Read Our Promise →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdealClientPage;
