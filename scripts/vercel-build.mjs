import { spawnSync } from 'node:child_process'

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', env: process.env })
  if (result.status !== 0) process.exit(result.status || 1)
}

run(process.execPath, ['scripts/validate-environment.mjs'])
const isProduction = process.env.VERCEL_ENV === 'production'
const isPersistentStage = process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_GIT_COMMIT_REF === 'stage'
if (isProduction || isPersistentStage) run(process.execPath, ['scripts/run-payload-migrations.mjs', 'migrate'])
run('npm', ['run', 'payload:generate-types'])
run('npm', ['run', 'lint'])
run('npm', ['run', 'typecheck'])
run('npm', ['run', 'build'])
