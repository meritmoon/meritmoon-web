# MeritMoon Web: Production Deployment Guide

> **Target Platform:** Coolify + Nginx on Contabo VPS
> **Container:** Multi-stage Dockerfile (`node:22-alpine` build + `nginx:alpine` runtime)
> **Port:** 80 (Internal) / 443 (Traefik SSL edge)
> **Master Infrastructure Guide:** For complete VPS hardening, `/etc/docker/daemon.json` build cache protection, and automated maintenance cron, see **[MeritMoon Core: Production Deployment Guide](https://github.com/rex-9/meritmoon-core/blob/dev/docs/DEPLOYMENT.md)**.

---

## 1. Production Architecture

The web application is packaged into a high-performance, minimal static container using `nginx:alpine`:

- Static React SPA assets are served directly from `/usr/share/nginx/html`.
- SPA deep links fallback cleanly to `/index.html` via `try_files $uri $uri/ /index.html;`.
- Static assets (`.js`, `.css`, fonts, images) are compressed with `gzip` and cached for 1 year with immutable cache headers.
- Total memory footprint: **~15MB RAM** (versus 300MB+ for Node.js development server).

---

## 2. Coolify Deployment Steps

1. In Coolify, navigate to your **`prod-meritmoon`** (or `uat-meritmoon`) Project.
2. Click **New Resource** → **Docker Compose Application** (or Git Repository).
3. Set the repository URL to `meritmoon-web` and branch to `main` (or `dev` for UAT).
4. Compose File Path: `docker-compose.yaml`.
5. Under **Environment Variables**, provide the build arguments:

| Variable                            | Production Value              | UAT Value                     | Demo Value                     | Dev Value                     |
| :---------------------------------- | :---------------------------- | :---------------------------- | :----------------------------- | :---------------------------- |
| `WEB_CONTAINER_NAME`                | `prod-meritmoon-web`          | `uat-meritmoon-web`           | `demo-meritmoon-web`           | `dev-meritmoon-web`           |
| `DOCKER_NETWORK`                    | `prod-meritmoon-net`          | `uat-meritmoon-net`           | `demo-meritmoon-net`           | `dev-meritmoon-net`           |
| `VITE_REACT_APP_NAME`               | `meritmoon.com`               | `uat.meritmoon.com`           | `meritmoon.rex9.me`            | `dev.meritmoon.com`           |
| `VITE_REACT_APP_SERVER_BASE_URL`    | `https://api.meritmoon.com`   | `https://uat.api.meritmoon.com`| `https://api.meritmoon.rex9.me`| `https://dev.api.meritmoon.com`|
| `VITE_REACT_APP_CLIENT_BASE_URL`    | `https://meritmoon.com`       | `https://uat.meritmoon.com`   | `https://meritmoon.rex9.me`    | `https://dev.meritmoon.com`   |
| `VITE_REACT_APP_SERVER_WS_BASE_URL` | `wss://api.meritmoon.com`     | `wss://uat.api.meritmoon.com` | `wss://api.meritmoon.rex9.me`  | `wss://dev.api.meritmoon.com` |
| `VITE_REACT_APP_GOOGLE_CLIENT_ID`   | `<Google_Client_ID>`          | `<Google_Client_ID>`          | `<Google_Client_ID>`           | `<Google_Client_ID>`          |

6. In the Traefik Domains section, assign your domain:
   - Production: `https://meritmoon.com`
   - UAT: `https://uat.meritmoon.com`
   - Dev: `https://dev.meritmoon.com`
   - Demo: `https://meritmoon.rex9.me`

---

## 3. Alternative: Coolify Static Site Deployment

Coolify also supports deploying `meritmoon-web` directly as a **Static Application**:

- Build Pack: `Nixpacks` or `Static`
- Build Command: `npm run build`
- Publish Directory: `dist`
- SPA Mode: Enable SPA checkbox in Coolify settings.

---

## 4. Local Production Smoke Testing

Before deploying to Coolify or creating release tags, verify the exact production Docker image and Nginx configuration locally:

```bash
# Full production multi-stage build + Nginx container test (port 8080):
./scripts/test_prod.sh
# (or via npm:)
npm run test:prod

# Custom port:
./scripts/test_prod.sh -p 8081

# Lightweight Vite preview without Docker:
./scripts/test_prod.sh --preview
```

This verifies:
1. **TypeScript & Bundling**: Strict type check (`tsc -b`) and asset minification pass without errors.
2. **Nginx SPA Fallback**: Deep links (e.g. `http://localhost:8080/privacy`) resolve to `index.html` without returning 404s.
3. **Container Healthcheck**: `http://localhost:8080/health` responds with HTTP 200.
4. **Headers & Compression**: Gzip compression and security headers are active.
