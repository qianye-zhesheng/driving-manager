import { Alcohol } from '../../../../logic/check/im-safe/alcohol'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('Alcoholコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new Alcohol(1.5)).toThrowError('Invalid value: 1.5')
  })
})

describe('Alcohol.getLimitationのテスト', () => {
  test('指定したvalueに対応するOptionのLimitationを返すこと', () => {
    const instance = new Alcohol(2)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.SUSPENDED)
  })
})
