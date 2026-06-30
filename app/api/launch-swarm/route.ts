import { NextResponse } from 'next/server';
import { launchProjectSwarm } from '@/lib/server/swarm';

export const dynamic = 'force-dynamic';

type LaunchPayload = {
  projectPath?: string;
  projectName?: string;
  mode?: 'new' | 'existing';
};

export async function POST(request: Request) {
  let payload: LaunchPayload = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  try {
    const result = await launchProjectSwarm(payload);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to launch swarm',
      },
      { status: 500 },
    );
  }
}
