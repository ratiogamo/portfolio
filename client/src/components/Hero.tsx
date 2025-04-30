interface Profile {
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
  title: 'AI Developer | Business Automation | Make, Zapier, N8N | MyCase, Clio',
  description: 'I build automated systems that save businesses thousands of hours annually and streamline complex workflows using leading no-code tools and AI.',
  hourlyRate: '$59.25/hr',
  totalEarnings: '50+ Projects Completed',
  jobSuccessScore: 'Top-Rated Plus',
  totalJobs: 50,
  totalHours: 12000,
  profileUrl: 'https://www.upwork.com/freelancers/~01139a1ed402cf0463',
  responseTime: 'Quick',
  availability: 'More than 30 hrs/week',
  location: 'Miami, United States',
};

const Hero = () => {
  return (
    <section className="section-blur grid-pattern py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        {/* Hero Content */}
        <div className="md:w-1/2 mb-10 md:mb-0 z-10">
          <span className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm animate-pulse-glow">
            <span className="mr-2 relative w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {profile.jobSuccessScore}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold font-inter mt-6 leading-tight">
            Automation Expert with <span className="text-gradient animate-gradient">{profile.totalJobs}+ Projects</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-md">
            Specializing in business workflow automation using <span className="font-medium text-primary">Make.com</span>, <span className="font-medium text-secondary">Zapier</span>, <span className="font-medium text-accent">n8n</span>, and AI integration - delivering <span className="font-bold">12,000+ hours</span> saved annually for clients.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium text-center transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
            >
              Hire Me
            </a>
            <a
              href="#portfolio"
              className="glow-border bg-white/50 backdrop-blur-sm text-primary hover:bg-primary/5 px-6 py-3 rounded-md font-medium text-center transition-all duration-300"
            >
              View My Work
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center tech-card px-3 py-2">
              <span className="text-yellow-500 text-xl mr-2">★</span>
              <span className="font-medium">Top-Rated Expert</span>
            </div>
            <div className="flex items-center tech-card px-3 py-2">
              <span className="text-primary text-xl mr-2">⚡</span>
              <span className="font-medium">{profile.totalJobs}+ Projects</span>
            </div>
            <div className="flex items-center tech-card px-3 py-2">
              <span className="text-secondary text-xl mr-2">⏰</span>
              <span className="font-medium">{profile.availability}</span>
            </div>
          </div>
        </div>

        {/* Hero Image with animated elements */}
        <div className="md:w-1/2 flex justify-center relative">
          {/* Decorative tech elements */}
          <div className="absolute w-full h-full">
            <div className="absolute top-1/4 -left-10 w-20 h-20 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/4 -right-10 w-16 h-16 rounded-full bg-gradient-to-r from-secondary/30 to-accent/30 blur-xl animate-float" style={{ animationDelay: '1.2s' }}></div>

            {/* Tech circuit patterns */}
            <svg className="absolute top-0 right-0 w-32 h-32 text-primary/10 animate-float" style={{ animationDelay: '0.8s' }} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" />
              <line x1="10" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="1" />
              <line x1="70" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="70" x2="50" y2="90" stroke="currentColor" strokeWidth="1" />
            </svg>

            <svg className="absolute bottom-0 left-0 w-40 h-40 text-secondary/10 animate-float" style={{ animationDelay: '1.5s' }} viewBox="0 0 100 100" fill="none">
              <path d="M10,30 L30,30 L30,10 M70,10 L70,30 L90,30 M90,70 L70,70 L70,90 M30,90 L30,70 L10,70" stroke="currentColor" strokeWidth="1" />
              <rect x="35" y="35" width="30" height="30" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Main Image */}
          <div className="relative z-10">
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-primary/30 to-transparent rounded-lg animate-float" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-secondary/30 to-transparent rounded-lg animate-float" style={{ animationDelay: '1s' }}></div>

            <div className="relative glow-border rounded-xl overflow-hidden p-1 animate-pulse-glow">
              <img
                src="/james-profile.jpg"
                alt="Professional headshot of James D, automation expert"
                className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-lg shadow-lg hover-scale z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-secondary/5 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
