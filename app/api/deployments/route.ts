import { NextResponse } from 'next/server';
import { getDeployments } from '@/lib/server/state';

export function GET() {
  return NextResponse.json({ deployments: getDeployments() });
}
