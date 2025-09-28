import { Link } from 'wouter';

const services = [
  {
    title: "Business Workflow Automation",
    description: "Eliminate manual tasks and connect your business tools.",
    icon: "cogs",
    link: "/services/business-automation",
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
  },
  {
    title: "Legal Firm Automation",
    description: "Streamline client intake and document management.",
    icon: "balance-scale",
    link: "/services/legal-tech",
    bgClass: "bg-secondary/10",
    iconClass: "text-secondary",
  },
  {
    title: "AI-Powered Automation",
    description: "Add intelligent decision-making to your workflows.",
    icon: "robot",
    link: "/services/ai-integration",
    bgClass: "bg-accent/10",
    iconClass: "text-accent",
  },
  {
    title: "Managed IT Services",
    description: "Proactive 24/7 monitoring and support to prevent downtime.",
    icon: "server",
    link: "/services/managed-it",
    bgClass: "bg-red-500/10",
    iconClass: "text-red-500",
  },
  {
    title: "Emergency IT Support",
    description: "Rapid on-site response for critical IT failures.",
    icon: "phone",
    link: "/services/emergency-support",
    bgClass: "bg-orange-500/10",
    iconClass: "text-orange-500",
  },
  {
    title: "Network Security",
    description: "Protect your business from cyber threats.",
    icon: "shield-alt",
    link: "/services/network-security",
    bgClass: "bg-blue-500/10",
    iconClass: "text-blue-500",
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">Automation & IT Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I boost efficiency and security for South Florida businesses with 24/7 support across Miami-Dade, Broward, and Palm Beach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-md transition-transform hover:scale-105 p-6 flex flex-col">
              <div className={`w-14 h-14 ${service.bgClass} rounded-lg flex items-center justify-center mb-4`}>
                <i className={`fas fa-${service.icon} text-2xl ${service.iconClass}`}></i>
              </div>
              <h3 className="text-xl font-bold font-inter mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                {service.description}
              </p>
              <div className="mt-auto">
                <Link
                  href={service.link}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn More
                  <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;