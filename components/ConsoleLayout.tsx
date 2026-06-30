import Link from 'next/link';
import { ReactNode } from 'react';
import { Activity, Bot, DatabaseZap, Gauge, Home, KeyRound, Rocket, Workflow } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/mission-control', label: 'Mission Control', icon: Gauge },
  { href: '/projects', label: 'Projects', icon: Workflow },
  { href: '/agents', label: 'Agents', icon: Bot },
  { href: '/credentials', label: 'Credentials', icon: KeyRound },
  { href: '/deployments', label: 'Deployments', icon: Rocket },
  { href: '/memory', label: 'Memory', icon: DatabaseZap },
];

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(103,232,249,0.15),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(217,70,239,0.14),transparent_28%),linear-gradient(135deg,#050506,#0e0d14)]" />
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[1.5rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl lg:sticky lg:top-6">
          <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-200/10 text-cyan-100 ring-1 ring-cyan-200/20">
              <Activity className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-black tracking-[-0.03em]">AUOS Console</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/35">local kernel</div>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl border border-white/0 px-3 py-3 text-sm text-white/58 transition hover:border-white/10 hover:bg-white/[0.055] hover:text-white">
                  <Icon className="h-4 w-4 text-cyan-100/70" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
