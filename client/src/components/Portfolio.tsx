import { Link } from 'wouter';

const projectCategories = [
  {
    name: "Web Apps",
    description: "Custom applications to solve business challenges.",
    link: "/projects/web-apps",
    icon: "fas fa-laptop-code",
  },
  {
    name: "E-commerce",
    description: "Scalable marketplaces and online stores.",
    link: "/projects/e-commerce",
    icon: "fas fa-shopping-cart",
  },
  {
    name: "Mobile",
    description: "Cross-platform apps for iOS and Android.",
    link: "/projects/mobile",
    icon: "fas fa-mobile-alt",
  },
  {
    name: "IT Solutions",
    description: "Infrastructure, security, and support case studies.",
    link: "/projects/it-solutions",
    icon: "fas fa-shield-alt",
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-inter mb-4 text-white">Featured Projects & Case Studies</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A selection of my work in automation, IT infrastructure, and application development.
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