# Use official Bun image
FROM oven/bun:1.2

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Create directory for database
RUN mkdir -p /app/data

# Set environment variable for database
ENV DATABASE_URL=file:/app/data/sqlite.db

# Expose port
EXPOSE 3000

# Run the application
CMD ["bun", "run", "src/index.ts"]
