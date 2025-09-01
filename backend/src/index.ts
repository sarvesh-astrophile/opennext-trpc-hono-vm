import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './trpc/root'
import { createTRPCContext } from './trpc/context'

const app = new Hono()

// CORS middleware using Hono's built-in cors middleware
const corsOrigin = process.env['CORS_ORIGIN'] ?? '*';
app.use('/trpc/*', cors({
  origin: corsOrigin, 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// tRPC endpoint
app.use('/trpc/*', trpcServer({
  router: appRouter,
  createContext: createTRPCContext,
}))

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
