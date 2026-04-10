// Blog Images - Curated Unsplash images for blog posts
// Using consistent optimization parameters: ixlib=rb-4.0.3&auto=format&fit=crop

// Category-based default images
export const BLOG_CATEGORY_IMAGES = {
  'business-automation': 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Automation dashboard
  'legal-tech': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Law/justice
  'ai-integration': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // AI/Robot
  'managed-it': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Server room
  'emergency-support': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Emergency/support
  'network-security': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Cybersecurity
} as const;

// Specific images for each blog post
export const BLOG_POST_IMAGES = {
  'business-automation-case-study-1': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Law firm
  'business-automation-tutorial-1': 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Make.com workflow
  'legal-tech-case-study-1': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Document processing
  'ai-integration-insights-1': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // AI future
  'legal-tech-tutorial-1': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Clio automation
  'ai-integration-case-study-1': 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Email classification
  'managed-it-insights-1': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // IT downtime
  'emergency-support-case-study-1': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Emergency response
  'network-security-insights-1': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // Cybersecurity threats
  'business-automation-insights-1': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // ROI calculation
} as const;

// Default fallback image
export const DEFAULT_BLOG_IMAGE = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'; // Generic tech

// Helper function to get blog post image
export const getBlogPostImage = (postId: string, category: string): string => {
  return BLOG_POST_IMAGES[postId as keyof typeof BLOG_POST_IMAGES] || 
         BLOG_CATEGORY_IMAGES[category as keyof typeof BLOG_CATEGORY_IMAGES] || 
         DEFAULT_BLOG_IMAGE;
};

// Type definitions for better TypeScript support
export type BlogCategory = keyof typeof BLOG_CATEGORY_IMAGES;
export type BlogPostId = keyof typeof BLOG_POST_IMAGES;