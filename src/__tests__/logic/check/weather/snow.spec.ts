import { Snow } from '../../../../logic/check/weather/snow'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('Snowコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new Snow(1.5, false)).toThrowError('Invalid value: 1.5')
  })
})

describe('Snow.getLimitationのテスト-imSafeLimitationがfalseの場合', () => {
  test('合致したOptionのlimitationを返すこと', () => {
    const instance = new Snow(2, false)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.SUSPENDED)
  })

  test('additionalLimitationがないOptionの場合、limitationを返すこと', () => {
    const instance = new Snow(1, false)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})

describe('Snow.getLimitationのテスト-imSafeLimitationがtrueの場合', () => {
  test('additionalLimitationがないOptionの場合、limitationを返すこと', () => {
    const instance = new Snow(1, true)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})
