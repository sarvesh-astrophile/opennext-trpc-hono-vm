import { trpc } from '@/lib/trpc/client';

// Export tRPC hooks for easy access
export const trpcHooks = trpc;

// Specific hooks for posts
export const useGetPosts = () => trpc.post.getPosts.useQuery();
export const useCreatePost = () => trpc.post.createPost.useMutation();
export const useGetPost = (id: number) => trpc.post.getPost.useQuery({ id });
