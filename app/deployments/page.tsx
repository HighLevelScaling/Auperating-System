import ConsoleLayout from '@/components/ConsoleLayout';
import { getDeployments } from '@/lib/server/state';

export default function DeploymentsPage() {
  const deployments = getDeployments();
  return (
    <ConsoleLayout>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Deployments</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">Release monitor</h1>
        <div className="mt-8 grid gap-4">
          {deployments.map((deployment) => (
            <article key={deployment.id} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/35">{deployment.provider} / {deployment.environment}</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{deployment.status}</h2>
                  <p className="mt-2 text-sm text-white/50">{deployment.summary}</p>
                </div>
                <code className="text-xs text-cyan-100/65">{deployment.commitSha ?? 'no-sha'}</code>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
