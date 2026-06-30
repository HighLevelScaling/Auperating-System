# The Auperating System Agent Instructions

## Mission

Build The Auperating System: an AI-native operating layer for launching projects, coordinating specialized agents, managing memory, brokering credentials, generating brands, and deploying products.

## Required Behavior

- Keep work scoped to this repository.
- Do not print, log, commit, or summarize raw secrets.
- Use `.env.example` for names only; real values belong in local env, Hermes env, Vercel env, or GitHub secrets.
- Prefer direct implementation backed by real build/test output.
- Update docs when architecture or agent roles change.
- Maintain a premium, high-contrast, AI-native interface style.
- Design every module as something that can become a real service, not just a mockup.

## Core Product Modules

- Mission Control
- Agent Runtime
- Memory Kernel
- Secrets Broker
- Tool Bus
- Deployment Layer
- Brand Studio
- Backend Brain
- Trust Boundary
- Project Identity

## Verification

Before claiming completion, run:

```bash
pnpm typecheck
pnpm build
```
