import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import * as cheerio from "cheerio";
import { storage } from "./storage";
import { 
  insertProfileSchema, 
  insertSkillSchema, 
  insertServiceSchema,
  insertProjectSchema,
  insertTestimonialSchema,
  insertContactMessageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Prefix all routes with /api
  const apiRouter = app;

  // Upwork Profile Scraping
  apiRouter.get("/api/scrape-upwork-profile", async (req: Request, res: Response) => {
    try {
      const profileUrl = req.query.url as string || "https://www.upwork.com/freelancers/~01139a1ed402cf0463";
      
      // Fetch the Upwork profile page
      const response = await axios.get(profileUrl);
      const $ = cheerio.load(response.data);
      
      // Extract relevant data (this is a simplified example)
      const name = $("h1.profile-title").text().trim();
      const title = $("h2.profile-subtitle").text().trim() || "AI Developer | Business Automation | Make, Zapier, N8N | MyCase, Clio";
      const description = $("div.profile-overview").text().trim();
      const jobSuccessScore = $("span.job-success-score").text().trim();
      
      // Create profile in storage
      const profileData = {
        name: name || "James D", // Default if extraction fails
        title: title,
        description: description || "I build automated systems that save businesses thousands of hours annually and streamline complex workflows using leading no-code tools and AI.",
        hourlyRate: "$59.25/hr",
        totalEarnings: "50+ Projects Completed",
        jobSuccessScore: jobSuccessScore || "Top-Rated Plus",
        totalJobs: 50,
        totalHours: 12000,
        profileUrl: profileUrl,
        responseTime: "Quick",
        availability: "More than 30 hrs/week",
        location: "Miami, United States",
      };
      
      const profile = await storage.createProfile(profileData);
      
      // Create skills for the profile
      const automationSkills = [
        { name: "Make.com", proficiency: 98, category: "automation", profileId: profile.id },
        { name: "Zapier", proficiency: 95, category: "automation", profileId: profile.id },
        { name: "n8n", proficiency: 90, category: "automation", profileId: profile.id },
        { name: "Airtable", proficiency: 92, category: "automation", profileId: profile.id },
        { name: "Automated Workflow", proficiency: 96, category: "automation", profileId: profile.id },
      ];
      
      const aiSkills = [
        { name: "AI Development", proficiency: 88, category: "ai", profileId: profile.id },
        { name: "AI Chatbot", proficiency: 85, category: "ai", profileId: profile.id },
        { name: "AI-Generated Code", proficiency: 82, category: "ai", profileId: profile.id },
        { name: "No-Code Development", proficiency: 95, category: "ai", profileId: profile.id },
        { name: "Digital Marketing", proficiency: 87, category: "ai", profileId: profile.id },
      ];
      
      // Add skills to storage
      for (const skill of [...automationSkills, ...aiSkills]) {
        await storage.createSkill(skill);
      }
      
      // Create services
      const services = [
        {
          title: "Business Workflow Automation",
          description: "Create seamless, automated workflows that connect all your business tools and eliminate manual work using Make.com, Zapier, and n8n.",
          icon: "cogs",
          profileId: profile.id
        },
        {
          title: "Legal Firm Automation",
          description: "Specialized automation solutions for law firms using MyCase, Clio, and other legal platforms to streamline client intake, document management, and reporting.",
          icon: "balance-scale",
          profileId: profile.id
        },
        {
          title: "AI-Powered Automation",
          description: "Intelligent automation systems that leverage OpenAI and Claude to add decision-making capabilities to your workflows and process data intelligently.",
          icon: "robot",
          profileId: profile.id
        }
      ];
      
      // Add services to storage
      for (const service of services) {
        await storage.createService(service);
      }
      
      // Create projects
      const projects = [
        {
          title: "Automated Onboarding System using Click Up, Google Sheets & Make.com",
          description: "Built a comprehensive client onboarding system that automates data collection, document generation, and task assignment across multiple platforms.",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Automation",
          technologies: ["Make.com", "ClickUp", "Google Sheets", "Document Automation"],
          profileId: profile.id
        },
        {
          title: "MyCase Automation",
          description: "Developed custom automation for a law firm to streamline case management, client communication, and document workflows in MyCase.",
          imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Legal",
          technologies: ["MyCase", "Zapier", "Document Generation", "Email Automation"],
          profileId: profile.id
        },
        {
          title: "n8n - Email Agent Automation",
          description: "Created an intelligent email processing system using n8n that categorizes, prioritizes, and routes emails based on content and sender information.",
          imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Email",
          technologies: ["n8n", "OpenAI API", "Email Integration", "Workflow Automation"],
          profileId: profile.id
        },
        {
          title: "Project Management - Notion AI Agent",
          description: "Built an AI-powered project management assistant in Notion that helps teams track deadlines, assign tasks, and generate status reports automatically.",
          imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "AI",
          technologies: ["Notion API", "OpenAI", "Make.com", "Project Management"],
          profileId: profile.id
        },
        {
          title: "Make.com | Blog post generator | WordPress",
          description: "Automated blog content generation system that creates, formats, and publishes articles to WordPress using AI and content workflows.",
          imageUrl: "https://images.unsplash.com/photo-1563674991-8e6a1773b6fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Content",
          technologies: ["Make.com", "WordPress", "OpenAI", "Content Generation"],
          profileId: profile.id
        },
        {
          title: "Make.com | Automated Client Onboarding",
          description: "End-to-end onboarding system that guides new clients through questionnaires, document signing, and initial setup with minimal manual intervention.",
          imageUrl: "https://images.unsplash.com/photo-1599658880307-95d394a00056?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Automation",
          technologies: ["Make.com", "Document Generation", "CRM Integration", "Email Sequences"],
          profileId: profile.id
        },
        {
          title: "Make.com | Proposal generator | PandaDoc",
          description: "Automatic proposal creation system that pulls client data, creates customized proposals in PandaDoc, and tracks the approval process.",
          imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Documents",
          technologies: ["Make.com", "PandaDoc", "CRM Integration", "Proposal Automation"],
          profileId: profile.id
        }
      ];
      
      // Add projects to storage
      for (const project of projects) {
        await storage.createProject(project);
      }
      
      // Create testimonials
      const testimonials = [
        {
          content: "James created an automation system that completely transformed our client onboarding process. What used to take us hours now happens automatically, and the quality is consistently perfect.",
          clientName: "Amanda Richards",
          clientTitle: "Operations Director, Legal Solutions Inc.",
          rating: 5,
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
          profileId: profile.id
        },
        {
          content: "Working with James on our MyCase automation was a game-changer for our law firm. The systems he built have saved our team countless hours on administrative tasks and improved our client communication tremendously.",
          clientName: "Michael Torres",
          clientTitle: "Managing Partner, Torres Legal Group",
          rating: 5,
          imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
          profileId: profile.id
        },
        {
          content: "James delivered an exceptional email automation system using n8n that has completely changed how we handle our support inbox. His knowledge of AI integration was particularly impressive and added tremendous value.",
          clientName: "Sarah Lowell",
          clientTitle: "Customer Success Manager, TechFlow",
          rating: 5,
          imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
          profileId: profile.id
        }
      ];
      
      // Add testimonials to storage
      for (const testimonial of testimonials) {
        await storage.createTestimonial(testimonial);
      }
      
      res.json({ success: true, profile });
    } catch (error) {
      console.error("Error scraping Upwork profile:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to scrape Upwork profile",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get Profile data
  apiRouter.get("/api/profile", async (req: Request, res: Response) => {
    try {
      const profile = await storage.getProfile();
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error getting profile:", error);
      res.status(500).json({ 
        message: "Failed to get profile",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get Skills
  apiRouter.get("/api/skills", async (req: Request, res: Response) => {
    try {
      const profile = await storage.getProfile();
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      const category = req.query.category as string;
      let skills;
      
      if (category) {
        skills = await storage.getSkillsByCategory(profile.id, category);
      } else {
        skills = await storage.getSkills(profile.id);
      }
      
      res.json(skills);
    } catch (error) {
      console.error("Error getting skills:", error);
      res.status(500).json({ 
        message: "Failed to get skills",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get Services
  apiRouter.get("/api/services", async (req: Request, res: Response) => {
    try {
      const profile = await storage.getProfile();
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      const services = await storage.getServices(profile.id);
      res.json(services);
    } catch (error) {
      console.error("Error getting services:", error);
      res.status(500).json({ 
        message: "Failed to get services",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get Projects
  apiRouter.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const profile = await storage.getProfile();
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      const category = req.query.category as string;
      let projects;
      
      if (category) {
        projects = await storage.getProjectsByCategory(profile.id, category);
      } else {
        projects = await storage.getProjects(profile.id);
      }
      
      res.json(projects);
    } catch (error) {
      console.error("Error getting projects:", error);
      res.status(500).json({ 
        message: "Failed to get projects",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get Testimonials
  apiRouter.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const profile = await storage.getProfile();
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      const testimonials = await storage.getTestimonials(profile.id);
      res.json(testimonials);
    } catch (error) {
      console.error("Error getting testimonials:", error);
      res.status(500).json({ 
        message: "Failed to get testimonials",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Submit Contact Form
  apiRouter.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const profile = await storage.getProfile();
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      // Validate the request body
      const validatedData = insertContactMessageSchema.parse({
        ...req.body,
        profileId: profile.id
      });
      
      // Create contact message
      const message = await storage.createContactMessage(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Your message has been sent successfully!",
        data: message
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid form data",
          errors: error.errors
        });
      }
      
      res.status(500).json({ 
        message: "Failed to submit contact form",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  return httpServer;
}
