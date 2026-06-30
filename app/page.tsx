import { ArrowRight, CheckCircle2, Cpu, Globe2, Orbit, TerminalSquare } from 'lucide-react';
import { autonomousModes, frontierCapabilities, launchSequence, memoryRecoveryCapabilities, memoryRecoveryPipeline, problemSolvingCapabilities, problemSolvingLoop, systemModules } from '@/lib/os-data';

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
              <a href="#problem-solving" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur transition hover:border-white/30 hover:bg-white/10">
                Problem Solver
              </a>
              <a href="#memory-recovery" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur transition hover:border-cyan-200/40 hover:bg-cyan-200/15">
                Instant Memory
              </a>
              <a href="#frontier" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-fuchsia-200/20 bg-fuchsia-200/10 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-100 backdrop-blur transition hover:border-fuchsia-200/40 hover:bg-fuchsia-200/15">
                Frontier Mode
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


      <section id="problem-solving" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet-200/70">Reasoning Engine</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Problem solving capabilities</h2>
          </div>
          <p className="text-sm leading-7 text-white/55">
            AUOS treats problems like operating-system incidents: intake, diagnosis, decomposition, delegation, verification, memory, and continuous improvement. The system does not just answer questions — it turns uncertainty into executable work.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {problemSolvingCapabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article key={capability.name} className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 transition hover:border-violet-200/40 hover:bg-white/[0.055]">
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-300/10 text-violet-100 ring-1 ring-violet-200/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-violet-200/15 bg-violet-200/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-violet-100/70">
                    {capability.mode}
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-[-0.03em]">{capability.name}</h3>
                <p className="mt-3 min-h-28 text-sm leading-7 text-white/50">{capability.description}</p>
                <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                  {capability.outputs.map((output) => (
                    <div key={output} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-200" />
                      {output}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-400/[0.12] via-white/[0.04] to-cyan-300/[0.08] p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Closed Loop</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">From problem to verified outcome</h3>
            </div>
            <span className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-emerald-100">
              Evidence-backed execution
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {problemSolvingLoop.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/35">Step {String(index + 1).padStart(2, '0')}</div>
                <p className="text-sm leading-6 text-white/68">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="memory-recovery" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="rounded-[2.25rem] border border-cyan-200/10 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.16),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Memory Recovery Layer</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Near-instant recall</h2>
            </div>
            <p className="text-sm leading-7 text-white/58">
              AUOS memory recovery is designed like a multi-tier cache: hot project state returns instantly, semantic search recovers deeper context in milliseconds, and cold archives stay available without slowing the active agent loop.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {memoryRecoveryCapabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article key={capability.name} className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 transition hover:border-cyan-200/40 hover:bg-cyan-200/[0.055]">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-200/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-cyan-200/15 bg-cyan-200/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100/75">
                      {capability.target}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-[-0.03em]">{capability.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/50">{capability.description}</p>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs uppercase tracking-[0.18em] text-white/42">
                    {capability.mechanism}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">Recovery SLA</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ['Hot context', '< 50ms'],
                  ['Decision recall', '< 100ms'],
                  ['Semantic recall', '< 150ms'],
                  ['Agent handoff', '< 200ms'],
                  ['Snapshot resume', '< 250ms'],
                  ['Cold archive', '< 1s'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="text-2xl font-black tracking-[-0.05em] text-white">{value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/35">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Pipeline</p>
              <div className="mt-6 grid gap-2 md:grid-cols-2">
                {memoryRecoveryPipeline.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-100 text-[10px] font-black text-black">{index + 1}</span>
                    <p className="text-sm leading-6 text-white/62">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="frontier" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-fuchsia-200/15 bg-[#08050d] p-6 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(217,70,239,0.2),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(103,232,249,0.14),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(110,231,183,0.12),transparent_30%)]" />
          <div className="relative">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-200/70">Frontier Functionality</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] md:text-6xl">Things that should feel impossible</h2>
              </div>
              <p className="text-sm leading-7 text-white/58">
                AUOS is designed to evolve from a dashboard into an autonomous operating layer: it can imagine options, simulate consequences, launch specialized workers, heal itself, transfer lessons between projects, and turn products into revenue systems.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {frontierCapabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <article key={capability.name} className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-fuchsia-200/35 hover:bg-white/[0.06]">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-fuchsia-300/10 text-fuchsia-100 ring-1 ring-fuchsia-200/20">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-fuchsia-200/15 bg-fuchsia-200/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-fuchsia-100/72">
                        {capability.horizon}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-[-0.035em]">{capability.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/52">{capability.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {capability.primitives.map((primitive) => (
                        <span key={primitive} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/45">
                          {primitive}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-6 md:p-8">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">Autonomous Modes</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">Observe → Imagine → Simulate → Execute → Evolve</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                  Continuous compounding loop
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-5">
                {autonomousModes.map((item, index) => (
                  <div key={item.mode} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-black text-black">{index + 1}</span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">mode</span>
                    </div>
                    <h4 className="font-bold tracking-[-0.03em] text-white">{item.mode}</h4>
                    <p className="mt-2 text-xs leading-6 text-white/48">{item.promise}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
