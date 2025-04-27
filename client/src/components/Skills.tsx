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
    <section id="skills" className="section-blur py-16 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-3 inline-block relative">
            <span className="text-gradient animate-gradient">My Expertise</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            I specialize in a range of automation tools and AI technologies to create powerful, efficient solutions for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Connected line between skill boxes */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 hidden lg:block">
            <svg className="w-full h-full text-primary/40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="animate-spin" style={{ animationDuration: '30s' }} />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          </div>
        
          {/* Automation Skills */}
          <div className="glass-card rounded-2xl shadow-xl p-6 border border-primary/10 backdrop-blur-sm hover-scale transition-all duration-500 hover:shadow-primary/10">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-primary mr-3 p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </span>
              Automation Tools
            </h3>
            <div className="space-y-6">
              {displayAutomationSkills.map((skill: Skill, index: number) => (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-2 items-center">
                    <span className="font-medium flex items-center text-lg">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold text-primary">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200/50 rounded-full h-3 backdrop-blur-sm overflow-hidden glow-border">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary rounded-full h-3 relative overflow-hidden animate-gradient"
                      style={{ width: `${skill.proficiency}%` }}
                    >
                      <span className="absolute inset-0 bg-white/20 opacity-50 w-full h-full overflow-hidden animate-pulse"></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Skills */}
          <div className="glass-card rounded-2xl shadow-xl p-6 border border-secondary/10 backdrop-blur-sm hover-scale transition-all duration-500 hover:shadow-secondary/10">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-accent mr-3 p-2 bg-accent/10 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </span>
              AI Development
            </h3>
            <div className="space-y-6">
              {displayAISkills.map((skill: Skill, index: number) => (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-2 items-center">
                    <span className="font-medium flex items-center text-lg">
                      <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold text-accent">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200/50 rounded-full h-3 backdrop-blur-sm overflow-hidden glow-border">
                    <div
                      className="bg-gradient-to-r from-secondary to-accent rounded-full h-3 relative overflow-hidden animate-gradient"
                      style={{ width: `${skill.proficiency}%`, animationDelay: '0.2s' }}
                    >
                      <span className="absolute inset-0 bg-white/20 opacity-50 w-full h-full overflow-hidden animate-pulse"></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Technology connections - decorative animated lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full text-primary/5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,20 L80,80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M80,20 L20,80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M50,0 L50,100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M0,50 L100,50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Skills;
