import { describe, expect, test } from 'vitest'
import { PutApiBuilder } from '../../../logic/api/put-api-builder'

describe('PutApiBuilderのテスト', () => {
  test('setPath, setBodyが呼ばれていないと、例外を投げること', () => {
    expect(() => new PutApiBuilder().build()).toThrow('Path must be set before building PutApi')
    expect(() => new PutApiBuilder().setPath('test').build()).toThrow(
      'Body must be set before building PutApi',
    )
  })

  test('setPathでスラッシュが先頭・末尾にあると、例外を投げること', () => {
    const builder = new PutApiBuilder().setBody({ key: 'value' })
    expect(() => builder.setPath('/test').build()).toThrow('Path must not start with a slash')
    expect(() => builder.setPath('test/').build()).toThrow('Path must not end with a slash')
  })

  test('setPath, setBodyが正しく設定されていると、PutApiが生成されること', () => {
    const builder = new PutApiBuilder().setPath('test/path').setBody({ key: 'value' })
    const putApi = builder.build()

    expect(putApi).toBeDefined()
    expect(putApi.path).toBe('test/path')
    expect(putApi.JSONstringifiedBody).toBe(JSON.stringify({ key: 'value' }))
  })
})
