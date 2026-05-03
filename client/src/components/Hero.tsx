const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-8">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full font-medium text-xs sm:text-sm mb-8 gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Fractional Automation Architect · Top-Rated Plus · 50+ Companies Automated
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-inter leading-tight mb-6 text-white">
            Your Business,{' '}
            <span className="text-gradient animate-gradient">Fully Automated.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 font-medium max-w-2xl mx-auto">
            AI agents, agentic workflow systems, and private LLM infrastructure — built by a fractional automation architect with $2M+ in labor costs eliminated across 50+ companies.
          </p>

          <p className="text-sm text-gray-500 mb-10">
            n8n · MCP · Make.com · Private LLM · Agentic AI · Legal Automation · South Florida & Remote
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              data-cal-link="ratio/30min"
              data-cal-config='{"layout":"month_view"}'
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg text-center transition-all duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:-translate-y-0.5"
            >
              📅 Book Free Strategy Call
            </button>
            <a
              href="/pricing"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
            >
              💼 View Managed Plans →
            </a>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 text-sm">
            <a
              href="https://buy.stripe.com/8x25kD6AB0AD7N06226oo0t"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <i className="fas fa-credit-card text-xs" /> $200 Emergency Audit
            </a>
            <a
              href="tel:+19545944040"
              className="inline-flex items-center justify-center gap-2 bg-red-600/10 border border-red-500/20 text-red-300 px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-red-600/20"
            >
              <i className="fas fa-bolt text-xs" /> Emergency Rescue: 954-594-4040
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center bg-green-500/10 border border-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
              <i className="fas fa-shield-alt mr-1.5" />100% Money Back Guarantee
            </span>
            <span className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
              <i className="fas fa-receipt mr-1.5" />100% Tax Deductible
            </span>
            <span className="inline-flex items-center bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full text-xs font-medium">
              <i className="fas fa-lock mr-1.5" />No Vendor Lock-In
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;