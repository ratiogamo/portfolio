import { useQuery } from '@tanstack/react-query';

const About = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['/api/profile'],
  });

  const aboutImages = [
    'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1599658880307-95d394a00056?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1603574670812-d24560880210?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  ];

  const skills = [
    'Business Workflow Automation',
    'No-Code Development',
    'AI Integration',
    'Legal Practice Automation',
    'Data Management',
    'Client Onboarding Systems',
  ];

  if (isLoading) {
    return (
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-pulse">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-300 rounded-lg h-48"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 animate-pulse">
              <div className="h-10 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-6 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* About Image */}
          <div className="md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              {aboutImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Automation workflow examples ${index + 1}`}
                  className="rounded-lg shadow-md h-48 object-cover"
                />
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
