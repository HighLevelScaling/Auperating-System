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
