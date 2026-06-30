import ConsoleLayout from '@/components/ConsoleLayout';
import { addCredentialRequirementAction } from '@/app/actions';
import { scanCredentials } from '@/lib/server/secrets-broker';

export const dynamic = 'force-dynamic';

export default async function CredentialsPage() {
  const scan = await scanCredentials();
  return (
    <ConsoleLayout>
      <div className="space-y-5">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">Secrets Broker</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Credential coverage</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">Safe mode: names and status only. Raw values are never rendered, stored in memory, or committed.</p>
        </section>

        <form action={addCredentialRequirementAction} className="rounded-[1.6rem] border border-emerald-200/15 bg-emerald-200/[0.045] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-emerald-100/70">Add Credential Requirement</div>
          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_180px]">
            <label className="grid gap-2 text-sm text-white/60">Secret name<input required name="name" placeholder="VERCEL_TOKEN" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-white outline-none focus:border-emerald-100/40" /></label>
            <label className="grid gap-2 text-sm text-white/60">Required<select name="required" defaultValue="true" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-emerald-100/40"><option value="true">true</option><option value="false">false</option></select></label>
          </div>
          <button className="mt-5 rounded-2xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-100 active:scale-[0.98]">Track Secret</button>
        </form>

        <section className="grid gap-3 md:grid-cols-4">
          {Object.entries(scan.summary).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="font-mono text-2xl font-black">{value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/35">{key}</div>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-[1.4rem] border border-white/10">
          {scan.credentials.map((credential) => (
            <div key={credential.name} className="grid gap-3 border-b border-white/10 bg-black/25 p-4 text-sm last:border-b-0 md:grid-cols-[1fr_repeat(4,120px)]">
              <code className="text-cyan-100/75">{credential.name}</code>
              <span>local: {credential.localPresent ? 'yes' : 'no'}</span>
              <span>vercel: {credential.vercelProductionPresent ? 'yes' : 'no'}</span>
              <span>github: {credential.githubActionsPresent ? 'yes' : 'no'}</span>
              <span className="text-white/45">{credential.sourceHint}</span>
            </div>
          ))}
        </section>
      </div>
    </ConsoleLayout>
  );
}
