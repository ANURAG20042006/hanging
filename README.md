<div align="center">
  <h1>🏠 Hangout</h1>
  <p><strong>The Digital Home for Friends.</strong></p>
  <p>A private, production-grade social platform where friend groups spend time together — even across cities and countries.</p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
    <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs" />
    <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase" />
    <img src="https://img.shields.io/badge/Redis-7-DC382D?logo=redis" />
    <img src="https://img.shields.io/badge/LiveKit-WebRTC-FF6B35" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript" />
    <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" />
  </p>
</div>

---

## ✨ Features

| Module | Status | Description |
|--------|--------|-------------|
| 🔐 **Authentication** | ✅ | Google OAuth, Email/Password, Magic Links, 2FA |
| 💬 **Real-Time Chat** | ✅ | Discord-level channels, DMs, threads, reactions |
| 🖼️ **Memory Gallery** | ✅ | Google Photos-quality albums, timeline, tags |
| 🎤 **Voice Rooms** | ✅ | LiveKit WebRTC, screen share, noise suppression |
| 📅 **Planning Center** | ✅ | Events, expense split, polls, calendar |
| 🎮 **Arcade** | ✅ | UNO, Chess, Ludo, Pictionary + 8 more games |
| 🎬 **Cinema Room** | ✅ | Synchronized watch-together with live chat |
| 🎵 **Music Room** | ✅ | Spotify group session-style shared queue |
| 💊 **Time Capsule** | ✅ | Encrypted messages unlocking after 1–10 years |
| 🤖 **AI Assistant** | ✅ | Gemini-powered search, summaries, recaps |
| 📊 **Analytics** | ✅ | Group stats, achievements, friendship milestones |
| 🔔 **Notifications** | ✅ | Push, email, in-app, real-time |

---

## 🏗️ Architecture

```
hangout/
├── apps/
│   ├── web/          # Next.js 14 (App Router) — Frontend
│   └── api/          # NestJS 11 — Backend REST + WebSocket
├── packages/
│   ├── db/           # Prisma schema + migrations
│   ├── types/        # Shared TypeScript types
│   └── config/       # Shared ESLint, TypeScript configs
├── docker/           # Docker support files
├── docker-compose.yml
└── turbo.json        # Turborepo pipeline
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| **State** | Zustand, React Query (TanStack) |
| **Backend** | NestJS 11, TypeScript, Clean Architecture |
| **Database** | PostgreSQL (Supabase), Prisma ORM |
| **Cache** | Redis 7 (ioredis, Socket.IO adapter) |
| **Auth** | Supabase Auth, JWT, Google OAuth, Magic Links, TOTP 2FA |
| **Real-Time** | Socket.IO with Redis pub/sub |
| **Voice/Video** | LiveKit Cloud (WebRTC) |
| **Media** | Cloudinary (optimization), Supabase Storage |
| **Email** | Resend |
| **AI** | Google Gemini API |
| **Deployment** | Vercel (web), Docker (API), GitHub Actions (CI/CD) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- Docker + Docker Compose
- A Supabase project
- A Cloudinary account
- A LiveKit Cloud account

### 1. Clone and install

```bash
git clone https://github.com/your-org/hangout.git
cd hangout
pnpm install
```

### 2. Configure environment variables

```bash
# Copy environment templates
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# Edit both files with your credentials
```

**Required services to configure:**
- **Supabase**: Create project at [supabase.com](https://supabase.com), copy URL and anon key
- **Cloudinary**: Create account at [cloudinary.com](https://cloudinary.com), copy credentials
- **LiveKit**: Create project at [livekit.io](https://livekit.io), copy API key and secret
- **Google OAuth**: Set up in [Google Cloud Console](https://console.cloud.google.com)

### 3. Start local services

```bash
# Start PostgreSQL, Redis, Mailhog, MinIO
pnpm docker:up

# Or for Docker-less local dev:
# Make sure PostgreSQL and Redis are running locally
```

### 4. Initialize database

```bash
cd packages/db
pnpm db:generate    # Generate Prisma client
pnpm db:migrate     # Run migrations
pnpm db:seed        # Optional: seed with demo data
```

### 5. Run development servers

```bash
# From root — starts both web and api concurrently
pnpm dev

# Or individually:
# Terminal 1: API
cd apps/api && pnpm dev

# Terminal 2: Web  
cd apps/web && pnpm dev
```

**Access:**
- 🌐 Web: http://localhost:3000
- 🔌 API: http://localhost:3001
- 📖 API Docs: http://localhost:3001/api/docs
- 📧 Mailhog: http://localhost:8025
- 💾 MinIO Console: http://localhost:9001

---

## 📁 Project Structure

### Frontend (`apps/web/`)

```
web/
├── app/
│   ├── (auth)/          # Auth pages (login, signup, magic-link, 2fa)
│   ├── (app)/           # Protected app routes
│   │   ├── dashboard/   # Home dashboard
│   │   ├── channels/    # Chat channels
│   │   ├── gallery/     # Memory gallery
│   │   ├── voice/       # Voice rooms
│   │   ├── arcade/      # Game hub
│   │   ├── cinema/      # Watch together
│   │   ├── planning/    # Events & planning
│   │   ├── music/       # Music room
│   │   ├── time-capsule/
│   │   ├── ai-assistant/
│   │   └── settings/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/          # Sidebar, header, shell
│   ├── chat/            # Chat components
│   ├── gallery/         # Photo/video components
│   ├── ui/              # Design system components
│   └── shared/          # Reusable components
├── hooks/               # Custom React hooks
├── lib/
│   ├── api/             # API client + modules
│   └── utils/           # Utilities
└── store/               # Zustand stores
```

### Backend (`apps/api/`)

```
api/src/
├── common/              # Guards, decorators, filters
├── config/              # Typed configuration
├── infrastructure/      # Prisma, Redis, Cloudinary, etc.
├── modules/
│   ├── auth/            # Authentication
│   ├── users/           # User management
│   ├── groups/          # Groups & members
│   ├── channels/        # Channels
│   ├── chat/            # Messages & threads
│   ├── media/           # File uploads & gallery
│   ├── events/          # Planning & events
│   ├── voice/           # LiveKit integration
│   ├── games/           # Arcade state management
│   ├── notifications/   # Push & email
│   ├── ai/              # Gemini AI
│   └── search/          # Full-text search
└── gateways/            # Socket.IO gateways
```

---

## 🔒 Security

- JWT access tokens (15min) + HttpOnly refresh tokens (30 days)
- TOTP-based 2FA with QR code enrollment
- Helmet.js for HTTP security headers
- Rate limiting (per route, per user)
- Input validation on every endpoint
- SQL injection prevention via Prisma
- CORS whitelist
- Supabase Row Level Security (RLS) on storage
- Audit logging for sensitive actions

---

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage report
pnpm test -- --coverage
```

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

### Backend (Docker)

```bash
# Build production image
docker build -t hangout-api ./apps/api

# Run
docker run -p 3001:3001 --env-file apps/api/.env hangout-api
```

### Database Migration (Production)

```bash
cd packages/db
pnpm db:migrate:prod
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ by friends, for friends.</p>
  <p><strong>Hangout — The Digital Home for Friends.</strong></p>
</div>
