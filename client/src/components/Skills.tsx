import { useQuery } from '@tanstack/react-query';

interface Skill {
  name: string;
  proficiency: number;
  category?: string;
  profileId?: number;
  id?: number;
}

const Skills = () => {
  const { data: automationSkills = [], isLoading: isLoadingAutomation } = useQuery<Skill[]>({
    queryKey: ['/api/skills', { category: 'automation' }],
  });

  const { data: aiSkills = [], isLoading: isLoadingAI } = useQuery<Skill[]>({
    queryKey: ['/api/skills', { category: 'ai' }],
  });

  const isLoading = isLoadingAutomation || isLoadingAI;

  // Fallback skills if none are returned from the API
  const fallbackAutomationSkills: Skill[] = [
    { name: "Make.com", proficiency: 98 },
    { name: "Zapier", proficiency: 95 },
    { name: "n8n", proficiency: 90 },
    { name: "Airtable", proficiency: 92 },
    { name: "Automated Workflow", proficiency: 96 },
  ];

  const fallbackAISkills: Skill[] = [
    { name: "AI Development", proficiency: 88 },
    { name: "AI Chatbot", proficiency: 85 },
    { name: "AI-Generated Code", proficiency: 82 },
    { name: "No-Code Development", proficiency: 95 },
    { name: "Digital Marketing", proficiency: 87 },
  ];

  // Use fetched skills or fallback if empty
  const displayAutomationSkills = automationSkills.length > 0 ? automationSkills : fallbackAutomationSkills;
  const displayAISkills = aiSkills.length > 0 ? aiSkills : fallbackAISkills;

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
            With expertise in automation and AI technologies, I can build comprehensive solutions
            that save your business thousands of hours annually.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold font-inter mb-6">Automation Expertise</h3>

            {displayAutomationSkills.map((skill: Skill, index: number) => (
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
            <h3 className="text-xl font-bold font-inter mb-6">AI & Development</h3>

            {displayAISkills.map((skill: Skill, index: number) => (
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
