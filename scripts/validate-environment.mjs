import { validateResourceIsolation } from './environment-validation.mjs'

try {
  const result = validateResourceIsolation(process.env)
  console.log(JSON.stringify({ ok: true, appEnv: process.env.APP_ENV, ...result }))
} catch (error) {
  console.error(`Environment validation failed: ${error instanceof Error ? error.message : 'unknown error'}`)
  process.exitCode = 1
}
