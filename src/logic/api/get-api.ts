import { ApiResponse } from '@/logic/api/api-response'
import { GetApiBuilder } from '@/logic/api/get-api-builder'
import type { GetParameters } from '@/logic/api/get-parameters'
import { Authenticator } from '@/logic/auth/authenticator'

export class GetApi {
  public constructor(
    private readonly baseUrl: string,
    private readonly path: string,
    private readonly parameters: GetParameters,
  ) {}

  public static configure(): GetApiBuilder {
    return new GetApiBuilder()
  }

  public async send(): Promise<ApiResponse> {
    const idToken: string = await Authenticator.fetchIdToken()

    const url = `${this.baseUrl}${this.path}` + this.parameters.toUrlQueryString()

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    })

    const statusCode = response.status
    const successful = response.ok
    const body = await response.json()
    return new ApiResponse(statusCode, successful, body)
  }
}
