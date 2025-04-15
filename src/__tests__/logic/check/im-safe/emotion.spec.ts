import { Emotion } from '../../../../logic/check/im-safe/emotion'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('Emotionコンストラクタのテスト', () => {
  test('Question.optionsに存在しないoption.valueで初期化するとエラーになること', () => {
    expect(() => new Emotion(1.5)).toThrowError('Invalid value: 1.5')
  })
})

describe('Emotion.getLimitationのテスト', () => {
  test('指定したvalueに対応するOptionのLimitationを返すこと', () => {
    const instance = new Emotion(1)
    const actual = instance.getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})
