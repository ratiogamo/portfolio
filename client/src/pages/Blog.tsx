import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useBlogPosts, useBlogCategories } from '../hooks/useBlog';
import BlogCard from '../components/blog/BlogCard';
import CategoryFilter from '../components/blog/CategoryFilter';
import SearchBar from '../components/blog/SearchBar';
import { generateBlogListingSEO, updateDocumentSEO } from '../lib/seoUtils';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Blog = () => {
  const [location] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const { posts, loading, error, pagination } = useBlogPosts(
    currentPage,
    selectedCategory || undefined,
    searchQuery || undefined
  );
  const { categories } = useBlogCategories();

  // Handle URL query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  // Update SEO based on current filters
  useEffect(() => {
    const baseUrl = window.location.origin;
    const selectedCategoryObj = categories.find(cat => cat.slug === selectedCategory);
    const seoData = generateBlogListingSEO(selectedCategoryObj, searchQuery, baseUrl);
    updateDocumentSEO(seoData);

    return () => {
      // Reset title on cleanup
      document.title = 'Portfolio - Automation & IT Solutions';
    };
  }, [selectedCategory, searchQuery, categories]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedCategory('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md border border-red-500/50 rounded-2xl p-8 md:p-12 text-center">
            <h1 className="text-3xl font-bold text-red-400 mb-4">Error Loading Blog</h1>
            <p className="text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">
            Automation & IT Insights
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Stay updated with the latest insights on business automation, legal technology, 
            AI integration, and IT services from our expert team.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <SearchBar 
              onSearch={handleSearch}
              value={searchQuery}
              placeholder="Search articles..."
            />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          
          {(selectedCategory || searchQuery) && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-300">Active filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {categories.find(cat => cat.slug === selectedCategory)?.name}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                  "{searchQuery}"
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs text-gray-300 hover:text-white"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div>
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-black/20 backdrop-blur-md border border-white/20 rounded-lg p-6 animate-pulse">
                  <div className="w-full h-48 bg-white/10 rounded-lg mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && posts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="flex items-center gap-1 bg-black/20 border-white/20 text-white hover:bg-white/10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(pagination.totalPages)].map((_, i) => {
                      const page = i + 1;
                      const isCurrentPage = page === pagination.currentPage;
                      const showPage = 
                        page === 1 || 
                        page === pagination.totalPages || 
                        Math.abs(page - pagination.currentPage) <= 2;

                      if (!showPage) {
                        if (page === pagination.currentPage - 3 || page === pagination.currentPage + 3) {
                          return <span key={page} className="px-2 text-gray-400">...</span>;
                        }
                        return null;
                      }

                      return (
                        <Button
                          key={page}
                          variant={isCurrentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 p-0 ${!isCurrentPage && 'bg-black/20 border-white/20 text-white hover:bg-white/10'}`}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="flex items-center gap-1 bg-black/20 border-white/20 text-white hover:bg-white/10"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}

          {!loading && posts.length === 0 && (
            <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">No articles found</h3>
                <p className="text-gray-300 mb-4">
                  {searchQuery || selectedCategory
                    ? "Try adjusting your search or filter criteria."
                    : "No blog posts are available at the moment."}
                </p>
                {(searchQuery || selectedCategory) && (
                  <Button onClick={clearFilters} variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white/10">
                    View all articles
                  </Button>
                )}
              </div>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="text-center mt-8 text-sm text-gray-400">
              Showing {((pagination.currentPage - 1) * 9) + 1} to{' '}
              {Math.min(pagination.currentPage * 9, pagination.totalPosts)} of{' '}
              {pagination.totalPosts} articles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;