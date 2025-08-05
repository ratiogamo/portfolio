export interface Profile {
  id?: number;
  name: string;
  title: string;
  description: string;
  hourlyRate: string;
  totalEarnings: string;
  jobSuccessScore: string;
  totalJobs: number;
  totalHours: number;
  profileUrl?: string;
  responseTime: string;
  availability: string;
  location: string;
}

const profile: Profile = {
  name: 'James D',
  title: 'Local IT Solutions | South Florida IT Support | Business Automation Expert',
  description: 'Providing comprehensive managed IT services and business automation solutions across South Florida. Specializing in 24/7 IT support, emergency response, and workflow automation for Miami-Dade, Broward, and Palm Beach Counties.',
  hourlyRate: '$59.25/hr',
  totalEarnings: '50+ Projects Completed',
  jobSuccessScore: 'Top-Rated Plus',
  totalJobs: 50,
  totalHours: 12000,
  profileUrl: 'https://www.upwork.com/freelancers/~01139a1ed402cf0463',
  responseTime: '24/7 Emergency Response',
  availability: 'On-site & Remote Support',
  location: 'South Florida | Miami-Dade, Broward, Palm Beach',
};

import Galaxy from "./backgrounds/Galaxy";

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Galaxy />
      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Hero Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Social Proof Badge */}
          <span className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm animate-pulse-glow mb-6">
            <span className="mr-2 relative w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            50+ businesses trust us | Top-Rated Expert
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold font-inter leading-tight mb-4 text-white">
            Get Unlimited <span className="text-gradient animate-gradient">IT Solutions</span> for Just <span className="text-green-400">$250/month</span>
          </h1>

          {/* Discount Messaging */}
          <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 inline-block">
            <p className="text-red-300 font-semibold text-lg">
              🔥 Save 15% - Limited Time Offer
              <span className="block text-sm text-red-400 line-through">Was $300/month</span>
            </p>
          </div>

          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-gray-300 mb-6 font-medium">
            24/7 IT Support + Business Automation for South Florida
          </p>

          {/* Urgency Element */}
          <div className="bg-orange-500/20 border border-orange-400/30 rounded-lg p-3 mb-8 inline-block">
            <p className="text-orange-300 font-semibold flex items-center justify-center gap-2">
              ⏰ Only 5 spots available this month
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-1"
            >
              🎯 Claim Your 15% Discount
            </a>
            <a
              href="tel:+1-305-555-0123"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span className="text-xl">🚨</span>
              Emergency IT Support
            </a>
          </div>

          {/* Secondary CTA - Customer Portal */}
          <div className="flex justify-center mb-6">
            <a
              href="/portal/dashboard"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold text-base text-center transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span className="text-lg">🔐</span>
              Access Customer Portal
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-lg">✓</span>
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-lg">✓</span>
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-lg">✓</span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-lg">✓</span>
              <span>South Florida Local</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
