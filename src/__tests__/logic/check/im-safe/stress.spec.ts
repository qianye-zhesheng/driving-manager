import { Stress } from '../../../../logic/check/im-safe/stress'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('Stressコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new Stress(1.5)).toThrowError('Invalid value: 1.5')
  })
})

describe('Stress.getLimitationのテスト', () => {
  test('指定したvalueに対応するOptionのLimitationを返すこと', () => {
    const instance = new Stress(2)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.LIMITED_HEAVY)
  })
})
