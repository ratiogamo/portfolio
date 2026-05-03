const stats = [
  { value: '50+', label: 'Companies Automated', icon: 'fa-building' },
  { value: '$2M+', label: 'Labor Costs Eliminated', icon: 'fa-dollar-sign' },
  { value: '12K+', label: 'Hours Saved Annually', icon: 'fa-clock' },
  { value: '6', label: 'Industries Served', icon: 'fa-industry' },
  { value: '2hr', label: 'Emergency Response', icon: 'fa-bolt' },
  { value: '100%', label: 'Money-Back Guarantee', icon: 'fa-shield-alt' },
];

const SocialProofStrip = () => (
  <section className="py-6">
    <div className="container mx-auto px-4">
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-x-0 lg:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-3 py-2 group"
            >
              <i className={`fas ${stat.icon} text-primary mb-1.5 text-sm transition-transform duration-300 group-hover:scale-125`} />
              <span className="text-xl md:text-2xl font-bold text-white font-inter leading-none mb-0.5">
                {stat.value}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SocialProofStrip;
