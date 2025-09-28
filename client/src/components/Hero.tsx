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
  title: 'South Florida IT Support & Business Automation',
  description: '24/7 managed IT services and expert workflow automation for businesses in Miami-Dade, Broward, and Palm Beach. We save you time and prevent costly downtime.',
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

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-full font-medium text-sm mb-8">
            <span className="mr-2">✨</span>
            {profile.jobSuccessScore} | {profile.totalEarnings}
          </span>

          <h1 className="text-5xl md:text-7xl font-bold font-inter leading-tight mb-6 text-white">
            Your Expert Partner in <span className="text-gradient animate-gradient">IT & Automation</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
            {profile.title}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              data-cal-link="ratio/30min"
              data-cal-config='{"layout":"month_view"}'
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-gray-200"
            >
              Book a Strategy Session
            </button>
            <a
              href="tel:+1-305-555-HELP"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-white/20"
            >
              Emergency IT Support
            </a>
          </div>
          
          <p className="text-gray-400 mb-8">A comprehensive 2-hour deep-dive for $200.</p>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-gray-300">
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