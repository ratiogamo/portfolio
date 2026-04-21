import React, { useState } from 'react';
import { Link } from 'wouter';
import { usePageSEO } from '../hooks/usePageSEO';

const tiers = [
  {
    id: 'freelance',
    name: 'Freelance',
    subtitle: 'Project-Based',
    price: '$75+',
    unit: '/hr',
    annual: null,
    description: 'One-time projects, emergency fixes, and custom builds. Pay per project or hourly.',
    bestFor: 'Startups, one-time projects, emergency fixes',
    badge: null,
    borderClass: 'border-white/20',
    bgClass: '',
    features: [
      '$200 Emergency Audit (2hr deep-dive)',
      '$500 Rescue Retainer',
      'Per-project automation builds',
      'Emergency workflow rescue',
      'Agentic AI deployment',
      'Private LLM setup',
      'Same-day emergency response',
    ],
    notIncluded: [
      'Ongoing maintenance',
      'Weekly strategy calls',
      'Brand kit & marketing plan',
      'Priority support window',
      'Monthly training calls',
    ],
    cta: {
      label: '💳 $200 Emergency Audit',
      href: 'https://buy.stripe.com/8x25kD6AB0AD7N06226oo0t',
      external: true,
    },
    secondaryCta: {
      label: '💼 $500 Rescue Retainer',
      href: 'https://buy.stripe.com/00wfZh2kl9790ky2PQ6oo0u',
      external: true,
    },
  },
  {
    id: 'remote',
    name: 'Remote Managed',
    subtitle: 'Full-Service Plan',
    price: '$250',
    unit: '/mo',
    annual: '$2,949/yr',
    description: 'Everything you need to grow — automation, marketing, branding, and ongoing support. Fully remote.',
    bestFor: 'Growing businesses, remote teams, nationwide',
    badge: 'MOST POPULAR',
    borderClass: 'border-primary/50 ring-2 ring-primary/20',
    bgClass: 'bg-primary/5',
    features: [
      'Unlimited maintenance tickets',
      'Weekly strategy calls',
      'Monthly training calls',
      '365-day marketing plan',
      'Brand kit & asset storage',
      'Brand management software',
      'Business reports & filings',
      'Real-time project planning',
      '3–4 onboarding appointments',
      '30–45 day planning phase',
      '100% tax deductible',
      'Access to free ad spend programs',
    ],
    notIncluded: [
      'On-site support',
      '12–2PM priority support window',
      'Dedicated bookable time slots',
    ],
    cta: {
      label: '📅 Book Strategy Call',
      calLink: 'ratio/30min',
    },
    secondaryCta: null,
    paymentOptions: [
      { label: 'Pay in Full', price: '$2,949', note: 'Best value — save $591' },
      { label: '6-Month Plan', price: '$490/mo', note: 'Keep annual discount' },
      { label: '12-Month Plan', price: '$295/mo', note: '$3,540 total' },
    ],
  },
  {
    id: 'onpremise',
    name: 'On-Premise Managed',
    subtitle: 'White-Glove Service',
    price: '$1,000',
    unit: '/mo',
    annual: '$11,949/yr',
    description: 'Everything in Remote plus dedicated on-site support across South Florida. Your fractional tech department.',
    bestFor: 'Law firms, enterprises, South Florida businesses',
    badge: 'ENTERPRISE',
    borderClass: 'border-accent/50 ring-2 ring-accent/20',
    bgClass: 'bg-accent/5',
    features: [
      'Everything in Remote Managed',
      'On-premise support (South Florida)',
      '12–2PM priority support window',
      'Bookable 2hr slots (4hr max/day)',
      'Dedicated on-site appointments',
      'Infrastructure & hardware support',
      'Hands-on team training sessions',
      'Priority emergency response',
    ],
    notIncluded: [],
    cta: {
      label: '📅 Book Strategy Call',
      calLink: 'ratio/30min',
    },
    secondaryCta: null,
    paymentOptions: [
      { label: '50% Now + Plan', price: '$5,975 + plan', note: 'Flexible start' },
      { label: 'Pay in Full', price: '$11,949', note: 'Annual commitment' },
    ],
  },
];

const comparisonFeatures = [
  { name: 'Emergency Workflow Rescue', freelance: true, remote: true, onpremise: true },
  { name: 'Automation Builds', freelance: true, remote: true, onpremise: true },
  { name: 'Agentic AI Deployment', freelance: true, remote: true, onpremise: true },
  { name: 'Private LLM Infrastructure', freelance: true, remote: true, onpremise: true },
  { name: 'Unlimited Maintenance Tickets', freelance: false, remote: true, onpremise: true },
  { name: 'Weekly Strategy Calls', freelance: false, remote: true, onpremise: true },
  { name: 'Monthly Training Calls', freelance: false, remote: true, onpremise: true },
  { name: '365-Day Marketing Plan', freelance: false, remote: true, onpremise: true },
  { name: 'Brand Kit & Asset Storage', freelance: false, remote: true, onpremise: true },
  { name: 'Brand Management Software', freelance: false, remote: true, onpremise: true },
  { name: 'Business Reports & Filings', freelance: false, remote: true, onpremise: true },
  { name: 'Real-Time Planning', freelance: false, remote: true, onpremise: true },
  { name: 'Free Ad Spend Programs', freelance: false, remote: true, onpremise: true },
  { name: '100% Tax Deductible', freelance: false, remote: true, onpremise: true },
  { name: 'On-Premise Support', freelance: false, remote: false, onpremise: true },
  { name: '12–2PM Priority Window', freelance: false, remote: false, onpremise: true },
  { name: 'Bookable Time Slots', freelance: false, remote: false, onpremise: true },
  { name: '100% Money Back Guarantee', freelance: false, remote: true, onpremise: true },
];

const faqs = [
  {
    q: 'What does the onboarding process look like?',
    a: "We start with 3\u20134 onboarding appointments to understand your business, systems, and goals. From there, we enter a 30\u201345 day planning phase where we build your 365-day marketing plan, set up your brand kit, and configure all automation systems. You'll have full visibility via real-time planning throughout.",
  },
  {
    q: 'What counts as a "maintenance ticket"?',
    a: 'Anything related to your automation systems, workflows, or tech infrastructure. Broken integrations, update requests, new feature adds, troubleshooting — all covered. There is no cap on tickets for managed plans.',
  },
  {
    q: 'What is the Brand Management Software?',
    a: 'We provide access to professional brand management tools for storing your logo, colors, fonts, templates, and marketing assets. Your entire brand identity in one centralized, shareable location.',
  },
  {
    q: 'What are the "free ad spend programs"?',
    a: 'We help you access and apply for available advertising credit programs — including platform-specific grants and partner programs that can fund your digital advertising at no cost to you. Details provided during onboarding.',
  },
  {
    q: 'Can I switch plans later?',
    a: "Yes. You can upgrade from Freelance to a managed plan, or from Remote to On-Premise at any time. We'll prorate your billing accordingly.",
  },
  {
    q: 'What does "100% Money Back Guarantee" mean?',
    a: "If you're not 100% satisfied with your managed plan, we'll refund 100% of your investment. No questions asked. We stand behind our work completely.",
  },
  {
    q: 'Is this really 100% tax deductible?',
    a: 'Yes. As a business service expense, your managed plan investment is fully tax deductible. Consult your accountant for specifics to your situation.',
  },
  {
    q: 'How does the 12–2PM priority window work?',
    a: 'On-Premise clients get a dedicated 12–2PM EST window every business day for priority support. During this time, you have direct access for urgent issues, live troubleshooting, and strategic check-ins.',
  },
];

const Pricing: React.FC = () => {
  usePageSEO({
    title: 'Pricing & Plans | JamesDevPro — Managed Services from $250/mo',
    description: 'Three tiers to fit your business: Freelance project work, Remote Managed ($250/mo), or On-Premise Managed ($1,000/mo). 100% money back guarantee. 100% tax deductible.',
    canonical: 'https://jamesdev.pro/pricing',
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="py-16 space-y-16">
      {/* Hero */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <span className="inline-flex items-center bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <i className="fas fa-shield-alt mr-2"></i>
            100% Satisfied or 100% Money Back
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-inter mb-4 text-white">
            Plans That <span className="text-gradient animate-gradient">Scale With You</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            From one-time project work to a fully managed tech partnership. Choose the tier that fits your business.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400">
            <span className="flex items-center"><i className="fas fa-receipt text-green-400 mr-1.5"></i>100% Tax Deductible</span>
            <span className="flex items-center"><i className="fas fa-ad text-blue-400 mr-1.5"></i>Free Ad Spend Programs</span>
            <span className="flex items-center"><i className="fas fa-undo text-yellow-400 mr-1.5"></i>Money Back Guarantee</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative bg-black/20 backdrop-blur-md border ${tier.borderClass} rounded-2xl p-8 flex flex-col ${tier.bgClass} transition-transform hover:scale-[1.02] duration-300`}
            >
              {tier.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                  tier.id === 'remote'
                    ? 'bg-gradient-to-r from-primary to-blue-500 text-white'
                    : 'bg-gradient-to-r from-accent to-purple-500 text-white'
                }`}>
                  {tier.badge}
                </span>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold font-inter text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{tier.subtitle}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400">{tier.unit}</span>
                </div>
                {tier.annual && (
                  <p className="text-sm text-primary mt-1">{tier.annual} billed annually</p>
                )}
              </div>

              <p className="text-gray-300 text-sm text-center mb-6">{tier.description}</p>

              <div className="bg-white/5 rounded-lg px-4 py-2 mb-6 text-center">
                <span className="text-xs text-gray-400">Best for: </span>
                <span className="text-xs text-white font-medium">{tier.bestFor}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <i className="fas fa-check text-green-400 mr-2.5 mt-0.5 text-xs"></i>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
                {tier.notIncluded.map((feature, i) => (
                  <li key={`no-${i}`} className="flex items-start text-sm opacity-40">
                    <i className="fas fa-minus text-gray-600 mr-2.5 mt-0.5 text-xs"></i>
                    <span className="text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Payment Options */}
              {tier.paymentOptions && (
                <div className="mb-6 space-y-2">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Payment Options</p>
                  {tier.paymentOptions.map((opt, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 text-sm">
                      <div>
                        <span className="text-white font-medium">{opt.label}</span>
                        <span className="text-gray-400 text-xs ml-2">{opt.note}</span>
                      </div>
                      <span className="text-primary font-bold">{opt.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto space-y-3">
                {tier.cta.external ? (
                  <a
                    href={tier.cta.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`block w-full text-center py-3 rounded-full font-bold transition-all duration-300 ${
                      tier.id === 'remote'
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {tier.cta.label}
                  </a>
                ) : (
                  <button
                    data-cal-link={tier.cta.calLink}
                    data-cal-config='{"layout":"month_view"}'
                    className={`block w-full text-center py-3 rounded-full font-bold transition-all duration-300 ${
                      tier.id === 'remote'
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : tier.id === 'onpremise'
                        ? 'bg-accent hover:bg-accent/90 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {tier.cta.label}
                  </button>
                )}
                {tier.secondaryCta && (
                  <a
                    href={tier.secondaryCta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center py-3 rounded-full font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                  >
                    {tier.secondaryCta.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-green-900/20 backdrop-blur-md border-2 border-green-500/30 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-shield-alt text-3xl text-green-400"></i>
          </div>
          <h2 className="text-3xl font-bold font-inter mb-3 text-white">100% Satisfied or 100% Money Back</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-4">
            We stand behind every managed plan we deliver. If you're not completely satisfied with your results, we'll refund your full investment. No questions asked.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="text-green-300"><i className="fas fa-check-circle mr-1"></i> Zero Risk</span>
            <span className="text-green-300"><i className="fas fa-check-circle mr-1"></i> Full Refund</span>
            <span className="text-green-300"><i className="fas fa-check-circle mr-1"></i> No Questions Asked</span>
          </div>
        </div>
      </section>

      {/* Onboarding Timeline */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-inter mb-3 text-center text-white">How Onboarding Works</h2>
          <p className="text-gray-300 text-center mb-10 max-w-xl mx-auto">
            From first call to fully operational — here's what the first 45 days look like.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: 'fa-handshake', title: 'Discovery Call', desc: 'We learn your business, goals, and pain points', time: 'Day 1' },
              { icon: 'fa-clipboard-list', title: '3–4 Onboarding Sessions', desc: 'Deep-dive into your systems, processes, and team', time: 'Week 1–2' },
              { icon: 'fa-drafting-compass', title: 'Planning Phase', desc: 'Build your 365-day marketing plan, brand kit, and automation roadmap', time: 'Day 15–45' },
              { icon: 'fa-rocket', title: 'Launch & Support', desc: 'Systems go live. Unlimited tickets and weekly calls begin', time: 'Day 45+' },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 to-transparent"></div>
                )}
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                  <i className={`fas ${step.icon} text-xl text-primary`}></i>
                </div>
                <span className="inline-block bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full mb-2">{step.time}</span>
                <h4 className="font-bold text-white mb-1 text-sm">{step.title}</h4>
                <p className="text-gray-400 text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto overflow-x-auto">
          <h2 className="text-3xl font-bold font-inter mb-8 text-center text-white">Compare Plans</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 text-gray-400 font-medium">Feature</th>
                <th className="text-center py-3 px-4 text-white font-bold">Freelance</th>
                <th className="text-center py-3 px-4 text-primary font-bold">Remote</th>
                <th className="text-center py-3 px-4 text-accent font-bold">On-Premise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((f, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4 text-gray-300">{f.name}</td>
                  <td className="text-center py-3 px-4">
                    {f.freelance
                      ? <i className="fas fa-check text-green-400"></i>
                      : <i className="fas fa-minus text-gray-600"></i>
                    }
                  </td>
                  <td className="text-center py-3 px-4">
                    {f.remote
                      ? <i className="fas fa-check text-green-400"></i>
                      : <i className="fas fa-minus text-gray-600"></i>
                    }
                  </td>
                  <td className="text-center py-3 px-4">
                    {f.onpremise
                      ? <i className="fas fa-check text-green-400"></i>
                      : <i className="fas fa-minus text-gray-600"></i>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Urgency CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-md border border-red-500/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-inter mb-3 text-white">
            Every Day You Wait, Your Competitors Move Ahead
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            While you're doing things manually, someone in your market is automating. Lock in your plan now and start building the systems that will put you ahead — permanently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              data-cal-link="ratio/30min"
              data-cal-config='{"layout":"month_view"}'
              className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:bg-gray-200"
            >
              Book Your Strategy Call →
            </button>
            <a
              href="tel:+19545944040"
              className="bg-red-600/80 border border-red-400/40 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-500/90"
            >
              🚨 Call Now: 954-594-4040
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-inter mb-8 text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-lg overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}></i>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-4 pb-4 text-gray-400 text-sm">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
