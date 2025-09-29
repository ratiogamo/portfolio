const About = () => {

  const skills = [
    'Business Workflow Automation',
    'No-Code Development',
    'AI Integration',
    'Network Infrastructure Management',
    'Managed IT Services',
    'Cybersecurity Solutions',
    'Cloud Migration & Management',
    'Emergency IT Support',
    'Legal Practice Automation',
    'Data Management',
    'Client Onboarding Systems',
    '24/7 System Monitoring',
  ];

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Professional Headshot */}
            <div className="md:w-1/2 relative flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 relative">
                  <img
                    src="/james-profile.png"
                    alt="James - Automation Expert & IT Solutions Provider"
                    className="w-full h-full object-cover object-top rounded-2xl shadow-2xl border-4 border-white/10 -scale-x-100"
                  />
                  {/* Subtle gradient overlay for professional effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-black/5"></div>
                  {/* Professional frame effect */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl -z-10 blur-sm"></div>
                </div>
                {/* Decorative tech elements around the photo */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full opacity-60 animate-pulse delay-1000"></div>
                <div className="absolute top-1/4 -left-6 w-4 h-4 bg-accent rounded-full opacity-70 animate-pulse delay-500"></div>
              </div>
            </div>

            {/* About Content */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-inter mb-6 relative text-white">
                <span className="inline-block pb-2 relative">
                  About Me
                  <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-primary"></span>
                </span>
              </h2>
              <p className="text-gray-300 mb-4">
                Hi, I'm James 👋. My career has been dedicated to transforming how businesses operate through smart automation solutions and comprehensive IT services. As both an Automation Expert and IT Solutions Provider, I focus on using powerful no-code and low-code platforms, augmented with AI, while delivering enterprise-grade IT infrastructure and support.
              </p>
              <p className="text-gray-300 mb-4">
                With over 15 years of IT solutions experience in South Florida, I've delivered 50+ successful automation projects and managed IT infrastructure for businesses across Miami-Dade, Broward, and Palm Beach counties. This unique combination has led to 12,000+ hours saved annually for clients through both process automation and optimized IT operations.
              </p>
              <p className="text-gray-300 mb-4">
                My automation expertise lies in mastering Make.com, Zapier, n8n, and Airtable to build robust, interconnected systems, while integrating AI via APIs (OpenAI, Claude) for intelligent automation steps. On the IT side, I provide comprehensive managed services, network infrastructure management, and cybersecurity solutions with 24/7 emergency response capabilities.
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Certifications & Credentials:</strong> Microsoft Certified Professional | Cisco Network Associate | CompTIA Security+ | With strategic partnerships with leading IT vendors including Microsoft, Cisco, Dell, and others, I deliver enterprise-level solutions with local South Florida market knowledge and rapid response times.
              </p>
              <p className="text-gray-300 mb-6">
                Whether you need business process automation, complete IT infrastructure management, or the unique integration of both, I bring deep operational understanding from 10+ years in business leadership to build systems that truly make a difference for South Florida businesses.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-gray-300">
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
      </div>
    </section>
  );
};

export default About;