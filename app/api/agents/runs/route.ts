import { NextRequest, NextResponse } from 'next/server';
import { createAgentRun, getAgentRuns } from '@/lib/server/state';

export function GET() {
  return NextResponse.json({ runs: getAgentRuns() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const run = createAgentRun({
    projectId: String(body.projectId ?? 'auos'),
    role: String(body.role ?? 'operator'),
    status: body.status,
    sessionName: body.sessionName,
    workdir: body.workdir,
    briefPath: body.briefPath,
    summary: String(body.summary ?? 'Agent run registered through AUOS API.'),
  });
  return NextResponse.json({ run }, { status: 201 });
}
