import { NextRequest, NextResponse } from 'next/server';
import { scanCredentials } from '@/lib/server/secrets-broker';
import { addCredentialRequirement } from '@/lib/server/state';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await scanCredentials();
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const credential = addCredentialRequirement(String(body.name ?? ''), body.required ?? true);
  const result = await scanCredentials();
  return NextResponse.json({ credential, scan: result }, { status: 201 });
}
