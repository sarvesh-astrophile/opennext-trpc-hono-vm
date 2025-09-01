# Backend API - Hono + tRPC + SQLite

A lightweight, type-safe backend API built with Hono and tRPC, designed for deployment on VM instances with Docker containerization.

## 🚀 Features

- **Type-Safe API**: tRPC integration with end-to-end type safety
- **Lightweight Framework**: Hono for fast, efficient API responses
- **Database**: SQLite with Drizzle ORM for type-safe database operations
- **Containerization**: Docker and Docker Compose for easy deployment
- **Hot Reload**: Fast development with Bun runtime
- **Input Validation**: Zod schemas for runtime validation
- **Health Monitoring**: Built-in health check endpoints

## 🛠️ Tech Stack

- **Framework**: Hono 4.9.5 with tRPC server integration
- **Runtime**: Bun with hot reload
- **Database**: SQLite with Drizzle ORM 0.44.5 and LibSQL client
- **Validation**: Zod schemas for input validation
- **Containerization**: Docker with Docker Compose
- **Type Safety**: TypeScript 5.3.3 with strict configurations

## 📋 Prerequisites

- **Runtime**: Bun (recommended) or Node.js 18+
- **Docker**: For containerized deployment
- **Database**: SQLite (automatically handled)

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Setup database**
   ```bash
   bun run db:generate
   bun run db:migrate
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Access the API**
   - **API**: http://localhost:3001
   - **Health Check**: http://localhost:3001/health
   - **tRPC Playground**: http://localhost:3001/trpc

### Docker Development

**Using Docker Compose (recommended):**
```bash
docker-compose up --build
```

**Using Docker directly:**
```bash
# Build the image
docker build -t hono-backend .

# Run the container
docker run -d -p 3001:3001 --name hono-backend hono-backend
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── index.ts         # Main Hono application with tRPC
│   ├── trpc/
│   │   ├── root.ts      # Main tRPC router
│   │   ├── context.ts   # tRPC context and initialization
│   │   └── routers/
│   │       └── post.ts  # Post CRUD procedures
│   ├── db/
│   │   └── schema/
│   │       └── post.ts  # Database schema definition
│   └── types/
│       └── index.ts     # Backend type definitions
├── drizzle/             # Database migrations
│   ├── 0000_melodic_monster_badoon.sql
│   └── meta/            # Migration metadata
├── adapter.ts           # Database adapter with LibSQL client
├── drizzle.config.ts    # Drizzle Kit configuration
├── package.json         # Dependencies and scripts
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
├── eslint.config.mjs   # ESLint configuration
└── tsconfig.json       # TypeScript configuration
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

### tRPC Procedures

- `post.getPosts` - Retrieve all posts (ordered by creation date)
- `post.createPost` - Create a new post with content validation
- `post.getPost` - Retrieve a single post by ID

### REST Endpoints

- `GET /health` - Health check endpoint
- `GET /` - Basic hello world endpoint
- `POST /trpc/*` - tRPC endpoint for all procedures

## 🏛️ Architecture

### How It Works

1. **Hono Server**: Lightweight web framework handling HTTP requests
2. **tRPC Integration**: Type-safe API procedures with automatic client generation
3. **Database Layer**: Drizzle ORM for type-safe database operations
4. **Validation**: Zod schemas for input validation and type safety
5. **Containerization**: Docker for consistent deployment across environments

### Key Technologies

- **Hono**: Fast, lightweight web framework for Cloudflare Workers and Node.js
- **tRPC**: Type-safe API layer with automatic client generation
- **Drizzle ORM**: Type-safe database operations with SQL generation
- **SQLite**: File-based database with LibSQL client for better performance
- **Bun**: Fast JavaScript runtime and package manager

## 🏃‍♂️ Development Scripts

```bash
# Development
bun run dev          # Start development server with hot reload
bun run build        # Build for production
bun run start        # Start production server

# Database
bun run db:generate  # Generate database types
bun run db:migrate   # Run database migrations
bun run db:push      # Push schema changes to database

# Code Quality
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues automatically
```

### Database Management

```bash
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

### Docker Deployment

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

3. **Deploy with Docker directly**
   ```bash
   docker build -t hono-backend .
   docker run -d -p 3001:3001 --name hono-backend hono-backend
   ```

### VM Deployment with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start dist/index.js --name "hono-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Nginx Reverse Proxy Configuration

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

## ⚙️ Environment Variables

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

## 🔒 Security

- **Input Validation**: Zod schemas for all API inputs
- **CORS**: Properly configured for cross-origin requests
- **SQL Injection**: Prevented through Drizzle ORM
- **Rate Limiting**: Configurable rate limiting capabilities
- **HTTPS**: Should be handled by reverse proxy or load balancer

## 📈 Performance

- **Response Time**: Optimized for < 500ms API responses
- **Database**: Efficient SQLite queries with proper indexing
- **Memory**: Lightweight Hono framework with minimal overhead
- **Containerization**: Optimized Docker images for production

## 🧪 Testing

```bash
# Run tests (when implemented)
bun run test
bun run test:unit
bun run test:integration
```

## 🔍 API Documentation

### tRPC Procedures

#### `post.getPosts`
- **Method**: Query
- **Input**: None
- **Output**: Array of posts ordered by creation date
- **Example**: `trpc.post.getPosts.query()`

#### `post.createPost`
- **Method**: Mutation
- **Input**: `{ content: string }`
- **Output**: Created post object
- **Example**: `trpc.post.createPost.mutate({ content: "Hello World" })`

#### `post.getPost`
- **Method**: Query
- **Input**: `{ id: number }`
- **Output**: Single post object or null
- **Example**: `trpc.post.getPost.query({ id: 1 })`

## 📊 Monitoring

- **Health Checks**: `/health` endpoint for monitoring
- **Error Logging**: Structured error responses
- **Performance Metrics**: Response time tracking
- **Database Monitoring**: Query performance insights

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Add proper TypeScript types for new procedures
3. Update this README for any new features
4. Test your changes thoroughly
5. Follow the established ESLint rules

## 📞 Support

For backend-specific issues or questions:
- Check the main project README for architecture overview
- Review tRPC documentation for API patterns
- Check Drizzle ORM docs for database operations
- Open an issue on GitHub for bugs or feature requests

---

*Built with Hono, tRPC, and Drizzle ORM for type-safe, performant APIs*
