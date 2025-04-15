import { WeatherChecker } from '../../../../logic/check/weather/weather-checker'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'
import { ImSafeResult } from '../../../../logic/check/im-safe/im-safe-result'
import { WeatherAnswer } from '../../../../stores/models/check-answer'

describe('WeatherChecker.コンストラクタのテスト', () => {
  test('imSafeResultがSUSPENDEDの場合、例外を投げること', () => {
    const imSafeResult = createImSafeResult(LimitationLevel.SUSPENDED)
    const inputAnswer: WeatherAnswer = { wetRoad: 1, visibility: 1, icyRoad: 1, snow: 1 }
    expect(() => new WeatherChecker(inputAnswer, imSafeResult)).toThrowError(
      'ImSafeResult is suspended',
    )
  })
})

describe('WeatherChecker.executeCheckのテスト', () => {
  test('imSafeResultがNONEの場合、それ以外の一番高い制限を返すこと', () => {
    const imSafeResult = createImSafeResult(LimitationLevel.NONE)
    const inputAnswer: WeatherAnswer = { wetRoad: 1, visibility: 2, icyRoad: 1, snow: 1 }
    const instance = new WeatherChecker(inputAnswer, imSafeResult)
    const actual = instance.executeCheck().level
    expect(actual).toBe(LimitationLevel.LIMITED_LIGHT)
  })

  test('imSafeResultが制限ありの場合、imSafeも含めて一番高い制限を返すこと', () => {
    const imSafeResult = createImSafeResult(LimitationLevel.LIMITED_MODERATE)
    const inputAnswer: WeatherAnswer = { wetRoad: 2, visibility: 2, icyRoad: 2, snow: 1 }
    const instance = new WeatherChecker(inputAnswer, imSafeResult)
    const actual = instance.executeCheck().level
    expect(actual).toBe(LimitationLevel.SUSPENDED)
  })

  test('imSafeResultが一番高い制限の場合、それを返すこと', () => {
    const imSafeResult = createImSafeResult(LimitationLevel.LIMITED_HEAVY)
    const inputAnswer: WeatherAnswer = { wetRoad: 1, visibility: 1, icyRoad: 1, snow: 1 }
    const instance = new WeatherChecker(inputAnswer, imSafeResult)
    const actual = instance.executeCheck().level
    expect(actual).toBe(LimitationLevel.LIMITED_HEAVY)
  })
})

function createImSafeResult(limitationLevel: LimitationLevel): ImSafeResult {
  return new ImSafeResult({ level: limitationLevel, text: 'text' })
}
