import { useState } from 'react';

interface Skill {
  name: string;
  proficiency: number;
  category?: string;
  profileId?: number;
  id?: number;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const automationSkills: Skill[] = [
    { name: "Make.com", proficiency: 98, category: "automation" },
    { name: "Zapier", proficiency: 95, category: "automation" },
    { name: "n8n", proficiency: 90, category: "automation" },
    { name: "Airtable", proficiency: 92, category: "automation" },
    { name: "Automated Workflow", proficiency: 96, category: "automation" },
  ];

  const aiSkills: Skill[] = [
    { name: "AI Development", proficiency: 88, category: "ai" },
    { name: "AI Chatbot", proficiency: 85, category: "ai" },
    { name: "AI-Generated Code", proficiency: 82, category: "ai" },
    { name: "OpenAI GPT Integration", proficiency: 94, category: "ai" },
    { name: "No-Code Development", proficiency: 95, category: "ai" },
  ];

  const lawFirmTools: Skill[] = [
    { name: "MyCase Automation", proficiency: 96, category: "legal" },
    { name: "Clio Integration", proficiency: 92, category: "legal" },
    { name: "Legal Document Automation", proficiency: 94, category: "legal" },
    { name: "Client Intake Workflows", proficiency: 93, category: "legal" },
    { name: "Legal AI Integration", proficiency: 87, category: "legal" },
  ];

  const itInfrastructureSkills: Skill[] = [
    { name: "Network Administration", proficiency: 94, category: "infrastructure" },
    { name: "Server Management", proficiency: 92, category: "infrastructure" },
    { name: "Cybersecurity & Monitoring", proficiency: 89, category: "infrastructure" },
    { name: "Cloud Infrastructure", proficiency: 91, category: "infrastructure" },
    { name: "Help Desk Support", proficiency: 96, category: "infrastructure" },
    { name: "Disaster Recovery", proficiency: 88, category: "infrastructure" },
    { name: "Virtualization (VMware)", proficiency: 85, category: "infrastructure" },
    { name: "Firewall Management", proficiency: 87, category: "infrastructure" },
  ];

  // All skills combined
  const allSkills = [
    ...automationSkills,
    ...aiSkills,
    ...lawFirmTools,
    ...itInfrastructureSkills
  ];

  // Categories for the skill tabs
  const categories: SkillCategory[] = [
    {
      id: 'all',
      name: 'All Skills',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-indigo-600'
    },
    {
      id: 'automation',
      name: 'Automation',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      gradientFrom: 'from-primary',
      gradientTo: 'to-blue-500'
    },
    {
      id: 'ai',
      name: 'AI Development',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      gradientFrom: 'from-accent',
      gradientTo: 'to-purple-500'
    },
    {
      id: 'legal',
      name: 'Law Firm Tools',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      gradientFrom: 'from-secondary',
      gradientTo: 'to-green-500'
    },
    {
      id: 'infrastructure',
      name: 'IT Infrastructure',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      gradientFrom: 'from-orange-600',
      gradientTo: 'to-red-500'
    }
  ];

  // Filter skills based on active category
  const getFilteredSkills = () => {
    if (activeCategory === 'all') return allSkills;
    return allSkills.filter(skill => skill.category === activeCategory);
  }

  const filteredSkills = getFilteredSkills();

  return (
    <section id="skills" className="section-blur py-16 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-inter mb-3 inline-block relative">
            <span className="text-gradient animate-gradient">Technical Expertise & Skills</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Comprehensive technical skill set spanning automation technologies and IT infrastructure management, delivering both proactive automation solutions and enterprise-level IT support capabilities.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? `${category.bgColor} ${category.color} shadow-md`
                  : 'bg-white/70 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className={activeCategory === category.id ? 'animate-pulse' : ''}>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
              {activeCategory === category.id && (
                <span className="flex h-2 w-2 relative ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main Skills Display - Single unified card with all selected skills */}
        <div className="glass-card rounded-2xl shadow-xl p-8 border border-blue-100 backdrop-blur-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden max-w-4xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {filteredSkills.map((skill, index) => {
              // Determine the color scheme based on skill category
              let dotColor = 'bg-blue-500';
              let textColor = 'text-blue-600';
              let gradientClasses = 'from-blue-500 to-indigo-500';

              if (skill.category === 'automation') {
                dotColor = 'bg-primary';
                textColor = 'text-primary';
                gradientClasses = 'from-primary to-blue-500';
              } else if (skill.category === 'ai') {
                dotColor = 'bg-accent';
                textColor = 'text-accent';
                gradientClasses = 'from-accent to-purple-500';
              } else if (skill.category === 'legal') {
                dotColor = 'bg-secondary';
                textColor = 'text-secondary';
                gradientClasses = 'from-secondary to-green-500';
              } else if (skill.category === 'infrastructure') {
                dotColor = 'bg-orange-600';
                textColor = 'text-orange-600';
                gradientClasses = 'from-orange-600 to-red-500';
              }

              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="flex justify-between mb-2 items-center">
                    <span className="font-medium flex items-center text-lg">
                      <span className={`w-2 h-2 ${dotColor} rounded-full mr-2 animate-pulse`}></span>
                      {skill.name}
                    </span>
                    <span className={`text-sm font-bold ${textColor}`}>{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 backdrop-blur-sm overflow-hidden group-hover:shadow-md transition-all duration-300">
                    <div
                      className={`bg-gradient-to-r ${gradientClasses} rounded-full h-3 relative overflow-hidden`}
                      style={{ width: `${skill.proficiency}%`, animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="absolute inset-0 bg-white/20 opacity-50 w-full h-full overflow-hidden"></span>

                      {/* Animated pulse effect on hover */}
                      <span className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state message when no skills match the category */}
          {filteredSkills.length === 0 && (
            <div className="text-center py-10">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500">No skills found for this category.</p>
            </div>
          )}

          {/* Tech-inspired decorative patterns */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="text-primary"></path>
              <path d="M100,0 L0,100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="text-secondary"></path>
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="text-accent"></circle>
              <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" className="text-primary"></circle>
            </svg>
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