import { useQuery } from '@tanstack/react-query';

const Skills = () => {
  const { data: frontendSkills = [], isLoading: isLoadingFrontend } = useQuery({
    queryKey: ['/api/skills', { category: 'frontend' }],
  });

  const { data: backendSkills = [], isLoading: isLoadingBackend } = useQuery({
    queryKey: ['/api/skills', { category: 'backend' }],
  });

  const isLoading = isLoadingFrontend || isLoadingBackend;

  // Fallback skills if none are returned from the API
  const fallbackFrontendSkills = [
    { name: "React.js", proficiency: 95 },
    { name: "Vue.js", proficiency: 90 },
    { name: "JavaScript/TypeScript", proficiency: 95 },
    { name: "HTML/CSS/SCSS", proficiency: 90 },
    { name: "Responsive Design", proficiency: 95 },
  ];

  const fallbackBackendSkills = [
    { name: "Node.js/Express", proficiency: 90 },
    { name: "Python/Django", proficiency: 85 },
    { name: "SQL/NoSQL Databases", proficiency: 90 },
    { name: "Docker/Kubernetes", proficiency: 80 },
    { name: "AWS/Cloud Services", proficiency: 85 },
  ];

  // Use fetched skills or fallback if empty
  const displayFrontendSkills = frontendSkills.length > 0 ? frontendSkills : fallbackFrontendSkills;
  const displayBackendSkills = backendSkills.length > 0 ? backendSkills : fallbackBackendSkills;

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((column) => (
              <div key={column}>
                <div className="h-8 bg-gray-300 rounded w-1/2 mb-6"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="mb-4 animate-pulse">
                    <div className="flex justify-between mb-1">
                      <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-5 bg-gray-300 rounded w-12"></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gray-300 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">My Technical Skills</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With expertise in a wide range of technologies, I can build comprehensive solutions
            to meet your unique business requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold font-inter mb-6">Frontend Development</h3>

            {displayFrontendSkills.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold font-inter mb-6">Backend & Infrastructure</h3>

            {displayBackendSkills.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-secondary h-2.5 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
