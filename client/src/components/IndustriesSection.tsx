import { Link } from 'wouter';

const verticals = [
  {
    icon: 'fa-balance-scale',
    name: 'Law Firms',
    color: 'blue',
    borderClass: 'border-blue-500/30',
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-400',
    pain: 'Manual intake, billing chaos, missed follow-ups',
    result: '8–15 hrs/week saved per staff member',
    link: '/ideal-client',
  },
  {
    icon: 'fa-bullhorn',
    name: 'Marketing Agencies',
    color: 'pink',
    borderClass: 'border-pink-500/30',
    iconBg: 'bg-pink-500/10',
    iconText: 'text-pink-400',
    pain: 'Manual reporting, slow onboarding, fragile Zapier stacks',
    result: 'Client onboarding cut from 3 days to 4 hours',
    link: '/ideal-client',
  },
  {
    icon: 'fa-shopping-cart',
    name: 'eCommerce',
    color: 'emerald',
    borderClass: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    pain: 'Inventory sync errors, support overwhelm, manual returns',
    result: 'Support volume reduced 60%. Zero sync errors.',
    link: '/ideal-client',
  },
  {
    icon: 'fa-code',
    name: 'SaaS Companies',
    color: 'violet',
    borderClass: 'border-violet-500/30',
    iconBg: 'bg-violet-500/10',
    iconText: 'text-violet-400',
    pain: 'Data privacy, internal tooling gaps, AI infrastructure',
    result: 'Private AI deployed in <2 weeks. Zero data egress.',
    link: '/ideal-client',
  },
  {
    icon: 'fa-heartbeat',
    name: 'Healthcare',
    color: 'red',
    borderClass: 'border-red-500/30',
    iconBg: 'bg-red-500/10',
    iconText: 'text-red-400',
    pain: 'Manual scheduling, insurance bottlenecks, no-shows',
    result: 'No-show rate cut 35%. Admin burden down 10 hrs/week.',
    link: '/ideal-client',
  },
  {
    icon: 'fa-home',
    name: 'Real Estate',
    color: 'amber',
    borderClass: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    pain: 'Slow lead follow-up, CRM abandonment, manual transactions',
    result: 'Lead response under 90 seconds. 20% more closes.',
    link: '/ideal-client',
  },
];

const IndustriesSection = () => (
  <section id="industries" className="py-8">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <span className="inline-flex items-center bg-white/5 border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
          <i className="fas fa-industry mr-2 text-primary" />
          By Industry
        </span>
        <h2 className="text-2xl md:text-3xl font-bold font-inter text-white mb-3">
          Built for Your <span className="text-gradient animate-gradient">Industry</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Deep vertical expertise across six industries. We know the tools, the pain points, and the typical ROI — before we start.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {verticals.map((v) => (
          <Link
            key={v.name}
            href={v.link}
            className={`group bg-black/20 backdrop-blur-md border ${v.borderClass} rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${v.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <i className={`fas ${v.icon} text-sm ${v.iconText}`} />
              </div>
              <h3 className="font-bold text-white font-inter">{v.name}</h3>
            </div>

            <p className="text-gray-500 text-xs mb-3 leading-relaxed">
              <i className="fas fa-exclamation-circle text-gray-600 mr-1.5" />
              {v.pain}
            </p>

            <div className={`${v.iconBg} rounded-lg px-3 py-2`}>
              <p className={`${v.iconText} text-xs font-semibold`}>
                <i className="fas fa-chart-line mr-1.5" />
                {v.result}
              </p>
            </div>

            <div className="mt-3 flex items-center text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
              See if you're a fit
              <i className="fas fa-arrow-right ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default IndustriesSection;
