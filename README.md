# MedAccess Admin (Frontend)

Next.js frontend for the Zorvian Digital Solutions Admin Portal. All API requests are handled by **medaccess-admin-backend** (separate repo/service).

## API / Backend

- Every `/api/*` request is sent to **medaccess-admin-backend**.
- Configure the backend URL with `NEXT_PUBLIC_API_BASE_URL` (see env examples).
- **Local:** Backend default is `http://localhost:3001`. Start the backend first, then run this app.
- **Production:** Set `NEXT_PUBLIC_API_BASE_URL` to your deployed medaccess-admin-backend URL.

Next.js rewrites ` /api/:path*` to `${NEXT_PUBLIC_API_BASE_URL}/api/:path*`, so the frontend always uses one backend.

## Setup

1. Clone and run **medaccess-admin-backend** (set up `.env`, DB, then `npm run dev` on port 3001).
2. Copy env: `cp .env.example .env.local`
3. Set `NEXT_PUBLIC_API_BASE_URL` to the backend URL (e.g. `http://localhost:3001`).
4. `npm install && npm run dev` — frontend runs on port 3000.
