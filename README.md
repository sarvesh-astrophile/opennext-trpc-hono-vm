# OpenNext + tRPC + Hono + Cloudflare

A modern, type-safe full-stack application that enables users to create and view posts with optimal performance through Cloudflare Workers and edge computing.

## 🚀 Features

- **Edge Computing**: Deployed on Cloudflare Workers for global distribution and minimal latency
- **Type Safety**: End-to-end type safety with tRPC between frontend and backend
- **Modern UI**: Beautiful, accessible components built with shadcn/ui and Tailwind CSS
- **Database**: SQLite with Drizzle ORM for type-safe database operations
- **API**: Hono framework for lightweight, fast backend API
- **Deployment**: OpenNext for seamless Next.js deployment on Cloudflare Workers

## 🛠️ Tech Stack

- **Frontend**: Next.js with OpenNext, React, TypeScript
- **Backend**: Hono, Node.js, TypeScript
- **Database**: SQLite with Drizzle ORM
- **Deployment**: Cloudflare Workers
- **UI**: shadcn/ui, Tailwind CSS
- **Type Safety**: tRPC, Zod
- **Development**: Bun runtime

## 📋 Prerequisites

- Node.js 18+ or Bun
- Cloudflare account with Workers enabled
- VM instance for backend deployment (optional for local development)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd opennext-trpc-hono-cf
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   bun install

   # Backend
   cd ../backend
   bun install
   ```

3. **Setup database**
   ```bash
   cd backend
   bun run db:generate
   bun run db:migrate
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Frontend
   cd frontend
   bun run dev

   # Terminal 2: Backend
   cd backend
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
opennext-trpc-hono-cf/
├── frontend/                 # Next.js app (Cloudflare Workers)
│   ├── src/
│   │   ├── app/             # Next.js app router
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities and configurations
│   │   └── types/          # Shared TypeScript types
│   ├── package.json
│   ├── next.config.js      # OpenNext configuration
│   └── wrangler.toml       # Cloudflare Workers config
│
├── backend/                 # Hono API (VM deployment)
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── db/            # Database schema and connection
│   │   ├── trpc/          # tRPC procedures and context
│   │   └── lib/           # Utilities and validations
│   ├── drizzle/           # Database migrations
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 📊 Database Schema

```sql
-- Posts table
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### tRPC Procedures

- `posts.create` - Create a new post
- `posts.getAll` - Retrieve all posts

### REST API (Alternative)

- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts
- `GET /api/health` - Health check

## 🏃‍♂️ Development

### Available Scripts

```bash
# Frontend
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint

# Backend
bun run dev          # Start development server
bun run build        # Build for production
bun run db:generate  # Generate database types
bun run db:migrate   # Run database migrations
```

### Database Management

```bash
# Generate migration files
bun run db:generate

# Apply migrations
bun run db:migrate

# Inspect database
sqlite3 sqlite.db ".schema"
sqlite3 sqlite.db "SELECT * FROM posts;"
```

## 🚢 Deployment

### Frontend (Cloudflare Workers)

1. **Build the application**
   ```bash
   cd frontend
   bun run build
   ```

2. **Deploy to Cloudflare**
   ```bash
   npx wrangler deploy
   ```

3. **Configure environment variables**
   ```bash
   npx wrangler secret put BACKEND_URL
   ```

### Backend (VM)

1. **Build the application**
   ```bash
   cd backend
   bun run build
   ```

2. **Deploy to VM**
   ```bash
   # Using PM2 for process management
   pm2 start dist/index.js --name "hono-backend"
   ```

3. **Configure reverse proxy** (nginx example)
   ```nginx
   server {
       listen 80;
       server_name your-backend-domain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

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

## 🏆 Success Criteria

- ✅ OpenNext successfully deployed on Cloudflare Workers
- ✅ Hono backend running with SQLite database
- ✅ tRPC providing type-safe communication
- ✅ Users can create and view posts
- ✅ API response time < 500ms
- ✅ UI loads in < 2s

---

*Built with ❤️ using OpenNext, tRPC, Hono, and Cloudflare Workers*
