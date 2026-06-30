# Auperating System Architecture Map

## Layers

1. Interface Layer
   - Dashboard
   - Command palette
   - Agent console
   - Project cards
   - Deployment/status views

2. Agent Runtime Layer
   - Hermes process launcher
   - tmux/session orchestration
   - role-specific prompts
   - swarm coordination

3. Tool Bus Layer
   - Terminal
   - GitHub
   - Vercel
   - Browser/web
   - File system
   - GHL/custom business CLIs
   - Image generation

4. Memory Kernel
   - Project context
   - User preferences
   - Agent outputs
   - Decisions and history
   - Scoped memory boundaries

5. Secrets Broker
   - Detect required env vars
   - Check local/project/Vercel/GitHub availability
   - Maintain .env.example
   - Push available secrets safely
   - Report missing credentials without values

6. Deployment Layer
   - Vercel projects
   - Preview/prod deploys
   - Domains
   - Environment synchronization
   - Build verification

7. Brand/Product Layer
   - Logo generation prompts
   - Font systems
   - Visual variations
   - Product positioning
