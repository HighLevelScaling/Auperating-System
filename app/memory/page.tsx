import ConsoleLayout from '@/components/ConsoleLayout';
import { getMemoryEvents } from '@/lib/server/state';

export default function MemoryPage() {
  const events = getMemoryEvents();
  return (
    <ConsoleLayout>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Memory Kernel</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Hot memory</h1>
        <div className="mt-8 space-y-4">
          {events.map((event) => (
            <article key={event.id} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">{event.kind}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/35">trust {event.trust}</span>
              </div>
              <p className="text-sm leading-7 text-white/62">{event.content}</p>
              <div className="mt-3 text-xs text-white/35">{event.tags.join(' / ')}</div>
            </article>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
