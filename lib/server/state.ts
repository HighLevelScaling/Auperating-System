import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data');

export type Project = {
  id: string;
  name: string;
  slug: string;
  path: string;
  status: string;
  repoUrl?: string | null;
  vercelProjectId?: string | null;
  health?: number;
  summary?: string;
  updatedAt?: string;
};

export type AgentRun = {
  id: string;
  projectId: string;
  role: string;
  status: string;
  sessionName: string;
  workdir: string;
  briefPath: string;
  summary: string;
  startedAt: string;
  completedAt?: string | null;
};

export type CredentialStatus = {
  name: string;
  required: boolean;
  localPresent: boolean;
  vercelProductionPresent: boolean;
  vercelPreviewPresent: boolean;
  githubActionsPresent: boolean;
  sourceHint: string;
  lastCheckedAt?: string | null;
};

export type Deployment = {
  id: string;
  projectId: string;
  provider: string;
  environment: string;
  url?: string | null;
  status: string;
  commitSha?: string | null;
  createdAt: string;
  summary?: string;
};

export type MemoryEvent = {
  id: string;
  scope: string;
  scopeId: string;
  kind: string;
  content: string;
  source: string;
  trust: number;
  tags: string[];
  createdAt: string;
};

function readJson<T>(fileName: string, fallback: T): T {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getProjects() {
  return readJson<Project[]>('projects.json', []);
}

export function getAgentRuns() {
  return readJson<AgentRun[]>('agent-runs.json', []);
}

export function getCredentialSeed() {
  return readJson<CredentialStatus[]>('credential-status.json', []);
}

export function getDeployments() {
  return readJson<Deployment[]>('deployments.json', []);
}

export function getMemoryEvents() {
  return readJson<MemoryEvent[]>('memory-events.json', []);
}

export function getSystemStatus() {
  const projects = getProjects();
  const agents = getAgentRuns();
  const deployments = getDeployments();
  const memory = getMemoryEvents();
  const credentials = getCredentialSeed();
  return {
    product: 'The Auperating System',
    abbreviation: 'AUOS',
    status: 'online',
    generatedAt: new Date().toISOString(),
    counts: {
      projects: projects.length,
      agentRuns: agents.length,
      deployments: deployments.length,
      memoryEvents: memory.length,
      credentialRequirements: credentials.length,
    },
    health: {
      kernel: 'online',
      console: 'online',
      localState: 'json-backed',
      secretsMode: 'metadata-only',
      deploymentTarget: 'vercel',
    },
  };
}
