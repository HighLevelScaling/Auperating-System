import { NextRequest, NextResponse } from 'next/server';
import { createProject, getProjects } from '@/lib/server/state';

export function GET() {
  return NextResponse.json({ projects: getProjects() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const project = createProject({
    name: String(body.name ?? 'Untitled Project'),
    slug: body.slug,
    path: body.path,
    status: body.status,
    repoUrl: body.repoUrl,
    vercelProjectId: body.vercelProjectId,
    health: body.health,
    summary: body.summary,
  });
  return NextResponse.json({ project }, { status: 201 });
}
