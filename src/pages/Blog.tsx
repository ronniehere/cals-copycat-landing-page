
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Calendar, Eye } from 'lucide-react';
import { BlogPost, BlogFilters } from '@/types/blog';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Calorie Tracking',
    excerpt: 'Learn the fundamentals of calorie tracking and how to make it work for your lifestyle.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop',
    category: 'Nutrition',
    tags: ['calories', 'tracking', 'health'],
    author: 'Cals Team',
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
    slug: 'ultimate-guide-calorie-tracking',
    isPublished: true,
    views: 1250,
    seoTitle: 'Ultimate Guide to Calorie Tracking | Cals',
    seoDescription: 'Master calorie tracking with our comprehensive guide.',
    imageAlt: 'Healthy meal with calorie tracking app'
  },
  {
    id: '2',
    title: 'AI-Powered Nutrition: The Future of Food Tracking',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we track and understand nutrition.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&h=250&fit=crop',
    category: 'Technology',
    tags: ['AI', 'nutrition', 'innovation'],
    author: 'Tech Team',
    publishedAt: '2024-01-10',
    updatedAt: '2024-01-10',
    slug: 'ai-powered-nutrition-future',
    isPublished: true,
    views: 890,
  },
  {
    id: '3',
    title: 'Meal Planning Made Simple',
    excerpt: 'Effective strategies for meal planning that save time and help you stay on track with your nutrition goals.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop',
    category: 'Nutrition',
    tags: ['meal-planning', 'recipes', 'organization'],
    author: 'Nutrition Team',
    publishedAt: '2024-01-05',
    updatedAt: '2024-01-05',
    slug: 'meal-planning-made-simple',
    isPublished: true,
    views: 654,
  }
];

const Blog = () => {
  const [filters, setFilters] = useState<BlogFilters>({
    sortBy: 'newest',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const categories = Array.from(new Set(mockBlogPosts.map(post => post.category)));

  const filteredPosts = useMemo(() => {
    let filtered = mockBlogPosts.filter(post => post.isPublished);

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cals Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights, tips, and the latest updates on nutrition, health, and AI-powered food tracking.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search blogs..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>
            
            <Select
              value={filters.category || 'all'}
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value === 'all' ? undefined : value }))}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value: 'newest' | 'oldest' | 'popular') => setFilters(prev => ({ ...prev, sortBy: value }))}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.imageAlt || post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views}
                  </div>
                </div>
                
                <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.publishedAt)}
                  </div>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {currentPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
