## Development (Bun)

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

## Docker

Build and run with Docker Compose:
```sh
docker-compose up --build
```

Or build and run separately:
```sh
# Build the image
docker build -t backend .

# Run the container
docker run -p 3000:3000 -v sqlite_data:/app/data backend
```

## Access

Open http://localhost:3000

## Health Check

Health endpoint: http://localhost:3000/health

## Database

The SQLite database is persisted in a Docker volume (`sqlite_data`) and will survive container restarts.
