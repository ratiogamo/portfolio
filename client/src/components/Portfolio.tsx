import { useState } from 'react';

interface Project {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  technologies: string[];
  profileId?: number;
}

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const projects: Project[] = [
    {
      id: 1,
      title: "Multi-vendor E-commerce Platform",
      description: "Built a scalable marketplace with integrated payment processing, vendor management, and analytics dashboard.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "E-commerce",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      id: 2,
      title: "Real-time Analytics Dashboard",
      description: "Developed a comprehensive dashboard for visualizing business metrics with real-time data updates and alerts.",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Web Apps",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Websockets"]
    },
    {
      id: 3,
      title: "Health & Fitness Mobile App",
      description: "Created a cross-platform mobile application for fitness tracking with social features and custom workout plans.",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Mobile",
      technologies: ["React Native", "Firebase", "Redux", "Native APIs"]
    },
    {
      id: 4,
      title: "Make.com | Blog post generator | WordPress",
      description: "Automated blog content generation system that creates, formats, and publishes articles to WordPress using AI and content workflows.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Web Apps",
      technologies: ["Make.com", "WordPress", "OpenAI", "Content Generation"],
    },
    {
      id: 5,
      title: "Make.com | Automated Client Onboarding",
      description: "End-to-end onboarding system that guides new clients through questionnaires, document signing, and initial setup with minimal manual intervention.",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Web Apps",
      technologies: ["Make.com", "Document Generation", "CRM Integration", "Email Sequences"],
    },
    {
      id: 6,
      title: "Make.com | Proposal generator | PandaDoc",
      description: "Automatic proposal creation system that pulls client data, creates customized proposals in PandaDoc, and tracks the approval process.",
      imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Web Apps",
      technologies: ["Make.com", "PandaDoc", "CRM Integration", "Proposal Automation"],
    },
    // IT Solutions Projects
    {
      id: 7,
      title: "Emergency Server Recovery & Infrastructure Upgrade",
      description: "Complete server recovery and infrastructure modernization for a 50-attorney Miami law firm after critical system failure. Implemented redundant backup systems and 24/7 monitoring.",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "IT Solutions",
      technologies: ["Windows Server 2022", "VMware vSphere", "Veeam Backup", "SonicWall Firewall"]
    },
    {
      id: 8,
      title: "Comprehensive Network Security & Compliance",
      description: "HIPAA-compliant network security implementation including firewall configuration, endpoint protection, and staff training for a Fort Lauderdale medical practice.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "IT Solutions",
      technologies: ["Cisco ASA Firewall", "Microsoft Defender", "Bitdefender", "Azure AD"]
    },
    {
      id: 9,
      title: "Complete IT Infrastructure Management",
      description: "Full IT infrastructure management including server maintenance, network monitoring, help desk support, and cloud migration for a Broward County construction company.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "IT Solutions",
      technologies: ["Microsoft 365", "Azure Cloud", "Dell PowerEdge", "Ubiquiti Network"]
    },
    {
      id: 10,
      title: "IT Infrastructure + Business Automation Integration",
      description: "Integrated solution combining network infrastructure upgrade with automated client onboarding and document management workflows for a Miami Beach accounting firm.",
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "IT Solutions",
      technologies: ["Make.com", "Microsoft Server", "QuickBooks Enterprise", "DocuSign API"]
    }
  ];

  // Categories for filter buttons
  const categories = ['All', 'Web Apps', 'E-commerce', 'Mobile', 'IT Solutions'];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="section-blur py-16 bg-gradient-to-b from-blue-50/30 to-white/90 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4 inline-block relative">
            <span className="text-gradient animate-gradient">Featured Projects & Case Studies</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Explore my recent automation projects and IT infrastructure implementations. From powerful workflow systems
            built with Make.com and Zapier to comprehensive network security and server management solutions for South Florida businesses.
          </p>
        </div>

        {/* Portfolio Filters */}
        <div className="flex flex-wrap justify-center mb-10 gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                  : 'glass-card hover:shadow-md hover:-translate-y-1'
              }`}
              onClick={() => setActiveCategory(category)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="tech-card group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-secondary/40 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-white/90 text-sm mb-3">
                      {project.description}
                    </p>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Tech orb decorations */}
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-primary/60 backdrop-blur-sm animate-pulse"></div>
                <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-secondary/60 backdrop-blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold font-inter mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center font-medium relative overflow-hidden group-hover:text-primary transition-colors duration-300">
                  <span className="relative z-10">View Details</span>
                  <span className="ml-2 relative z-10 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 rounded-full font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="flex items-center">
              <span>Discuss Your Project</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
