import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { apiClient } from './apiClient'
import * as UserCtx from '../context/UserContext'

const originalFetch = global.fetch

describe('apiClient', () => {
  beforeEach(() => {
    vi.spyOn(UserCtx, 'getCurrentContext').mockReturnValue({ role: 'guest', username: 'alice', tenant: 't1' })
    // mock fetch
    // @ts-expect-error assign
    global.fetch = vi.fn(async (_input: RequestInfo, init?: RequestInit) => {
      const headers = new Headers(init?.headers as any)
      expect(headers.get('x-role')).toBe('guest')
      expect(headers.get('x-username')).toBe('alice')
      expect(headers.get('x-tenant')).toBe('t1')
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } })
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    global.fetch = originalFetch as any
  })

  it('đính kèm headers context cho GET', async () => {
    const res = await apiClient.get<{ ok: boolean }>('/me')
    expect(res.ok).toBe(true)
  })
})
