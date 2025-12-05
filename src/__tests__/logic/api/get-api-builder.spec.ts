import { describe, expect, test } from 'vitest'
import { GetApiBuilder } from '../../../logic/api/get-api-builder'

describe('GetApiBuilderのテスト', () => {
  test('setPathが呼ばれていないと、例外を投げること', () => {
    expect(() => new GetApiBuilder().build()).toThrow('Path must be set before building GetApi')
  })

  test('setPathでスラッシュが先頭・末尾にあると、例外を投げること', () => {
    const builder = new GetApiBuilder()
    expect(() => builder.setPath('/test').build()).toThrow('Path must not start with a slash')
    expect(() => builder.setPath('test/').build()).toThrow('Path must not end with a slash')
  })

  test('setPathが正しく設定されていると、GetApiが生成されること', () => {
    const builder = new GetApiBuilder().setPath('test/path')
    const getApi = builder.build()

    expect(getApi).toBeDefined()
    expect(getApi.path).toBe('test/path')
    expect(getApi.parameters).toBeDefined()
    expect(getApi.parameters.isEmpty).toBe(true)
  })

  test('setPathとsetParametersが正しく設定されていると、GetApiが生成されること', () => {
    const parameters = { key: 'value' }
    const builder = new GetApiBuilder().setPath('test/path').setParameters(parameters)
    const getApi = builder.build()

    expect(getApi).toBeDefined()
    expect(getApi.path).toBe('test/path')
    expect(getApi.parameters).toBeDefined()
    expect(getApi.parameters.isEmpty).toBe(false)
  })
})
