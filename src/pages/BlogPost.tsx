
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Eye, User } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock data - in real app, fetch by slug
  const post = {
    id: '1',
    title: 'The Ultimate Guide to Calorie Tracking',
    content: `
      <h2>Understanding Calorie Tracking</h2>
      <p>Calorie tracking is one of the most effective ways to manage your weight and improve your overall health. In this comprehensive guide, we'll explore everything you need to know about tracking calories effectively.</p>
      
      <h3>Why Track Calories?</h3>
      <p>Tracking calories helps you:</p>
      <ul>
        <li>Understand your eating patterns</li>
        <li>Make informed food choices</li>
        <li>Achieve your weight goals</li>
        <li>Maintain a balanced diet</li>
      </ul>
      
      <h3>Getting Started with Cals</h3>
      <p>With Cals, tracking your meals is as simple as taking a photo. Our AI technology instantly recognizes your food and provides accurate calorie and macro information.</p>
      
      <h3>Tips for Success</h3>
      <p>Here are some proven strategies to make calorie tracking work for you:</p>
      <ol>
        <li>Be consistent with your logging</li>
        <li>Don't forget about drinks and snacks</li>
        <li>Use the photo feature for accuracy</li>
        <li>Review your weekly patterns</li>
      </ol>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop',
    category: 'Nutrition',
    tags: ['calories', 'tracking', 'health'],
    author: 'Cals Team',
    publishedAt: '2024-01-15',
    views: 1250,
    imageAlt: 'Healthy meal with calorie tracking app'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                {post.views} views
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={post.featuredImage}
              alt={post.imageAlt}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Download Cals today and experience the future of nutrition tracking.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Free
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
