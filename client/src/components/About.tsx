const About = () => {
  const aboutImages = [
    'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Automation dashboard
    'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // IT workflow automation
    'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Business process workflow
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Team collaboration on automation
  ];

  const skills = [
    'Business Workflow Automation',
    'No-Code Development',
    'AI Integration',
    'Legal Practice Automation',
    'Data Management',
    'Client Onboarding Systems',
  ];

  return (
    <section id="about" className="py-16 bg-white relative">
      {/* Tech-inspired decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 overflow-hidden opacity-10">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <path d="M30,100 L170,100" stroke="currentColor" strokeWidth="1" className="text-primary" />
          <path d="M100,30 L100,170" stroke="currentColor" strokeWidth="1" className="text-primary" />
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" className="text-secondary" />
          <path d="M50,50 L150,150" stroke="currentColor" strokeWidth="1" className="text-accent" />
          <path d="M150,50 L50,150" stroke="currentColor" strokeWidth="1" className="text-accent" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-40 h-40 overflow-hidden opacity-10">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" className="text-secondary" />
          <circle cx="150" cy="50" r="10" stroke="currentColor" className="text-secondary" />
          <circle cx="50" cy="150" r="10" stroke="currentColor" className="text-secondary" />
          <circle cx="150" cy="150" r="10" stroke="currentColor" className="text-secondary" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* About Image */}
          <div className="md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              {aboutImages.map((src, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={src}
                    alt={`Automation workflow examples ${index + 1}`}
                    className="rounded-lg shadow-md h-48 object-cover w-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index === 0 && "Automation dashboards for business oversight"}
                    {index === 1 && "IT workflow integration & process management"}
                    {index === 2 && "Business workflow optimization solutions"}
                    {index === 3 && "Team collaboration on automation projects"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold font-inter mb-6 relative">
              <span className="inline-block pb-2 relative">
                About Me
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-primary"></span>
              </span>
            </h2>
            <p className="text-gray-600 mb-4">
              Hi, I'm James 👋. My career has been dedicated to transforming how businesses operate by implementing smart automation solutions. I focus on using powerful no-code and low-code platforms, augmented with AI where it can add significant value.
            </p>
            <p className="text-gray-600 mb-4">
              I've delivered 50+ successful automation projects, leading to 12,000+ hours saved annually for clients. With 10+ years in business leadership, I understand operational challenges deeply and build systems that truly make a difference.
            </p>
            <p className="text-gray-600 mb-6">
              My core expertise lies in mastering Make.com, Zapier, n8n, and Airtable to build robust, interconnected systems. I also integrate AI via APIs (OpenAI, Claude) for intelligent automation steps.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <i className="fas fa-check-circle text-secondary mr-2"></i>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
