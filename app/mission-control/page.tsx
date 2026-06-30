import Link from 'next/link';
import { Bot, DatabaseZap, KeyRound, Rocket, Workflow } from 'lucide-react';
import ConsoleLayout from '@/components/ConsoleLayout';
import { launchSwarmAction, recordMemoryAction } from '@/app/actions';
import { getAgentRuns, getDeployments, getMemoryEvents, getProjects, getSystemStatus } from '@/lib/server/state';

export const dynamic = 'force-dynamic';

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
      <div className="space-y-5">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Mission Control</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">AUOS operating console</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">Live local control surface connected to the AUOS backend: project state, agent runs, credential coverage, deployments, memory, and launch swarm operations.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.label} href={card.href} className="rounded-[1.4rem] border border-white/10 bg-black/30 p-5 transition hover:border-cyan-200/35 hover:bg-white/[0.06] active:scale-[0.98]">
                  <Icon className="h-5 w-5 text-cyan-100" />
                  <div className="mt-6 font-mono text-4xl font-black tracking-[-0.06em]">{card.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.22em] text-white/35">{card.label}</div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.6rem] border border-white/10 bg-black/30 p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-white/35">Kernel Health</div>
            <pre className="mt-4 overflow-auto rounded-2xl bg-black/35 p-4 text-xs leading-6 text-emerald-100/80">{JSON.stringify(status.health, null, 2)}</pre>
            <Link href="/api/system/status" className="mt-4 inline-flex rounded-2xl border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-cyan-200/30 hover:text-white active:scale-[0.98]">Open System API</Link>
          </div>

          <form action={launchSwarmAction} className="rounded-[1.6rem] border border-fuchsia-200/15 bg-fuchsia-200/[0.055] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="text-xs uppercase tracking-[0.25em] text-fuchsia-100/70">Backend Action</div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Launch project swarm</h2>
            <p className="mt-3 text-sm leading-7 text-white/58">Submits to the backend, executes the swarm bridge, records an agent run or error, and stores a memory event.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/60">
                Project name
                <input name="projectName" defaultValue="The Auperating System" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-fuchsia-100/40" />
              </label>
              <label className="grid gap-2 text-sm text-white/60">
                Mode
                <select name="mode" defaultValue="existing" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-fuchsia-100/40">
                  <option value="existing">existing</option>
                  <option value="new">new</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm text-white/60 md:col-span-2">
                Project path
                <input name="projectPath" defaultValue="/Users/kdot/repos/Auperating-System" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-xs text-white outline-none focus:border-fuchsia-100/40" />
              </label>
            </div>
            <button className="mt-5 rounded-2xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-fuchsia-100 active:scale-[0.98]">Run Swarm</button>
          </form>
        </section>

        <form action={recordMemoryAction} className="rounded-[1.6rem] border border-cyan-200/15 bg-cyan-200/[0.055] p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-100/70"><KeyRound className="h-4 w-4" /> Operator Note</div>
          <div className="mt-4 grid gap-4 md:grid-cols-[160px_1fr_180px]">
            <input type="hidden" name="scope" value="project" />
            <input type="hidden" name="scopeId" value="auos" />
            <input name="kind" defaultValue="operator-note" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-100/40" />
            <input name="content" placeholder="Record an operational memory event" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus:border-cyan-100/40" />
            <button className="rounded-2xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-cyan-100 active:scale-[0.98]">Record</button>
          </div>
        </form>
      </div>
    </ConsoleLayout>
  );
}
