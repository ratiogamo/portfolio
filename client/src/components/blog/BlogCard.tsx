import { Link } from 'wouter';
import { BlogPost } from '../../lib/blogUtils';
import { formatDate, getReadingTime, stripHtml, truncateText } from '../../lib/blogUtils';
import { useBlogCategories } from '../../hooks/useBlog';
import { getBlogPostImage, DEFAULT_BLOG_IMAGE } from '../../lib/blogImages';
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
  
  const imageUrl = post.featuredImage || getBlogPostImage(post.id, post.category);

  return (
    <article className={`bg-black/20 backdrop-blur-md border border-white/20 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.02] flex flex-col ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${featured ? 'h-64' : 'h-48'}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== DEFAULT_BLOG_IMAGE) {
              target.src = DEFAULT_BLOG_IMAGE;
            }
          }}
          loading="lazy"
        />
        
        {category && (
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${category.color} ${category.iconColor}`}>
              <i className={`fas fa-${category.icon} mr-1`}></i>
              {category.name}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
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

        <h2 className={`font-bold font-inter mb-3 line-clamp-2 text-white hover:text-primary transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
          <Link href={`/blog/${post.slug}`} className="block">
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">
          {truncatedExcerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-white/10 text-gray-300 rounded hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {post.author.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-300">
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