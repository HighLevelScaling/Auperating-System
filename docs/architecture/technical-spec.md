# The Auperating System Technical Specification

## 1. Definition

The Auperating System is an application-layer AI operating system. It does not replace macOS/Linux; it runs above the host OS and coordinates AI agents, tools, memory, credentials, projects, deployments, and automations as first-class system resources.

Think of it as:

- Kernel: orchestration + policy engine
- Processes: agents and jobs
- File system: project workspaces + docs + generated artifacts
- Memory: scoped durable context store
- Device drivers: tool adapters for GitHub, Vercel, terminal, browser, GHL, email, APIs
- Shell: command palette + chat console + automation triggers
- Window manager: dashboard surfaces for projects, agents, deploys, credentials, logs

## 2. Primary Technical Goals

1. Launch project-specific AI agent swarms from a single mission brief.
2. Keep each agent scoped, observable, and auditable.
3. Maintain persistent project memory without leaking credentials.
4. Detect and broker required credentials across local env, Vercel, GitHub, and secret stores.
5. Deploy validated projects to Vercel automatically.
6. Provide a dashboard that shows active agents, tasks, logs, memory, deploys, and missing setup.
7. Support monorepo/microfrontend architecture for larger projects.

## 3. MVP Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                    Auperating System UI                       │
│  Mission Control · Agent Console · Credential Panel · Deploys │
└───────────────────────────────┬──────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────┐
│                         OS Kernel API                         │
│  project registry · agent runs · memory · secrets metadata    │
└───────────────┬───────────────────────┬──────────────────────┘
                │                       │
┌───────────────▼──────────────┐ ┌──────▼──────────────────────┐
│        Agent Runtime          │ │        Tool Bus              │
│ Hermes/tmux/delegate/cron     │ │ GitHub · Vercel · shell      │
│ process registry              │ │ browser · GHL · email · APIs │
└───────────────┬──────────────┘ └──────┬──────────────────────┘
                │                       │
┌───────────────▼───────────────────────▼──────────────────────┐
│                     Workspace Layer                           │
│ repos · AGENTS.md · SOUL.md drafts · docs · env examples       │
└───────────────┬───────────────────────┬──────────────────────┘
                │                       │
┌───────────────▼──────────────┐ ┌──────▼──────────────────────┐
│       Memory Kernel           │ │       Secrets Broker          │
│ project facts · decisions     │ │ status only · no raw values   │
│ agent outputs · audit logs    │ │ Vercel/GitHub/env sync        │
└──────────────────────────────┘ └─────────────────────────────┘
```

## 4. Core Services

### 4.1 Kernel API

Responsible for stable system state.

Initial endpoints:

```text
GET    /api/system/status
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
POST   /api/projects/:id/launch-swarm
GET    /api/agents/runs
GET    /api/agents/runs/:id
POST   /api/agents/runs/:id/stop
GET    /api/credentials/status
POST   /api/credentials/sync-vercel
POST   /api/credentials/sync-github
GET    /api/deployments
POST   /api/deployments/vercel
GET    /api/memory
POST   /api/memory
GET    /api/audit-events
```

### 4.2 Agent Runtime

Responsible for starting, tracking, and stopping AI workers.

Runtime primitives:

```ts
type AgentRole =
  | 'orchestrator'
  | 'environment-deployment'
  | 'context'
  | 'brand'
  | 'backend-memory'
  | 'frontend-microfrontends'
  | 'secrets-broker';

type AgentRun = {
  id: string;
  projectId: string;
  role: AgentRole;
  status: 'queued' | 'running' | 'blocked' | 'completed' | 'failed' | 'cancelled';
  sessionName: string;
  workdir: string;
  briefPath: string;
  startedAt: string;
  completedAt?: string;
  logPath?: string;
  outputSummaryPath?: string;
};
```

Execution backends:

1. Local tmux + Hermes CLI for long-running visible agents.
2. Hermes `delegate_task` for bounded isolated subtasks.
3. Hermes cron for durable scheduled/background jobs.
4. Future: queue worker with job retries and web log streaming.

### 4.3 Project Launch Swarm

Default 7-agent swarm:

1. Orchestrator / Integration
2. Environment + Deployment
3. Context / AGENTS / SOUL
4. Brand / Logo / Fonts / Variations
5. Backend + Memory
6. Frontend / Microfrontends
7. Secrets / Credential Broker

Swarm input:

```ts
type LaunchSwarmRequest = {
  projectName: string;
  projectPath: string;
  mode: 'new' | 'existing';
  targetStack?: 'next-vercel' | 'fastapi-react' | 'custom';
  deploymentTarget?: 'vercel' | 'none';
  mission: string;
};
```

Swarm output:

```text
docs/launch-swarm/<timestamp>-brief.md
docs/launch-swarm/integration-report.md
docs/brand/brand-kit.md
docs/backend/backend-memory-plan.md
docs/frontend/frontend-microfrontends-plan.md
docs/secrets/credential-report.md
docs/agent-context/SOUL.md
AGENTS.md
.env.example
```

### 4.4 Memory Kernel

Memory must be scoped and typed.

```ts
type MemoryScope = 'global-user' | 'project' | 'agent-run' | 'organization';

type MemoryKind =
  | 'preference'
  | 'project-fact'
  | 'decision'
  | 'architecture'
  | 'agent-output'
  | 'deployment-note'
  | 'credential-status';

type MemoryEntry = {
  id: string;
  scope: MemoryScope;
  scopeId: string;
  kind: MemoryKind;
  content: string;
  source: 'user' | 'agent' | 'tool' | 'import';
  trust: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
```

Rules:

- Never store raw secrets.
- Store credential names and status only.
- Store decisions and architecture notes durably.
- Separate user preferences from project facts.
- Use session transcripts for temporary progress, not durable memory.

### 4.5 Secrets Broker

The Secrets Broker does not become a password manager. It coordinates secret availability without exposing values.

Inputs:

- `.env.example`
- package imports
- framework config
- Vercel project env list
- GitHub Actions secret list
- local shell env names
- Hermes `~/.hermes/.env` names, status only

Outputs:

```ts
type CredentialStatus = {
  name: string;
  required: boolean;
  localPresent: boolean;
  vercelProductionPresent: boolean;
  vercelPreviewPresent: boolean;
  githubActionsPresent: boolean;
  sourceHint: 'local-env' | 'hermes-env' | 'vercel' | 'github' | 'missing' | 'unknown';
  lastCheckedAt: string;
};
```

Allowed operations:

- `vercel env ls`
- `vercel env add NAME production|preview|development` only when value source is already available and safe
- `gh secret list`
- `gh secret set NAME` only when value source is already available and safe
- update `.env.example` with variable names only

Forbidden operations:

- Print raw secret values
- Commit `.env` or `.env.local`
- Store raw secrets in memory/docs/logs
- Copy secrets between projects without explicit scope match

### 4.6 Tool Bus

Adapter interface:

```ts
type ToolAdapter = {
  name: string;
  category: 'repo' | 'deploy' | 'browser' | 'crm' | 'email' | 'filesystem' | 'terminal' | 'model' | 'data';
  checkHealth(): Promise<ToolHealth>;
  capabilities(): Promise<ToolCapability[]>;
};

type ToolHealth = {
  available: boolean;
  authenticated: boolean;
  version?: string;
  message?: string;
};
```

Initial adapters:

- GitHub CLI adapter
- Vercel CLI adapter
- Hermes CLI adapter
- Terminal adapter
- File/workspace adapter
- GHL CLI adapter
- Browser/web adapter

## 5. Data Model

Initial database can be SQLite for local MVP, PostgreSQL for deployed multi-user version.

Tables:

```sql
projects (
  id text primary key,
  name text not null,
  slug text unique not null,
  path text not null,
  repo_url text,
  vercel_project_id text,
  status text not null,
  created_at text not null,
  updated_at text not null
);

agent_runs (
  id text primary key,
  project_id text not null references projects(id),
  role text not null,
  status text not null,
  session_name text,
  workdir text not null,
  brief_path text,
  log_path text,
  started_at text,
  completed_at text
);

memory_entries (
  id text primary key,
  scope text not null,
  scope_id text not null,
  kind text not null,
  content text not null,
  source text not null,
  trust real default 0.7,
  tags_json text default '[]',
  created_at text not null,
  updated_at text not null
);

credential_statuses (
  id text primary key,
  project_id text not null references projects(id),
  name text not null,
  required integer not null default 1,
  local_present integer not null default 0,
  vercel_production_present integer not null default 0,
  vercel_preview_present integer not null default 0,
  github_actions_present integer not null default 0,
  source_hint text not null,
  last_checked_at text not null,
  unique(project_id, name)
);

deployments (
  id text primary key,
  project_id text not null references projects(id),
  provider text not null,
  environment text not null,
  url text,
  status text not null,
  commit_sha text,
  created_at text not null
);

audit_events (
  id text primary key,
  project_id text,
  actor text not null,
  action text not null,
  target text,
  metadata_json text default '{}',
  created_at text not null
);
```

## 6. Frontend Surfaces

### 6.1 Mission Control

Widgets:

- Active projects
- Running agents
- Blocked agents
- Missing credentials
- Recent deploys
- Memory updates
- Audit events

### 6.2 Project Operating Room

Per-project view:

- Mission brief
- AGENTS.md / SOUL.md status
- Agent swarm status
- Build/test status
- Vercel status
- GitHub status
- Credential coverage
- Memory/decision log

### 6.3 Agent Run Monitor

- Role
- Prompt/brief path
- Status
- tmux/session handle
- logs
- files changed
- summary
- next required action

### 6.4 Secrets Panel

- Required env vars
- Local present/missing
- Vercel preview/prod present/missing
- GitHub Actions present/missing
- Sync actions
- No raw values displayed

## 7. Deployment Architecture

MVP:

- Single Next.js app deployed to Vercel.
- Local Hermes controls project launch and agents.
- Dashboard can start as local-only until auth is added.

Phase 2:

- Vercel-hosted dashboard.
- Server actions/API routes talk to a local agent gateway or remote worker.
- Database-backed project registry.

Phase 3:

- Multi-zone architecture:

```text
apps/web       -> public shell + mission control
apps/console   -> authenticated OS console
apps/docs      -> docs/playbooks
apps/api       -> backend API if separated
packages/ui    -> shared UI
packages/core  -> shared types/kernel logic
packages/tools -> tool adapters
```

## 8. Security Model

Principles:

- Least privilege per agent role.
- Secrets are metadata-only in UI/docs/memory.
- Dangerous commands require approval unless explicitly configured otherwise.
- Every deploy and credential sync creates an audit event.
- Agent outputs are reviewed before commit/deploy for high-risk operations.

Risk controls:

- `.env*` ignored except `.env.example`.
- Secret scanner before commits.
- Credential Broker reports names/status only.
- Vercel/GitHub sync requires available source values and explicit safe path.
- Project scope prevents cross-project secret bleed.

## 9. Implementation Phases

### Phase 1 — Static AI OS MVP

- Landing/dashboard shell
- Architecture docs
- Brand kit
- Launch swarm script integration
- Build/deploy to Vercel

### Phase 2 — Local Runtime Dashboard

- Project registry JSON/SQLite
- API routes for project and agent status
- Shell commands for swarm launch
- tmux process discovery
- Credential status scanner

### Phase 3 — Memory Kernel

- SQLite/Postgres schema
- Memory entries API
- Decision log UI
- Project context summaries

### Phase 4 — Deployment Automation

- Vercel project detection
- Env status checks
- Preview/prod deployment actions
- GitHub repo creation/secrets integration

### Phase 5 — Full Multi-Zone OS

- apps/web, apps/console, apps/docs
- shared packages
- authenticated console
- remote workers
- multi-user teams

## 10. Immediate Next Build Tasks

1. Add real dashboard routes:
   - `/mission-control`
   - `/projects`
   - `/credentials`
   - `/deployments`

2. Add API route stubs:
   - `/api/system/status`
   - `/api/projects`
   - `/api/credentials/status`

3. Add local project registry:
   - `data/projects.json` for MVP
   - migrate to SQLite later

4. Add command runner abstraction:
   - `lib/server/command-runner.ts`
   - safe allowlist for `git`, `vercel`, `gh`, and `tmux` read-only checks first

5. Add Secrets Broker scanner:
   - parse `.env.example`
   - check process env names
   - call `vercel env ls` when linked
   - call `gh secret list` when auth exists

6. Add Vercel deployment card:
   - show project link status
   - show last deployment URL
   - show missing envs

## 11. Technical Naming

- Product: The Auperating System
- Internal abbreviation: AUOS
- Kernel: AUOS Kernel
- Agent runtime: AUOS Runtime
- Memory system: Memory Kernel
- Credentials system: Secrets Broker
- Tool abstraction: Tool Bus
- Project view: Operating Room
- Main dashboard: Mission Control


## 12. Problem Solving Capability Model

AUOS expands beyond task launching into a closed-loop problem solving engine. Every user request, app failure, business bottleneck, deployment issue, or product idea is converted into a structured operating cycle.

### 12.1 Capability Layers

1. Problem Intake
   - Captures the user's plain-language issue.
   - Extracts objective, constraints, affected systems, urgency, and acceptance criteria.
   - Produces a `ProblemBrief`.

2. Domain Classification
   - Classifies the problem as product, frontend, backend, deployment, security, data, brand, sales, ops, or unknown.
   - Selects the likely tools and agent roles.

3. Evidence Collection
   - Reads source files, docs, logs, deploy output, browser state, API responses, memory, and prior decisions.
   - Separates evidence from guesses.

4. Hypothesis Generation
   - Builds multiple possible causes or solution paths.
   - Scores them by likelihood, cost, impact, and reversibility.

5. Decomposition
   - Converts the chosen path into small agent-sized tasks.
   - Adds dependencies, verification commands, rollback notes, and owner roles.

6. Agent Routing
   - Assigns specialists: orchestrator, debugger, frontend, backend, secrets, deployment, brand, research, or QA.
   - Gives each agent scoped context and expected outputs.

7. Fix / Build Execution
   - Applies patches, writes docs, changes config, sets up environments, builds UI, or performs operational actions.
   - Keeps work bounded and auditable.

8. Verification
   - Runs the relevant checks: typecheck, build, tests, lint, browser smoke test, API health check, Vercel preview, or manual acceptance checklist.
   - No problem is considered solved without real evidence.

9. Learning
   - Stores durable decisions and reusable procedures.
   - Avoids storing temporary progress or raw secrets.

### 12.2 Problem Object

```ts
type ProblemSeverity = 'low' | 'medium' | 'high' | 'critical';
type ProblemDomain =
  | 'frontend'
  | 'backend'
  | 'deployment'
  | 'secrets'
  | 'memory'
  | 'data'
  | 'security'
  | 'brand'
  | 'business-ops'
  | 'unknown';

type ProblemBrief = {
  id: string;
  title: string;
  rawRequest: string;
  domain: ProblemDomain;
  severity: ProblemSeverity;
  objective: string;
  constraints: string[];
  affectedSystems: string[];
  acceptanceCriteria: string[];
  requiredEvidence: string[];
  createdAt: string;
};
```

### 12.3 Hypothesis Object

```ts
type Hypothesis = {
  id: string;
  problemId: string;
  statement: string;
  evidenceFor: string[];
  evidenceAgainst: string[];
  confidence: number;
  estimatedEffort: 'small' | 'medium' | 'large';
  risk: 'low' | 'medium' | 'high';
  verificationPlan: string[];
};
```

### 12.4 Solution Task Object

```ts
type SolutionTask = {
  id: string;
  problemId: string;
  title: string;
  agentRole: AgentRole;
  status: 'pending' | 'running' | 'blocked' | 'verified' | 'failed';
  filesExpectedToChange: string[];
  commandsToRun: string[];
  acceptanceChecks: string[];
  rollbackPlan?: string;
};
```

### 12.5 Problem Solving Loop

```text
Capture → Classify → Collect Evidence → Hypothesize → Decompose → Route Agents → Execute → Verify → Learn
```

### 12.6 UI Requirements

Mission Control should expose a Problem Solver panel with:

- Problem intake form
- Domain/severity classifier
- Evidence checklist
- Hypothesis board
- Agent assignment graph
- Verification results
- Decision memory output
- Next-best-action recommendation

### 12.7 Policy

- Do not ask for clarification if the system can inspect the repo, logs, browser, or deployment state directly.
- Do not implement before gathering enough evidence for non-trivial issues.
- Do not mark solved until checks run and pass.
- Do not store raw secrets as part of evidence.
- Prefer small reversible fixes over large speculative rewrites.


## 13. Near-Instant Memory Recovery

AUOS should recover useful project and agent context in milliseconds, not seconds. The goal is not to load all memory; the goal is to recover the right memory for the current mission, role, and problem.

### 13.1 Memory Recovery Targets

```text
Hot active project context      < 50ms
Decision recall                 < 100ms
Semantic project recall         < 150ms
Agent handoff packet            < 200ms
Snapshot resume                 < 250ms
Conflict/staleness check        < 500ms
Cold archive fallback           < 1s
```

### 13.2 Tiered Retrieval

1. Hot Cache
   - Active mission
   - Current project facts
   - Recent decisions
   - Active agent runs
   - Open tasks
   - Recent deploy state

2. Warm Index
   - Full-text search over docs and decision logs
   - Vector/semantic search over summaries and agent outputs
   - File path and symbol-aware retrieval

3. Snapshot Layer
   - Project snapshots
   - Agent handoff snapshots
   - Last-known-good deployment/build snapshots

4. Cold Archive
   - Complete transcripts
   - Old launch reports
   - Completed implementation plans
   - Historical docs

### 13.3 Write-Through Memory

Important events must update all recovery layers immediately:

```text
Decision created
  -> database write
  -> hot cache update
  -> keyword index update
  -> async embedding update
  -> project snapshot refresh
  -> relevant handoff packet refresh
```

Events that trigger write-through:

- user preference
- architecture decision
- project fact
- deployment result
- agent completion
- credential status change
- accepted implementation plan
- verified fix

### 13.4 Recovery Context Packet

```ts
type RecoveryContextPacket = {
  projectId: string;
  requestId: string;
  role?: AgentRole;
  query: string;
  hotFacts: MemoryEntry[];
  decisions: MemoryEntry[];
  relevantFiles: string[];
  activeAgentRuns: AgentRun[];
  openTasks: SolutionTask[];
  credentialStatusNames: CredentialStatus[];
  staleWarnings: string[];
  conflictWarnings: string[];
  generatedAt: string;
  latencyMs: number;
};
```

### 13.5 Correctness Rules

- Current repo files beat remembered file summaries.
- Current deployment state beats remembered deployment state.
- Raw secrets are never indexed, cached, or returned.
- Every returned memory item includes source, timestamp, and trust.
- Conflicting memories are returned as warnings, not facts.
- Agent handoff packets are role-filtered and minimal.

### 13.6 UI Requirements

Mission Control should show a Memory Recovery panel with:

- hot cache status
- index freshness
- snapshot age
- recovery latency
- stale/conflicting memory count
- last decision captured
- last handoff packet generated
- manual refresh-index action

### 13.7 Implementation Notes

MVP can use:

- process memory Map/LRU for hot cache
- SQLite or JSON for durable memory
- SQLite FTS5 or ripgrep-backed index for keyword retrieval
- compact markdown/JSON summaries for snapshots
- vector store later when the database layer is stable
