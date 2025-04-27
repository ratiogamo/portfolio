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
      const title = $("h2.profile-subtitle").text().trim() || "Full Stack Developer";
      const description = $("div.profile-overview").text().trim();
      const jobSuccessScore = $("span.job-success-score").text().trim();
      
      // Create profile in storage
      const profileData = {
        name: name || "Dor Zairi", // Default if extraction fails
        title: title,
        description: description || "Full Stack Developer with expertise in web applications, API integrations, and data-driven solutions.",
        hourlyRate: "$50/hr",
        totalEarnings: "$100k+",
        jobSuccessScore: jobSuccessScore || "98%",
        totalJobs: 100,
        totalHours: 5000,
        profileUrl: profileUrl,
        responseTime: "24h",
        availability: "Available for new projects",
        location: "Remote",
      };
      
      const profile = await storage.createProfile(profileData);
      
      // Create sample skills for the profile
      const frontendSkills = [
        { name: "React.js", proficiency: 95, category: "frontend", profileId: profile.id },
        { name: "Vue.js", proficiency: 90, category: "frontend", profileId: profile.id },
        { name: "JavaScript/TypeScript", proficiency: 95, category: "frontend", profileId: profile.id },
        { name: "HTML/CSS/SCSS", proficiency: 90, category: "frontend", profileId: profile.id },
        { name: "Responsive Design", proficiency: 95, category: "frontend", profileId: profile.id },
      ];
      
      const backendSkills = [
        { name: "Node.js/Express", proficiency: 90, category: "backend", profileId: profile.id },
        { name: "Python/Django", proficiency: 85, category: "backend", profileId: profile.id },
        { name: "SQL/NoSQL Databases", proficiency: 90, category: "backend", profileId: profile.id },
        { name: "Docker/Kubernetes", proficiency: 80, category: "backend", profileId: profile.id },
        { name: "AWS/Cloud Services", proficiency: 85, category: "backend", profileId: profile.id },
      ];
      
      // Add skills to storage
      for (const skill of [...frontendSkills, ...backendSkills]) {
        await storage.createSkill(skill);
      }
      
      // Create services
      const services = [
        {
          title: "Full Stack Web Development",
          description: "End-to-end development of scalable web applications with modern frameworks and clean architecture.",
          icon: "laptop-code",
          profileId: profile.id
        },
        {
          title: "API Development & Integration",
          description: "Creating robust APIs and seamlessly integrating third-party services into your applications.",
          icon: "server",
          profileId: profile.id
        },
        {
          title: "Cloud Architecture & Deployment",
          description: "Setting up scalable, secure cloud infrastructure for your applications with CI/CD workflows.",
          icon: "cloud",
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
          title: "Multi-vendor E-commerce Platform",
          description: "Built a scalable marketplace with integrated payment processing, vendor management, and analytics dashboard.",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "E-commerce",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          profileId: profile.id
        },
        {
          title: "Real-time Analytics Dashboard",
          description: "Developed a comprehensive dashboard for visualizing business metrics with real-time data updates and alerts.",
          imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Web Apps",
          technologies: ["Vue.js", "Python", "PostgreSQL", "Websockets"],
          profileId: profile.id
        },
        {
          title: "Health & Fitness Mobile App",
          description: "Created a cross-platform mobile application for fitness tracking with social features and custom workout plans.",
          imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Mobile",
          technologies: ["React Native", "Firebase", "Redux", "Native APIs"],
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
          content: "Dor is an exceptional developer who delivered our e-commerce platform ahead of schedule. His attention to detail and proactive communication made the entire process smooth and worry-free.",
          clientName: "Michael Johnson",
          clientTitle: "CEO, TechRetail",
          rating: 5,
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
          profileId: profile.id
        },
        {
          content: "We hired Dor to build our company's API infrastructure and he delivered beyond our expectations. His knowledge of backend systems and ability to solve complex problems was impressive.",
          clientName: "Sarah Williams",
          clientTitle: "CTO, DataSync",
          rating: 5,
          imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
          profileId: profile.id
        },
        {
          content: "Working with Dor was a game-changer for our startup. He quickly understood our needs and built a scalable web application that has been crucial for our growth. Highly recommended!",
          clientName: "David Chen",
          clientTitle: "Founder, InnovateLab",
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
