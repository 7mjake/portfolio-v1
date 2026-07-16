export type AppEnvironment = 'local' | 'preview' | 'staging' | 'production'

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function parseURL(name: string, value: string): URL {
  try {
    return new URL(value)
  } catch {
    throw new Error(`${name} must be a valid URL`)
  }
}

export function getAppEnvironment(): AppEnvironment {
  const value = process.env.APP_ENV || (process.env.NODE_ENV === 'development' ? 'local' : 'preview')
  if (!['local', 'preview', 'staging', 'production'].includes(value)) {
    throw new Error('APP_ENV must be local, preview, staging, or production')
  }
  return value as AppEnvironment
}

export function getServerURL(): string {
  const deploymentURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
  return parseURL(
    'NEXT_PUBLIC_SERVER_URL',
    deploymentURL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  ).origin
}

export function getPayloadEnvironment() {
  const appEnv = getAppEnvironment()
  const databaseURL = required('DATABASE_URL')
  const database = parseURL('DATABASE_URL', databaseURL)
  const stagingHost = process.env.STAGING_NEON_HOST
  const productionHost = process.env.PRODUCTION_NEON_HOST
  const blobHost = process.env.BLOB_PUBLIC_HOSTNAME
  const productionBlobHost = process.env.PRODUCTION_BLOB_HOSTNAME
  const email = appEnv === 'production'
    ? {
        fromAddress: required('EMAIL_FROM'),
        resendAPIKey: required('RESEND_API_KEY'),
      }
    : undefined

  if (appEnv === 'production') {
    if (productionHost && database.hostname !== productionHost) {
      throw new Error('Production must use the configured production Neon host')
    }
    if (blobHost && productionBlobHost && blobHost !== productionBlobHost) {
      throw new Error('Production must use the configured production Blob host')
    }
  } else {
    if (productionHost && database.hostname === productionHost) {
      throw new Error('Nonproduction environments cannot use the production Neon host')
    }
    if (stagingHost && database.hostname.replace('-pooler.', '.') !== stagingHost) {
      throw new Error('Nonproduction environments must use the staging Neon endpoint')
    }
    if (blobHost && productionBlobHost && blobHost === productionBlobHost) {
      throw new Error('Nonproduction environments cannot use the production Blob store')
    }
  }

  return {
    appEnv,
    databaseURL,
    payloadSecret: required('PAYLOAD_SECRET'),
    previewSecret: required('PREVIEW_SECRET'),
    serverURL: getServerURL(),
    useBlob: Boolean(process.env.VERCEL || process.env.USE_VERCEL_BLOB === 'true'),
    email,
  }
}
