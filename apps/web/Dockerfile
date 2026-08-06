# ─── Stage 1: Dependency Install ─────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/config/package.json ./packages/config/
COPY packages/types/package.json ./packages/types/
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile --ignore-scripts

# ─── Stage 2: Build ───────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm --filter @hangout/web build

# ─── Stage 3: Production Runtime ─────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

RUN apk add --no-cache dumb-init

# Copy Next.js standalone output
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
