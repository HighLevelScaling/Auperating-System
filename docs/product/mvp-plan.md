# The Auperating System MVP Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a working AI OS MVP dashboard that can evolve into a full project/agent/deployment operating system.

**Architecture:** Start as a Next.js app with documented service boundaries. Keep the UI real and deployable while backend services are introduced module-by-module.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Hermes CLI, Vercel, GitHub, future PostgreSQL/SQLite memory layer.

---

### Task 1: Product shell

**Objective:** Create the first branded landing and module dashboard.

**Files:**
- Create/modify: `app/page.tsx`
- Create/modify: `app/globals.css`
- Create/modify: `lib/os-data.ts`

**Verification:**
Run `pnpm build` and confirm Next.js compiles.

### Task 2: Agent OS documentation

**Objective:** Preserve product architecture, brand, backend, frontend, secrets, and agent identity docs.

**Files:**
- Create: `docs/product/vision.md`
- Create: `docs/architecture/system-map.md`
- Create: `docs/backend/backend-memory-plan.md`
- Create: `docs/frontend/frontend-microfrontends-plan.md`
- Create: `docs/secrets/credential-report.md`
- Create: `docs/brand/brand-kit.md`
- Create: `docs/agent-context/SOUL.md`

**Verification:**
Ensure docs exist and do not contain raw secrets.

### Task 3: Deployment readiness

**Objective:** Make the app ready for Vercel deployment.

**Files:**
- Create/modify: `package.json`
- Create/modify: `.env.example`
- Create/modify: `.gitignore`
- Create/modify: `next.config.ts`

**Verification:**
Run `pnpm typecheck` and `pnpm build`.
