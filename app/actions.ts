'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addCredentialRequirement,
  createAgentRun,
  createAgentRunFromForm,
  createDeploymentFromForm,
  createMemoryEvent,
  createMemoryEventFromForm,
  createProjectFromForm,
} from '@/lib/server/state';
import { launchProjectSwarm } from '@/lib/server/swarm';

function refreshConsole() {
  revalidatePath('/mission-control');
  revalidatePath('/projects');
  revalidatePath('/agents');
  revalidatePath('/credentials');
  revalidatePath('/deployments');
  revalidatePath('/memory');
}

export async function registerProjectAction(formData: FormData) {
  createProjectFromForm(formData);
  createMemoryEvent({
    kind: 'project-registered',
    content: `Project registered: ${String(formData.get('name') ?? 'Untitled Project')}`,
    tags: ['project', 'registry'],
  });
  refreshConsole();
  redirect('/projects');
}

export async function registerAgentRunAction(formData: FormData) {
  createAgentRunFromForm(formData);
  createMemoryEvent({
    kind: 'agent-run-registered',
    content: `Agent run registered: ${String(formData.get('role') ?? 'operator')}`,
    tags: ['agent', 'runtime'],
  });
  refreshConsole();
  redirect('/agents');
}

export async function registerDeploymentAction(formData: FormData) {
  createDeploymentFromForm(formData);
  createMemoryEvent({
    kind: 'deployment-registered',
    content: `Deployment registered: ${String(formData.get('provider') ?? 'vercel')} ${String(formData.get('environment') ?? 'preview')}`,
    tags: ['deployment', 'release'],
  });
  refreshConsole();
  redirect('/deployments');
}

export async function recordMemoryAction(formData: FormData) {
  createMemoryEventFromForm(formData);
  refreshConsole();
  redirect('/memory');
}

export async function addCredentialRequirementAction(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  if (name) {
    addCredentialRequirement(name, formData.get('required') !== 'false');
    createMemoryEvent({
      kind: 'credential-requirement',
      content: `Credential requirement added: ${name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')}`,
      tags: ['credential', 'secrets-broker'],
    });
  }
  refreshConsole();
  redirect('/credentials');
}

export async function launchSwarmAction(formData: FormData) {
  const projectPath = String(formData.get('projectPath') ?? process.cwd()).trim();
  const projectName = String(formData.get('projectName') ?? 'The Auperating System').trim();
  const mode = String(formData.get('mode') ?? 'existing') === 'new' ? 'new' : 'existing';

  try {
    const result = await launchProjectSwarm({ projectPath, projectName, mode });
    const run = createAgentRun({
      projectId: 'auos',
      role: 'project-launch-swarm',
      status: 'completed',
      sessionName: `launch-swarm-${Date.now()}`,
      workdir: result.projectPath,
      briefPath: 'Project Launch Swarm',
      summary: `Project Launch Swarm executed for ${projectName}. stdout bytes=${result.stdout.length}; stderr bytes=${result.stderr.length}.`,
      completedAt: new Date().toISOString(),
    });
    createMemoryEvent({
      kind: 'launch-swarm',
      content: run.summary,
      tags: ['swarm', 'agents', 'execution'],
    });
  } catch (error) {
    createMemoryEvent({
      kind: 'launch-swarm-error',
      content: `Project Launch Swarm failed for ${projectName}: ${error instanceof Error ? error.message : 'unknown error'}`,
      tags: ['swarm', 'error'],
      trust: 0.9,
    });
  }

  refreshConsole();
  redirect('/mission-control');
}
