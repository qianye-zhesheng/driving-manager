import { ImSafeChecker } from '../../../../logic/check/im-safe/im-safe-checker'
import { LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'

describe('ImSafeChecker.executeCheckのテスト', () => {
  test('LIMITATION_HEAVYを返すこと', () => {
    const instance = new ImSafeChecker({
      illness: 1,
      medication: 1,
      stress: 2,
      alcohol: 1,
      fatigue: 1,
      emotion: 1,
    })
    const actual = instance.executeCheck().getLimitation().level
    expect(actual).toBe(LimitationLevel.LIMITED_HEAVY)
  })
})

describe('ImSafeChecker.executeCheckのテスト', () => {
  test('LIMITATION_MODERATEを返すこと', () => {
    const instance = new ImSafeChecker({
      illness: 1,
      medication: 1,
      stress: 1,
      alcohol: 1,
      fatigue: 2,
      emotion: 1,
    })
    const actual = instance.executeCheck().getLimitation().level
    expect(actual).toBe(LimitationLevel.LIMITED_MODERATE)
  })
})

describe('ImSafeChecker.executeCheckのテスト', () => {
  test('LIMITATION_NONEを返すこと', () => {
    const instance = new ImSafeChecker({
      illness: 1,
      medication: 1,
      stress: 1,
      alcohol: 1,
      fatigue: 1,
      emotion: 1,
    })
    const actual = instance.executeCheck().getLimitation().level
    expect(actual).toBe(LimitationLevel.NONE)
  })
})

describe('ImSafeChecker.executeCheckのテスト', () => {
  test('LIMITATION_SUSPENDEDを返すこと', () => {
    const instance = new ImSafeChecker({
      illness: 2,
      medication: 2,
      stress: 2,
      alcohol: 2,
      fatigue: 2,
      emotion: 1,
    })
    const actual = instance.executeCheck().getLimitation().level
    expect(actual).toBe(LimitationLevel.SUSPENDED)
  })
})
