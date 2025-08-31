import { Hono } from 'hono'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './trpc/router'
import { createTRPCContext } from './trpc/context'

const app = new Hono()

// CORS middleware
app.use('/trpc/*', async (c, next) => {
  // Set CORS headers
  c.header('Access-Control-Allow-Origin', '*') // In production, specify your frontend domain
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    return c.text('', 200)
  }

  await next()
})

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
