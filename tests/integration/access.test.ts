import { describe, expect, it } from 'vitest'
import { authenticated } from '../../cms/access/authenticated'
import { publishedOrAuthenticated } from '../../cms/access/publishedOrAuthenticated'

describe('Payload access policies', () => {
  it('protects authenticated operations', () => {
    expect(authenticated({ req: { user: null } } as never)).toBe(false)
    expect(authenticated({ req: { user: { id: 1 } } } as never)).toBe(true)
  })
  it('limits anonymous project reads to published records', () => {
    expect(publishedOrAuthenticated({ req: { user: null } } as never)).toEqual({ _status: { equals: 'published' } })
    expect(publishedOrAuthenticated({ req: { user: { id: 1 } } } as never)).toBe(true)
  })
})
