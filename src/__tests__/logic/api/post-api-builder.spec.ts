import { describe, expect, test } from 'vitest'
import { PostApiBuilder } from '../../../logic/api/post-api-builder'

describe('PostApiBuilderのテスト', () => {
  test('setPath, setBodyが呼ばれていないと、例外を投げること', () => {
    expect(() => new PostApiBuilder().build()).toThrow('Path must be set before building PostApi')
    expect(() => new PostApiBuilder().setPath('test').build()).toThrow(
      'Body must be set before building PostApi',
    )
  })

  test('setPathでスラッシュが先頭・末尾にあると、例外を投げること', () => {
    const builder = new PostApiBuilder().setBody({ key: 'value' })
    expect(() => builder.setPath('/test').build()).toThrow('Path must not start with a slash')
    expect(() => builder.setPath('test/').build()).toThrow('Path must not end with a slash')
  })

  test('setPath, setBodyが正しく設定されていると、PostApiが生成されること', () => {
    const builder = new PostApiBuilder().setPath('test/path').setBody({ key: 'value' })
    const postApi = builder.build()

    expect(postApi).toBeDefined()
    expect(postApi.path).toBe('test/path')
    expect(postApi.JSONstringifiedBody).toBe(JSON.stringify({ key: 'value' }))
  })
})
