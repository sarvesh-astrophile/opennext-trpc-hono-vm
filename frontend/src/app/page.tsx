'use client';

import { useGetPosts, useCreatePost } from '../lib/trpc/hooks';
import { useState } from 'react';

export default function Home() {
  const [newPostContent, setNewPostContent] = useState('');
  const { data: posts, isLoading, refetch } = useGetPosts();
  const createPostMutation = useCreatePost();

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      await createPostMutation.mutateAsync({ content: newPostContent });
      setNewPostContent('');
      refetch(); // Refresh the posts list
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">OpenNext + tRPC + Hono + Cloudflare</h1>

      {/* Create Post Form */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 px-4 py-2 border rounded"
            onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
          />
          <button
            onClick={handleCreatePost}
            disabled={createPostMutation.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {createPostMutation.isPending ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Posts</h2>

        {isLoading && <p>Loading posts...</p>}

        {!isLoading && posts && posts.length === 0 && (
          <p className="text-gray-500">No posts yet. Create your first post above!</p>
        )}

        {posts?.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg">
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Error Display */}
      {createPostMutation.error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error creating post: {createPostMutation.error.message}
        </div>
      )}
    </div>
  );
}
