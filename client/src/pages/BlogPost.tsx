import { useParams, Link } from 'wouter';
import { useBlogPost, useBlogCategories } from '../hooks/useBlog';
import BlogCard from '../components/blog/BlogCard';
import { formatDate, getReadingTime } from '../lib/blogUtils';
import { generatePostSEO, updateDocumentSEO } from '../lib/seoUtils';
import { getBlogPostImage, DEFAULT_BLOG_IMAGE } from '../lib/blogImages';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { useEffect } from 'react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, relatedPosts, loading, error } = useBlogPost(slug || '');
  const { categories } = useBlogCategories();

  const category = post ? categories.find(cat => cat.slug === post.category) : null;
  const readingTime = post ? getReadingTime(post.content) : 0;
  
  // Get the appropriate image with fallback system
  const imageUrl = post ? (post.featuredImage || getBlogPostImage(post.id, post.category)) : DEFAULT_BLOG_IMAGE;

  // Set page SEO
  useEffect(() => {
    if (post) {
      const baseUrl = window.location.origin;
      const seoData = generatePostSEO(post, baseUrl);
      updateDocumentSEO(seoData);
    }

    return () => {
      // Reset title on cleanup
      document.title = 'Portfolio - Automation & IT Solutions';
    };
  }, [post]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/blog">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="flex items-center gap-2 mb-6 hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Category Badge */}
          {category && (
            <div className="mb-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${category.color} ${category.iconColor}`}>
                <i className={`fas fa-${category.icon} mr-2`}></i>
                {category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold font-inter mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {post.author.charAt(0)}
                </span>
              </div>
              <span>by {post.author}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Featured Image */}
          <div className="relative overflow-hidden rounded-lg mb-8">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== DEFAULT_BLOG_IMAGE) {
                  target.src = DEFAULT_BLOG_IMAGE;
                }
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-inter prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag className="w-5 h-5" />
                  <span className="font-medium">Tags:</span>
                </div>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 pb-16 max-w-6xl">
          <h2 className="text-3xl font-bold font-inter mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold font-inter mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Let's discuss how we can streamline your operations and boost efficiency with custom automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" className="flex items-center gap-2">
                <i className="fas fa-phone"></i>
                Get Free Consultation
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <i className="fas fa-blog"></i>
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;