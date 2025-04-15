import { Visibility } from '../../../../logic/check/weather/visibility'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('Visibilityコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new Visibility(1.5, false)).toThrowError('Invalid value: 1.5')
  })
})

describe('Visibility.getLimitationのテスト-imSafeLimitationがfalseの場合', () => {
  test('合致したOptionのlimitationを返すこと', () => {
    const instance = new Visibility(2, false)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.LIMITED_LIGHT)
  })

  test('additionalLimitationがないOptionの場合、limitationを返すこと', () => {
    const instance = new Visibility(1, false)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})

describe('Visibility.getLimitationのテスト-imSafeLimitationがtrueの場合', () => {
  test('合致したOptionのadditionalLimitationを返すこと', () => {
    const instance = new Visibility(2, true)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.SUSPENDED)
  })

  test('additionalLimitationがないOptionの場合、limitationを返すこと', () => {
    const instance = new Visibility(1, true)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})
