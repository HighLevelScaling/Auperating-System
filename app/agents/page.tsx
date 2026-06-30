import ConsoleLayout from '@/components/ConsoleLayout';
import { registerAgentRunAction } from '@/app/actions';
import { getAgentRuns, getProjects } from '@/lib/server/state';

export const dynamic = 'force-dynamic';

export default function AgentsPage() {
  const runs = getAgentRuns();
  const projects = getProjects();
  return (
    <ConsoleLayout>
      <div className="space-y-5">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-200/70">Agents</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Agent runs</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">Register runtime events, handoffs, and agent outputs directly into the backend.</p>
        </section>

        <form action={registerAgentRunAction} className="rounded-[1.6rem] border border-violet-200/15 bg-violet-200/[0.045] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-violet-100/70">Register Agent Run</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/60">Project<select name="projectId" defaultValue="auos" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-violet-100/40">{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
            <label className="grid gap-2 text-sm text-white/60">Role<input required name="role" placeholder="backend-memory" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-violet-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Status<input name="status" defaultValue="ready" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-violet-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Session name<input name="sessionName" placeholder="agent-session-name" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-violet-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60 md:col-span-2">Brief path<input name="briefPath" placeholder="docs/product/mvp-plan.md" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-xs text-white outline-none focus:border-violet-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60 md:col-span-2">Summary<textarea required name="summary" rows={3} placeholder="Evidence-backed agent output" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-violet-100/40" /></label>
          </div>
          <button className="mt-5 rounded-2xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-violet-100 active:scale-[0.98]">Save Agent Run</button>
        </form>

        <section className="grid gap-4 lg:grid-cols-3">
          {runs.length === 0 ? <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-8 text-sm text-white/50 lg:col-span-3">No agent runs recorded yet.</div> : null}
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
        </section>
      </div>
    </ConsoleLayout>
  );
}
