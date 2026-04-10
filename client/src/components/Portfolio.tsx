import { Link } from 'wouter';

const projectCategories = [
  {
    name: "Workflow Rescues",
    description: "Emergency fixes for broken automations and failing integrations.",
    link: "/projects/case-studies",
    icon: "fas fa-fire-extinguisher",
  },
  {
    name: "Agentic Builds",
    description: "AI agent systems and autonomous workflow architectures.",
    link: "/projects/case-studies",
    icon: "fas fa-robot",
  },
  {
    name: "Automation Systems",
    description: "End-to-end business process automation with Make, Zapier, and n8n.",
    link: "/projects/case-studies",
    icon: "fas fa-cogs",
  },
  {
    name: "Legal Tech",
    description: "Specialized automation for law firms using MyCase and Clio.",
    link: "/projects/case-studies",
    icon: "fas fa-balance-scale",
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-inter mb-4 text-white">Case Studies & Results</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real projects. Real rescues. Real results from 50+ delivered automation systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectCategories.map((category) => (
              <Link key={category.name} href={category.link}>
                <a className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg transition-transform hover:scale-105 p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${category.icon} text-2xl text-primary`}></i>
                  </div>
                  <h3 className="text-xl font-bold font-inter mb-2 text-white">{category.name}</h3>
                  <p className="text-gray-300 text-sm">{category.description}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;