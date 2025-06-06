import type { ErrorMessage } from '@/logic/api/interfaces'

export class ApiResponse {
  public constructor(
    private readonly statusCode: number,
    private readonly successful: boolean,
    private readonly body: unknown,
  ) {}

  public isSuccessful(): boolean {
    return this.successful
  }

  public getBody(): unknown {
    return this.body
  }

  public getBodyAs<T>(): T {
    if (!this.isSuccessful()) {
      throw new Error('Response is not successful')
    }
    return this.body as T
  }

  public isFormatError(): boolean {
    return this.statusCode === 400
  }

  public isIrregularDataError(): boolean {
    return this.statusCode === 409
  }

  public isServerError(): boolean {
    return this.statusCode === 500
  }

  public isDefinedError(): boolean {
    return this.isFormatError() || this.isIrregularDataError() || this.isServerError()
  }

  public getErrorMessage(): string {
    if (this.isSuccessful()) {
      throw new Error('Response is successful, not an error message')
    }
    if (!this.isDefinedError()) {
      throw new Error('Response is not an defined error message')
    }
    const errorMessage = this.body as ErrorMessage
    return errorMessage.message
  }

  public ensureSuccess(): ApiResponse {
    if (this.isDefinedError()) {
      throw new Error(`API error: ${this.getErrorMessage()}`)
    }
    if (!this.isSuccessful()) {
      throw new Error(
        `API error: status code ${this.statusCode} body: ${JSON.stringify(this.body)}`,
      )
    }
    return this
  }
}
