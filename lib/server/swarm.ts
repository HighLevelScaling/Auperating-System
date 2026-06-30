import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const LAUNCH_SWARM_SCRIPT = '/Users/kdot/Agent Files/project-launch-swarm/launch-swarm.sh';

export async function launchProjectSwarm(input: { projectPath?: string; projectName?: string; mode?: 'new' | 'existing' }) {
  const projectPath = input.projectPath || process.cwd();
  const projectName = input.projectName || 'The Auperating System';
  const mode = input.mode || 'existing';
  const { stdout, stderr } = await execFileAsync('bash', [LAUNCH_SWARM_SCRIPT, projectPath, projectName, mode], {
    cwd: projectPath,
    timeout: 30_000,
    maxBuffer: 1024 * 512,
  });
  return { stdout, stderr, projectPath, projectName, mode };
}
