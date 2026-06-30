import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { getCredentialSeed, type CredentialStatus } from './state';

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();

function parseEnvExample() {
  const envPath = path.join(ROOT, '.env.example');
  if (!fs.existsSync(envPath)) return [];
  return fs
    .readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => line.split('=')[0]?.trim())
    .filter((name): name is string => Boolean(name));
}

async function listVercelEnvNames() {
  try {
    const { stdout } = await execFileAsync('vercel', ['env', 'ls'], {
      cwd: ROOT,
      timeout: 8_000,
      maxBuffer: 1024 * 256,
    });
    const names = new Set<string>();
    for (const line of stdout.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]{2,})\s+/);
      if (match) names.add(match[1]);
    }
    return { available: true, names: [...names], error: null as string | null };
  } catch (error) {
    return { available: false, names: [] as string[], error: error instanceof Error ? error.message : 'vercel env ls failed' };
  }
}

async function listGithubSecretNames() {
  try {
    const { stdout } = await execFileAsync('gh', ['secret', 'list'], {
      cwd: ROOT,
      timeout: 8_000,
      maxBuffer: 1024 * 256,
    });
    const names = new Set<string>();
    for (const line of stdout.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]{2,})\b/);
      if (match) names.add(match[1]);
    }
    return { available: true, names: [...names], error: null as string | null };
  } catch (error) {
    return { available: false, names: [] as string[], error: error instanceof Error ? error.message : 'gh secret list failed' };
  }
}

export async function scanCredentials() {
  const now = new Date().toISOString();
  const envNames = parseEnvExample();
  const seed = getCredentialSeed();
  const knownNames = [...new Set([...envNames, ...seed.map((item) => item.name)])].sort();
  const vercel = await listVercelEnvNames();
  const github = await listGithubSecretNames();
  const vercelNames = new Set(vercel.names);
  const githubNames = new Set(github.names);

  const statuses: CredentialStatus[] = knownNames.map((name) => {
    const seeded = seed.find((item) => item.name === name);
    const localPresent = Boolean(process.env[name]);
    const vercelPresent = vercelNames.has(name);
    const githubPresent = githubNames.has(name);
    return {
      name,
      required: seeded?.required ?? false,
      localPresent,
      vercelProductionPresent: vercelPresent,
      vercelPreviewPresent: vercelPresent,
      githubActionsPresent: githubPresent,
      sourceHint: localPresent ? 'local-env' : vercelPresent ? 'vercel' : githubPresent ? 'github' : 'missing',
      lastCheckedAt: now,
    };
  });

  return {
    generatedAt: now,
    safeMode: 'names-and-status-only',
    checks: {
      envExample: { available: envNames.length > 0, count: envNames.length },
      vercel: { available: vercel.available, error: vercel.error },
      github: { available: github.available, error: github.error },
    },
    credentials: statuses,
    summary: {
      total: statuses.length,
      localPresent: statuses.filter((item) => item.localPresent).length,
      vercelPresent: statuses.filter((item) => item.vercelProductionPresent || item.vercelPreviewPresent).length,
      githubPresent: statuses.filter((item) => item.githubActionsPresent).length,
      missing: statuses.filter((item) => item.sourceHint === 'missing').length,
    },
  };
}
