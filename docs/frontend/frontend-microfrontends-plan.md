# Frontend / Microfrontends Plan

## MVP Interface

- Landing / product shell
- Mission Control dashboard
- Project detail view
- Agent run detail view
- Credential status panel
- Deployment status panel
- Brand Studio panel
- Memory Kernel panel

## Future Vercel Multi-Zone Split

- apps/web: shell, landing, mission control
- apps/docs: docs and playbooks
- apps/console: authenticated OS console
- packages/ui: shared UI system
- packages/config: shared lint/typescript/tailwind config

## Route Map

- / — public product shell
- /mission-control — app dashboard
- /projects/[id] — project operating room
- /agents/[runId] — agent run monitor
- /credentials — secrets broker status
- /deployments — release/deploy monitor
