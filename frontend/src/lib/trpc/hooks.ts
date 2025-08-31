import { trpc } from './client';

// Export tRPC hooks for easy access
export const trpcHooks = trpc;

// Specific hooks for posts
export const useGetPosts = () => trpc.getPosts.useQuery();
export const useCreatePost = () => trpc.createPost.useMutation();
export const useGetPost = (id: number) => trpc.getPost.useQuery({ id });
