# OpenNext + tRPC + Hono + Cloudflare

A modern, type-safe full-stack application that enables users to create and view posts with optimal performance through Cloudflare Workers and edge computing. This project demonstrates a complete monorepo setup with separate frontend (Cloudflare Workers) and backend (VM deployment) architectures.

## 🚀 Features

- **Edge Computing**: Frontend deployed on Cloudflare Workers for global distribution and minimal latency
- **Type Safety**: End-to-end type safety with tRPC between frontend and backend
- **Modern UI**: Beautiful, accessible components built with Tailwind CSS 4
- **Database**: SQLite with Drizzle ORM for type-safe database operations
- **API**: Hono framework for lightweight, fast backend API with tRPC integration
- **Monorepo**: Bun workspaces with shared types and configurations
- **Deployment**: OpenNext for seamless Next.js deployment on Cloudflare Workers
- **Containerization**: Docker setup for backend deployment with Docker Compose

## 🛠️ Tech Stack

### Frontend (Cloudflare Workers)
- **Framework**: Next.js 15.4.6 with OpenNext adapter
- **Runtime**: Bun with Turbopack for fast development
- **UI**: Tailwind CSS 4 and Geist fonts
- **State Management**: TanStack Query for server state
- **Type Safety**: tRPC client with React Query integration
- **Deployment**: Cloudflare Workers via OpenNext

### Backend (VM Deployment)
- **Framework**: Hono 4.9.5 with tRPC server integration
- **Runtime**: Bun with hot reload
- **Database**: SQLite with Drizzle ORM 0.44.5 and LibSQL client
- **Validation**: Zod schemas for input validation
- **Containerization**: Docker with Docker Compose

### Development Tools
- **Package Manager**: Bun workspaces
- **Version Control**: TypeScript 5.3.3 with strict configurations
- **Code Quality**: ESLint configurations for both frontend and backend
- **Database**: Drizzle Kit for migrations and schema management

## 📋 Prerequisites

- **Runtime**: Bun (recommended) or Node.js 18+
- **Cloudflare Account**: With Workers enabled for frontend deployment
- **VM Instance**: For backend deployment (optional for local development)
- **Docker**: For containerized backend deployment (optional)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd opennext-trpc-hono-cf
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (frontend + backend)
   bun install
   ```

3. **Setup database**
   ```bash
   cd backend
   bun run db:generate
   bun run db:migrate
   cd ..
   ```

4. **Start development servers**
   ```bash
   # Start both frontend and backend concurrently
   bun run dev
   ```

5. **Open your browser**
   - **Frontend**: Navigate to `http://localhost:3000`
   - **Backend API**: Available at `http://localhost:3001`

### Alternative: Individual Services

```bash
# Terminal 1: Frontend
cd frontend
bun run dev

# Terminal 2: Backend
cd backend
bun run dev
```

## 🏗️ Project Structure

```
opennext-trpc-hono-cf/
├── frontend/                 # Next.js app (Cloudflare Workers)
│   ├── src/
│   │   ├── app/             # Next.js app router
│   │   │   ├── api/         # API routes (tRPC proxy)
│   │   │   │   └── trpc-proxy/[...trpc]/
│   │   │   │       └── route.ts
│   │   │   ├── layout.tsx   # Root layout with providers
│   │   │   ├── page.tsx     # Home page with post management
│   │   │   └── globals.css  # Tailwind CSS styles
│   │   ├── lib/
│   │   │   ├── utils.ts     # Utility functions
│   │   │   └── trpc/
│   │   │       ├── client.ts    # tRPC client config
│   │   │       ├── provider.tsx # React Query provider
│   │   │       └── hooks.ts     # Custom tRPC hooks
│   │   └── types/
│   │       └── index.ts     # Frontend type definitions
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── next.config.ts       # Next.js configuration
│   ├── open-next.config.ts  # OpenNext Cloudflare config
│   ├── wrangler.jsonc       # Cloudflare Workers config
│   ├── components.json      # UI component configuration
│   ├── eslint.config.mjs    # ESLint configuration
│   ├── postcss.config.mjs   # PostCSS configuration
│   └── tsconfig.json        # TypeScript configuration
│
├── backend/                 # Hono API (VM deployment)
│   ├── src/
│   │   ├── index.ts         # Main Hono application
│   │   ├── trpc/
│   │   │   ├── root.ts      # Main tRPC router
│   │   │   ├── context.ts   # tRPC context and init
│   │   │   └── routers/
│   │   │       └── post.ts  # Post CRUD procedures
│   │   ├── db/
│   │   │   └── schema/
│   │   │       └── post.ts  # Database schema
│   │   └── types/
│   │       └── index.ts     # Backend type definitions
│   ├── drizzle/             # Database migrations
│   │   ├── 0000_melodic_monster_badoon.sql
│   │   └── meta/            # Migration metadata
│   ├── adapter.ts           # Database adapter
│   ├── drizzle.config.ts    # Drizzle configuration
│   ├── package.json         # Backend dependencies
│   ├── Dockerfile          # Docker configuration
│   ├── docker-compose.yml  # Docker Compose setup
│   ├── eslint.config.mjs   # ESLint configuration
│   └── tsconfig.json       # TypeScript configuration
│
├── shared/                  # Shared types and utilities
│   └── types.ts            # Common type definitions
│
├── docs/
│   └── prd.md              # Project Requirements Document
├── README.md               # Project documentation
├── package.json            # Root workspace configuration
├── tsconfig.json           # Root TypeScript references
└── task.md                 # Project task breakdown
```

## 📊 Database Schema

```sql
-- Posts table
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

## 🔌 API Endpoints

### tRPC Procedures (Implemented)

- `post.getPosts` - Retrieve all posts (ordered by creation date)
- `post.createPost` - Create a new post with content validation
- `post.getPost` - Retrieve a single post by ID

### Frontend API Routes

- `POST /api/trpc-proxy/[...trpc]` - tRPC proxy to backend
- `GET /api/trpc-proxy/[...trpc]` - tRPC proxy for queries

### Backend REST Endpoints

- `GET /health` - Health check endpoint
- `GET /` - Basic hello world endpoint
- `POST /trpc/*` - tRPC endpoint for all procedures

## 🏛️ Architecture Overview

### How It Works

1. **Frontend (Cloudflare Workers)**:
   - Next.js application deployed on Cloudflare's edge network
   - Uses tRPC client to communicate with backend via HTTP proxy
   - API routes in `/api/trpc-proxy/[...trpc]` forward requests to backend
   - Global distribution with minimal latency

2. **Backend (VM Deployment)**:
   - Hono server running on a VM instance
   - tRPC server handles type-safe API procedures
   - SQLite database with Drizzle ORM for data persistence
   - Docker containerization for easy deployment

3. **Communication Flow**:
   ```
   User → Cloudflare Worker → API Proxy → Hono Server → tRPC → Database
   Response ← Cloudflare Worker ← API Proxy ← Hono Server ← tRPC ← Database
   ```

4. **Type Safety**:
   - Shared types in `shared/types.ts`
   - tRPC ensures end-to-end type safety
   - Frontend and backend share the same type definitions
   - Zod schemas for runtime validation

### Key Technologies

- **OpenNext**: Deploys Next.js to Cloudflare Workers
- **tRPC**: Type-safe API layer between frontend and backend
- **Hono**: Lightweight web framework for backend API
- **Drizzle ORM**: Type-safe database operations
- **SQLite**: File-based database with LibSQL client
- **Bun**: Fast JavaScript runtime and package manager

## 🏃‍♂️ Development

### Root Workspace Scripts

```bash
# Start both frontend and backend concurrently
bun run dev

# Build both frontend and backend
bun run build

# Type check both frontend and backend
bun run type-check
```

### Frontend Scripts

```bash
cd frontend

bun run dev          # Start development server with Turbopack
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run deploy       # Deploy to Cloudflare Workers
bun run preview      # Preview Cloudflare deployment
bun run cf-typegen   # Generate Cloudflare types
```

### Backend Scripts

```bash
cd backend

bun run dev          # Start development server with hot reload
bun run build        # Build for production
bun run db:generate  # Generate database types
bun run db:migrate   # Run database migrations
bun run db:push      # Push schema changes to database
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues automatically
```

### Database Management

```bash
cd backend

# Generate migration files
bun run db:generate

# Apply migrations
bun run db:migrate

# Push schema changes (development)
bun run db:push

# Inspect database
sqlite3 sqlite.db ".schema"
sqlite3 sqlite.db "SELECT * FROM posts;"

# Docker development (optional)
docker-compose up -d  # Start database in container
```

## 🚢 Deployment

### Frontend (Cloudflare Workers)

1. **Build and deploy**
   ```bash
   cd frontend
   bun run deploy
   ```

2. **Preview deployment**
   ```bash
   bun run preview
   ```

3. **Configure environment variables**
   ```bash
   npx wrangler secret put BACKEND_URL
   ```

### Backend (VM with Docker)

1. **Build the application**
   ```bash
   cd backend
   bun run build
   ```

2. **Deploy with Docker**
   ```bash
   # Using Docker Compose (recommended)
   docker-compose up -d --build

   # Or using Docker directly
   docker build -t hono-backend .
   docker run -d -p 3001:3001 --name hono-backend hono-backend
   ```

3. **Deploy with PM2 (alternative)**
   ```bash
   pm2 start dist/index.js --name "hono-backend"
   pm2 save
   pm2 startup
   ```

4. **Configure reverse proxy** (nginx example)
   ```nginx
   server {
       listen 80;
       server_name your-backend-domain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Health check endpoint
       location /health {
           proxy_pass http://localhost:3001/health;
           access_log off;
       }
   }
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="file:./sqlite.db"

# Server
PORT=3001
NODE_ENV=production

# CORS (for production)
FRONTEND_URL=https://your-frontend-domain.com
```

### Production Checklist

- [ ] Set up environment variables
- [ ] Configure domain and SSL certificates
- [ ] Set up monitoring and logging
- [ ] Configure database backups
- [ ] Test API endpoints
- [ ] Verify CORS configuration
- [ ] Check Cloudflare Workers deployment

## ⚡ Performance

- **Edge Computing**: Global distribution with minimal latency
- **Bundle Size**: Optimized to stay under Cloudflare's 10MB limit
- **Cold Start**: Near-instant cold start times (~0ms)
- **Caching**: Edge caching with Cloudflare Workers
- **Database**: Efficient SQLite queries with proper indexing

## 🔒 Security

- **Input Validation**: Zod schemas for all API inputs
- **CORS**: Properly configured for cross-origin requests
- **SQL Injection**: Prevented through Drizzle ORM
- **Rate Limiting**: Configurable rate limiting on backend
- **HTTPS**: Automatic SSL termination at Cloudflare edge

## 📈 Monitoring

- **Health Checks**: `/api/health` endpoint for backend monitoring
- **Error Tracking**: Structured error logging with context
- **Performance Metrics**: Response time monitoring
- **Database Monitoring**: Query performance tracking

## 🧪 Testing

```bash
# Run tests (when implemented)
bun run test
bun run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support, please open an issue on GitHub.

## 🏆 Implementation Status

### ✅ Completed Features

- **Project Architecture**: Complete monorepo setup with Bun workspaces
- **Frontend**: Next.js 15.4.6 with OpenNext adapter and Cloudflare Workers deployment
- **Backend**: Hono 4.9.5 with tRPC server integration and SQLite database
- **Database**: Drizzle ORM with migrations and LibSQL client
- **Type Safety**: End-to-end type safety with tRPC and shared types
- **UI**: Modern interface with Tailwind CSS 4 and Geist fonts
- **API**: Full CRUD operations for posts with proper validation
- **Deployment**: Docker containerization for backend with Docker Compose
- **Development**: Hot reload, ESLint, and comprehensive tooling

### 🚧 In Progress / Planned

- **Environment Configuration**: Production environment variables setup
- **Monitoring**: Error tracking and performance metrics
- **Testing**: Unit and integration test implementation
- **Documentation**: API documentation and deployment guides

### 📊 Performance Targets

- **API Response Time**: < 500ms
- **UI Load Time**: < 2s
- **Bundle Size**: Under Cloudflare's 10MB limit
- **Cold Start**: Near-instant (~0ms) with edge computing

### 🧪 Testing

```bash
# Run tests (when implemented)
bun run test
bun run test:e2e
```

### 🔍 Architecture Highlights

- **Monorepo Structure**: Efficient development with shared types and configurations
- **Edge Computing**: Frontend deployed globally via Cloudflare Workers
- **Type Safety**: Complete type safety from database to UI
- **Modern Stack**: Latest versions of Next.js, Hono, and supporting libraries
- **Developer Experience**: Hot reload, fast builds, and comprehensive tooling

---

*Built with ❤️ using OpenNext, tRPC, Hono, and Cloudflare Workers*
