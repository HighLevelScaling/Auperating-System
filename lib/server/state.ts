import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');

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

type ProjectInput = Pick<Project, 'name'> & Partial<Omit<Project, 'name' | 'id' | 'slug' | 'updatedAt'>> & { slug?: string };
type AgentRunInput = Pick<AgentRun, 'projectId' | 'role' | 'summary'> & Partial<Omit<AgentRun, 'id' | 'projectId' | 'role' | 'summary'>>;
type DeploymentInput = Pick<Deployment, 'projectId' | 'provider' | 'environment' | 'status'> & Partial<Omit<Deployment, 'id' | 'projectId' | 'provider' | 'environment' | 'status'>>;
type MemoryEventInput = Pick<MemoryEvent, 'content'> & Partial<Omit<MemoryEvent, 'id' | 'content' | 'createdAt' | 'tags'>> & { tags?: string[] | string };

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(fileName: string, fallback: T): T {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(fileName: string, value: T) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'project';
}

function makeId(prefix: string, source: string) {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  return `${prefix}-${slugify(source).slice(0, 40)}-${stamp}`;
}

function toText(value: FormDataEntryValue | null, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function optionalText(value: FormDataEntryValue | null) {
  const text = toText(value);
  return text.length ? text : null;
}

function uniqueById<T extends { id: string }>(items: T[]) {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

export function getProjects() {
  return readJson<Project[]>('projects.json', []);
}

export function saveProjects(projects: Project[]) {
  writeJson('projects.json', uniqueById(projects));
}

export function createProject(input: ProjectInput) {
  const now = new Date().toISOString();
  const slug = input.slug?.trim() || slugify(input.name);
  const project: Project = {
    id: makeId('project', slug),
    name: input.name.trim(),
    slug,
    path: input.path?.trim() || path.join(process.cwd(), '..', slug),
    status: input.status?.trim() || 'active',
    repoUrl: input.repoUrl ?? null,
    vercelProjectId: input.vercelProjectId ?? null,
    health: input.health ?? 80,
    summary: input.summary?.trim() || 'Project registered through AUOS Mission Control.',
    updatedAt: now,
  };
  saveProjects([project, ...getProjects()]);
  return project;
}

export function createProjectFromForm(formData: FormData) {
  return createProject({
    name: toText(formData.get('name'), 'Untitled Project'),
    slug: optionalText(formData.get('slug')) ?? undefined,
    path: optionalText(formData.get('path')) ?? undefined,
    status: toText(formData.get('status'), 'active'),
    repoUrl: optionalText(formData.get('repoUrl')),
    vercelProjectId: optionalText(formData.get('vercelProjectId')),
    health: Number(toText(formData.get('health'), '80')) || 80,
    summary: optionalText(formData.get('summary')) ?? undefined,
  });
}

export function getAgentRuns() {
  return readJson<AgentRun[]>('agent-runs.json', []);
}

export function saveAgentRuns(runs: AgentRun[]) {
  writeJson('agent-runs.json', uniqueById(runs));
}

export function createAgentRun(input: AgentRunInput) {
  const now = new Date().toISOString();
  const run: AgentRun = {
    id: makeId('agent', `${input.role}-${input.projectId}`),
    projectId: input.projectId,
    role: input.role.trim(),
    status: input.status?.trim() || 'ready',
    sessionName: input.sessionName?.trim() || `${slugify(input.role)}-${now.slice(0, 10)}`,
    workdir: input.workdir?.trim() || process.cwd(),
    briefPath: input.briefPath?.trim() || 'docs/product/mvp-plan.md',
    summary: input.summary.trim(),
    startedAt: input.startedAt || now,
    completedAt: input.completedAt ?? null,
  };
  saveAgentRuns([run, ...getAgentRuns()]);
  return run;
}

export function createAgentRunFromForm(formData: FormData) {
  return createAgentRun({
    projectId: toText(formData.get('projectId'), 'auos'),
    role: toText(formData.get('role'), 'operator'),
    status: toText(formData.get('status'), 'ready'),
    sessionName: optionalText(formData.get('sessionName')) ?? undefined,
    workdir: optionalText(formData.get('workdir')) ?? undefined,
    briefPath: optionalText(formData.get('briefPath')) ?? undefined,
    summary: toText(formData.get('summary'), 'Agent run registered from AUOS console.'),
  });
}

export function getCredentialSeed() {
  return readJson<CredentialStatus[]>('credential-status.json', []);
}

export function saveCredentialSeed(credentials: CredentialStatus[]) {
  writeJson('credential-status.json', uniqueById(credentials.map((item) => ({ ...item, id: item.name })) as Array<CredentialStatus & { id: string }>).map(({ id: _id, ...item }) => item));
}

export function addCredentialRequirement(name: string, required = true) {
  const normalized = name.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
  const credentials = getCredentialSeed();
  const existing = credentials.find((item) => item.name === normalized);
  const next: CredentialStatus = {
    name: normalized,
    required,
    localPresent: existing?.localPresent ?? false,
    vercelProductionPresent: existing?.vercelProductionPresent ?? false,
    vercelPreviewPresent: existing?.vercelPreviewPresent ?? false,
    githubActionsPresent: existing?.githubActionsPresent ?? false,
    sourceHint: existing?.sourceHint ?? 'missing',
    lastCheckedAt: new Date().toISOString(),
  };
  saveCredentialSeed([next, ...credentials.filter((item) => item.name !== normalized)]);
  return next;
}

export function getDeployments() {
  return readJson<Deployment[]>('deployments.json', []);
}

export function saveDeployments(deployments: Deployment[]) {
  writeJson('deployments.json', uniqueById(deployments));
}

export function createDeployment(input: DeploymentInput) {
  const now = new Date().toISOString();
  const deployment: Deployment = {
    id: makeId('deploy', `${input.provider}-${input.environment}-${input.projectId}`),
    projectId: input.projectId,
    provider: input.provider.trim(),
    environment: input.environment.trim(),
    url: input.url ?? null,
    status: input.status.trim(),
    commitSha: input.commitSha ?? null,
    createdAt: input.createdAt || now,
    summary: input.summary?.trim() || 'Deployment event registered through AUOS.',
  };
  saveDeployments([deployment, ...getDeployments()]);
  return deployment;
}

export function createDeploymentFromForm(formData: FormData) {
  return createDeployment({
    projectId: toText(formData.get('projectId'), 'auos'),
    provider: toText(formData.get('provider'), 'vercel'),
    environment: toText(formData.get('environment'), 'preview'),
    status: toText(formData.get('status'), 'registered'),
    url: optionalText(formData.get('url')),
    commitSha: optionalText(formData.get('commitSha')),
    summary: optionalText(formData.get('summary')) ?? undefined,
  });
}

export function getMemoryEvents() {
  return readJson<MemoryEvent[]>('memory-events.json', []);
}

export function saveMemoryEvents(events: MemoryEvent[]) {
  writeJson('memory-events.json', uniqueById(events));
}

export function createMemoryEvent(input: MemoryEventInput) {
  const now = new Date().toISOString();
  const tags = Array.isArray(input.tags)
    ? input.tags
    : typeof input.tags === 'string'
      ? input.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];
  const event: MemoryEvent = {
    id: makeId('mem', input.kind || input.scopeId || 'event'),
    scope: input.scope?.trim() || 'project',
    scopeId: input.scopeId?.trim() || 'auos',
    kind: input.kind?.trim() || 'note',
    content: input.content.trim(),
    source: input.source?.trim() || 'operator',
    trust: input.trust ?? 0.85,
    tags,
    createdAt: now,
  };
  saveMemoryEvents([event, ...getMemoryEvents()]);
  return event;
}

export function createMemoryEventFromForm(formData: FormData) {
  return createMemoryEvent({
    scope: toText(formData.get('scope'), 'project'),
    scopeId: toText(formData.get('scopeId'), 'auos'),
    kind: toText(formData.get('kind'), 'note'),
    content: toText(formData.get('content'), 'Memory event recorded from AUOS console.'),
    source: toText(formData.get('source'), 'operator'),
    trust: Number(toText(formData.get('trust'), '0.85')) || 0.85,
    tags: toText(formData.get('tags'), ''),
  });
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
      localState: 'json-backed-read-write',
      secretsMode: 'metadata-only',
      deploymentTarget: 'vercel',
    },
  };
}
