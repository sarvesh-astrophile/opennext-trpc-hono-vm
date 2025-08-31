import { z } from 'zod';
import { router, publicProcedure } from './context';
import { posts } from '../db/schema/post';
import { eq } from 'drizzle-orm';

export const appRouter = router({
  // Get all posts
  getPosts: publicProcedure.query(async ({ ctx }) => {
    const allPosts = await ctx.db.select().from(posts).orderBy(posts.createdAt);
    return allPosts;
  }),

  // Create a new post
  createPost: publicProcedure
    .input(z.object({
      content: z.string().min(1, 'Content is required').max(1000, 'Content too long'),
    }))
    .mutation(async ({ ctx, input }) => {
      const newPost = await ctx.db.insert(posts).values({
        content: input.content,
      }).returning();

      return newPost[0];
    }),

  // Get a single post by ID
  getPost: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.select().from(posts).where(eq(posts.id, input.id));
      return post[0] || null;
    }),
});

export type AppRouter = typeof appRouter;
