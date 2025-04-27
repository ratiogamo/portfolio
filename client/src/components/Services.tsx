import { useQuery } from '@tanstack/react-query';

const Services = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['/api/services'],
  });

  if (isLoading) {
    return (
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="w-14 h-14 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback services if none are returned from the API
  const fallbackServices = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "End-to-end development of scalable web applications with modern frameworks and clean architecture.",
      icon: "laptop-code",
      features: [
        "React, Vue, Angular frontends",
        "Node.js, Python, PHP backends",
        "Database design and optimization"
      ],
      bgClass: "bg-primary/10",
      iconClass: "text-primary"
    },
    {
      id: 2,
      title: "API Development & Integration",
      description: "Creating robust APIs and seamlessly integrating third-party services into your applications.",
      icon: "server",
      features: [
        "RESTful & GraphQL APIs",
        "Payment gateway integration",
        "Third-party API consumption"
      ],
      bgClass: "bg-secondary/10",
      iconClass: "text-secondary"
    },
    {
      id: 3,
      title: "Cloud Architecture & Deployment",
      description: "Setting up scalable, secure cloud infrastructure for your applications with CI/CD workflows.",
      icon: "cloud",
      features: [
        "AWS, Azure, GCP expertise",
        "Docker & Kubernetes",
        "CI/CD pipeline setup"
      ],
      bgClass: "bg-accent/10",
      iconClass: "text-accent"
    }
  ];

  // Use fetched services or fallback if empty
  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">My Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I offer comprehensive development solutions tailored to your specific business needs,
            focusing on scalability, performance, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            // Determine service features
            const features = service.features || [
              "Modern, responsive implementations",
              "Optimized for performance",
              "Clean, maintainable code"
            ];

            // Determine background and icon classes based on index if not provided
            const bgClass = service.bgClass || (index === 0 ? "bg-primary/10" : index === 1 ? "bg-secondary/10" : "bg-accent/10");
            const iconClass = service.iconClass || (index === 0 ? "text-primary" : index === 1 ? "text-secondary" : "text-accent");

            return (
              <div key={service.id || index} className="bg-white rounded-lg shadow-md transition-transform hover:scale-105 p-6">
                <div className={`w-14 h-14 ${bgClass} rounded-lg flex items-center justify-center mb-4`}>
                  <i className={`fas fa-${service.icon} text-2xl ${iconClass}`}></i>
                </div>
                <h3 className="text-xl font-bold font-inter mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
