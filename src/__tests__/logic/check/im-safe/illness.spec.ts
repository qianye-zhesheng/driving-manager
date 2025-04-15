import { Illness } from '../../../../logic/check/im-safe/illness'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('Illnessコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new Illness(-1)).toThrowError('Invalid value: -1')
  })
})

describe('Illness.getLimitationのテスト', () => {
  test('指定したvalueに対応するOptionのLimitationを返すこと', () => {
    const instance = new Illness(1)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})
