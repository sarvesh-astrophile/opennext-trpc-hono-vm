import { router } from './context';
import { postRouter } from './routers/post';

export const appRouter = router({
  post: postRouter,
});

export type AppRouter = typeof appRouter;
