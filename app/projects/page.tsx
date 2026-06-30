import ConsoleLayout from '@/components/ConsoleLayout';
import { registerProjectAction } from '@/app/actions';
import { getProjects } from '@/lib/server/state';

export const dynamic = 'force-dynamic';

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <ConsoleLayout>
      <div className="space-y-5">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Projects</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Project registry</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">Frontend registrations now write into the backend JSON state and refresh Mission Control immediately.</p>
        </section>

        <form action={registerProjectAction} className="rounded-[1.6rem] border border-cyan-200/15 bg-cyan-200/[0.045] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">Register Project</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/60">Name<input required name="name" placeholder="Auperating System" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Slug<input name="slug" placeholder="auperating-system" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60 md:col-span-2">Path<input name="path" placeholder="/Users/kdot/repos/project" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-xs text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Repo URL<input name="repoUrl" placeholder="https://github.com/org/repo" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Status<input name="status" defaultValue="active" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60 md:col-span-2">Summary<textarea name="summary" rows={3} placeholder="What this project does" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
          </div>
          <button className="mt-5 rounded-2xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-cyan-100 active:scale-[0.98]">Save Project</button>
        </form>

        <section className="grid gap-4">
          {projects.length === 0 ? <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-8 text-sm text-white/50">No projects registered yet. Add one above to populate the backend state.</div> : null}
          {projects.map((project) => (
            <article key={project.id} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.04em]">{project.name}</h2>
                  <p className="mt-2 text-sm text-white/50">{project.summary}</p>
                  <code className="mt-3 block text-xs text-cyan-100/65">{project.path}</code>
                </div>
                <div className="rounded-2xl border border-emerald-200/20 bg-emerald-200/10 px-4 py-3 text-center">
                  <div className="font-mono text-2xl font-black">{project.health ?? 0}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-100/70">health</div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </ConsoleLayout>
  );
}
