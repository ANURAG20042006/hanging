# ─── Stage 1: Dependency Install ─────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/config/package.json ./packages/config/
COPY packages/types/package.json ./packages/types/
COPY packages/db/package.json ./packages/db/
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --ignore-scripts

# ─── Stage 2: Build ───────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY . .

# Generate Prisma Client
RUN pnpm --filter @hangout/db db:generate

# Build the NestJS API
RUN pnpm --filter @hangout/api build

# ─── Stage 3: Production Runtime ─────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Security: run as non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy only production artifacts
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder --chown=nestjs:nodejs /app/packages/db/prisma ./prisma

USER nestjs

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
