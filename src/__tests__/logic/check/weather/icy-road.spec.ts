import { IcyRoad } from '../../../../logic/check/weather/icy-road'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('IcyRoadコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new IcyRoad(1.5, false)).toThrowError('Invalid value: 1.5')
  })
})

describe('IcyRoad.getLimitationのテスト-imSafeLimitationがfalseの場合', () => {
  test('合致したOptionのlimitationを返すこと', () => {
    const instance = new IcyRoad(2, false)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })

  test('additionalLimitationがないOptionの場合、limitationを返すこと', () => {
    const instance = new IcyRoad(1, false)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})

describe('IcyRoad.getLimitationのテスト-imSafeLimitationがtrueの場合', () => {
  test('合致したOptionのadditionalLimitationを返すこと', () => {
    const instance = new IcyRoad(2, true)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.SUSPENDED)
  })

  test('additionalLimitationがないOptionの場合、limitationを返すこと', () => {
    const instance = new IcyRoad(1, true)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})
