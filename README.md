# The Auperating System

The Auperating System, or AUOS, is an AI-native operating layer for launching projects, coordinating specialized agents, managing memory, brokering credentials, generating brands, and deploying products.

It is not a traditional kernel OS. It is an application-layer AI OS: a command environment where autonomous product, business, deployment, memory, and operations agents can work together as scoped system services.

## What AUOS does

AUOS gives the operator one place to:

- launch and coordinate specialized AI agents
- track projects, agent runs, deployments, credentials, and memory events
- manage project context and durable system knowledge
- inspect credential readiness without exposing secret values
- generate brand, frontend, backend, and deployment plans
- run a Project Launch Swarm for new or existing products
- preserve reusable project identity in docs such as `AGENTS.md` and `SOUL.md`

## Product modules

AUOS is organized around these core modules:

| Module | Purpose |
| --- | --- |
| Mission Control | Central command surface for active projects, agents, deploys, memory, and credential status. |
| Agent Runtime | Launches and tracks specialized agents with scoped context and evidence-backed outputs. |
| Memory Kernel | Maintains project context, decisions, history, user preferences, and agent handoffs. |
| Secrets Broker | Detects required credentials, maps them to approved stores, and verifies availability without leaking values. |
| Tool Bus | Provides controlled access to terminal, GitHub, Vercel, filesystem, browser, GHL, APIs, and other tools. |
| Deployment Layer | Coordinates Vercel-first build, preview, production, environment, and rollback workflows. |
| Brand Studio | Generates project identity, visual systems, logos, typography, and design direction. |
| Backend Brain | Plans and evolves APIs, jobs, audit logs, memory stores, auth, and data models. |
| Trust Boundary | Defines permissions, auditability, secret handling, destructive-action rules, and verification requirements. |
| Project Identity | Keeps each project’s mission, context, operating rules, and agent instructions consistent. |

## Current implementation

This repository currently contains a Next.js/TypeScript AUOS console with:

- landing page and OS module overview
- Mission Control route
- agent run, project, deployment, credential, and memory views
- local JSON-backed state for the MVP
- API routes for system status, capabilities, projects, agents, deployments, credentials, memory, and launch-swarm intake
- architecture, product, backend, frontend, brand, secrets, and agent-context documentation

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS
- React
- Framer Motion
- Lucide icons
- pnpm
- Vercel-first deployment target
- Hermes-powered agent workflows

## Getting started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3200
```

## Verification

Before considering changes complete, run:

```bash
pnpm typecheck
pnpm build
```

## Environment

Copy the environment template and fill values locally or in your approved secret store:

```bash
cp .env.example .env.local
```

Never commit real secret values. The repo uses `.env.example` for names only. Real values belong in local env, Hermes env, Vercel env, GitHub secrets, or another approved secret manager.

## Important paths

```text
app/                         Next.js app routes and UI
app/api/                     AUOS API routes
components/                  Shared console UI components
lib/                         Shared OS data and server helpers
data/                        MVP local state files
docs/product/                Product vision and MVP plan
docs/architecture/           System architecture and frontier capability docs
docs/backend/                Backend and memory planning
docs/frontend/               Frontend and microfrontend planning
docs/secrets/                Credential readiness and broker notes
docs/brand/                  Brand kit and identity notes
docs/agent-context/SOUL.md   Project identity/context for agents
AGENTS.md                    Repository-level operating instructions for AI agents
```

## Operating principle

AUOS should feel like an operating system for autonomous work: observable, modular, scoped, auditable, memory-aware, deployment-ready, and built around real verification rather than simulated progress.

## Status

MVP console in active development.
