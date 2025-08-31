# SSL Configuration Guide for Coolify + Traefik

## Overview
Your backend is now configured to work with SSL through Coolify's automatic Traefik setup. Here's what you need to do:

## 1. Domain Configuration

### Update docker-compose.yml
Replace `api.your-domain.com` with your actual API domain:

```yaml
# In docker-compose.yml, line 25
- "traefik.http.routers.backend.rule=Host(`api.your-domain.com`)" # Replace with your actual API domain
```

### Update CORS in index.ts
Replace the placeholder domain in `src/index.ts`:

```typescript
const allowedOrigins = [
  'https://your-frontend-domain.com', // Replace with your actual frontend domain
  'http://localhost:3000', // For development
  'http://localhost:8787'  // For local Cloudflare Workers dev
]
```

## 2. Coolify Deployment Steps

1. **Deploy your backend** through Coolify
2. **Configure domain** in Coolify:
   - Go to your service configuration
   - Add your API domain (e.g., `api.your-domain.com`)
   - Enable "Force HTTPS" if available
   - Coolify will automatically:
     - Generate SSL certificates via Let's Encrypt
     - Configure Traefik to handle SSL termination
     - Set up HTTP to HTTPS redirects

## 3. Environment Variables

Create a `.env` file in your backend directory:

```bash
# Database
DATABASE_URL=file:/app/data/sqlite.db

# Environment
NODE_ENV=production

# CORS (replace with your actual domain)
FRONTEND_URL=https://your-frontend-domain.com
```

## 4. Security Features Added

- ✅ **SSL/TLS encryption** via Traefik + Let's Encrypt
- ✅ **HTTP to HTTPS redirects** (automatic)
- ✅ **Security headers** (HSTS, X-Frame-Options, etc.)
- ✅ **Proxy-aware headers** for proper IP detection
- ✅ **CORS protection** with specific domain allowlist
- ✅ **Health checks** for monitoring

## 5. Testing SSL

After deployment, test your SSL setup:

```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://api.your-domain.com/health

# Test HTTPS
curl -I https://api.your-domain.com/health

# Test tRPC endpoint
curl -k https://api.your-domain.com/trpc/getPosts
```

## 6. Troubleshooting

### Common Issues:

1. **SSL Certificate not working**:
   - Check if domain DNS is properly configured
   - Wait a few minutes for Let's Encrypt certificate generation
   - Check Coolify logs for Traefik errors

2. **CORS errors**:
   - Verify your frontend domain is in the allowedOrigins array
   - Ensure you're using HTTPS URLs in production

3. **Mixed content warnings**:
   - Make sure all frontend API calls use HTTPS URLs
   - Update your tRPC client configuration

## 7. Advanced Configuration

### Custom SSL Certificate
If you want to use a custom certificate instead of Let's Encrypt:

```yaml
# In docker-compose.yml
labels:
  - "traefik.http.routers.backend.tls.certresolver=custom"  # Use custom resolver
```

### Additional Security Headers
Add more security headers via Traefik labels:

```yaml
labels:
  - "traefik.http.middlewares.backend-security.headers.customresponseheaders.Content-Security-Policy=default-src 'self'"
  - "traefik.http.middlewares.backend-security.headers.customresponseheaders.X-XSS-Protection=1; mode=block"
```

## 8. Monitoring

Your health check endpoint is available at:
- `https://api.your-domain.com/health`

Use this for monitoring and load balancer health checks.
