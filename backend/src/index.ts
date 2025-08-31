import { Hono } from 'hono'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './trpc/router'
import { createTRPCContext } from './trpc/context'

const app = new Hono()

// Trust proxy for proper IP detection and SSL headers
app.use('*', async (c, next) => {
  // Trust proxy headers from Traefik
  c.req.raw.headers.set('X-Forwarded-Proto', c.req.header('X-Forwarded-Proto') || 'https')
  c.req.raw.headers.set('X-Forwarded-Host', c.req.header('X-Forwarded-Host') || c.req.header('Host') || '')
  c.req.raw.headers.set('X-Real-IP', c.req.header('X-Real-IP') || c.req.header('CF-Connecting-IP') || '')

  await next()
})

// Security headers middleware
app.use('*', async (c, next) => {
  // Security headers
  c.header('X-Frame-Options', 'DENY')
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')

  // HSTS header (HTTP Strict Transport Security) - only set if request is HTTPS
  const proto = c.req.header('X-Forwarded-Proto') || c.req.header('CF-Visitor')?.includes('https') ? 'https' : 'http'
  if (proto === 'https') {
    c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  await next()
})

// CORS middleware
app.use('/trpc/*', async (c, next) => {
  // Set CORS headers - in production, specify your actual domain
  const origin = c.req.header('Origin')
  const allowedOrigins = ['*']

  // Allow requests from configured origins
  if (origin && allowedOrigins.includes(origin)) {
    c.header('Access-Control-Allow-Origin', origin)
  }

  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  c.header('Access-Control-Allow-Credentials', 'true')

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
