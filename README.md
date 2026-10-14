# Sprint Story

An offline-first Scrum learning game, starting with PSM I. Offline play is a product goal; it is not implemented in this initial shell.

## Current status

This repository is the initial engineering foundation, not a playable learning app. It includes a NestJS API with dependency health checks, local PostgreSQL/Redis, an initial persistence schema, a shared content validator/SRS function and static learner/Studio shells. Authentication, learner sync, connected Studio authoring, playable mission flows, published PSM I lesson content and cloud API/database deployment are not implemented yet.

## Requirements

- Node.js 24+
- pnpm 12+
- Docker Engine with Docker Compose

## Run locally

```sh
cp .env.example .env
docker compose up -d
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm dev:api
```

Use `pnpm db:migrate:dev --name <migration-name>` when changing the Prisma schema locally; check the generated SQL into `backend/packages/db/prisma/migrations/`.

In separate terminals, run `pnpm dev:learner` and `pnpm dev:studio` to open the two static UI shells.

The API listens on `http://localhost:3001`:

- `GET /health/live` reports that the process responds.
- `GET /health/ready` checks PostgreSQL and Redis. PostgreSQL is required; if Redis is down, the API returns `200` with `status: "degraded"`, since Redis is disposable.

The learner and Studio screens are visual foundations only. They do not yet load or save account data, author chapters, or conduct a mission. Studio currently shows a small planned PSM I chapter outline; this is not published lesson content.

Local Postgres and Redis data use named Docker volumes. To reset them, explicitly remove the volumes with `docker compose down -v`; this deletes local data.

## Verify

```sh
pnpm typecheck
pnpm test
pnpm build
```

## Planned hosting

Proposed free-tier targets are GitHub Pages (static web apps), Render (API), Neon (PostgreSQL), and Upstash (Redis). The Pages workflow is manual so the incomplete shells are not automatically published as a learning product. Cloud services and deploy secrets are not configured. Free plans may sleep, enforce quotas, or change; do not treat them as durable production hosting without backups and a reviewed upgrade plan.
