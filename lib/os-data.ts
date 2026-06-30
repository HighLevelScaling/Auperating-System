import {
  Bot,
  BrainCircuit,
  Command,
  DatabaseZap,
  Fingerprint,
  KeyRound,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

export const systemModules = [
  {
    name: 'Mission Control',
    status: 'ONLINE',
    icon: Command,
    description: 'One surface for projects, active agents, deploys, credentials, and business workflows.',
  },
  {
    name: 'Agent Runtime',
    status: 'BOOTING',
    icon: Bot,
    description: 'Launch role-specific Hermes agents as system services with shared briefs and scoped workspaces.',
  },
  {
    name: 'Memory Kernel',
    status: 'DESIGNED',
    icon: BrainCircuit,
    description: 'Durable context, user preferences, project decisions, and scoped memory boundaries.',
  },
  {
    name: 'Secrets Broker',
    status: 'GUARDED',
    icon: KeyRound,
    description: 'Detect required keys, sync envs to Vercel/GitHub, and report missing credentials without leaks.',
  },
  {
    name: 'Deployment Layer',
    status: 'VERCEL-FIRST',
    icon: Rocket,
    description: 'Preview and production deploys, domains, build checks, env propagation, and release notes.',
  },
  {
    name: 'Tool Bus',
    status: 'EXPANDING',
    icon: Workflow,
    description: 'Terminal, GitHub, Vercel, GHL, email, browser, web, docs, image generation, and APIs.',
  },
  {
    name: 'Backend Brain',
    status: 'ARCHITECTED',
    icon: DatabaseZap,
    description: 'API, auth, queues, audit logs, memory storage, project registries, and automation state.',
  },
  {
    name: 'Brand Studio',
    status: 'READY',
    icon: Sparkles,
    description: 'Logo systems, palettes, font pairings, product visuals, and AI-generated asset variations.',
  },
  {
    name: 'Trust Boundary',
    status: 'ENFORCED',
    icon: ShieldCheck,
    description: 'Approvals, scoped agent permissions, audit trails, secret redaction, and deployment safety rails.',
  },
  {
    name: 'Project Identity',
    status: 'PERSISTENT',
    icon: Fingerprint,
    description: 'AGENTS.md, SOUL.md drafts, launch briefs, and project-specific operating doctrine.',
  },
];

export const launchSequence = [
  'User defines mission',
  'Auperating System creates workspace',
  'Secrets Broker checks integrations',
  'Launch Swarm starts specialized agents',
  'Agents generate context, brand, backend, frontend, deployment plans',
  'Build checks run',
  'Vercel deployment ships',
  'Memory Kernel preserves decisions',
];
