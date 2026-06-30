import ConsoleLayout from '@/components/ConsoleLayout';
import { getProjects } from '@/lib/server/state';

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <ConsoleLayout>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Projects</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Project registry</h1>
        <div className="mt-8 grid gap-4">
          {projects.map((project) => (
            <article key={project.id} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.04em]">{project.name}</h2>
                  <p className="mt-2 text-sm text-white/50">{project.summary}</p>
                  <code className="mt-3 block text-xs text-cyan-100/65">{project.path}</code>
                </div>
                <div className="rounded-2xl border border-emerald-200/20 bg-emerald-200/10 px-4 py-3 text-center">
                  <div className="text-2xl font-black">{project.health ?? 0}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-100/70">health</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
