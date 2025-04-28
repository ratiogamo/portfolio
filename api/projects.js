// API route for projects
export default function handler(req, res) {
  const projects = [
    {
      id: 1,
      title: "Automated Onboarding System using Click Up, Google Sheets & Make.com",
      description: "Built a comprehensive client onboarding system that automates data collection, document generation, and task assignment across multiple platforms.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Automation",
      technologies: ["Make.com", "ClickUp", "Google Sheets", "Document Automation"]
    },
    {
      id: 2,
      title: "MyCase Automation",
      description: "Developed custom automation for a law firm to streamline case management, client communication, and document workflows in MyCase.",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Legal",
      technologies: ["MyCase", "Zapier", "Document Generation", "Email Automation"]
    },
    {
      id: 3,
      title: "n8n - Email Agent Automation",
      description: "Created an intelligent email processing system using n8n that categorizes, prioritizes, and routes emails based on content and sender information.",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Email",
      technologies: ["n8n", "OpenAI API", "Email Integration", "Workflow Automation"]
    },
    {
      id: 4,
      title: "Project Management - Notion AI Agent",
      description: "Built an AI-powered project management assistant in Notion that helps teams track deadlines, assign tasks, and generate status reports automatically.",
      imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "AI",
      technologies: ["Notion API", "OpenAI", "Make.com", "Project Management"]
    }
  ];
  
  // Filter by category if provided
  const category = req.query.category;
  let filteredProjects = projects;
  
  if (category) {
    filteredProjects = projects.filter(project => project.category === category);
  }
  
  res.status(200).json(filteredProjects);
}