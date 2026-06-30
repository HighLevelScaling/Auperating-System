import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/server/state';

export function GET() {
  return NextResponse.json({ projects: getProjects() });
}
