
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Save, LogOut, FileText, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';
import AdminLogin from '@/components/AdminLogin';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  image_alt: string;
  category_id: string;
  tags: string[];
  author: string;
  published_at: string;
  is_published: boolean;
  is_draft: boolean;
  views: number;
  seo_title: string;
  seo_description: string;
  categories: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

const AdminBlog = () => {
  const { isAuthenticated, logout, loading } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    image_alt: '',
    category_id: '',
    tags: [],
    author: '',
    published_at: new Date().toISOString().split('T')[0],
    seo_title: '',
    seo_description: '',
    is_published: false,
    is_draft: true
  });

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
    enabled: isAuthenticated
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Category[];
    },
    enabled: isAuthenticated
  });

  const savePostMutation = useMutation({
    mutationFn: async (post: Partial<BlogPost>) => {
      const slug = post.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      const now = new Date().toISOString();
      
      // Clean the post data to match database schema
      const postData = {
        title: post.title,
        slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        image_alt: post.image_alt,
        category_id: post.category_id,
        tags: post.tags || [],
        author: post.author,
        seo_title: post.seo_title,
        seo_description: post.seo_description,
        is_published: post.is_published,
        is_draft: post.is_draft,
        updated_at: now,
        published_at: post.is_published ? (post.published_at || now) : null
      };

      if (editingPost?.id) {
        const { data, error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([{ ...postData, created_at: now }])
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      setIsPostDialogOpen(false);
      setEditingPost(null);
      setPostForm({
        title: '',
        excerpt: '',
        content: '',
        featured_image: '',
        image_alt: '',
        category_id: '',
        tags: [],
        author: '',
        published_at: new Date().toISOString().split('T')[0],
        seo_title: '',
        seo_description: '',
        is_published: false,
        is_draft: true
      });
      toast({
        title: "Success",
        description: editingPost ? "Post updated successfully!" : "Post created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive",
      });
      console.error('Save error:', error);
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
    }
  });

  const addCategoryMutation = useMutation({
    mutationFn: async (category: { name: string; description: string }) => {
      const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const { data, error } = await supabase
        .from('categories')
        .insert([{ ...category, slug }])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setNewCategory({ name: '', description: '' });
      setIsCategoryDialogOpen(false);
      toast({
        title: "Success",
        description: "Category created successfully!",
      });
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const handleSavePost = () => {
    if (!postForm.title || !postForm.content || !postForm.category_id) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (title, content, category).",
        variant: "destructive",
      });
      return;
    }
    
    savePostMutation.mutate(postForm);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      ...post,
      published_at: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setIsPostDialogOpen(true);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(id);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name) {
      addCategoryMutation.mutate(newCategory);
    }
  };

  const handleSaveAsDraft = () => {
    setPostForm(prev => ({ ...prev, is_draft: true, is_published: false }));
    setTimeout(() => handleSavePost(), 0);
  };

  const handlePublish = () => {
    setPostForm(prev => ({ ...prev, is_draft: false, is_published: true }));
    setTimeout(() => handleSavePost(), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Administration</h1>
            <p className="text-gray-600 mt-2">Manage your blog posts, categories, and content.</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Blog Posts</CardTitle>
                <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => { 
                      setEditingPost(null); 
                      setPostForm({
                        title: '',
                        excerpt: '',
                        content: '',
                        featured_image: '',
                        image_alt: '',
                        category_id: '',
                        tags: [],
                        author: '',
                        published_at: new Date().toISOString().split('T')[0],
                        seo_title: '',
                        seo_description: '',
                        is_published: false,
                        is_draft: true
                      }); 
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={postForm.title || ''}
                            onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter post title..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="author">Author *</Label>
                          <Input
                            id="author"
                            value={postForm.author || ''}
                            onChange={(e) => setPostForm(prev => ({ ...prev, author: e.target.value }))}
                            placeholder="Author name..."
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Input
                          id="excerpt"
                          value={postForm.excerpt || ''}
                          onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                          placeholder="Brief summary of the post..."
                        />
                      </div>

                      <RichTextEditor
                        label="Content *"
                        value={postForm.content || ''}
                        onChange={(content) => setPostForm(prev => ({ ...prev, content }))}
                        placeholder="Write your post content here..."
                        rows={12}
                      />

                      <ImageUpload
                        label="Featured Image"
                        currentImage={postForm.featured_image}
                        onImageUpload={(url) => setPostForm(prev => ({ ...prev, featured_image: url }))}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="imageAlt">Image Alt Text</Label>
                          <Input
                            id="imageAlt"
                            value={postForm.image_alt || ''}
                            onChange={(e) => setPostForm(prev => ({ ...prev, image_alt: e.target.value }))}
                            placeholder="Describe the image..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="publishedAt">Publish Date</Label>
                          <Input
                            id="publishedAt"
                            type="date"
                            value={postForm.published_at || ''}
                            onChange={(e) => setPostForm(prev => ({ ...prev, published_at: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={postForm.category_id || ''}
                            onValueChange={(value) => setPostForm(prev => ({ ...prev, category_id: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            value={postForm.tags?.join(', ') || ''}
                            onChange={(e) => setPostForm(prev => ({ 
                              ...prev, 
                              tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                            }))}
                            placeholder="tag1, tag2, tag3"
                          />
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-4">SEO Settings</h4>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="seoTitle">SEO Title</Label>
                            <Input
                              id="seoTitle"
                              value={postForm.seo_title || ''}
                              onChange={(e) => setPostForm(prev => ({ ...prev, seo_title: e.target.value }))}
                              placeholder="SEO optimized title..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="seoDescription">SEO Description</Label>
                            <Input
                              id="seoDescription"
                              value={postForm.seo_description || ''}
                              onChange={(e) => setPostForm(prev => ({ ...prev, seo_description: e.target.value }))}
                              placeholder="SEO meta description..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-4 border-t">
                        <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="outline" onClick={handleSaveAsDraft}>
                          <FileText className="h-4 w-4 mr-2" />
                          Save as Draft
                        </Button>
                        <Button onClick={handlePublish}>
                          <Save className="h-4 w-4 mr-2" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                {postsLoading ? (
                  <div className="text-center py-8">Loading posts...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{post.categories?.name}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={post.is_published ? "default" : post.is_draft ? "outline" : "secondary"}>
                              {post.is_published ? 'Published' : post.is_draft ? 'Draft' : 'Unpublished'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Not published'}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeletePost(post.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                
                {posts.length === 0 && !postsLoading && (
                  <div className="text-center py-8 text-gray-500">
                    No blog posts yet. Create your first post!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Categories</CardTitle>
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                          id="categoryName"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter category name..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoryDescription">Description</Label>
                        <Input
                          id="categoryDescription"
                          value={newCategory.description}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Optional category description..."
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddCategory}>
                          Create Category
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          {category.description || 'No description'}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">
                            {posts.filter(p => p.category_id === category.id).length} posts
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{posts.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {posts.filter(p => p.is_published).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Drafts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">
                    {posts.filter(p => p.is_draft).length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {posts.reduce((sum, post) => sum + post.views, 0)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Individual Post Views</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Published Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>
                          <Badge variant={post.is_published ? "default" : "outline"}>
                            {post.is_published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{post.views}</TableCell>
                        <TableCell>
                          {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Not published'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminBlog;
