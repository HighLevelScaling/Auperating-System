import ConsoleLayout from '@/components/ConsoleLayout';
import { registerDeploymentAction } from '@/app/actions';
import { getDeployments, getProjects } from '@/lib/server/state';

export const dynamic = 'force-dynamic';

export default function DeploymentsPage() {
  const deployments = getDeployments();
  const projects = getProjects();
  return (
    <ConsoleLayout>
      <div className="space-y-5">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Deployments</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Release monitor</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">Record deployment events, URLs, commits, and release health into the AUOS backend.</p>
        </section>

        <form action={registerDeploymentAction} className="rounded-[1.6rem] border border-emerald-200/15 bg-emerald-200/[0.045] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-emerald-100/70">Register Deployment</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/60">Project<select name="projectId" defaultValue="auos" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-emerald-100/40">{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
            <label className="grid gap-2 text-sm text-white/60">Provider<input name="provider" defaultValue="vercel" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-emerald-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Environment<input name="environment" defaultValue="preview" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-emerald-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Status<input name="status" defaultValue="registered" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-emerald-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">URL<input name="url" placeholder="https://preview.vercel.app" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-emerald-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Commit SHA<input name="commitSha" placeholder="2f7e84b" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-xs text-white outline-none focus:border-emerald-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60 md:col-span-2">Summary<textarea name="summary" rows={3} placeholder="Deployment evidence or notes" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-emerald-100/40" /></label>
          </div>
          <button className="mt-5 rounded-2xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-100 active:scale-[0.98]">Save Deployment</button>
        </form>

        <section className="grid gap-4">
          {deployments.length === 0 ? <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-8 text-sm text-white/50">No deployments recorded yet.</div> : null}
          {deployments.map((deployment) => (
            <article key={deployment.id} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/35">{deployment.provider} / {deployment.environment}</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{deployment.status}</h2>
                  <p className="mt-2 text-sm text-white/50">{deployment.summary}</p>
                  {deployment.url ? <a href={deployment.url} className="mt-3 block text-xs text-cyan-100/70">{deployment.url}</a> : null}
                </div>
                <code className="text-xs text-cyan-100/65">{deployment.commitSha ?? 'no-sha'}</code>
              </div>
            </article>
          ))}
        </section>
      </div>
    </ConsoleLayout>
  );
}
