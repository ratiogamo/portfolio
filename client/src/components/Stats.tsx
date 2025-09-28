const profile = {
  jobSuccessScore: 'Top-Rated Plus',
  totalJobs: 50,
  responseTime: 'Quick',
};

const Stats = () => {
  const stats = [
    {
      value: profile.jobSuccessScore,
      label: 'Job Success',
      bgColor: 'bg-primary/5',
      textColor: 'text-primary',
    },
    {
      value: `${profile.totalJobs}+`,
      label: 'Projects Completed',
      bgColor: 'bg-secondary/5',
      textColor: 'text-secondary',
    },
    {
      value: '7+',
      label: 'Years Experience',
      bgColor: 'bg-accent/5',
      textColor: 'text-accent',
    },
    {
      value: profile.responseTime,
      label: 'Response Time',
      bgColor: 'bg-gray-100',
      textColor: 'text-dark',
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-sm ${stat.bgColor}`}>
              <h3 className={`text-3xl font-bold font-inter ${stat.textColor}`}>{stat.value}</h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
