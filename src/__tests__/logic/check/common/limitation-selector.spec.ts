import { describe, test, expect } from 'vitest'
import { LimitationSelector } from '../../../../logic/check/common/limitation-selector'
import { Answer, LimitationLevel } from '../../../../logic/check/common/interfaces'

describe('LimitationSelector.selectHighestLimitation()のテスト', () => {
  test('すべてのAnswerのLimitationLevelがNONEのとき、NONEを返す', () => {
    const mockAnswer = {
      getLimitation: () => ({ level: LimitationLevel.NONE, text: '制限なし' }),
    }
    const answers = [mockAnswer, mockAnswer]
    const instance = LimitationSelector.from(answers)
    const actual = instance.selectHighestLimitation()
    expect(actual.level).toBe(LimitationLevel.NONE)
  })

  test('すべてのAnswerのLimitationLevelがLIMITED_LIGHTのとき、LIMITED_LIGHTを返す', () => {
    const mockAnswer = {
      getLimitation: () => ({ level: LimitationLevel.LIMITED_LIGHT, text: '制限あり' }),
    }
    const answers = [mockAnswer, mockAnswer]
    const instance = LimitationSelector.from(answers)
    const actual = instance.selectHighestLimitation()
    expect(actual.level).toBe(LimitationLevel.LIMITED_LIGHT)
  })

  test('LimitationLevelがNONE, LIGHT, SUSPENDEDのとき、SUSPENDEDを返す', () => {
    const mockAnswer1 = {
      getLimitation: () => ({ level: LimitationLevel.SUSPENDED, text: '運行停止' }),
    }

    const mockAnswer2 = {
      getLimitation: () => ({ level: LimitationLevel.LIMITED_LIGHT, text: '制限あり' }),
    }
    const mockAnswer3 = {
      getLimitation: () => ({ level: LimitationLevel.NONE, text: '制限なし' }),
    }
    const answers = [mockAnswer1, mockAnswer2, mockAnswer3]
    const instance = LimitationSelector.from(answers)
    const actual = instance.selectHighestLimitation()
    expect(actual.level).toBe(LimitationLevel.SUSPENDED)
  })

  test('answerが1つだけのとき、そのAnswerのLimitationLevelを返す', () => {
    const mockAnswer = {
      getLimitation: () => ({ level: LimitationLevel.LIMITED_MODERATE, text: '制限あり' }),
    }
    const answers = [mockAnswer]
    const instance = LimitationSelector.from(answers)
    const actual = instance.selectHighestLimitation()
    expect(actual.level).toBe(LimitationLevel.LIMITED_MODERATE)
  })

  test('answerが空のとき、fromで例外を投げる', () => {
    const answers: ReadonlyArray<Answer> = []

    expect(() => {
      LimitationSelector.from(answers)
    }).toThrowError('answers is empty')
  })
})
