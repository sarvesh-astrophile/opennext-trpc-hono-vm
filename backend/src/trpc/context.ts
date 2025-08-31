import { initTRPC } from '@trpc/server';
import { db } from '../../adapter';

// Context type definition
export const createTRPCContext = async () => {
  return {
    db,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
