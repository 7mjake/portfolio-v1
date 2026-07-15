import { spawn } from 'node:child_process'
import { Client } from 'pg'
import { validateDatabasePair } from './environment-validation.mjs'

const command = process.argv[2]
if (!['migrate', 'migrate:status'].includes(command)) {
  console.error('Usage: run-payload-migrations.mjs migrate|migrate:status')
  process.exit(2)
}

let pair
try {
  pair = validateDatabasePair(process.env)
} catch (error) {
  console.error(`Migration validation failed: ${error instanceof Error ? error.message : 'unknown error'}`)
  process.exit(1)
}

const client = new Client({ connectionString: pair.direct.toString() })
await client.connect()
try {
  await client.query('SELECT pg_advisory_lock(hashtext($1))', [`portfolio-payload-migrations-${process.env.APP_ENV}`])
  const cli = new URL('../node_modules/payload/bin.js', import.meta.url)
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cli.pathname, command], {
      env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL_UNPOOLED },
      stdio: 'inherit',
    })
    child.once('error', reject)
    child.once('exit', exitCode => resolve(exitCode ?? 1))
  })
  process.exitCode = code
} finally {
  await client.query('SELECT pg_advisory_unlock(hashtext($1))', [`portfolio-payload-migrations-${process.env.APP_ENV}`]).catch(() => undefined)
  await client.end()
}
