import Link from 'next/link';
import { Bot, DatabaseZap, KeyRound, Rocket, Workflow } from 'lucide-react';
import ConsoleLayout from '@/components/ConsoleLayout';
import { getAgentRuns, getDeployments, getMemoryEvents, getProjects, getSystemStatus } from '@/lib/server/state';

export default function MissionControlPage() {
  const status = getSystemStatus();
  const projects = getProjects();
  const agents = getAgentRuns();
  const deployments = getDeployments();
  const memory = getMemoryEvents();
  const cards = [
    { label: 'Projects', value: projects.length, href: '/projects', icon: Workflow },
    { label: 'Agent Runs', value: agents.length, href: '/agents', icon: Bot },
    { label: 'Deployments', value: deployments.length, href: '/deployments', icon: Rocket },
    { label: 'Memory Events', value: memory.length, href: '/memory', icon: DatabaseZap },
  ];

  return (
    <ConsoleLayout>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Mission Control</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">AUOS operating console</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">Live local control surface for project state, agent runs, credential coverage, deployments, memory, and launch swarm operations.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href} className="rounded-[1.4rem] border border-white/10 bg-black/30 p-5 transition hover:border-cyan-200/35 hover:bg-white/[0.06]">
                <Icon className="h-5 w-5 text-cyan-100" />
                <div className="mt-6 text-4xl font-black tracking-[-0.06em]">{card.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-white/35">{card.label}</div>
              </Link>
            );
          })}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.4rem] border border-white/10 bg-black/30 p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-white/35">Kernel Health</div>
            <pre className="mt-4 overflow-auto rounded-2xl bg-black/35 p-4 text-xs leading-6 text-emerald-100/80">{JSON.stringify(status.health, null, 2)}</pre>
          </div>
          <form action="/api/launch-swarm" method="post" className="rounded-[1.4rem] border border-fuchsia-200/15 bg-fuchsia-200/[0.055] p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-fuchsia-100/70">Launch Swarm</div>
            <p className="mt-3 text-sm leading-7 text-white/58">API endpoint ready: POST /api/launch-swarm. Use it to start the 7-agent project swarm from AUOS.</p>
            <Link href="/api/system/status" className="mt-5 inline-flex rounded-2xl bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black">View System API</Link>
          </form>
        </div>
      </div>
    </ConsoleLayout>
  );
}
