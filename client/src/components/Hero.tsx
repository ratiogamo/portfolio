import { useQuery } from '@tanstack/react-query';

const Hero = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['/api/profile'],
  });

  if (isLoading) {
    return (
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
            <div className="h-12 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-8 w-2/3 bg-gray-300 rounded mb-6"></div>
            <div className="flex space-x-4">
              <div className="h-10 w-32 bg-gray-300 rounded"></div>
              <div className="h-10 w-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Hero Content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-medium text-sm">
            Top Rated Plus Freelancer
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-inter mt-4 leading-tight">
            Full Stack Developer with <span className="text-primary">{profile?.jobSuccessScore} Job Success</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md">
            Specializing in scalable web applications, API integrations, and data-driven solutions with over 7 years of experience.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium text-center transition-colors"
            >
              Hire Me
            </a>
            <a
              href="#portfolio"
              className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md font-medium text-center transition-colors"
            >
              View My Work
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="ml-2 font-medium">5.0/5.0 Rating</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-briefcase text-primary"></i>
              <span className="ml-2 font-medium">{profile?.totalJobs}+ Projects</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock text-secondary"></i>
              <span className="ml-2 font-medium">{profile?.responseTime} Response</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-lg"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/20 rounded-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
              alt="Professional headshot of developer"
              className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-lg shadow-lg relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
