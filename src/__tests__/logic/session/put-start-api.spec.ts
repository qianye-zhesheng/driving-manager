import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ApiResponse } from '../../../logic/api/api-response'
import { PutApi } from '../../../logic/api/put-api'
import { PutApiBuilder } from '../../../logic/api/put-api-builder'
import { PutStartApi } from '../../../logic/session/put-start-api'
import { DateOption, InputForm } from '../../../logic/session/input-form'
import { ApiParams } from '../../../logic/session/api-params'
import { createApp } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import App from '../../../App.vue'
import { useErrorStore } from '../../../stores/error'

const date = '2025-12-01'
const odometer = 3000

const inputForm: InputForm = {
  dateOption: DateOption.Today,
  date: undefined,
  odometer: odometer,
}

describe('PutStartApiのテスト', () => {
  let mockErrorStore: unknown

  let mockGetFormattedDate: unknown
  let mockGetOdometer: unknown

  beforeEach(() => {
    vi.restoreAllMocks()

    mockGetFormattedDate = vi.spyOn(ApiParams.prototype, 'getFormattedDate').mockReturnValue(date)
    mockGetOdometer = vi.spyOn(ApiParams.prototype, 'getOdometer').mockReturnValue(odometer)

    const app = createApp(App)

    const pinia = createTestingPinia({
      createSpy: vi.fn,
    })

    app.use(pinia)

    const error = useErrorStore()

    mockErrorStore = vi.spyOn(error, 'addError').mockImplementation((message: string) => {
      console.log(message)
    })
  })

  test('200が返ってきたらtrueを返すこと', async () => {
    const setBodySpy = vi.spyOn(PutApiBuilder.prototype, 'setBody')
    const mockSend = vi
      .spyOn(PutApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(200, true, {}))

    const result = await new PutStartApi(inputForm).put()

    expect(result).toBe(true)

    expect(setBodySpy).toHaveBeenCalledWith({
      date: date,
      odometer: odometer,
    })

    expect(mockSend).toHaveBeenCalledTimes(1)
    expect(mockGetFormattedDate).toHaveBeenCalledTimes(1)
    expect(mockGetOdometer).toHaveBeenCalledTimes(1)

    expect(mockErrorStore).toHaveBeenCalledTimes(0)
  })

  test('400が返ってきたら例外を投げること', async () => {
    const mockSend = vi
      .spyOn(PutApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(400, false, { message: 'Invalid Params' }))

    const api = new PutStartApi(inputForm)

    await expect(api.put()).rejects.toThrow('API error: Invalid Params')
    expect(mockSend).toHaveBeenCalledTimes(1)

    expect(mockGetFormattedDate).toHaveBeenCalledTimes(1)
    expect(mockGetOdometer).toHaveBeenCalledTimes(1)

    expect(mockErrorStore).toHaveBeenCalledTimes(0)
  })

  test('401が返ってきたら例外を投げること', async () => {
    const mockSend = vi
      .spyOn(PutApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(401, false, { message: 'Unauthorized' }))

    const api = new PutStartApi(inputForm)

    await expect(api.put()).rejects.toThrow('API error: Unauthorized')
    expect(mockSend).toHaveBeenCalledTimes(1)

    expect(mockGetFormattedDate).toHaveBeenCalledTimes(1)
    expect(mockGetOdometer).toHaveBeenCalledTimes(1)

    expect(mockErrorStore).toHaveBeenCalledTimes(0)
  })

  test('409が返ってきたらfalseを返すこと', async () => {
    const mockSend = vi
      .spyOn(PutApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(409, false, { message: 'Invalid params' }))

    const result = await new PutStartApi(inputForm).put()

    expect(result).toBe(false)
    expect(mockSend).toHaveBeenCalledTimes(1)

    expect(mockGetFormattedDate).toHaveBeenCalledTimes(1)
    expect(mockGetOdometer).toHaveBeenCalledTimes(1)

    expect(mockErrorStore).toHaveBeenCalledWith('Invalid params')
  })

  test('500が返ってきたら例外を投げること', async () => {
    const mockSend = vi
      .spyOn(PutApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(500, false, { message: 'Server error' }))

    const api = new PutStartApi(inputForm)

    await expect(api.put()).rejects.toThrow('API error: Server error')
    expect(mockSend).toHaveBeenCalledTimes(1)

    expect(mockGetFormattedDate).toHaveBeenCalledTimes(1)
    expect(mockGetOdometer).toHaveBeenCalledTimes(1)

    expect(mockErrorStore).toHaveBeenCalledTimes(0)
  })
})
