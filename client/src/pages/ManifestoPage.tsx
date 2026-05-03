import React from 'react';
import { Link } from 'wouter';
import { usePageSEO } from '../hooks/usePageSEO';

const ManifestoPage: React.FC = () => {
  usePageSEO({
    title: 'The Manifesto — Why I Build This Way | JamesDev',
    description: 'Why most automation fails, why agentic AI beats rule-based workflows, and what "done" actually means. The philosophy behind every system JamesDev builds.',
    canonical: 'https://jamesdev.pro/manifesto',
  });

  return (
    <div className="py-16 space-y-12">
      {/* Hero */}
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-14 text-center relative overflow-hidden max-w-3xl mx-auto">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

          <span className="relative inline-flex items-center bg-accent/10 border border-accent/20 text-violet-300 px-4 py-2 rounded-full font-medium text-xs sm:text-sm mb-6">
            <i className="fas fa-feather-alt mr-2" />
            The JamesDev Manifesto
          </span>

          <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-5 text-white leading-tight">
            Why I Build{' '}
            <span className="text-gradient animate-gradient">This Way</span>
          </h1>
          <p className="relative text-base md:text-lg text-gray-300 max-w-xl mx-auto">
            The principles that drive every decision — from which tool I pick to how I hand off a finished system.
          </p>
        </div>
      </section>

      {/* Manifesto Body */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 space-y-12">

          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-skull-crossbones text-red-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-inter">
                Most Automation Fails. Here's Why.
              </h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                The failure isn't usually the tool. It's the architecture. Businesses bolt Zapier onto a broken process and call it "automated." They connect three apps with a webhook and celebrate. Then the process changes, the webhook breaks silently, and three months of data is wrong before anyone notices.
              </p>
              <p>
                I've inherited hundreds of these systems. They share a common pattern: they were built to <em>look</em> automated, not to <em>be</em> reliable. No error handling. No logging. No fallback. No documentation. And when the person who built it leaves, the business is stuck with a black box they're afraid to touch.
              </p>
              <p className="text-white font-medium border-l-2 border-red-400 pl-4">
                That's not automation. That's debt with a UI.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Section 2 */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-robot text-violet-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-inter">
                Why Agentic AI Beats Rule-Based Automation
              </h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Traditional automation follows rules. If X happens, do Y. That works until reality doesn't follow the script — which is constantly. An intake form arrives half-filled. A vendor changes their API format. A client writes "urgent" in lowercase. The rule breaks. A human intervenes. The "automation" becomes a full-time monitoring job.
              </p>
              <p>
                Agentic systems are different. They reason. They handle ambiguity. An AI agent doesn't need a perfect input — it reads intent, makes a decision, and flags edge cases for human review instead of silently failing. It gets better with every interaction instead of degrading every time the environment shifts.
              </p>
              <p>
                I build with n8n as the orchestration layer, plugging in LLMs at the decision points where rules break down. The result is a system that handles 95% autonomously and surfaces the other 5% intelligently — instead of failing 100% when conditions aren't perfect.
              </p>
              <p className="text-white font-medium border-l-2 border-violet-400 pl-4">
                Rules are brittle. Reasoning is resilient.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Section 3 */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-lock-open text-amber-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-inter">
                The Danger of Vendor Lock-In (And Why I Build Around It)
              </h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Every SaaS automation platform has the same business model: make switching painful. Proprietary workflows. Closed export formats. Features that only work inside their ecosystem. They call it "integration." I call it a trap.
              </p>
              <p>
                When you build on Zapier or Make.com exclusively, you're one price hike away from a rebuild. When your AI depends entirely on OpenAI's API, you're one policy change away from a compliance problem. I've watched companies pay 10x their original software costs because they couldn't afford the rebuild.
              </p>
              <p>
                My stack is deliberately open: n8n (self-hostable), open-weight models (Mistral, LLaMA, Qwen), standard database formats, documented APIs. Everything I build, you can run without me. That's not a sales problem — it's a design philosophy. The best long-term partner is one you choose to keep, not one you're stuck with.
              </p>
              <p className="text-white font-medium border-l-2 border-amber-400 pl-4">
                Your automation stack should be an asset, not a subscription.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Section 4 */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-flag-checkered text-green-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-inter">
                What "Done" Actually Means
              </h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Most developers call something done when it works in their environment, on a test dataset, on a good day. I call it done when:
              </p>
              <ul className="space-y-3 my-4">
                {[
                  'It handles errors without human intervention — and logs them when it does.',
                  'It\'s documented well enough that someone who didn\'t build it can modify it.',
                  'It has been stress-tested against edge cases: missing data, API timeouts, malformed inputs.',
                  'The people who use it understand what it\'s doing and why — not just that it works.',
                  'You, the client, have a clear path to ownership with or without my ongoing involvement.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <i className="fas fa-check text-green-400 text-xs mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                That standard takes longer to hit. It costs more to build to. But it's the reason the systems I deploy still run two years later without weekly firefighting — and why my clients refer their networks instead of posting horror stories in Reddit threads.
              </p>
              <p className="text-white font-medium border-l-2 border-green-400 pl-4">
                "Done" is when it runs without you watching it. Anything less is a prototype.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Closing */}
          <div className="text-center">
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto mb-6">
              If this resonates with how you think about technology — good. We'll probably work well together. If it sounds excessive for your situation, that's okay too. This is who we are. Every client deserves to know it upfront.
            </p>
            <div className="flex items-center justify-center gap-3">
              <img
                src="/james-profile.png"
                alt="James D"
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-white/20 -scale-x-100"
              />
              <div className="text-left">
                <p className="text-white font-semibold">James D.</p>
                <p className="text-gray-500 text-xs">Fractional Automation Architect</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="bg-black/20 backdrop-blur-md border border-primary/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
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
              Read The Promise →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManifestoPage;
