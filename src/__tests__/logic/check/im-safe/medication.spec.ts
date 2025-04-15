import { Medication } from '../../../../logic/check/im-safe/medication'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('Medicationコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new Medication(0)).toThrowError('Invalid value: 0')
  })
})

describe('Medication.getLimitationのテスト', () => {
  test('指定したvalueに対応するOptionのLimitationを返すこと', () => {
    const instance = new Medication(2)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.SUSPENDED)
  })
})
