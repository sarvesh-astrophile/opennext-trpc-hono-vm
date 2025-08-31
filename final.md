# AGENTS.md - Project Memory & Architecture Documentation

## Project Overview
This document serves as the complete project memory and architectural blueprint for the OpenNext + tRPC + Hono + Cloudflare application. This is a full-stack application that allows users to create and view posts, with a modern, type-safe architecture.

## Project Memory

### Core Concept
A simple social media application where users can:
- Create new posts with text content
- View lasted created posts in db
- Experience fast, type-safe interactions between frontend and backend

### Technology Stack Rationale
- **OpenNext**: Enables Next.js deployment on Cloudflare Workers with optimal performance
- **tRPC**: Provides end-to-end type safety between frontend and backend
- **Hono**: Lightweight, fast web framework for the backend API
- **Drizzle ORM**: Type-safe database operations with excellent TypeScript support
- **SQLite**: Simple, file-based database perfect for this use case
- **shadcn/ui**: Modern, accessible UI components with Tailwind CSS

## Final Architecture

### System Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                 CLOUDFLARE WORKERS                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 OpenNext Frontend                       │ │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐ │ │
│  │  │   Next.js App   │  │        tRPC Client             │ │ │
│  │  │                 │  │                                 │ │ │
│  │  │  ┌─────────────┐│  │  ┌─────────────────────────────┐│ │ │
│  │  │  │shadcn/ui    ││  │  │  Type-safe API calls        ││ │ │
│  │  │  │Components   ││  │  │                             ││ │ │
│  │  │  └─────────────┘│  │  └─────────────────────────────┘│ │ │
│  │  └─────────────────┘  └─────────────────────────────────┘ │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │              Edge Computing                         │ │ │
│  │  │  • Global distribution                             │ │ │
│  │  │  • 10MB bundle limit                               │ │ │
│  │  │  • Minimal cold start                              │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                │ HTTPS/tRPC
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                        VM SERVER                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 Hono Backend                            │ │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐ │ │
│  │  │   tRPC Server   │  │        REST API                 │ │ │
│  │  │                 │  │                                 │ │ │
│  │  │  ┌─────────────┐│  │  ┌─────────────────────────────┐│ │ │
│  │  │  │Type-safe    ││  │  │  POST /api/posts            ││ │ │
│  │  │  │Procedures   ││  │  │  GET /api/posts             ││ │ │
│  │  │  └─────────────┘│  │  └─────────────────────────────┘│ │ │
│  │  └─────────────────┘  └─────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                │                             │
│                                │ Drizzle ORM                 │
│                                ▼                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 SQLite Database                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │                posts table                          │ │ │
│  │  │  ┌─────────┐ ┌─────────────┐ ┌─────────────────────┐ │ │ │
│  │  │  │   id    │ │   content   │ │     createdAt       │ │ │ │
│  │  │  │(integer)│ │   (text)    │ │   (timestamp)       │ │ │ │
│  │  │  └─────────┘ └─────────────┘ └─────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

### Frontend Structure (OpenNext/Cloudflare Workers)
```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with providers
│   │   ├── page.tsx                   # Home page with post list
│   │   ├── create/
│   │   │   └── page.tsx               # Post creation page
│   │   └── api/
│   │       └── trpc/
│   │           └── [trpc]/
│   │               └── route.ts       # tRPC API route handler
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── card.tsx
│   │   │   └── form.tsx
│   │   ├── PostForm.tsx               # Post creation form
│   │   ├── PostList.tsx               # Post display component
│   │   └── PostCard.tsx               # Individual post component
│   ├── lib/
│   │   ├── trpc.ts                    # tRPC client configuration
│   │   ├── utils.ts                   # Utility functions
│   │   └── validations.ts             # Zod schemas
│   └── types/
│       └── index.ts                   # Shared TypeScript types
├── public/
│   └── favicon.ico
├── package.json
├── next.config.js                     # OpenNext configuration
├── tailwind.config.js
├── components.json                    # shadcn/ui configuration
├── open-next.config.js               # OpenNext specific config
└── wrangler.toml                     # Cloudflare Workers configuration
```

### Backend Structure (Hono/VM)
```
backend/
├── src/
│   ├── index.ts                       # Main Hono application
│   ├── routes/
│   │   ├── posts.ts                   # Post-related routes
│   │   └── health.ts                  # Health check endpoint
│   ├── db/
│   │   ├── schema.ts                  # Drizzle schema definitions
│   │   ├── connection.ts              # Database connection
│   │   └── migrations/                # Database migrations
│   ├── trpc/
│   │   ├── router.ts                  # Main tRPC router
│   │   ├── procedures/
│   │   │   └── posts.ts               # Post procedures
│   │   └── context.ts                 # tRPC context
│   ├── lib/
│   │   ├── validations.ts             # Zod schemas
│   │   └── utils.ts                   # Utility functions
│   └── types/
│       └── index.ts                   # Shared types
├── drizzle/
│   ├── config.ts                      # Drizzle configuration
│   └── migrations/                    # Generated migrations
├── package.json
├── tsconfig.json
└── wrangler.toml                      # Cloudflare Workers config (if needed)
```

## Database Schema

### Posts Table
```typescript
// src/db/schema.ts
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
```

## API Endpoints

### tRPC Procedures
```typescript
// Backend tRPC procedures
export const postsRouter = router({
  create: publicProcedure
    .input(z.object({ content: z.string().min(1).max(1000) }))
    .mutation(async ({ input, ctx }) => {
      // Create post logic
    }),
  
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // Get all posts logic
    }),
});
```

### REST API Endpoints (Alternative)
```typescript
// Hono REST endpoints
app.post('/api/posts', async (c) => {
  // Create post
});

app.get('/api/posts', async (c) => {
  // Get all posts
});

app.get('/api/health', async (c) => {
  // Health check
});
```

## Component Architecture

### Frontend Components
```typescript
// PostForm.tsx - Post creation form
interface PostFormProps {
  onSubmit: (content: string) => void;
  isLoading?: boolean;
}

// PostList.tsx - List of all posts
interface PostListProps {
  posts: Post[];
  isLoading?: boolean;
}

// PostCard.tsx - Individual post display
interface PostCardProps {
  post: Post;
}
```

## Configuration Files

### OpenNext Configuration
```javascript
// open-next.config.js
module.exports = {
  default: {
    override: {
      wrapper: "cloudflare",
    },
  },
};
```

### Cloudflare Workers Configuration
```toml
# wrangler.toml
name = "opennext-app"
main = ".open-next/server.js"
compatibility_date = "2024-01-01"

[env.production]
name = "opennext-app-prod"

[env.staging]
name = "opennext-app-staging"

# Optional: KV Storage for caching
# [[kv_namespaces]]
# binding = "CACHE"
# id = "your-kv-namespace-id"

# Optional: Durable Objects for stateful operations
# [[durable_objects.bindings]]
# name = "COUNTER"
# class_name = "Counter"
```

### Next.js Configuration
```javascript
// next.config.js
const { withOpenNext } = require("@open-next/open-next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@trpc/server"],
  },
};

module.exports = withOpenNext(nextConfig);
```

### Drizzle Configuration
```typescript
// drizzle/config.ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
} satisfies Config;
```

## Deployment Strategy

### Frontend (Cloudflare Workers)
1. **Build Process**: OpenNext builds Next.js app for Cloudflare Workers
2. **Deployment**: Deploy using `wrangler deploy` command
3. **Environment Variables**: Configured via `wrangler secret put` or wrangler.toml
4. **Custom Domain**: Configure custom domains in Cloudflare dashboard
5. **Bundle Size**: Must stay under 10MB limit
6. **Global Distribution**: Runs at edge locations worldwide
7. **Cold Start**: Minimal cold start times (~0ms)
8. **KV Storage**: Optional KV storage for caching (if needed)
9. **Durable Objects**: Optional for stateful operations (if needed)

### Backend (VM)
1. **Server Setup**: Node.js runtime on VM
2. **Process Management**: PM2 for process management
3. **Database**: SQLite file stored on VM filesystem
4. **Monitoring**: Basic health checks and logging
5. **CORS Configuration**: Proper CORS setup for Workers communication
6. **Public API**: Exposed endpoint accessible by Cloudflare Workers
7. **Firewall**: Port management and security rules
8. **Backup Strategy**: Database and application backup procedures

## Network & Communication

### Workers to VM Communication
- **HTTPS Requests**: Workers make HTTPS requests to VM backend
- **Edge Computing**: Workers run at edge locations, VM runs in specific region
- **Latency Considerations**: Distance between Workers and VM affects response times
- **Request Routing**: Requests are routed from Workers to VM via public internet
- **Caching Strategy**: Edge caching with Workers, backend caching on VM

### CORS Configuration
- **Workers Origin**: Configure CORS to allow requests from Workers domains
- **Preflight Requests**: Handle OPTIONS requests for CORS preflight
- **Credentials**: Configure whether to allow credentials in cross-origin requests
- **Headers**: Allow necessary headers for tRPC communication

### SSL/TLS Configuration
- **Workers SSL**: Automatic SSL termination at Cloudflare edge
- **VM SSL**: SSL certificates on VM (Let's Encrypt or custom)
- **Certificate Management**: Automated certificate renewal for VM
- **Security Headers**: Proper security headers on both platforms

### Network Security
- **Firewall Rules**: Configure VM firewall to allow Workers requests
- **IP Whitelisting**: Optional IP whitelisting for additional security
- **Rate Limiting**: Implement rate limiting on VM to prevent abuse
- **DDoS Protection**: Cloudflare provides DDoS protection for Workers

## Development Workflow

### Local Development
1. **Frontend**: `bun run dev` - Next.js development server
2. **Backend**: `bun run dev` - Hono development server with hot reload
3. **Database**: SQLite file created automatically
4. **tRPC**: Type-safe development with automatic type generation

### Testing Strategy
1. **Unit Tests**: Jest for individual functions
2. **Integration Tests**: API endpoint testing
3. **E2E Tests**: Playwright for full user flows
4. **Type Safety**: TypeScript compilation checks

## Performance Considerations

### Workers Performance
- **Edge Computing**: Workers run at edge locations for minimal latency
- **Bundle Optimization**: Keep Workers bundle under 10MB limit
- **Cold Start Optimization**: Minimal cold start impact (~0ms)
- **Global Distribution**: Workers distribute globally for optimal performance
- **Memory Limits**: Workers have memory constraints to consider

### VM Performance
- **Single Region**: VM runs in specific region, consider latency
- **Resource Management**: Monitor CPU, memory, and disk usage
- **Database Performance**: SQLite performance optimization
- **Connection Pooling**: Efficient database connections
- **Response Caching**: Cache frequently accessed data

### Cross-Platform Performance
- **Network Latency**: Distance between Workers and VM affects response times
- **Request Optimization**: Minimize requests between Workers and VM
- **Caching Strategy**: Edge caching with Workers, backend caching on VM
- **Compression**: Gzip compression for API responses
- **CDN Benefits**: Cloudflare's global CDN for static assets

### Frontend Optimizations
- **Static Generation**: Pre-render post lists where possible
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Splitting**: Automatic code splitting
- **Edge Caching**: Cloudflare edge caching for optimal performance

### Backend Optimizations
- **Database Indexing**: Index on createdAt for efficient queries
- **Query Optimization**: Optimize database queries for performance
- **Response Caching**: Cache frequently accessed data
- **Compression**: Gzip compression for API responses

## Security Measures

### Frontend Security
- **Input Validation**: Zod schemas for all inputs
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: SameSite cookies and CSRF tokens

### Backend Security
- **Input Sanitization**: Validate and sanitize all inputs
- **Rate Limiting**: Prevent abuse of API endpoints
- **CORS Configuration**: Proper CORS setup for frontend
- **SQL Injection**: Drizzle ORM prevents SQL injection

## Monitoring & Logging

### Application Monitoring
- **Health Checks**: `/api/health` endpoint
- **Error Tracking**: Structured error logging
- **Performance Metrics**: Response time monitoring
- **Database Monitoring**: Query performance tracking

### Logging Strategy
- **Structured Logging**: JSON format for easy parsing
- **Log Levels**: Debug, Info, Warn, Error
- **Request Tracking**: Unique request IDs for tracing
- **Error Context**: Detailed error information

## End-to-End Type Safety Requirements

### Type Safety Infrastructure

#### 1. **Shared Type Definitions**
- A shared package or monorepo structure to share types between frontend and backend
- Common validation schemas using Zod that both sides can use
- API response/request type definitions that are automatically generated
- Database entity types that are shared across the stack

#### 2. **Type Generation & Synchronization**
- Automated type generation from database schema (Drizzle → TypeScript)
- tRPC type inference setup to ensure frontend always matches backend
- Build-time type checking to catch mismatches early
- Type-safe environment variable handling

#### 3. **Validation Layer**
- Zod schemas for all API inputs/outputs
- Runtime validation that matches compile-time types
- Form validation that uses the same schemas as the API
- Error handling with typed error responses

### Development Experience

#### 4. **Developer Tooling**
- ESLint rules for type safety enforcement
- Prettier configuration for consistent code formatting
- Husky pre-commit hooks for type checking
- VS Code workspace settings for optimal TypeScript experience

#### 5. **Build & CI/CD Pipeline**
- TypeScript compilation as part of build process
- Type checking in CI/CD pipeline
- Automated testing that verifies type safety
- Build-time validation of tRPC procedures

### Runtime Safety

#### 6. **Error Handling**
- Typed error boundaries in React
- Structured error responses from API
- Error logging with proper typing
- Graceful degradation strategies

#### 7. **Data Fetching & State Management**
- Type-safe data fetching with tRPC React Query integration
- Proper loading and error state typing
- Optimistic updates with type safety
- Cache invalidation strategies

### Database & ORM

#### 8. **Database Type Safety**
- Drizzle schema migrations with type safety
- Database connection pooling with proper typing
- Query result type inference
- Transaction handling with proper error types

#### 9. **Data Validation**
- Input sanitization that preserves types
- Database constraint validation
- Business logic validation with typed results
- Data transformation utilities with proper typing

### API & Communication

#### 10. **tRPC Configuration**
- Proper tRPC context typing
- Middleware with type safety
- Procedure composition with shared types
- Error handling procedures with typed errors

#### 11. **Network Layer**
- HTTP client configuration with proper typing
- Request/response interceptors with type safety
- Retry logic with typed error handling
- Timeout handling with proper error types

### UI & Frontend

#### 12. **Component Type Safety**
- Props interfaces for all components
- Event handler typing
- Form state management with proper typing
- Theme and styling type safety

#### 13. **State Management**
- Global state typing (if using Zustand/Redux)
- Local state typing with proper inference
- Async state handling with proper error types
- State persistence with type safety

### Testing & Quality

#### 14. **Testing Infrastructure**
- Type-safe test utilities
- Mock data with proper typing
- Integration tests that verify type safety
- E2E tests with typed selectors

#### 15. **Code Quality**
- Type coverage reporting
- Dead code elimination with proper typing
- Bundle analysis with type information
- Performance monitoring with typed metrics

### Deployment & Environment

#### 16. **Environment Configuration**
- Typed environment variables
- Configuration validation at startup
- Feature flags with proper typing
- Deployment configuration type safety

#### 17. **Monitoring & Observability**
- Typed logging interfaces
- Metrics collection with proper typing
- Error tracking with structured data
- Performance monitoring with typed events

### Security & Compliance

#### 18. **Security Type Safety**
- Input validation with proper error types
- Authentication state typing
- Authorization checks with typed results
- Security headers with proper configuration

#### 19. **Data Privacy**
- PII handling with proper typing
- Data anonymization with type safety
- Audit logging with structured types
- Compliance reporting with typed data

### Performance & Optimization

#### 20. **Performance Monitoring**
- Typed performance metrics
- Bundle size analysis with type information
- Runtime performance tracking with proper typing
- Optimization strategies with type safety

#### 21. **Caching Strategy**
- Cache key generation with type safety
- Cache invalidation with proper typing
- Cache warming with typed data
- Cache hit/miss tracking with structured types

### Documentation & Maintenance

#### 22. **Documentation**
- API documentation generation from types
- Component documentation with type information
- Database schema documentation
- Deployment documentation with typed configurations

#### 23. **Maintenance & Updates**
- Dependency updates with type compatibility checks
- Schema migration with type safety
- API versioning with proper typing
- Backward compatibility with typed interfaces

### Additional Considerations

#### 24. **Internationalization**
- Typed translation keys
- Locale-specific type handling
- Date/time formatting with proper typing
- Number formatting with type safety

#### 25. **Accessibility**
- ARIA attributes with proper typing
- Keyboard navigation with typed events
- Screen reader compatibility with typed content
- Focus management with proper typing

### Debug Commands
```bash
# Frontend debugging
bun run build
bun run start

# Backend debugging
bun run db:generate
bun run db:migrate
bun run dev

# Database inspection
sqlite3 sqlite.db ".schema"
sqlite3 sqlite.db "SELECT * FROM posts;"
```

### Project Status

#### Current State
- [ ] Project initialization
- [ ] Frontend setup (OpenNext + Next.js)
- [ ] Backend setup (Hono + SQLite + Drizzle)
- [ ] tRPC integration
- [ ] UI components (shadcn/ui)
- [ ] API implementation
- [ ] Testing
- [ ] Deployment

#### Success Criteria
- [ ] OpenNext successfully deployed on Cloudflare Pages
- [ ] Hono backend running on VM with SQLite
- [ ] tRPC providing type-safe communication
- [ ] Users can create and view posts
- [ ] API response time < 500ms
- [ ] UI loads in < 2s

---

*This document serves as the complete project memory and should be updated as the project evolves. All architectural decisions, implementation details, and project status should be reflected here.*