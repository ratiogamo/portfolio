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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 bg-black">
      <div className="absolute top-0 left-0 w-full h-full">
        <Galaxy
          density={0.3}
          glowIntensity={0.8}
          starSpeed={0.2}
          saturation={1.0}
          rotationSpeed={0.05}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Hero Content */}
        <div className="max-w-4xl mx-auto text-center bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          {/* Social Proof Badge */}
          <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-full font-medium text-sm mb-8">
            <span className="mr-2">✨</span>
            {profile.jobSuccessScore} | {profile.totalEarnings}
          </span>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold font-inter leading-tight mb-8 text-white">
            Get Unlimited <span className="text-gradient animate-gradient">IT Solutions</span> for Just <span className="text-green-400">$250/month</span>
          </h1>

          {/* Discount Messaging */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-6 inline-block">
            <p className="text-white font-semibold text-lg">
              🔥 Save 15% - Limited Time Offer
              <span className="block text-sm text-gray-300 line-through">Was $300/month</span>
            </p>
          </div>

          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
            {profile.title}
          </p>

          {/* Urgency Element */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 mb-8 inline-block">
            <p className="text-white font-semibold flex items-center justify-center gap-2">
              ⏰ Only 5 spots available this month
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#contact"
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-gray-200"
            >
              Claim Your 15% Discount
            </a>
            <a
              href="tel:+1-305-555-0123"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-white/20"
            >
              Emergency IT Support
            </a>
          </div>

          {/* Secondary CTA - Customer Portal */}
          <div className="flex justify-center mb-6">
            <a
              href="/portal/dashboard"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full font-semibold text-base text-center transition-all duration-300 hover:bg-white/20"
            >
              Access Customer Portal
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-gray-300 mt-8">
            <span>✓ No Setup Fees</span>
            <span>✓ Cancel Anytime</span>
            <span>✓ 24/7 Support</span>
            <span>✓ South Florida Local</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;