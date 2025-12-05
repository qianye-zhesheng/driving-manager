import { describe, it, expect } from 'vitest'
import { GetParameters } from '../../../logic/api/get-parameters'

describe('GetParameters', () => {
  it('emptyの場合、toUrlQueryStringは空の文字列を返す', () => {
    const params = GetParameters.ofEmpty()
    expect(params.toUrlQueryString()).toBe('')
  })

  it('文字列、数値、booleanを含むオブジェクトで初期化すると、toUrlStringは対応する項目のクエリストリングを返す', () => {
    const params = GetParameters.of({ name: 'hoge', age: 3, adult: false })
    expect(params.toUrlQueryString()).toBe('?name=hoge&age=3&adult=false')
  })

  it('配列を含むオブジェクトで初期化すると、toUrlStringは対応する項目のクエリストリングを返す', () => {
    const params = GetParameters.of({
      tags: ['tag1', 'tag2'],
      scores: [10, 20],
      flags: [true, false],
    })
    expect(params.toUrlQueryString()).toBe(
      '?tags=tag1&tags=tag2&scores=10&scores=20&flags=true&flags=false',
    )
  })

  it('混合したオブジェクトで初期化すると、toUrlStringは対応する項目のクエリストリングを返す', () => {
    const params = GetParameters.of({
      name: 'hoge',
      age: 3,
      adult: true,
      tags: ['tag1', 'tag2'],
    })
    expect(params.toUrlQueryString()).toBe('?name=hoge&age=3&adult=true&tags=tag1&tags=tag2')
  })

  it('空のオブジェクトで初期化すると、toUrlStringは空の文字列を返す', () => {
    const params = GetParameters.of({})
    expect(params.toUrlQueryString()).toBe('')
  })

  it('全ての値がundefinedのオブジェクトで初期化すると、toUrlStringは空の文字列を返す', () => {
    const params = GetParameters.of({ a: undefined, b: undefined })
    expect(params.toUrlQueryString()).toBe('')
  })

  it('空配列を含むオブジェクトで初期化すると、toUrlStringは空の文字列を返す', () => {
    const params = GetParameters.of({ tags1: [], tags2: [] })
    expect(params.toUrlQueryString()).toBe('')
  })

  it('undefinedを含むオブジェクトで初期化すると、toUrlStringはundefined以外の値のクエリストリングを返す', () => {
    const params = GetParameters.of({
      name: 'hoge',
      age: undefined,
      adult: true,
      tags: ['tag1', undefined, 'tag2'],
    })
    expect(params.toUrlQueryString()).toBe('?name=hoge&adult=true&tags=tag1&tags=tag2')
  })
})
