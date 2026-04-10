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
  title: 'AI Automation Architect | Emergency Workflow Rescue | Agentic Systems',
  description: 'I rescue broken automations at 2AM and deploy agentic AI systems that run your business. n8n, MCP, Make.com, private LLM infrastructure.',
  hourlyRate: '$75+/hr',
  totalEarnings: '50+ Projects Delivered',
  jobSuccessScore: 'Top-Rated Plus',
  totalJobs: 50,
  totalHours: 12000,
  profileUrl: 'https://www.upwork.com/freelancers/~01139a1ed402cf0463',
  responseTime: 'Emergency Response Available',
  availability: 'Remote & On-Site (South Florida)',
  location: 'Broward County, FL',
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-8">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-12">
          <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full font-medium text-xs sm:text-sm mb-6">
            <span className="mr-2">🏆</span>
            {profile.jobSuccessScore} | {profile.totalEarnings}
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-inter leading-tight mb-4 text-white">
            When Your Automation <span className="text-gradient animate-gradient">Breaks at 2AM</span>, I Fix It.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 font-medium">
            {profile.title}
          </p>

          <img
            src="/robotarm.png"
            alt="Automation Architecture"
            className="w-full max-w-md h-auto object-contain rounded-lg mx-auto my-8"
          />

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <button
              data-cal-link="ratio/30min"
              data-cal-config='{"layout":"month_view"}'
              className="bg-white text-black px-6 py-3 rounded-full font-bold text-base sm:text-lg text-center transition-all duration-300 hover:bg-gray-200"
            >
              Book Emergency Audit — $200
            </button>
            <a
              href="tel:+19545944040"
              className="bg-red-600/80 backdrop-blur-sm border border-red-400/40 text-white px-6 py-3 rounded-full font-bold text-base sm:text-lg text-center transition-all duration-300 hover:bg-red-500/90 animate-pulse"
            >
              🚨 Emergency Workflow Rescue
            </a>
          </div>
          
          <p className="text-gray-400 text-sm mb-8">2-hour deep-dive. Diagnosis + action plan. Same-day availability.</p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-300">
            <span>✓ Broken Zapier/Make/n8n Fixed</span>
            <span>✓ Agentic AI Deployed</span>
            <span>✓ Private LLM Infrastructure</span>
            <span>✓ 50+ Projects Delivered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;