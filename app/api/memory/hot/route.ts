import { NextResponse } from 'next/server';
import { getMemoryEvents } from '@/lib/server/state';

export function GET() {
  const events = getMemoryEvents();
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    recoveryTarget: '< 50ms hot context',
    events,
    summary: {
      total: events.length,
      highTrust: events.filter((event) => event.trust >= 0.9).length,
      kinds: [...new Set(events.map((event) => event.kind))],
    },
  });
}
