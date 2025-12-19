import { describe, vi, beforeEach, afterEach, test, expect } from 'vitest'
import { GetApi } from '../../../logic/api/get-api'
import { GetParameters } from '../../../logic/api/get-parameters'
import { Authenticator } from '../../../logic/auth/authenticator'

describe('GetApiのテスト', () => {
  const baseUrl = 'https://api.example.com/'
  const path = 'test-endpoint'
  const parameters = GetParameters.of({ key: 'value', foo: 'bar' })
  const apiUrl = `${baseUrl}${path}?key=value&foo=bar`
  const idToken = 'mocked-id-token'
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  }

  const responseBody = { data: 'mocked data' }

  let mockAuthenticator: unknown

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => responseBody,
    } as Response)

    vi.spyOn(GetParameters.prototype, 'toUrlQueryString').mockReturnValue('?key=value&foo=bar')

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
    const getApi = new GetApi(baseUrl, path, parameters)
    const response = await getApi.send()

    expect(response.statusCode).toBe(200)
    expect(response.successful).toBe(true)
    expect(response.body).toEqual(responseBody)
    expect(mockAuthenticator).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(GetParameters.prototype.toUrlQueryString).toHaveBeenCalledTimes(1)
  })
})
