import { Link } from 'wouter';

const services = [
  {
    title: "Emergency Workflow Rescue",
    description: "Your automation broke. I fix it. Broken Zapier, Make.com, or n8n workflows diagnosed and repaired — fast.",
    icon: "bolt",
    link: "/services/emergency-rescue",
    bgClass: "bg-red-500/10",
    iconClass: "text-red-500",
  },
  {
    title: "Agentic Architecture Deployment",
    description: "Custom AI agents that run your business. n8n orchestration, MCP servers, and autonomous workflow systems.",
    icon: "robot",
    link: "/services/agentic-architecture",
    bgClass: "bg-accent/10",
    iconClass: "text-accent",
  },
  {
    title: "Private LLM Infrastructure",
    description: "Privacy-first AI for your business. Local model hosting on VPS with zero data leakage.",
    icon: "server",
    link: "/services/private-llm",
    bgClass: "bg-blue-500/10",
    iconClass: "text-blue-500",
  },
  {
    title: "Business Workflow Automation",
    description: "Eliminate manual tasks and connect your business tools with Make.com, Zapier, n8n, and Airtable.",
    icon: "cogs",
    link: "/services/business-automation",
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
  },
  {
    title: "Legal Firm Automation",
    description: "Streamline client intake, document management, and case workflows with MyCase and Clio.",
    icon: "balance-scale",
    link: "/services/legal-tech",
    bgClass: "bg-secondary/10",
    iconClass: "text-secondary",
  },
  {
    title: "AI-Powered Automation",
    description: "Add intelligent decision-making to your workflows with OpenAI, Claude, and custom AI pipelines.",
    icon: "brain",
    link: "/services/ai-integration",
    bgClass: "bg-purple-500/10",
    iconClass: "text-purple-500",
  }
];

const Services = () => {
  return (
    <section id="services" className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-inter mb-4 text-white">What I Do</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Three high-impact interventions for businesses drowning in broken workflows, manual processes, and AI confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className={`bg-white/5 backdrop-blur-sm border ${index < 3 ? 'border-white/20 ring-1 ring-white/10' : 'border-white/10'} rounded-lg shadow-lg transition-transform hover:scale-105 p-6 flex flex-col ${index < 3 ? 'relative' : ''}`}>
                {index < 3 && (
                  <span className="absolute -top-3 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    CORE SERVICE
                  </span>
                )}
                <div className={`w-14 h-14 ${service.bgClass} rounded-lg flex items-center justify-center mb-4`}>
                  <i className={`fas fa-${service.icon} text-2xl ${service.iconClass}`}></i>
                </div>
                <h3 className="text-xl font-bold font-inter mb-3 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-4 flex-grow">
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
      </div>
    </section>
  );
};

export default Services;