import { BlogPost, BlogCategory } from './blogUtils';

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  structuredData: object;
}

// Generate SEO data for blog post
export const generatePostSEO = (post: BlogPost, baseUrl: string = ''): SEOData => {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImage = post.featuredImage || `${baseUrl}/images/blog/default-og.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${baseUrl}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "James D - Automation & IT Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.png`
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  };

  return {
    title: post.seo.title || `${post.title} | James D Blog`,
    description: post.seo.description || post.excerpt,
    keywords: post.seo.keywords || post.tags,
    canonicalUrl: postUrl,
    ogTitle: post.seo.title || post.title,
    ogDescription: post.seo.description || post.excerpt,
    ogImage: ogImage,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: post.seo.title || post.title,
    twitterDescription: post.seo.description || post.excerpt,
    twitterImage: ogImage,
    structuredData
  };
};

// Generate SEO data for blog listing page
export const generateBlogListingSEO = (
  category?: BlogCategory,
  searchQuery?: string,
  baseUrl: string = ''
): SEOData => {
  let title = 'Blog - Automation & IT Insights | James D';
  let description = 'Expert insights on business automation, legal technology, AI integration, and IT services for South Florida businesses.';
  let keywords = ['business automation', 'legal tech', 'AI integration', 'IT services', 'South Florida', 'Miami', 'automation consulting'];

  if (category) {
    title = `${category.name} Articles | James D Blog`;
    description = `${category.description} - Expert insights and case studies.`;
    keywords = [category.name.toLowerCase(), ...keywords];
  }

  if (searchQuery) {
    title = `Search Results for "${searchQuery}" | James D Blog`;
    description = `Search results for "${searchQuery}" in our automation and IT insights blog.`;
  }

  const blogUrl = `${baseUrl}/blog`;
  const ogImage = `${baseUrl}/images/blog/blog-og.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Automation & IT Insights",
    "description": description,
    "url": blogUrl,
    "author": {
      "@type": "Person",
      "name": "James D"
    },
    "publisher": {
      "@type": "Organization",
      "name": "James D - Automation & IT Solutions"
    }
  };

  return {
    title,
    description,
    keywords,
    canonicalUrl: blogUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: ogImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    structuredData
  };
};

// Update document head with SEO data
export const updateDocumentSEO = (seoData: SEOData): void => {
  // Update title
  document.title = seoData.title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', seoData.description);
  updateMetaTag('keywords', seoData.keywords.join(', '));

  // Open Graph tags
  updateMetaTag('og:title', seoData.ogTitle, true);
  updateMetaTag('og:description', seoData.ogDescription, true);
  updateMetaTag('og:image', seoData.ogImage, true);
  updateMetaTag('og:type', seoData.ogType, true);
  updateMetaTag('og:url', seoData.canonicalUrl, true);

  // Twitter Card tags
  updateMetaTag('twitter:card', seoData.twitterCard);
  updateMetaTag('twitter:title', seoData.twitterTitle);
  updateMetaTag('twitter:description', seoData.twitterDescription);
  updateMetaTag('twitter:image', seoData.twitterImage);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seoData.canonicalUrl);

  // Structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(seoData.structuredData);
  document.head.appendChild(script);
};

// Generate sitemap data
export const generateSitemapData = (posts: BlogPost[], baseUrl: string = ''): string => {
  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.9'
    },
    ...posts.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.updatedAt.split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Generate RSS feed
export const generateRSSFeed = (posts: BlogPost[], baseUrl: string = ''): string => {
  const rssItems = posts.slice(0, 20).map(post => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const pubDate = new Date(post.publishedAt).toUTCString();
    
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>hello@jamesdev.pro (James D)</author>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Automation &amp; IT Insights - James D</title>
    <description>Expert insights on business automation, legal technology, AI integration, and IT services for South Florida businesses.</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hello@jamesdev.pro (James D)</managingEditor>
    <webMaster>hello@jamesdev.pro (James D)</webMaster>
    <category>Technology</category>
    <category>Business Automation</category>
    <category>IT Services</category>
    <ttl>60</ttl>
${rssItems}
  </channel>
</rss>`;

  return rss;
};

// Generate robots.txt content
export const generateRobotsTxt = (baseUrl: string = ''): string => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/blog/rss.xml

# Crawl-delay
Crawl-delay: 1`;
};