# Project Requirements Document (PRD)

## Overview
This project will build a simple application using OpenNext, tRPC, Drizzle, Hono, and SQLite. The application will allow users to create posts and view earlier posts. The frontend will be hosted on Cloudflare using OpenNext, while the backend (Hono + SQLite) will run on a VM, proxied via tRPC. The UI will use shadcn components.

## Architecture
### 1. **Frontend**: OpenNext (hosted on Cloudflare)
- **Framework**: Next.js with OpenNext adapter
- **Hosting**: Cloudflare Pages
- **Features**:
  - Static and dynamic rendering
  - API routes for tRPC communication
- **Dependencies**:
  - `@open-next/open-next`
  - `@trpc/react-query`
  - `shadcn/ui`

### 2. **Backend**: Hono + SQLite (hosted on VM)
- **Framework**: Hono.js
- **Database**: SQLite with Drizzle ORM
- **Features**:
  - RESTful API endpoints for post creation and retrieval
  - Database schema management via Drizzle
- **Dependencies**:
  - `hono`
  - `drizzle-orm`
  - `drizzle-kit`

### 3. **API Layer**: tRPC
- **Role**: Proxy requests between OpenNext and Hono
- **Features**:
  - Type-safe API calls
  - Automatic request/response validation
- **Dependencies**:
  - `@trpc/server`
  - `@trpc/client`

### 4. **Database**: SQLite with Drizzle ORM
- **Schema**:
  ```typescript
  // Example schema for posts
  const posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    content: text('content').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  });
  ```
- **Operations**:
  - Insert new posts
  - Query all posts

### 5. **UI**: shadcn components
- **Components**:
  - Form for post creation
  - List for post display
- **Styling**: Tailwind CSS

## Features
### 1. **Post Creation**
- **Endpoint**: `POST /api/posts`
- **Request**:
  ```json
  { "content": "Hello, world!" }
  ```
- **Response**:
  ```json
  { "id": 1, "content": "Hello, world!", "createdAt": "2023-11-01T12:00:00Z" }
  ```

### 2. **Post Retrieval**
- **Endpoint**: `GET /api/posts`
- **Response**:
  ```json
  [
    { "id": 1, "content": "Hello, world!", "createdAt": "2023-11-01T12:00:00Z" }
  ]
  ```

## Implementation Steps
### Phase 1: Setup (Week 1)
1. **OpenNext Setup**:
   - Initialize Next.js project
   - Configure OpenNext for Cloudflare Pages
   - Deploy initial setup to Cloudflare

2. **Hono + SQLite Setup**:
   - Initialize Hono project on VM
   - Install SQLite and Drizzle
   - Define database schema

### Phase 2: API Development (Week 2)
1. **tRPC Configuration**:
   - Set up tRPC server in Hono
   - Configure tRPC client in OpenNext

2. **Post API**:
   - Implement `POST /api/posts` endpoint
   - Implement `GET /api/posts` endpoint

### Phase 3: UI Integration (Week 3)
1. **shadcn Integration**:
   - Add shadcn components
   - Build post creation form
   - Build post display list

2. **Testing**:
   - End-to-end testing of post creation and retrieval

## Dependencies
- **Frontend**:
  - `next`: ^14.0.0
  - `@open-next/open-next`: ^1.0.0
  - `@trpc/react-query`: ^10.0.0
  - `shadcn/ui`: ^0.0.1

- **Backend**:
  - `hono`: ^3.0.0
  - `drizzle-orm`: ^0.0.1
  - `drizzle-kit`: ^0.0.1

- **API Layer**:
  - `@trpc/server`: ^10.0.0
  - `@trpc/client`: ^10.0.0

## Timeline
- **Week 1**: Setup OpenNext and Hono + SQLite
- **Week 2**: Develop and integrate tRPC APIs
- **Week 3**: Build and test UI

## Risks
1. **Integration Complexity**:
   - Potential issues with tRPC proxying between OpenNext and Hono
   - Mitigation: Test early and often

2. **SQLite Performance**:
   - Scalability concerns for high write loads
   - Mitigation: Monitor and optimize queries

## Success Metrics
1. **Deployment**:
   - OpenNext successfully deployed on Cloudflare
   - Hono backend running on VM

2. **Functionality**:
   - Posts can be created and retrieved via API
   - UI reflects API data accurately

3. **Performance**:
   - API response time < 500ms
   - UI loads in < 2s
