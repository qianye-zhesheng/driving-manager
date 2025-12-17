import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetCurrentInfoApi } from '../../../logic/dashboard/get-current-info-api'
import { GetApi } from '../../../logic/api/get-api'
import { ApiResponse } from '../../../logic/api/api-response'
import type { CurrentInfo } from '../../../logic/dashboard/current-info'
import { useLoadingStore } from '../../../stores/loading'
import { createApp } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import App from '../../../App.vue'

const currentInfo: CurrentInfo = {
  todaysCheck: {
    checkedAt: '2025-12-01T10:00:00+09:00',
    judgement: '運行停止',
  },
  activeSession: {
    date: '2025-12-01',
    startOdometer: 13000,
  },
}

describe('GetCurrentInfoApi', () => {
  let mockStartLoading
  let mockFinishLoading

  beforeEach(() => {
    vi.restoreAllMocks()

    const app = createApp(App)

    const pinia = createTestingPinia({
      createSpy: vi.fn,
    })

    app.use(pinia)

    const loading = useLoadingStore()

    mockStartLoading = vi.spyOn(loading, 'startLoading').mockImplementation(() => {})
    mockFinishLoading = vi.spyOn(loading, 'finishLoading').mockImplementation(() => {})
  })

  it('throws when response is 401', async () => {
    vi.spyOn(GetApi.prototype, 'send').mockResolvedValue(
      new ApiResponse(401, false, { message: 'Unauthorized' }),
    )

    const api = new GetCurrentInfoApi()

    await expect(api.get()).rejects.toThrow('API error: Unauthorized')
    expect(mockStartLoading).toHaveBeenCalledTimes(1)
    expect(mockFinishLoading).toHaveBeenCalledTimes(1)
  })

  it('throws when response is 500', async () => {
    vi.spyOn(GetApi.prototype, 'send').mockResolvedValue(
      new ApiResponse(500, false, { message: 'server error' }),
    )

    const api = new GetCurrentInfoApi()

    await expect(api.get()).rejects.toThrow('API error: server error')
    expect(mockStartLoading).toHaveBeenCalledTimes(1)
    expect(mockFinishLoading).toHaveBeenCalledTimes(1)
  })

  it('returns CurrentInfo when response is 200', async () => {
    vi.spyOn(GetApi.prototype, 'send').mockResolvedValue(new ApiResponse(200, true, currentInfo))

    const api = new GetCurrentInfoApi()

    await expect(api.get()).resolves.toEqual(currentInfo)
    expect(mockStartLoading).toHaveBeenCalledTimes(1)
    expect(mockFinishLoading).toHaveBeenCalledTimes(1)
  })

  it('予期せぬ例外が発生しても、finishLoadingが呼ばれること', async () => {
    vi.spyOn(GetApi.prototype, 'send').mockRejectedValue(new Error('unexpected error'))
    const api = new GetCurrentInfoApi()

    await expect(api.get()).rejects.toThrow('unexpected error')
    expect(mockStartLoading).toHaveBeenCalledTimes(1)
    expect(mockFinishLoading).toHaveBeenCalledTimes(1)
  })
})
