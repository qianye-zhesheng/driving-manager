import { describe, test, expect } from 'vitest'
import { OptionFinder } from '../../../../logic/check/common/option-finder'
import { Question } from '../../../../logic/check/common/interfaces'

describe('OptionFinder.exists()のテスト', () => {
  test('valueに該当するoptionがあればtrueを返す', () => {
    const instance = OptionFinder.of(mockQuestion)
    const actual = instance.exists(1)
    expect(actual).toBe(true)
  })

  test('valueに該当するoptionがなければfalseを返す', () => {
    const instance = OptionFinder.of(mockQuestion)
    const actual = instance.exists(0)
    expect(actual).toBe(false)
  })
})

describe('OptionFinder.doesNotExist()のテスト', () => {
  test('valueに該当するoptionがなければtrueを返す', () => {
    const instance = OptionFinder.of(mockQuestion)
    const actual = instance.doesNotExist(0)
    expect(actual).toBe(true)
  })

  test('valueに該当するoptionがあればfalseを返す', () => {
    const instance = OptionFinder.of(mockQuestion)
    const actual = instance.doesNotExist(3)
    expect(actual).toBe(false)
  })
})

describe('OptionFinder.findByValue()のテスト', () => {
  test('valueに該当するoptionがあればそのoptionを返す', () => {
    const instance = OptionFinder.of(mockQuestion)
    const actual = instance.findByValue(1)
    expect(actual.value).toBe(1)
  })

  test('valueに該当するoptionがなければ例外を投げる', () => {
    const instance = OptionFinder.of(mockQuestion)
    expect(() => {
      instance.findByValue(0)
    }).toThrowError('Invalid value: 0')
  })
})

const mockQuestion: Question = {
  text: 'Test Question',
  options: [
    { value: 1, label: 'Option 1', limitation: { text: '制限なし', level: 0 } },
    { value: 2, label: 'Option 2', limitation: { text: '制限あり', level: 1 } },
    { value: 3, label: 'Option 3', limitation: { text: '運行停止', level: 4 } },
  ],
}
