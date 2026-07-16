export function normalizeNeonHost(hostname) {
  return hostname.replace('-pooler.', '.')
}

export function validateDatabasePair(env) {
  if (!['staging', 'production'].includes(env.APP_ENV)) throw new Error('APP_ENV must be exactly staging or production')
  if (!env.DATABASE_URL) throw new Error('DATABASE_URL is required')
  if (!env.DATABASE_URL_UNPOOLED) throw new Error('DATABASE_URL_UNPOOLED is required')
  const runtime = new URL(env.DATABASE_URL)
  const direct = new URL(env.DATABASE_URL_UNPOOLED)
  if (!runtime.hostname.includes('-pooler.')) throw new Error('DATABASE_URL must use a Neon pooled hostname')
  if (direct.hostname.includes('-pooler.')) throw new Error('DATABASE_URL_UNPOOLED must use a direct Neon hostname')
  if (normalizeNeonHost(runtime.hostname) !== direct.hostname) throw new Error('Pooled and direct URLs must use the same Neon endpoint')
  if (runtime.pathname !== direct.pathname || runtime.username !== direct.username) throw new Error('Pooled and direct URLs must use the same database and user')
  const expectedHost = env.APP_ENV === 'production' ? env.PRODUCTION_NEON_HOST : env.STAGING_NEON_HOST
  if (!expectedHost) throw new Error(`${env.APP_ENV === 'production' ? 'PRODUCTION' : 'STAGING'}_NEON_HOST is required`)
  if (direct.hostname !== expectedHost) throw new Error(`Direct database host does not match APP_ENV=${env.APP_ENV}`)
  return { runtime, direct }
}

export function validateResourceIsolation(env) {
  const { runtime, direct } = validateDatabasePair(env)
  for (const name of ['PAYLOAD_SECRET', 'PREVIEW_SECRET', 'NEXT_PUBLIC_SERVER_URL', 'BLOB_PUBLIC_HOSTNAME', 'PRODUCTION_BLOB_HOSTNAME']) {
    if (!env[name]) throw new Error(`${name} is required`)
  }
  new URL(env.NEXT_PUBLIC_SERVER_URL)
  if (env.APP_ENV === 'production' && env.BLOB_PUBLIC_HOSTNAME !== env.PRODUCTION_BLOB_HOSTNAME) {
    throw new Error('Production must use the production Blob store')
  }
  if (env.APP_ENV === 'staging' && env.BLOB_PUBLIC_HOSTNAME === env.PRODUCTION_BLOB_HOSTNAME) {
    throw new Error('Staging cannot use the production Blob store')
  }
  if ((env.VERCEL || env.USE_VERCEL_BLOB === 'true') && !env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required when Blob storage is enabled')
  }
  return { runtimeHost: runtime.hostname, directHost: direct.hostname }
}
