import ConsoleLayout from '@/components/ConsoleLayout';
import { scanCredentials } from '@/lib/server/secrets-broker';

export const dynamic = 'force-dynamic';

export default async function CredentialsPage() {
  const scan = await scanCredentials();
  return (
    <ConsoleLayout>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">Secrets Broker</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Credential coverage</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">Safe mode: names and status only. Raw values are never rendered.</p>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {Object.entries(scan.summary).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-2xl font-black">{value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/35">{key}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-[1.4rem] border border-white/10">
          {scan.credentials.map((credential) => (
            <div key={credential.name} className="grid gap-3 border-b border-white/10 bg-black/25 p-4 text-sm last:border-b-0 md:grid-cols-[1fr_repeat(4,120px)]">
              <code className="text-cyan-100/75">{credential.name}</code>
              <span>local: {credential.localPresent ? 'yes' : 'no'}</span>
              <span>vercel: {credential.vercelProductionPresent ? 'yes' : 'no'}</span>
              <span>github: {credential.githubActionsPresent ? 'yes' : 'no'}</span>
              <span className="text-white/45">{credential.sourceHint}</span>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
