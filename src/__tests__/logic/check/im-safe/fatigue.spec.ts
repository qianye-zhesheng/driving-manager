import { Fatigue } from '../../../../logic/check/im-safe/fatigue'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('Fatigueコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new Fatigue(1.5)).toThrowError('Invalid value: 1.5')
  })
})

describe('Fatigue.getLimitationのテスト', () => {
  test('指定したvalueに対応するOptionのLimitationを返すこと', () => {
    const instance = new Fatigue(2)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.LIMITED_MODERATE)
  })
})
