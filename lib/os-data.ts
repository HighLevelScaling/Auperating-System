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
  Search,
  GitBranch,
  ClipboardCheck,
  Gauge,
  Network,
  Wrench,
  Layers,
  Radar,
  Clock,
  Zap,
  Telescope,
  FlaskConical,
  Infinity,
  ShieldAlert,
  LineChart,
  Boxes,
  WandSparkles,
  Activity,
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


export const problemSolvingCapabilities = [
  {
    name: 'Problem Intake',
    mode: 'Sense',
    icon: Radar,
    description: 'Turns messy user goals, bug reports, business friction, or vague ideas into a structured problem brief with constraints, affected systems, and success criteria.',
    outputs: ['Problem brief', 'Acceptance criteria', 'Known unknowns'],
  },
  {
    name: 'Root Cause Analysis',
    mode: 'Diagnose',
    icon: Search,
    description: 'Inspects files, logs, deploy output, app behavior, APIs, workflows, and historical context to identify the real cause instead of patching symptoms.',
    outputs: ['Evidence map', 'Cause tree', 'Reproduction path'],
  },
  {
    name: 'Solution Decomposition',
    mode: 'Plan',
    icon: GitBranch,
    description: 'Breaks large problems into small agent-ready tasks with owners, dependencies, verification steps, rollback notes, and deploy gates.',
    outputs: ['Task graph', 'Agent assignments', 'Execution order'],
  },
  {
    name: 'Agent Routing',
    mode: 'Delegate',
    icon: Network,
    description: 'Selects the right specialist agents for frontend, backend, secrets, brand, deployment, research, debugging, or operations work.',
    outputs: ['Swarm plan', 'Role prompts', 'Scoped workdirs'],
  },
  {
    name: 'Fix Generation',
    mode: 'Act',
    icon: Wrench,
    description: 'Produces code changes, environment repairs, docs, automations, business workflows, UI iterations, and deploy corrections with bounded scope.',
    outputs: ['Patch set', 'Config updates', 'Implementation notes'],
  },
  {
    name: 'Verification Loop',
    mode: 'Verify',
    icon: ClipboardCheck,
    description: 'Runs builds, tests, typechecks, linting, smoke checks, preview deploys, and acceptance checks before marking work complete.',
    outputs: ['Test evidence', 'Build output', 'Pass/fail verdict'],
  },
  {
    name: 'Decision Memory',
    mode: 'Learn',
    icon: Layers,
    description: 'Stores durable decisions, architecture facts, lessons, and reusable procedures while keeping temporary progress and raw secrets out of memory.',
    outputs: ['Decision log', 'Project memory', 'Reusable skills'],
  },
  {
    name: 'Impact Scoring',
    mode: 'Prioritize',
    icon: Gauge,
    description: 'Scores problems by revenue impact, user pain, security risk, implementation effort, urgency, and confidence so the system attacks the highest-leverage work first.',
    outputs: ['Priority score', 'Risk score', 'Next best action'],
  },
];

export const problemSolvingLoop = [
  'Capture the problem in plain language',
  'Classify domain, urgency, blast radius, and constraints',
  'Collect evidence from repo, logs, browser, APIs, memory, and deployment state',
  'Generate hypotheses and rank likely root causes',
  'Decompose solution into agent-sized tasks',
  'Assign specialist agents and execute fixes',
  'Verify with real tests, builds, previews, or operational checks',
  'Write decision memory and update reusable playbooks',
];


export const memoryRecoveryCapabilities = [
  {
    name: 'Hot Context Cache',
    target: '< 50ms',
    icon: Zap,
    description: 'Keeps the active project brief, current goals, recent decisions, open agent runs, and working-set files resident in a fast in-memory cache.',
    mechanism: 'LRU + project-scoped context window',
  },
  {
    name: 'Semantic Memory Index',
    target: '< 150ms',
    icon: Search,
    description: 'Pre-indexes project facts, decisions, docs, tickets, transcripts, and agent outputs for instant fuzzy/semantic recall.',
    mechanism: 'hybrid keyword + vector retrieval',
  },
  {
    name: 'Session Snapshots',
    target: '< 250ms',
    icon: Clock,
    description: 'Stores compact checkpoint snapshots of the current mission so interrupted agents can resume without rereading the whole repo.',
    mechanism: 'rolling summaries + state checkpoints',
  },
  {
    name: 'Decision Ledger',
    target: '< 100ms',
    icon: ClipboardCheck,
    description: 'Separates durable decisions from temporary chat progress so AUOS can recover the “why” behind architecture and product moves instantly.',
    mechanism: 'append-only decision records',
  },
  {
    name: 'Agent Handoff Packets',
    target: '< 200ms',
    icon: Network,
    description: 'Builds small role-specific memory packets for each agent: mission, constraints, relevant files, last actions, blockers, and verification criteria.',
    mechanism: 'role-filtered context bundles',
  },
  {
    name: 'Write-Through Memory',
    target: 'Real-time',
    icon: DatabaseZap,
    description: 'Important facts are written to durable memory at the moment they are created, then mirrored into the hot cache and search index.',
    mechanism: 'database + cache + index fanout',
  },
  {
    name: 'Cold Archive Recall',
    target: '< 1s',
    icon: Layers,
    description: 'Older sessions and documents stay searchable through compressed summaries and full-text paths without slowing the active working set.',
    mechanism: 'summary hierarchy + FTS fallback',
  },
  {
    name: 'Conflict Recovery',
    target: '< 500ms',
    icon: ShieldCheck,
    description: 'Detects contradictory memories, stale facts, and changed project state, then marks confidence instead of blindly restoring bad context.',
    mechanism: 'trust scoring + contradiction checks',
  },
];

export const memoryRecoveryPipeline = [
  'Capture every durable decision at write time',
  'Fan out to memory database, hot cache, and search index',
  'Generate compact project and agent snapshots continuously',
  'Preload active project context when Mission Control opens',
  'Retrieve hot context first, semantic index second, cold archive last',
  'Return role-specific memory packets to agents',
  'Verify recovered context against current files and deployment state',
  'Update trust scores and refresh stale memories automatically',
];


export const frontierCapabilities = [
  {
    name: 'Autonomous Experiment Lab',
    horizon: 'Self-Testing',
    icon: FlaskConical,
    description: 'AUOS can spin up controlled experiments, test multiple product/build/brand approaches, compare evidence, and promote the winning path automatically.',
    primitives: ['Hypothesis queue', 'A/B build branches', 'Automated evaluation', 'Winner promotion'],
  },
  {
    name: 'Project Digital Twin',
    horizon: 'Simulation',
    icon: Boxes,
    description: 'Every project gets a simulated twin that models users, architecture, dependencies, deploy risks, revenue paths, and operational bottlenecks before changes ship.',
    primitives: ['System graph', 'Impact simulation', 'Failure forecast', 'Rollback plan'],
  },
  {
    name: 'Causal Strategy Engine',
    horizon: 'Reasoning',
    icon: GitBranch,
    description: 'Maps cause-and-effect chains across code, design, traffic, sales, revenue, support, and deployment health to choose moves with compounding impact.',
    primitives: ['Causal graph', 'Leverage points', 'Counterfactuals', 'Next best action'],
  },
  {
    name: 'Self-Healing Operations',
    horizon: 'Autonomous Repair',
    icon: ShieldAlert,
    description: 'Detects broken builds, failed deploys, stale credentials, runtime errors, and missing docs, then starts the right recovery agents before the user asks.',
    primitives: ['Watchdogs', 'Auto-triage', 'Repair swarm', 'Verified recovery'],
  },
  {
    name: 'Cross-Project Transfer',
    horizon: 'Skill Propagation',
    icon: Infinity,
    description: 'Learns working patterns from one repo and safely applies them to another: auth setups, launch flows, Vercel fixes, brand systems, and backend memory designs.',
    primitives: ['Pattern library', 'Compatibility check', 'Scoped transplant', 'Regression guard'],
  },
  {
    name: 'Market Radar',
    horizon: 'Opportunity Sensing',
    icon: Telescope,
    description: 'Scans niches, competitors, pricing, search intent, buyer pain, and trend shifts to create product ideas and rank business moves by opportunity density.',
    primitives: ['Niche scan', 'Competitor graph', 'Pain mining', 'Opportunity score'],
  },
  {
    name: 'Auto-Monetization Planner',
    horizon: 'Revenue OS',
    icon: LineChart,
    description: 'Turns a product into offers, pricing tiers, landing sections, payment flows, outreach sequences, and launch experiments tied to measurable revenue.',
    primitives: ['Offer design', 'Pricing model', 'Stripe plan', 'Launch funnel'],
  },
  {
    name: 'Synthetic Workforce',
    horizon: 'Agent Organization',
    icon: WandSparkles,
    description: 'Creates temporary AI departments for a mission: founder, engineer, designer, ops, marketer, QA, security, and deployment lead — each with memory and authority boundaries.',
    primitives: ['Org chart', 'Role contracts', 'Escalation rules', 'Delivery board'],
  },
  {
    name: 'Living System Pulse',
    horizon: 'Continuous Awareness',
    icon: Activity,
    description: 'Maintains a real-time pulse of project health: build status, deploy freshness, open risks, credential gaps, agent drift, revenue signals, and memory freshness.',
    primitives: ['Health score', 'Risk feed', 'Freshness index', 'Action alerts'],
  },
];

export const autonomousModes = [
  {
    mode: 'Observe',
    promise: 'Continuously sense repo, deploy, credential, market, and memory state.',
  },
  {
    mode: 'Imagine',
    promise: 'Generate divergent solution paths, product moves, and monetization angles.',
  },
  {
    mode: 'Simulate',
    promise: 'Run impact, failure, and revenue simulations before touching production.',
  },
  {
    mode: 'Execute',
    promise: 'Launch scoped agents, create artifacts, patch systems, and deploy verified work.',
  },
  {
    mode: 'Evolve',
    promise: 'Capture lessons, update playbooks, and propagate proven patterns across projects.',
  },
];
