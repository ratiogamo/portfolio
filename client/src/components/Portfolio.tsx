import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { data: projects = [], isLoading } = useQuery({
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
    <section id="portfolio" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of my recent work. Each project represents unique challenges
            and tailored solutions to meet client requirements.
          </p>
        </div>
        
        {/* Portfolio Filters */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
              <div className="relative overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <span className={`${
                      project.category === 'E-commerce' ? 'bg-primary' :
                      project.category === 'Web Apps' ? 'bg-secondary' :
                      'bg-accent'
                    } px-2 py-1 rounded text-xs`}>{project.category}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-inter mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">{tech}</span>
                  ))}
                </div>
                <a href="#" className="text-primary font-medium inline-flex items-center">
                  View Details <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="inline-block bg-white border border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-md transition-colors">
            View All Projects <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
