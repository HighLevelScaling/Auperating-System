import ConsoleLayout from '@/components/ConsoleLayout';
import { recordMemoryAction } from '@/app/actions';
import { getMemoryEvents } from '@/lib/server/state';

export const dynamic = 'force-dynamic';

export default function MemoryPage() {
  const events = getMemoryEvents();
  return (
    <ConsoleLayout>
      <div className="space-y-5">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Memory Kernel</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Hot memory</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">Record project facts, decisions, handoffs, and operational notes into the backend memory event stream.</p>
        </section>

        <form action={recordMemoryAction} className="rounded-[1.6rem] border border-cyan-200/15 bg-cyan-200/[0.045] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">Record Memory Event</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/60">Scope<input name="scope" defaultValue="project" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Scope ID<input name="scopeId" defaultValue="auos" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Kind<input name="kind" defaultValue="decision" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Tags<input name="tags" placeholder="architecture, agents" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Trust<input name="trust" defaultValue="0.85" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Source<input name="source" defaultValue="operator" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60 md:col-span-2">Content<textarea required name="content" rows={4} placeholder="Fact, decision, or handoff to preserve" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-cyan-100/40" /></label>
          </div>
          <button className="mt-5 rounded-2xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-cyan-100 active:scale-[0.98]">Save Memory</button>
        </form>

        <section className="space-y-4">
          {events.length === 0 ? <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-8 text-sm text-white/50">No memory events recorded yet.</div> : null}
          {events.map((event) => (
            <article key={event.id} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">{event.kind}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">trust {event.trust}</span>
              </div>
              <p className="text-sm leading-7 text-white/62">{event.content}</p>
              <div className="mt-3 text-xs text-white/35">{event.tags.join(' / ')}</div>
            </article>
          ))}
        </section>
      </div>
    </ConsoleLayout>
  );
}
