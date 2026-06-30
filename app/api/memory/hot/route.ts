import { NextRequest, NextResponse } from 'next/server';
import { createMemoryEvent, getMemoryEvents } from '@/lib/server/state';

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

export async function POST(request: NextRequest) {
  const body = await request.json();
  const event = createMemoryEvent({
    scope: body.scope,
    scopeId: body.scopeId,
    kind: body.kind,
    content: String(body.content ?? 'Memory event recorded through AUOS API.'),
    source: body.source,
    trust: body.trust,
    tags: body.tags,
  });
  return NextResponse.json({ event }, { status: 201 });
}
