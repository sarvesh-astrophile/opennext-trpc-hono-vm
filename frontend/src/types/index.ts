// Frontend types - re-export backend types for easy access
export type {
  AppRouter,
  NewPost,
  CreatePostInput,
  GetPostInput,
  ApiResponse
} from '@backend/types';

// Database types (import directly to avoid path mapping issues)
import type { Post } from '@backend/db/schema/post';

// Frontend-specific types
export type PostFormData = {
  content: string;
};

export type PostListProps = {
  posts: Post[];
  isLoading: boolean;
  onRefresh: () => void;
};
