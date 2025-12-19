import { describe, vi, beforeEach, afterEach, test, expect } from 'vitest'
import { PutApi } from '../../../logic/api/put-api'
import { Authenticator } from '../../../logic/auth/authenticator'

describe('PutApiのテスト', () => {
  const baseUrl = 'https://api.example.com/'
  const path = 'test-endpoint'
  const body = JSON.stringify({ key: 'value' })
  const apiUrl = `${baseUrl}${path}`
  const idToken = 'mocked-id-token'
  const request = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: body,
  }

  const responseBody = { data: 'mocked data' }

  let mockAuthenticator: unknown

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => responseBody,
    } as Response)

    mockAuthenticator = vi.spyOn(Authenticator, 'fetchIdToken').mockResolvedValue('mocked-id-token')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('正しくモック化できているかのテスト', async () => {
    const idToken: string = await Authenticator.fetchIdToken()
    expect(idToken).toBe('mocked-id-token')
    expect(mockAuthenticator).toHaveBeenCalledTimes(1)

    const response = await fetch(apiUrl, request)
    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
    expect(await response.json()).toEqual(responseBody)
    expect(fetch).toHaveBeenCalledWith(apiUrl, request)
  })

  test('sendがApiResponseを返すこと', async () => {
    const putApi = new PutApi(baseUrl, path, body)
    const response = await putApi.send()

    expect(response.statusCode).toBe(200)
    expect(response.successful).toBe(true)
    expect(response.body).toEqual(responseBody)
    expect(mockAuthenticator).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
