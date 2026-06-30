import { NextResponse } from 'next/server';
import { scanCredentials } from '@/lib/server/secrets-broker';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await scanCredentials();
  return NextResponse.json(result);
}
