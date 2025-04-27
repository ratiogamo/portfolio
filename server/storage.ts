import {
  type Profile, type InsertProfile, 
  type Skill, type InsertSkill,
  type Service, type InsertService,
  type Project, type InsertProject,
  type Testimonial, type InsertTestimonial,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // Profile
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Skills
  getSkills(profileId: number): Promise<Skill[]>;
  getSkillsByCategory(profileId: number, category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Services
  getServices(profileId: number): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  // Projects
  getProjects(profileId: number): Promise<Project[]>;
  getProjectsByCategory(profileId: number, category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Testimonials
  getTestimonials(profileId: number): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(profileId: number): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private profile?: Profile;
  private skills: Map<number, Skill>;
  private services: Map<number, Service>;
  private projects: Map<number, Project>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  
  private profileIdCounter: number;
  private skillIdCounter: number;
  private serviceIdCounter: number;
  private projectIdCounter: number;
  private testimonialIdCounter: number;
  private contactMessageIdCounter: number;

  constructor() {
    this.skills = new Map();
    this.services = new Map();
    this.projects = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    
    this.profileIdCounter = 1;
    this.skillIdCounter = 1;
    this.serviceIdCounter = 1;
    this.projectIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.contactMessageIdCounter = 1;
  }

  // Profile
  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.profileIdCounter++;
    const profile: Profile = { ...insertProfile, id };
    this.profile = profile;
    return profile;
  }

  async updateProfile(id: number, profileUpdate: Partial<InsertProfile>): Promise<Profile | undefined> {
    if (!this.profile || this.profile.id !== id) return undefined;
    
    this.profile = { ...this.profile, ...profileUpdate };
    return this.profile;
  }

  // Skills
  async getSkills(profileId: number): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(skill => skill.profileId === profileId);
  }

  async getSkillsByCategory(profileId: number, category: string): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      skill => skill.profileId === profileId && skill.category === category
    );
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.skillIdCounter++;
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }

  // Services
  async getServices(profileId: number): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => service.profileId === profileId);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceIdCounter++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Projects
  async getProjects(profileId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.profileId === profileId);
  }

  async getProjectsByCategory(profileId: number, category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.profileId === profileId && project.category === category
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  // Testimonials
  async getTestimonials(profileId: number): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      testimonial => testimonial.profileId === profileId
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Contact Messages
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageIdCounter++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(profileId: number): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).filter(
      message => message.profileId === profileId
    );
  }
}

export const storage = new MemStorage();
