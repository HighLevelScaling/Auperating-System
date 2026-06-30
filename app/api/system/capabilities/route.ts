import { NextResponse } from 'next/server';
import {
  autonomousModes,
  frontierCapabilities,
  memoryRecoveryCapabilities,
  problemSolvingCapabilities,
  systemModules,
} from '@/lib/os-data';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json({
    product: 'The Auperating System',
    abbreviation: 'AUOS',
    generatedAt: new Date(0).toISOString(),
    modules: systemModules.map(({ icon: _icon, ...module }) => module),
    problemSolving: problemSolvingCapabilities.map(({ icon: _icon, ...capability }) => capability),
    memoryRecovery: memoryRecoveryCapabilities.map(({ icon: _icon, ...capability }) => capability),
    frontier: frontierCapabilities.map(({ icon: _icon, ...capability }) => capability),
    autonomousModes,
  });
}
