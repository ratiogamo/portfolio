import { format, parseISO } from 'date-fns';
import postsData from '../data/blog/posts.json';
import categoriesData from '../data/blog/categories.json';
import settingsData from '../data/blog/settings.json';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: 'draft' | 'published' | 'scheduled';
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  iconColor: string;
  icon: string;
}

export interface BlogSettings {
  blog: {
    title: string;
    description: string;
    baseUrl: string;
    postsPerPage: number;
    featuredPostsCount: number;
    enableComments: boolean;
    enableSearch: boolean;
    enableRSS: boolean;
    enableSitemap: boolean;
    seo: {
      defaultTitle: string;
      defaultDescription: string;
      defaultKeywords: string[];
    };
    social: {
      enableSharing: boolean;
      platforms: string[];
    };
    analytics: {
      enableTracking: boolean;
      trackingEvents: string[];
    };
  };
  admin: {
    enableScheduling: boolean;
    enableDrafts: boolean;
    enableImageUpload: boolean;
    maxImageSize: number;
    allowedImageTypes: string[];
    autoSave: boolean;
    autoSaveInterval: number;
  };
}

// Get all published posts
export const getPublishedPosts = (): BlogPost[] => {
  return (postsData.posts as BlogPost[])
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Get all posts (including drafts) - for admin use
export const getAllPosts = (): BlogPost[] => {
  return (postsData.posts as BlogPost[])
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

// Get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return (postsData.posts as BlogPost[]).find(post => post.slug === slug);
};

// Get posts by category
export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return getPublishedPosts().filter(post => post.category === categorySlug);
};

// Get posts by tag
export const getPostsByTag = (tag: string): BlogPost[] => {
  return getPublishedPosts().filter(post => post.tags.includes(tag));
};

// Search posts
export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return getPublishedPosts().filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
  const settings = getSettings();
  return getPublishedPosts().slice(0, settings.blog.featuredPostsCount);
};

// Get related posts
export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const allPosts = getPublishedPosts().filter(post => post.id !== currentPost.id);
  
  // Score posts based on shared tags and same category
  const scoredPosts = allPosts.map(post => {
    let score = 0;
    
    // Same category gets higher score
    if (post.category === currentPost.category) {
      score += 10;
    }
    
    // Shared tags get points
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += sharedTags.length * 2;
    
    return { post, score };
  });
  
  // Sort by score and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
};

// Get all categories
export const getCategories = (): BlogCategory[] => {
  return categoriesData.categories;
};

// Get category by slug
export const getCategoryBySlug = (slug: string): BlogCategory | undefined => {
  return categoriesData.categories.find(category => category.slug === slug);
};

// Get settings
export const getSettings = (): BlogSettings => {
  return settingsData as BlogSettings;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMMM d, yyyy');
};

// Format date for reading time
export const getReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Get unique tags from all posts
export const getAllTags = (): string[] => {
  const allTags = getPublishedPosts().flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
};

// Paginate posts
export const paginatePosts = (posts: BlogPost[], page: number, postsPerPage: number) => {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  return {
    posts: paginatedPosts,
    currentPage: page,
    totalPages,
    totalPosts: posts.length,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

// Strip HTML tags for excerpt
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};