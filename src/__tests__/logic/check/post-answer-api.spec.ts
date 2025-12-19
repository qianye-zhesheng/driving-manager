import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ApiResponse } from '../../../logic/api/api-response'
import { PostApi } from '../../../logic/api/post-api'
import { PostApiBuilder } from '../../../logic/api/post-api-builder'
import type { ImSafeAnswer, WeatherAnswer } from '../../../stores/models/check-answer'
import { PostAnswerApi } from '../../../logic/check/post-answer-api'

const imSafeAnswer: ImSafeAnswer = {
  illness: 1,
  medication: 1,
  stress: 1,
  alcohol: 1,
  fatigue: 1,
  emotion: 1,
}

const weatherAnswer: WeatherAnswer = {
  wetRoad: 1,
  visibility: 1,
  icyRoad: 1,
  snow: 1,
}

const judgement: string = '制限なし'

describe('PostAnswerApiのテスト', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('200が返ってきたら何も例外を投げないこと', async () => {
    const setBodySpy = vi.spyOn(PostApiBuilder.prototype, 'setBody')
    const sendSpy = vi
      .spyOn(PostApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(200, true, {}))

    const api = new PostAnswerApi(imSafeAnswer, weatherAnswer, judgement)

    await expect(api.post()).resolves.not.toThrowError()

    expect(setBodySpy).toHaveBeenCalledWith({
      imSafeAnswer: imSafeAnswer,
      weatherAnswer: weatherAnswer,
      judgement: judgement,
    })

    expect(sendSpy).toHaveBeenCalledTimes(1)
  })

  test('401が返ってきたら例外を投げること', async () => {
    const spy = vi
      .spyOn(PostApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(401, false, { message: 'Unauthorized' }))

    const api = new PostAnswerApi(imSafeAnswer, weatherAnswer, judgement)

    await expect(api.post()).rejects.toThrow('API error: Unauthorized')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('409が返ってきたら例外を投げること', async () => {
    const spy = vi
      .spyOn(PostApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(409, false, { message: 'Invalid params' }))

    const api = new PostAnswerApi(imSafeAnswer, weatherAnswer, judgement)

    await expect(api.post()).rejects.toThrow('API error: Invalid params')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('500が返ってきたら例外を投げること', async () => {
    const spy = vi
      .spyOn(PostApi.prototype, 'send')
      .mockResolvedValue(new ApiResponse(500, false, { message: 'Server error' }))

    const api = new PostAnswerApi(imSafeAnswer, weatherAnswer, judgement)

    await expect(api.post()).rejects.toThrow('API error: Server error')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
