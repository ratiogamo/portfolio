import { Link } from 'wouter';
import { BlogPost } from '../../lib/blogUtils';
import { formatDate, getReadingTime, stripHtml, truncateText } from '../../lib/blogUtils';
import { useBlogCategories } from '../../hooks/useBlog';
import { Clock, Calendar, Tag } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const { categories } = useBlogCategories();
  const category = categories.find(cat => cat.slug === post.category);
  
  const readingTime = getReadingTime(post.content);
  const plainTextExcerpt = stripHtml(post.excerpt);
  const truncatedExcerpt = truncateText(plainTextExcerpt, featured ? 200 : 150);

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      {/* Featured Image */}
      <div className="relative overflow-hidden">
        <img
          src={post.featuredImage || '/images/blog/default-blog.jpg'}
          alt={post.title}
          className={`w-full object-cover transition-transform duration-300 hover:scale-105 ${featured ? 'h-64' : 'h-48'}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/blog/default-blog.jpg';
          }}
        />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${category.color} ${category.iconColor}`}>
              <i className={`fas fa-${category.icon} mr-1`}></i>
              {category.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h2 className={`font-bold font-inter mb-3 line-clamp-2 hover:text-primary transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
          <Link href={`/blog/${post.slug}`} className="block">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncatedExcerpt}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Author and Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {post.author.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              by {post.author}
            </span>
          </div>
          
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read more
            <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;