import { AuthSessionIdToken } from '../../../logic/auth/auth-session-id-token'
import { type AuthSession } from 'aws-amplify/auth'
import { describe, test, expect } from 'vitest'

describe('AuthSessionIdTokenのテスト', () => {
  test('IDトークンが存在する場合、正しいトークンを返すこと', () => {
    const mockAuthSession: AuthSession = {
      tokens: {
        idToken: {
          toString: () => 'mock-id-token',
          payload: {
            sub: '1234567890',
            name: 'John Doe',
            email: 'test@example.com',
          },
        },
        accessToken: {
          payload: {
            sub: '1234567890',
            name: 'John Doe',
            email: 'test@example.com',
          },
        },
      },
    }

    const result = AuthSessionIdToken.of(mockAuthSession).get()
    expect(result).toBe('mock-id-token')
  })

  test('tokensがundefinedの場合、エラーをスローすること', () => {
    const mockAuthSession: AuthSession = {
      tokens: undefined,
    }
    expect(() => AuthSessionIdToken.of(mockAuthSession)).toThrow(
      'ID token not found in auth session',
    )
  })

  test('idTokenがundefinedの場合、エラーをスローすること', () => {
    const mockAuthSession: AuthSession = {
      tokens: {
        accessToken: {
          payload: {
            sub: '1234567890',
            name: 'John Doe',
            email: 'test@example.com',
          },
        },
      },
    }
    expect(() => AuthSessionIdToken.of(mockAuthSession)).toThrow(
      'ID token not found in auth session',
    )
  })
})
