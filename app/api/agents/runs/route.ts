import { NextResponse } from 'next/server';
import { getAgentRuns } from '@/lib/server/state';

export function GET() {
  return NextResponse.json({ runs: getAgentRuns() });
}
