import { Limitation, LimitationLevel } from '../../../../logic/check/common/interfaces'
import { describe, test, expect } from 'vitest'
import { ImSafeResult } from '../../../../logic/check/im-safe/im-safe-result'

describe('ImSafeResult.getLimitationのテスト', () => {
  test('getLimitationでlimitationを返すこと', () => {
    const limitation: Limitation = {
      level: LimitationLevel.SUSPENDED,
      text: '運行停止',
    }
    const instance = new ImSafeResult(limitation)
    const actual = instance.getLimitation()
    expect(actual).toEqual(limitation)
  })
})

describe('ImSafeResult.isSuspendedのテスト', () => {
  test('SUSPENDEDのときにtrueを返すこと', () => {
    const limitation: Limitation = {
      level: LimitationLevel.SUSPENDED,
      text: '運行停止',
    }
    const instance = new ImSafeResult(limitation)
    const actual = instance.isSuspended()
    expect(actual).toBeTruthy()
  })

  test('SUSPENDEDではないときにfalseを返すこと', () => {
    const limitation: Limitation = {
      level: LimitationLevel.LIMITED_HEAVY,
      text: '運行制限あり',
    }
    const instance = new ImSafeResult(limitation)
    const actual = instance.isSuspended()
    expect(actual).toBeFalsy()
  })
})

describe('ImSafeResult.hasNoLimitationのテスト', () => {
  test('NONEのときにtrueを返すこと', () => {
    const limitation: Limitation = {
      level: LimitationLevel.NONE,
      text: '制限なし',
    }
    const instance = new ImSafeResult(limitation)
    const actual = instance.hasNoLimitation()
    expect(actual).toBeTruthy()
  })

  test('SUSPENDEDのときにfalseを返すこと', () => {
    const limitation: Limitation = {
      level: LimitationLevel.SUSPENDED,
      text: '運行停止',
    }
    const instance = new ImSafeResult(limitation)
    const actual = instance.hasNoLimitation()
    expect(actual).toBeFalsy()
  })
})

describe('ImSafeResult.hasLimitationのテスト', () => {
  test('NONEのときにfalseを返すこと', () => {
    const limitation: Limitation = {
      level: LimitationLevel.NONE,
      text: '制限なし',
    }
    const instance = new ImSafeResult(limitation)
    const actual = instance.hasLimitation()
    expect(actual).toBeFalsy()
  })

  test('SUSPENDEDのときにtrueを返すこと', () => {
    const limitation: Limitation = {
      level: LimitationLevel.SUSPENDED,
      text: '運行停止',
    }
    const instance = new ImSafeResult(limitation)
    const actual = instance.hasLimitation()
    expect(actual).toBeTruthy()
  })

  test('LIGHTのときにtrueを返すこと', () => {
    const limitation: Limitation = {
      level: LimitationLevel.LIMITED_LIGHT,
      text: '運行制限あり',
    }
    const instance = new ImSafeResult(limitation)
    const actual = instance.hasLimitation()
    expect(actual).toBeTruthy()
  })
})
