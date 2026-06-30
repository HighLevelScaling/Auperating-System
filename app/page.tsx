import { ArrowRight, CheckCircle2, Cpu, Globe2, Orbit, TerminalSquare } from 'lucide-react';
import { launchSequence, systemModules } from '@/lib/os-data';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] text-white">
      <section className="relative isolate min-h-screen px-6 py-8 md:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(116,92,255,0.35),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(0,255,194,0.18),transparent_24%),linear-gradient(135deg,#050506,#0e0d14_45%,#050506)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 pb-6 text-xs uppercase tracking-[0.35em] text-white/50">
          <div className="flex items-center gap-3 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 shadow-[0_0_40px_rgba(103,86,255,0.35)]">
              <Orbit className="h-4 w-4" />
            </span>
            Auperating System
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <span>Agent OS</span>
            <span>Vercel-First</span>
            <span>Hermes Powered</span>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-12 pb-20 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_#6ee7b7]" />
              AI OS Kernel Online
            </div>
            <h1 className="max-w-5xl text-6xl font-black tracking-[-0.08em] text-white md:text-8xl lg:text-9xl">
              The<br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
                Auperating
              </span>
              <br />System
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62 md:text-xl">
              An AI-native operating system for launching projects, coordinating autonomous agents, managing memory, brokering secrets, generating brands, and deploying products.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#modules" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-cyan-100">
                Explore OS Modules <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#sequence" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur transition hover:border-white/30 hover:bg-white/10">
                View Launch Sequence
              </a>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/70 p-5">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/45">
                  <TerminalSquare className="h-4 w-4 text-cyan-200" /> Mission Console
                </div>
                <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-emerald-200">Live</span>
              </div>
              <div className="space-y-3 font-mono text-sm text-white/70">
                <p><span className="text-cyan-200">auos</span> boot --mission "build company"</p>
                <p className="text-white/40">Loading Memory Kernel...</p>
                <p className="text-white/40">Checking GitHub + Vercel auth...</p>
                <p className="text-white/40">Starting Project Launch Swarm...</p>
                <p><span className="text-emerald-200">✓</span> environment/deployment agent ready</p>
                <p><span className="text-emerald-200">✓</span> secrets broker guarded</p>
                <p><span className="text-emerald-200">✓</span> brand studio ready</p>
                <p><span className="text-emerald-200">✓</span> backend memory planner online</p>
                <p><span className="text-violet-200">→</span> deploying intelligence layer...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">System Architecture</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">OS modules</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-white/50">Each module is designed to become a real service in the AI operating layer: observable, scoped, auditable, and deployable.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {systemModules.map((module) => {
            const Icon = module.icon;
            return (
              <article key={module.name} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-white/[0.06]">
                <div className="mb-8 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/8 text-cyan-100 ring-1 ring-white/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/45">{module.status}</span>
                </div>
                <h3 className="text-xl font-bold tracking-[-0.03em]">{module.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{module.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="sequence" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-200/20"><Cpu className="h-5 w-5" /></span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Boot Protocol</p>
              <h2 className="text-3xl font-black tracking-[-0.04em]">Launch sequence</h2>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {launchSequence.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-black">{index + 1}</span>
                <span className="text-sm text-white/70">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-6 py-10 text-xs uppercase tracking-[0.3em] text-white/35 md:flex-row md:items-center md:justify-between md:px-10">
        <span>© The Auperating System</span>
        <span className="flex items-center gap-2"><Globe2 className="h-4 w-4" /> Build. Operate. Deploy.</span>
      </footer>
    </main>
  );
}
