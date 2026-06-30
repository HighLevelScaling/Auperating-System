# Backend + Memory Plan

## MVP Backend Responsibilities

- Project registry
- Agent session registry
- Launch swarm runs
- Credential status records without secret values
- Deployment records
- Memory entries and decision logs
- Audit events

## Suggested Data Models

- Project
- AgentRole
- AgentRun
- LaunchSwarmRun
- CredentialRequirement
- CredentialStatus
- Deployment
- MemoryEntry
- AuditEvent

## Memory Kernel Rules

- Scope memory by project.
- Separate user preference, project facts, agent outputs, and secrets metadata.
- Never store raw secrets in memory.
- Store credential names and status only.
- Preserve decisions and implementation notes in docs plus database records.

## API Surface

- GET /api/projects
- POST /api/projects
- GET /api/agents/runs
- POST /api/launch-swarm
- GET /api/credentials/status
- GET /api/deployments
- POST /api/memory


## Near-Instant Memory Recovery Expansion

Goal: make project and agent context recovery feel immediate while preserving correctness and preventing stale or secret-bearing context from leaking into agents.

### Recovery SLA Targets

- Hot active project context: < 50ms
- Decision recall: < 100ms
- Semantic project recall: < 150ms
- Agent handoff packet generation: < 200ms
- Snapshot resume: < 250ms
- Conflict/staleness check: < 500ms
- Cold archive fallback: < 1s

### Multi-Tier Memory Architecture

1. Hot Context Cache
   - In-memory LRU keyed by projectId, agentRunId, and active mission.
   - Stores current mission brief, open tasks, recent decisions, active files, deploy status, and credential status names only.
   - Invalidates on file change, deploy event, or explicit project refresh.

2. Warm Semantic Index
   - Hybrid keyword + vector index for project docs, decision logs, agent outputs, and architecture notes.
   - Optimized for recall by problem, feature, file path, agent role, and decision date.

3. Snapshot Store
   - Rolling compact project snapshots.
   - Rolling agent handoff snapshots.
   - Allows interrupted agents to resume without rereading the repo.

4. Decision Ledger
   - Append-only durable record for choices and rationale.
   - Separates durable “why” from temporary chat progress.

5. Cold Archive
   - Full transcripts, old docs, historical plans, completed launch-swarm reports.
   - Accessed only when hot/warm layers do not satisfy the query.

### Recovery Pipeline

```text
Write durable event
  -> update database
  -> update hot cache
  -> update keyword index
  -> queue vector embedding/update
  -> update project snapshot
  -> update agent handoff packet
```

Read path:

```text
Request context
  -> hot cache lookup
  -> project snapshot lookup
  -> semantic index lookup
  -> cold archive fallback
  -> contradiction/staleness check
  -> role-specific context packet
```

### Agent Handoff Packet

Each agent receives only the memory needed for its role.

```ts
type AgentHandoffPacket = {
  projectId: string;
  agentRunId: string;
  role: AgentRole;
  mission: string;
  currentGoal: string;
  relevantDecisions: string[];
  relevantFiles: string[];
  openTasks: string[];
  blockers: string[];
  verificationCriteria: string[];
  credentialStatuses: Array<{ name: string; present: boolean; scope: string }>;
  forbiddenContext: string[];
  generatedAt: string;
};
```

### Memory Recovery API

```text
GET  /api/memory/hot?projectId=:id
GET  /api/memory/recover?projectId=:id&query=:query&role=:role
POST /api/memory/events
POST /api/memory/snapshot
GET  /api/memory/handoff?agentRunId=:id
POST /api/memory/refresh-index
```

### Staleness and Trust

Every recovered item should carry:

- source
- timestamp
- trust score
- current file/deploy verification state
- stale/valid/conflicting status

AUOS should prefer verified current repo state over remembered claims.

### Secret Safety

- Credential values are never cached.
- Only credential names and present/missing status can enter handoff packets.
- Secret-looking strings are redacted before indexing.
- Memory recovery must not search raw `.env` files unless returning names only.
