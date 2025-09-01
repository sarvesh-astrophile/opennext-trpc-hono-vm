// Central types file for easy sharing between frontend and backend
export type { AppRouter } from '../trpc/root';

// Database types
export type { Post, NewPost } from '../db/schema/post';

// tRPC procedure input/output types
export type CreatePostInput = {
  content: string;
};

export type GetPostInput = {
  id: number;
};

// Common utility types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
