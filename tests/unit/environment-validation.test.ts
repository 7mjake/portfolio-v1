import { describe, expect, it } from 'vitest'
import { validateDatabasePair, validateResourceIsolation } from '../../scripts/environment-validation.mjs'

const staging = {
  APP_ENV: 'staging',
  DATABASE_URL: 'postgres://user:secret@ep-stage-pooler.us-east-2.aws.neon.tech/site?sslmode=require',
  DATABASE_URL_UNPOOLED: 'postgres://user:secret@ep-stage.us-east-2.aws.neon.tech/site?sslmode=require',
  STAGING_NEON_HOST: 'ep-stage.us-east-2.aws.neon.tech',
  PRODUCTION_NEON_HOST: 'ep-production.us-east-2.aws.neon.tech',
  PAYLOAD_SECRET: 'secret', PREVIEW_SECRET: 'preview', NEXT_PUBLIC_SERVER_URL: 'https://stage.example.com',
  BLOB_PUBLIC_HOSTNAME: 'staging.public.blob.vercel-storage.com',
  PRODUCTION_BLOB_HOSTNAME: 'production.public.blob.vercel-storage.com',
}

describe('environment safeguards', () => {
  it('accepts matching pooled and direct staging URLs', () => expect(validateResourceIsolation(staging).directHost).toBe(staging.STAGING_NEON_HOST))
  it('requires the unpooled URL', () => expect(() => validateDatabasePair({ ...staging, DATABASE_URL_UNPOOLED: '' })).toThrow(/DATABASE_URL_UNPOOLED/))
  it('rejects a pooled migration URL', () => expect(() => validateDatabasePair({ ...staging, DATABASE_URL_UNPOOLED: staging.DATABASE_URL })).toThrow(/direct Neon/))
  it('rejects mismatched endpoints', () => expect(() => validateDatabasePair({ ...staging, DATABASE_URL_UNPOOLED: staging.DATABASE_URL_UNPOOLED.replace('ep-stage', 'ep-other') })).toThrow(/same Neon endpoint/))
  it('rejects production Blob in staging', () => expect(() => validateResourceIsolation({ ...staging, BLOB_PUBLIC_HOSTNAME: staging.PRODUCTION_BLOB_HOSTNAME })).toThrow(/production Blob/))
  it('requires password-recovery email settings in production', () => expect(() => validateResourceIsolation({
    ...staging,
    APP_ENV: 'production',
    DATABASE_URL: staging.DATABASE_URL.replace('ep-stage', 'ep-production'),
    DATABASE_URL_UNPOOLED: staging.DATABASE_URL_UNPOOLED.replace('ep-stage', 'ep-production'),
    BLOB_PUBLIC_HOSTNAME: staging.PRODUCTION_BLOB_HOSTNAME,
  })).toThrow(/EMAIL_FROM/))
})
