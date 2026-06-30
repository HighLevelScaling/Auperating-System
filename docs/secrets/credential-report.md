# Secrets / Credential Broker Report

Initial status: template created.

## Required Secret Names

- OPENROUTER_API_KEY
- ANTHROPIC_API_KEY
- OPENAI_API_KEY
- GOOGLE_API_KEY
- VERCEL_TOKEN
- GITHUB_TOKEN
- DATABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- NEON_API_KEY
- RESEND_API_KEY
- STRIPE_SECRET_KEY
- GHL_API_KEY

## Rules

- Report present/missing only.
- Never write raw values into docs.
- Use Vercel env and GitHub secrets for production/CI.
- Use local .env.local for development.
