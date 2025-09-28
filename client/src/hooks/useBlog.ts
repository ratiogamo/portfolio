import { useState, useEffect, useMemo } from 'react';
import {
  BlogPost,
  BlogCategory,
  getPublishedPosts,
  getPostBySlug,
  getPostsByCategory,
  searchPosts,
  getFeaturedPosts,
  getRelatedPosts,
  getCategories,
  getCategoryBySlug,
  paginatePosts,
  getAllTags,
  getSettings
} from '../lib/blogUtils';

// Hook for getting all published posts with pagination
export const useBlogPosts = (page: number = 1, category?: string, searchQuery?: string) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const settings = getSettings();
  const postsPerPage = settings.blog.postsPerPage;

  const filteredPosts = useMemo(() => {
    try {
      let allPosts = getPublishedPosts();

      if (category) {
        allPosts = getPostsByCategory(category);
      }

      if (searchQuery && searchQuery.trim()) {
        allPosts = searchPosts(searchQuery.trim());
      }

      return allPosts;
    } catch (err) {
      setError('Failed to load posts');
      return [];
    }
  }, [category, searchQuery]);

  const paginationData = useMemo(() => {
    return paginatePosts(filteredPosts, page, postsPerPage);
  }, [filteredPosts, page, postsPerPage]);

  useEffect(() => {
    setLoading(true);
    try {
      setPosts(paginationData.posts);
      setError(null);
    } catch (err) {
      setError('Failed to load posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [paginationData]);

  return {
    posts,
    loading,
    error,
    pagination: {
      currentPage: paginationData.currentPage,
      totalPages: paginationData.totalPages,
      totalPosts: paginationData.totalPosts,
      hasNextPage: paginationData.hasNextPage,
      hasPrevPage: paginationData.hasPrevPage
    }
  };
};

// Hook for getting a single blog post
export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const foundPost = getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedPosts(foundPost));
        setError(null);
      } else {
        setPost(null);
        setRelatedPosts([]);
        setError('Post not found');
      }
    } catch (err) {
      setError('Failed to load post');
      setPost(null);
      setRelatedPosts([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  return {
    post,
    relatedPosts,
    loading,
    error
  };
};

// Hook for getting featured posts
export const useFeaturedPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const featuredPosts = getFeaturedPosts();
      setPosts(featuredPosts);
      setError(null);
    } catch (err) {
      setError('Failed to load featured posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    posts,
    loading,
    error
  };
};

// Hook for getting blog categories
export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const allCategories = getCategories();
      setCategories(allCategories);
      setError(null);
    } catch (err) {
      setError('Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    loading,
    error
  };
};

// Hook for getting a single category
export const useBlogCategory = (slug: string) => {
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const foundCategory = getCategoryBySlug(slug);
      if (foundCategory) {
        setCategory(foundCategory);
        setError(null);
      } else {
        setCategory(null);
        setError('Category not found');
      }
    } catch (err) {
      setError('Failed to load category');
      setCategory(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  return {
    category,
    loading,
    error
  };
};

// Hook for getting all tags
export const useBlogTags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const allTags = getAllTags();
      setTags(allTags);
      setError(null);
    } catch (err) {
      setError('Failed to load tags');
      setTags([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tags,
    loading,
    error
  };
};

// Hook for search functionality
export const useBlogSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = searchPosts(searchQuery);
      setResults(searchResults);
      setError(null);
    } catch (err) {
      setError('Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    performSearch,
    clearSearch
  };
};

// Hook for blog settings
export const useBlogSettings = () => {
  const [settings] = useState(getSettings());

  return {
    settings
  };
};