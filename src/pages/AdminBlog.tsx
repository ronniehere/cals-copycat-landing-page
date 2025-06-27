
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { BlogPost, Category } from '@/types/blog';

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Nutrition', slug: 'nutrition' },
    { id: '2', name: 'Technology', slug: 'technology' },
    { id: '3', name: 'Health', slug: 'health' }
  ]);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: '',
    tags: [],
    author: '',
    seoTitle: '',
    seoDescription: '',
    imageAlt: '',
    isPublished: false
  });

  const handleSavePost = () => {
    const now = new Date().toISOString();
    const slug = postForm.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
    
    const post: BlogPost = {
      id: editingPost?.id || Date.now().toString(),
      title: postForm.title || '',
      excerpt: postForm.excerpt || '',
      content: postForm.content || '',
      featuredImage: postForm.featuredImage || '',
      category: postForm.category || '',
      tags: postForm.tags || [],
      author: postForm.author || '',
      publishedAt: editingPost?.publishedAt || now,
      updatedAt: now,
      slug,
      isPublished: postForm.isPublished || false,
      views: editingPost?.views || 0,
      seoTitle: postForm.seoTitle,
      seoDescription: postForm.seoDescription,
      imageAlt: postForm.imageAlt
    };

    if (editingPost?.id) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? post : p));
    } else {
      setPosts(prev => [...prev, post]);
    }

    setIsPostDialogOpen(false);
    setEditingPost(null);
    setPostForm({});
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm(post);
    setIsPostDialogOpen(true);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        slug: newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: newCategory.description
      };
      setCategories(prev => [...prev, category]);
      setNewCategory({ name: '', description: '' });
      setIsCategoryDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Administration</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts, categories, and content.</p>
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
                    <Button onClick={() => { setEditingPost(null); setPostForm({}); }}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={postForm.title || ''}
                            onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter post title..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="author">Author</Label>
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
                        <Textarea
                          id="excerpt"
                          value={postForm.excerpt || ''}
                          onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                          placeholder="Brief summary of the post..."
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          value={postForm.content || ''}
                          onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Write your post content here..."
                          rows={10}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="featuredImage">Featured Image URL</Label>
                          <Input
                            id="featuredImage"
                            value={postForm.featuredImage || ''}
                            onChange={(e) => setPostForm(prev => ({ ...prev, featuredImage: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="imageAlt">Image Alt Text</Label>
                          <Input
                            id="imageAlt"
                            value={postForm.imageAlt || ''}
                            onChange={(e) => setPostForm(prev => ({ ...prev, imageAlt: e.target.value }))}
                            placeholder="Describe the image..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={postForm.category || ''}
                            onValueChange={(value) => setPostForm(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.name}>
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
                              value={postForm.seoTitle || ''}
                              onChange={(e) => setPostForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                              placeholder="SEO optimized title..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="seoDescription">SEO Description</Label>
                            <Textarea
                              id="seoDescription"
                              value={postForm.seoDescription || ''}
                              onChange={(e) => setPostForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                              placeholder="SEO meta description..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isPublished"
                          checked={postForm.isPublished || false}
                          onChange={(e) => setPostForm(prev => ({ ...prev, isPublished: e.target.checked }))}
                        />
                        <Label htmlFor="isPublished">Publish immediately</Label>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSavePost}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Post
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{post.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={post.isPublished ? "default" : "outline"}>
                            {post.isPublished ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell>{post.views}</TableCell>
                        <TableCell>
                          {new Date(post.publishedAt).toLocaleDateString()}
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
                
                {posts.length === 0 && (
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
                        <Textarea
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
                            {posts.filter(p => p.category === category.name).length} posts
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                    {posts.filter(p => p.isPublished).length}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminBlog;
