// Serverless API route for Vercel
import express from 'express';

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple API routes for Vercel serverless environment
// Root API endpoint for health check
app.get('/api', (req, res) => {
  res.json({
    status: "ok",
    message: "API is running",
    version: "1.0.0"
  });
});

app.get('/api/profile', (req, res) => {
  const profile = {
    name: "James D",
    title: "AI Developer | Business Automation | Make, Zapier, N8N | MyCase, Clio",
    description: "I build automated systems that save businesses thousands of hours annually and streamline complex workflows using leading no-code tools and AI.",
    hourlyRate: "$59.25/hr",
    totalEarnings: "50+ Projects Completed",
    jobSuccessScore: "Top-Rated Plus",
    totalJobs: 50,
    totalHours: 12000,
    profileUrl: "https://www.upwork.com/freelancers/~01139a1ed402cf0463",
    responseTime: "Quick",
    availability: "More than 30 hrs/week",
    location: "Miami, United States"
  };
  
  res.json(profile);
});

app.get('/api/skills', (req, res) => {
  const category = req.query.category;
  let skills = [
    { id: 1, name: "Make.com", proficiency: 98, category: "automation" },
    { id: 2, name: "Zapier", proficiency: 95, category: "automation" },
    { id: 3, name: "n8n", proficiency: 90, category: "automation" },
    { id: 4, name: "Airtable", proficiency: 92, category: "automation" },
    { id: 5, name: "Automated Workflow", proficiency: 96, category: "automation" },
    { id: 6, name: "AI Development", proficiency: 88, category: "ai" },
    { id: 7, name: "AI Chatbot", proficiency: 85, category: "ai" },
    { id: 8, name: "AI-Generated Code", proficiency: 82, category: "ai" },
    { id: 9, name: "No-Code Development", proficiency: 95, category: "ai" },
    { id: 10, name: "Digital Marketing", proficiency: 87, category: "ai" }
  ];
  
  if (category) {
    skills = skills.filter(skill => skill.category === category);
  }
  
  res.json(skills);
});

app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: "Business Workflow Automation",
      description: "Create seamless, automated workflows that connect all your business tools and eliminate manual work using Make.com, Zapier, and n8n.",
      icon: "cogs"
    },
    {
      id: 2,
      title: "Legal Firm Automation",
      description: "Specialized automation solutions for law firms using MyCase, Clio, and other legal platforms to streamline client intake, document management, and reporting.",
      icon: "balance-scale"
    },
    {
      id: 3,
      title: "AI-Powered Automation",
      description: "Intelligent automation systems that leverage OpenAI and Claude to add decision-making capabilities to your workflows and process data intelligently.",
      icon: "robot"
    }
  ];
  
  res.json(services);
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }
  
  // In a real app, you would save this to a database or send an email
  console.log('Contact form submission:', { name, email, subject, message });
  
  res.status(201).json({
    success: true,
    message: "Your message has been received. I'll get back to you soon!"
  });
});

// Handle all other API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

// Export the serverless function handler
export default async function handler(req, res) {
  return app(req, res);
}
