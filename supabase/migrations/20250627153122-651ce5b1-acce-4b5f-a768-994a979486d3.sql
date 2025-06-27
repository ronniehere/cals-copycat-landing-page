
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  image_alt TEXT,
  category_id UUID REFERENCES public.categories(id),
  tags TEXT[] DEFAULT '{}',
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_draft BOOLEAN NOT NULL DEFAULT true,
  views INTEGER NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT
);

-- Create admin_users table for hardcoded admin
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default categories
INSERT INTO public.categories (name, slug, description) VALUES
('Nutrition', 'nutrition', 'Articles about nutrition and healthy eating'),
('Technology', 'technology', 'Articles about AI and technology in health'),
('Health', 'health', 'General health and wellness articles');

-- Insert sample blog posts
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, featured_image, category_id, tags, author, 
  published_at, is_published, is_draft, views, seo_title, seo_description, image_alt
) VALUES
(
  'The Ultimate Guide to Calorie Tracking',
  'ultimate-guide-calorie-tracking',
  'Learn the fundamentals of calorie tracking and how to make it work for your lifestyle.',
  '<h2>Understanding Calorie Tracking</h2><p>Calorie tracking is one of the most effective ways to manage your weight and improve your overall health. In this comprehensive guide, we''ll explore everything you need to know about tracking calories effectively.</p><h3>Why Track Calories?</h3><p>Tracking calories helps you:</p><ul><li>Understand your eating patterns</li><li>Make informed food choices</li><li>Achieve your weight goals</li><li>Maintain a balanced diet</li></ul><h3>Getting Started with Cals</h3><p>With Cals, tracking your meals is as simple as taking a photo. Our AI technology instantly recognizes your food and provides accurate calorie and macro information.</p><h3>Tips for Success</h3><p>Here are some proven strategies to make calorie tracking work for you:</p><ol><li>Be consistent with your logging</li><li>Don''t forget about drinks and snacks</li><li>Use the photo feature for accuracy</li><li>Review your weekly patterns</li></ol>',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop',
  (SELECT id FROM public.categories WHERE slug = 'nutrition'),
  ARRAY['calories', 'tracking', 'health'],
  'Cals Team',
  '2024-01-15T10:00:00Z',
  true,
  false,
  1250,
  'Ultimate Guide to Calorie Tracking | Cals',
  'Master calorie tracking with our comprehensive guide.',
  'Healthy meal with calorie tracking app'
),
(
  'AI-Powered Nutrition: The Future of Food Tracking',
  'ai-powered-nutrition-future',
  'Discover how artificial intelligence is revolutionizing the way we track and understand nutrition.',
  '<h2>The AI Revolution in Nutrition</h2><p>Artificial intelligence is transforming how we approach nutrition and food tracking. Gone are the days of manually logging every meal.</p><h3>How AI Changes Everything</h3><p>With AI-powered nutrition tracking, you can:</p><ul><li>Snap a photo to instantly identify foods</li><li>Get accurate nutritional information in seconds</li><li>Receive personalized recommendations</li><li>Track progress with intelligent insights</li></ul><h3>The Technology Behind It</h3><p>Our AI uses advanced computer vision and machine learning algorithms to recognize thousands of foods and ingredients, providing you with the most accurate nutritional data available.</p>',
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=400&fit=crop',
  (SELECT id FROM public.categories WHERE slug = 'technology'),
  ARRAY['AI', 'nutrition', 'innovation'],
  'Tech Team',
  '2024-01-10T09:00:00Z',
  true,
  false,
  890,
  'AI-Powered Nutrition: Future of Food Tracking | Cals',
  'Discover how AI is revolutionizing nutrition tracking.',
  'AI technology analyzing food'
),
(
  'Meal Planning Made Simple',
  'meal-planning-made-simple',
  'Effective strategies for meal planning that save time and help you stay on track with your nutrition goals.',
  '<h2>The Art of Meal Planning</h2><p>Meal planning is a game-changer for maintaining a healthy diet while saving time and money. Let''s explore how to make it work for you.</p><h3>Getting Started</h3><p>Start with these simple steps:</p><ol><li>Plan your weekly menu</li><li>Create a shopping list</li><li>Prep ingredients in advance</li><li>Use containers for portion control</li></ol><h3>Time-Saving Tips</h3><p>Maximize your meal prep efficiency:</p><ul><li>Batch cook grains and proteins</li><li>Pre-cut vegetables</li><li>Use slow cooker and instant pot</li><li>Prepare freezer-friendly meals</li></ul>',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop',
  (SELECT id FROM public.categories WHERE slug = 'nutrition'),
  ARRAY['meal-planning', 'recipes', 'organization'],
  'Nutrition Team',
  '2024-01-05T08:00:00Z',
  true,
  false,
  654,
  'Meal Planning Made Simple | Cals',
  'Learn effective meal planning strategies.',
  'Organized meal prep containers'
);

-- Insert hardcoded admin user (password: CalsAdmin@9696)
INSERT INTO public.admin_users (username, password_hash) VALUES
('CalsAdmin', '$2b$10$rX8ZKP1qJQXqz4KdY5mOjO8YhHzEr7V2lM3bN9cP4tS8wQ6xF1yG.');

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true);

-- Create policies for admin access (will be handled by application logic)
CREATE POLICY "Admin full access to categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Admin full access to blog posts" ON public.blog_posts FOR ALL USING (true);
CREATE POLICY "Admin can view admin users" ON public.admin_users FOR SELECT USING (true);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Create policy for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Admin can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Admin can update blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Admin can delete blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');
