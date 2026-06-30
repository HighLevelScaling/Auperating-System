import { NextRequest, NextResponse } from 'next/server';
import { createDeployment, getDeployments } from '@/lib/server/state';

export function GET() {
  return NextResponse.json({ deployments: getDeployments() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const deployment = createDeployment({
    projectId: String(body.projectId ?? 'auos'),
    provider: String(body.provider ?? 'vercel'),
    environment: String(body.environment ?? 'preview'),
    status: String(body.status ?? 'registered'),
    url: body.url,
    commitSha: body.commitSha,
    summary: body.summary,
  });
  return NextResponse.json({ deployment }, { status: 201 });
}
