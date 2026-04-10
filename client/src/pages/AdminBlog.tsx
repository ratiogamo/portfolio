import { useState } from 'react';
import { Link } from 'wouter';
import { getAllPosts, getCategories } from '../lib/blogUtils';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  Calendar,
  User,
  Tag
} from 'lucide-react';

const AdminBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const posts = getAllPosts();
  const categories = getCategories();

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-inter">Blog Administration</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts and content</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/blog">
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Blog
                </Button>
              </Link>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {posts.filter(p => p.status === 'published').length}
              </div>
              <div className="text-sm text-gray-600">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {posts.filter(p => p.status === 'draft').length}
              </div>
              <div className="text-sm text-gray-600">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {posts.filter(p => p.status === 'scheduled').length}
              </div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {posts.length}
              </div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Title</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Author</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map((post) => {
                  const category = categories.find(cat => cat.slug === post.category);
                  
                  return (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {post.excerpt}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {category && (
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            <i className={`fas fa-${category.icon} text-xs`}></i>
                            {category.name}
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{post.author}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all' 
                  ? 'No posts match your current filters.'
                  : 'No blog posts found.'}
              </div>
              {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setCategoryFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2 justify-start">
              <Plus className="w-4 h-4" />
              Create New Post
            </Button>
            <Button variant="outline" className="flex items-center gap-2 justify-start">
              <Filter className="w-4 h-4" />
              Manage Categories
            </Button>
            <Button variant="outline" className="flex items-center gap-2 justify-start">
              <Tag className="w-4 h-4" />
              Manage Tags
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;