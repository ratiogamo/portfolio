import { useQuery } from '@tanstack/react-query';

const Stats = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['/api/profile'],
  });

  if (isLoading) {
    return (
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-lg shadow-sm bg-gray-50 animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-2 w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const stats = [
    {
      value: profile?.jobSuccessScore || '98%',
      label: 'Job Success',
      bgColor: 'bg-primary/5',
      textColor: 'text-primary',
    },
    {
      value: profile?.totalJobs ? `${profile.totalJobs}+` : '100+',
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
      value: profile?.responseTime || '24h',
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
