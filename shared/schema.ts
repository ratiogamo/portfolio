import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User profile data
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  hourlyRate: text("hourly_rate"),
  totalEarnings: text("total_earnings"),
  jobSuccessScore: text("job_success_score"),
  totalJobs: integer("total_jobs"),
  totalHours: integer("total_hours"),
  profileUrl: text("profile_url").notNull(),
  responseTime: text("response_time"),
  availability: text("availability"),
  location: text("location"),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
});

// Skills
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  proficiency: integer("proficiency").notNull(),
  category: text("category").notNull(), // 'frontend', 'backend', etc.
  profileId: integer("profile_id").notNull(),
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  profileId: integer("profile_id").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Portfolio Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // 'Web Apps', 'E-commerce', etc.
  technologies: text("technologies").array(),
  profileId: integer("profile_id").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  clientName: text("client_name").notNull(),
  clientTitle: text("client_title").notNull(),
  rating: integer("rating").notNull(),
  imageUrl: text("image_url"),
  profileId: integer("profile_id").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  profileId: integer("profile_id").notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

// Type definitions
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
