import { NextResponse } from 'next/server';
import { createAgentRun, createMemoryEvent } from '@/lib/server/state';
import { launchProjectSwarm } from '@/lib/server/swarm';

export const dynamic = 'force-dynamic';

type LaunchPayload = {
  projectPath?: string;
  projectName?: string;
  projectId?: string;
  mode?: 'new' | 'existing';
};

export async function POST(request: Request) {
  let payload: LaunchPayload = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const projectName = payload.projectName || 'The Auperating System';
  const projectId = payload.projectId || 'auos';

  try {
    const result = await launchProjectSwarm(payload);
    const run = createAgentRun({
      projectId,
      role: 'project-launch-swarm',
      status: 'completed',
      sessionName: `launch-swarm-${Date.now()}`,
      workdir: result.projectPath,
      briefPath: 'Project Launch Swarm',
      summary: `Launch swarm completed for ${projectName}. stdout bytes=${result.stdout.length}; stderr bytes=${result.stderr.length}.`,
      completedAt: new Date().toISOString(),
    });
    createMemoryEvent({
      kind: 'launch-swarm',
      content: run.summary,
      source: 'api',
      tags: ['swarm', 'agents', 'execution'],
    });
    return NextResponse.json({ ok: true, run, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to launch swarm';
    createMemoryEvent({
      kind: 'launch-swarm-error',
      content: `Launch swarm failed for ${projectName}: ${message}`,
      source: 'api',
      tags: ['swarm', 'error'],
      trust: 0.9,
    });
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
