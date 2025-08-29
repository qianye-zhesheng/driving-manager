import { ApiResponse } from '@/logic/api/api-response'
import { useUserStore } from '@/stores/user'
import { PutApiBuilder } from '@/logic/api/put-api-builder'

export class PutApi {
  public constructor(
    private readonly baseUrl: string,
    private readonly path: string,
    private readonly JSONstringifiedBody: string,
  ) {}

  public static configure(): PutApiBuilder {
    return new PutApiBuilder()
  }

  public async send(): Promise<ApiResponse> {
    const userStore = useUserStore()
    const idToken: string = await userStore.fetchIdToken()

    const response = await fetch(`${this.baseUrl}${this.path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: this.JSONstringifiedBody,
    })

    const statusCode = response.status
    const successful = response.ok
    const body = await response.json()
    return new ApiResponse(statusCode, successful, body)
  }
}
