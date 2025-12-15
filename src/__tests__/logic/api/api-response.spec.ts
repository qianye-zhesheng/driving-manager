import { describe, test, expect } from 'vitest'
import { ApiResponse } from '../../../logic/api/api-response'

describe('ApiResponseのテスト', () => {
  const mockDefinedErrorBody = {
    message: 'This is a defined error message',
  }

  const mockSuccessfulBody = {
    data: {
      id: 1,
      name: 'Test Data',
    },
  }

  const mockIrregularDataBody = {
    error: 'This is an irregular data error',
  }

  test('成功したレスポンスではisSuccessfulがtrueを返すこと', () => {
    const response = new ApiResponse(200, true, mockSuccessfulBody)
    expect(response.isSuccessful()).toBe(true)
  })

  test('失敗したレスポンスではisSuccessfulがfalseを返すこと', () => {
    const response = new ApiResponse(400, false, mockDefinedErrorBody)
    expect(response.isSuccessful()).toBe(false)
  })

  test('getBodyがbodyをそのまま返すこと', () => {
    const response = new ApiResponse(200, true, mockIrregularDataBody)
    expect(response.getBody()).toEqual(mockIrregularDataBody)
  })

  test('getBodyAsが成功したレスポンスのbodyを返すこと', () => {
    const response = new ApiResponse(200, true, mockSuccessfulBody)
    expect(response.getBodyAs<MockData>()).toEqual(mockSuccessfulBody)
  })

  test('getBodyAsが失敗したレスポンスでエラーを投げること', () => {
    const response = new ApiResponse(400, false, mockDefinedErrorBody)
    expect(() => response.getBodyAs<MockData>()).toThrow('Response is not successful')
  })

  test('200のレスポンスでは、エラー種類判定メソッドがすべてfalseを返すこと', () => {
    const response = new ApiResponse(200, true, mockSuccessfulBody)
    expect(response.isFormatError()).toBe(false)
    expect(response.isAuthenticationError()).toBe(false)
    expect(response.isIrregularDataError()).toBe(false)
    expect(response.isServerError()).toBe(false)
    expect(response.isDefinedError()).toBe(false)
  })

  test('400のレスポンスでは、isFormatErrorとisDefinedErrorがtrueを返すこと', () => {
    const response = new ApiResponse(400, false, mockDefinedErrorBody)
    expect(response.isFormatError()).toBe(true)
    expect(response.isIrregularDataError()).toBe(false)
    expect(response.isServerError()).toBe(false)
    expect(response.isDefinedError()).toBe(true)
  })

  test('401のレスポンスでは、isAuthenticationErrorとisDefinedErrorがtrueを返すこと', () => {
    const response = new ApiResponse(401, false, mockDefinedErrorBody)
    expect(response.isFormatError()).toBe(false)
    expect(response.isAuthenticationError()).toBe(true)
    expect(response.isIrregularDataError()).toBe(false)
    expect(response.isServerError()).toBe(false)
    expect(response.isDefinedError()).toBe(true)
  })

  test('409のレスポンスでは、isIrregularDataErrorとisDefinedErrorがtrueを返すこと', () => {
    const response = new ApiResponse(409, false, mockIrregularDataBody)
    expect(response.isFormatError()).toBe(false)
    expect(response.isIrregularDataError()).toBe(true)
    expect(response.isServerError()).toBe(false)
    expect(response.isDefinedError()).toBe(true)
  })

  test('500のレスポンスでは、isServerErrorとisDefinedErrorがtrueを返すこと', () => {
    const response = new ApiResponse(500, false, mockDefinedErrorBody)
    expect(response.isFormatError()).toBe(false)
    expect(response.isIrregularDataError()).toBe(false)
    expect(response.isServerError()).toBe(true)
    expect(response.isDefinedError()).toBe(true)
  })

  test('getErrorMessageが成功したレスポンスで例外を投げること', () => {
    const response = new ApiResponse(200, true, mockSuccessfulBody)
    expect(() => response.getErrorMessage()).toThrow('Response is successful, not an error message')
  })

  test('getErrorMessageが定義されていないエラー時に例外を投げること', () => {
    const response = new ApiResponse(404, false, { message: 'Not Found' })
    expect(() => response.getErrorMessage()).toThrow('Response is not an defined error message')
  })

  test('getErrorMessageが定義されたエラーメッセージを返すこと', () => {
    const response = new ApiResponse(400, false, mockDefinedErrorBody)
    expect(response.getErrorMessage()).toBe(mockDefinedErrorBody.message)
  })

  test('ensureSuccessが成功したレスポンスを返すこと', () => {
    const response = new ApiResponse(200, true, mockSuccessfulBody)
    expect(response.ensureSuccess()).toBe(response)
  })

  test('ensureSuccessが定義されたエラーで例外を投げること', () => {
    const response = new ApiResponse(400, false, mockDefinedErrorBody)
    expect(() => response.ensureSuccess()).toThrow(`API error: ${mockDefinedErrorBody.message}`)
  })

  test('ensureSuccessが成功していないレスポンスで例外を投げること', () => {
    const response = new ApiResponse(404, false, { message: 'Not Found' })
    expect(() => response.ensureSuccess()).toThrow(
      `API error: status code 404 body: ${JSON.stringify({ message: 'Not Found' })}`,
    )
  })

  test('getStatusCodeがステータスコードを返すこと', () => {
    const response = new ApiResponse(201, true, mockSuccessfulBody)
    expect(response.getStatusCode()).toBe(201)
  })
})

interface MockData {
  data: {
    id: number
    name: string
  }
}
