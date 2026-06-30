import { NextResponse } from 'next/server';
import { getSystemStatus } from '@/lib/server/state';

export function GET() {
  return NextResponse.json(getSystemStatus());
}
