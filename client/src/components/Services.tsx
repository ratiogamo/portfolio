const services = [
  {
    id: 1,
    title: "Business Workflow Automation",
    description: "Create seamless, automated workflows that connect all your business tools and eliminate manual work using Make.com, Zapier, and n8n.",
    icon: "cogs",
    features: [
      "Make.com, Zapier, n8n expertise",
      "Integration with various apps",
      "Process analysis & optimization"
    ],
    bgClass: "bg-primary/10",
    iconClass: "text-primary"
  },
  {
    id: 2,
    title: "Legal Firm Automation",
    description: "Specialized automation solutions for law firms using MyCase, Clio, and other legal platforms to streamline client intake, document management, and reporting.",
    icon: "balance-scale",
    features: [
      "MyCase & Clio integration",
      "Document generation automation",
      "Client communication workflows"
    ],
    bgClass: "bg-secondary/10",
    iconClass: "text-secondary"
  },
  {
    id: 3,
    title: "AI-Powered Automation",
    description: "Intelligent automation systems that leverage OpenAI and Claude to add decision-making capabilities to your workflows and process data intelligently.",
    icon: "robot",
    features: [
      "OpenAI & Claude API integration",
      "Intelligent data processing",
      "Automated decision making"
    ],
    bgClass: "bg-accent/10",
    iconClass: "text-accent"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">My Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I offer comprehensive automation solutions tailored to your specific business needs,
            focusing on efficiency, accuracy, and cost savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Determine service features
            const features = service.features || [
              "Custom workflow design",
              "Integration with existing tools",
              "Ongoing support & optimization"
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
