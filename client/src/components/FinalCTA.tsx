import { Link } from 'wouter';

const FinalCTA = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Emergency */}
            <div className="text-center md:text-left">
              <span className="inline-flex items-center bg-red-500/10 border border-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-medium mb-4">
                🚨 EMERGENCY
              </span>
              <h2 className="text-2xl font-bold font-inter mb-3 text-white">Your Automation Is Broken?</h2>
              <p className="text-gray-300 mb-6 text-sm">
                2-hour deep-dive. Diagnosis + action plan. Same-day availability. $200.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://buy.stripe.com/8x25kD6AB0AD7N06226oo0t"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm text-center transition-all duration-300 hover:bg-gray-200"
                >
                  💳 Pay Now — $200 Audit
                </a>
                <a
                  href="tel:+19545944040"
                  className="bg-red-600/80 border border-red-400/40 text-white px-6 py-3 rounded-full font-bold text-sm text-center transition-all duration-300 hover:bg-red-500/90"
                >
                  📞 954-594-4040
                </a>
              </div>
            </div>

            {/* Right: Managed Plans */}
            <div className="text-center md:text-left border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
              <span className="inline-flex items-center bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4">
                📈 MANAGED PLANS
              </span>
              <h2 className="text-2xl font-bold font-inter mb-3 text-white">Ready to Scale With a Partner?</h2>
              <p className="text-gray-300 mb-4 text-sm">
                Managed plans from $250/mo — unlimited support, weekly strategy calls, marketing plans, and brand management. Your competitors aren't waiting.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-4">
                <Link
                  href="/pricing"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold text-sm text-center transition-all duration-300"
                >
                  View Plans & Pricing →
                </Link>
                <button
                  data-cal-link="ratio/30min"
                  data-cal-config='{"layout":"month_view"}'
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm text-center transition-all duration-300"
                >
                  📅 Book Strategy Call
                </button>
              </div>
              <span className="inline-flex items-center text-green-300 text-xs">
                <i className="fas fa-shield-alt mr-1.5"></i>100% Satisfied or 100% Money Back
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;