import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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
  
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Categories for filter buttons
  const categories = ['All', 'Web Apps', 'E-commerce', 'APIs', 'Mobile'];

  if (isLoading) {
    return (
      <section id="portfolio" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
          
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {categories.map((category) => (
              <div key={category} className="h-10 bg-gray-300 rounded w-20"></div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-56 bg-gray-300 animate-pulse"></div>
                <div className="p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-6 bg-gray-300 rounded w-16"></div>
                    ))}
                  </div>
                  <div className="h-6 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback projects if none are returned from API
  const fallbackProjects = [
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
    }
  ];

  // Use fetched projects or fallback if empty
  const allProjects = projects.length > 0 ? projects : fallbackProjects;
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="section-blur py-16 bg-gradient-to-b from-blue-50/30 to-white/90 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4 inline-block relative">
            <span className="text-gradient animate-gradient">Featured Projects</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Explore my recent automation work. Each project showcases powerful workflow systems 
            built with Make.com, Zapier, and n8n to save businesses thousands of hours.
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
