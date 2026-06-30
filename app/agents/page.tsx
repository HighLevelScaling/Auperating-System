import ConsoleLayout from '@/components/ConsoleLayout';
import { getAgentRuns } from '@/lib/server/state';

export default function AgentsPage() {
  const runs = getAgentRuns();
  return (
    <ConsoleLayout>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-violet-200/70">Agents</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Agent runs</h1>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {runs.map((run) => (
            <article key={run.id} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-violet-100/70">{run.role}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/45">{run.status}</span>
              </div>
              <h2 className="text-lg font-bold">{run.sessionName}</h2>
              <p className="mt-3 text-sm leading-7 text-white/50">{run.summary}</p>
              <code className="mt-4 block text-xs text-cyan-100/55">{run.briefPath}</code>
            </article>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
