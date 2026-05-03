import React from 'react';
import { Link } from 'wouter';
import { usePageSEO } from '../hooks/usePageSEO';

const pillars = [
  {
    number: '01',
    icon: 'fa-fingerprint',
    title: 'Exclusivity',
    color: 'blue',
    borderClass: 'border-blue-500/30',
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-400',
    promise: 'One automation partner per industry in your market.',
    detail: 'We don\'t compete with ourselves. When we take you on in your industry and geography, we won\'t work with a direct competitor. You get our full strategic focus, not a divided one. We can only make one client #1, and we intend it to be you.',
  },
  {
    number: '02',
    icon: 'fa-chart-line',
    title: 'Results or Refund',
    color: 'green',
    borderClass: 'border-green-500/30',
    iconBg: 'bg-green-500/10',
    iconText: 'text-green-400',
    gradient: 'from-green-500 to-emerald-400',
    promise: 'If your automations don\'t measurably reduce workload within 30 days, full refund.',
    detail: 'We stand behind every system we deploy. If you\'re not seeing measurable time savings, error reduction, or workflow efficiency within the first 30 days of your managed plan, we refund 100% of your investment — no questions asked, no hoops to jump through.',
  },
  {
    number: '03',
    icon: 'fa-file-code',
    title: 'Transparent Build',
    color: 'violet',
    borderClass: 'border-violet-500/30',
    iconBg: 'bg-violet-500/10',
    iconText: 'text-violet-400',
    gradient: 'from-violet-500 to-purple-400',
    promise: 'Every workflow documented. You own it outright. Always.',
    detail: 'Every system we build is documented, version-controlled, and handed to you completely. No black boxes, no proprietary lock-in, no "you need us to make changes." The moment we build it, it\'s yours. We build in open tools (n8n, open-source LLMs) specifically so you\'re never dependent on our continued involvement.',
  },
  {
    number: '04',
    icon: 'fa-bolt',
    title: 'Emergency SLA',
    color: 'amber',
    borderClass: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    gradient: 'from-amber-500 to-yellow-400',
    promise: 'Same-day response for managed clients. Emergency calls answered.',
    detail: 'Automations don\'t break on schedule. When yours does — at 2AM before a board presentation or on the Friday before a launch — managed clients reach us directly and we respond the same day. For on-premise clients, emergency response is guaranteed within 2 hours during business days.',
  },
  {
    number: '05',
    icon: 'fa-unlock-alt',
    title: 'No Lock-In Architecture',
    color: 'pink',
    borderClass: 'border-pink-500/30',
    iconBg: 'bg-pink-500/10',
    iconText: 'text-pink-400',
    gradient: 'from-pink-500 to-rose-400',
    promise: 'We build on open tools. You can always walk away with everything intact.',
    detail: 'We deliberately choose open-source, self-hostable tools: n8n instead of proprietary iPaaS, open-weight LLMs instead of API-only models, VPS infrastructure you control. If our relationship ever ends, you inherit a fully functional system — not a pile of vendor-locked credentials. Our goal is to make ourselves optional, not indispensable.',
  },
];

const PromisePage: React.FC = () => {
  usePageSEO({
    title: 'The JamesDev Promise — 5 Guarantees Every Client Gets',
    description: 'Our 5-pillar promise: Exclusivity, Results or Refund, Transparent Build, Emergency SLA, and No Lock-In Architecture. Every engagement. No exceptions.',
    canonical: 'https://jamesdev.pro/promise',
  });

  return (
    <div className="py-16 space-y-16">
      {/* Hero */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-14 text-center relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <span className="relative inline-flex items-center bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-2 rounded-full font-medium text-xs sm:text-sm mb-6">
            <i className="fas fa-shield-alt mr-2" />
            The JamesDev Promise
          </span>

          <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-5 text-white leading-tight">
            Five Pillars.{' '}
            <span className="text-gradient animate-gradient">Zero Exceptions.</span>
          </h1>
          <p className="relative text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Every client engagement is backed by five explicit guarantees. Not buried in a pricing card — written here, with our names on them.
          </p>

          <div className="relative inline-flex items-center bg-green-500/10 border border-green-500/20 text-green-300 px-6 py-3 rounded-full text-sm font-semibold">
            <i className="fas fa-check-circle mr-2" />
            Applicable to all managed plan engagements
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-6">
          {pillars.map((p) => (
            <div
              key={p.number}
              className={`group bg-black/30 backdrop-blur-md border ${p.borderClass} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl`}
            >
              <div className={`h-1 bg-gradient-to-r ${p.gradient}`} />
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-5">
                  {/* Number */}
                  <div className="shrink-0 hidden sm:flex flex-col items-center">
                    <span className={`text-4xl font-bold ${p.iconText} opacity-20 font-inter leading-none`}>{p.number}</span>
                  </div>

                  {/* Icon + Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                        <i className={`fas ${p.icon} ${p.iconText}`} />
                      </div>
                      <h3 className="text-xl font-bold text-white font-inter">{p.title}</h3>
                    </div>

                    {/* Promise statement */}
                    <p className={`${p.iconText} font-semibold text-base mb-3`}>"{p.promise}"</p>

                    {/* Detail */}
                    <p className="text-gray-400 text-sm leading-relaxed">{p.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Note */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10">
          <div className="flex items-start gap-5">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
              <i className="fas fa-quote-left text-primary text-lg" />
            </div>
            <div>
              <p className="text-gray-300 text-base leading-relaxed mb-4 italic">
                "The guarantees above aren't a legal document — they're how I sleep at night. Every system I build is one I'd stake my reputation on. If I wouldn't deploy it for myself, I won't deploy it for you. The promise is the practice."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/james-profile.png"
                  alt="James D"
                  className="w-10 h-10 rounded-full object-cover object-top border-2 border-white/20 -scale-x-100"
                />
                <div>
                  <p className="text-white font-semibold text-sm">James D.</p>
                  <p className="text-gray-500 text-xs">Fractional Automation Architect — JamesDev</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="bg-black/20 backdrop-blur-md border border-primary/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold font-inter text-white mb-4">
              Hold Us to Every Word
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto text-sm">
              These aren't marketing promises. They're operational standards. Book a call and ask us anything — including how each pillar applies to your situation.
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
                href="/ideal-client"
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 text-center"
              >
                See If You're a Fit →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromisePage;
