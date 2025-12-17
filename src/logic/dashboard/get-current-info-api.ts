import { GetApi } from '@/logic/api/get-api'
import type { ApiResponse } from '@/logic/api/api-response'
import type { CurrentInfo } from '@/logic/dashboard/current-info'
import { useLoadingStore } from '@/stores/loading'

export class GetCurrentInfoApi {
  private static readonly PATH: string = 'dashboard/get-current-info'

  constructor() {}

  public async get(): Promise<CurrentInfo> {
    const loadingStore = useLoadingStore()

    const api: GetApi = GetApi.configure().setPath(GetCurrentInfoApi.PATH).build()

    loadingStore.startLoading()

    let response: ApiResponse
    try {
      response = await api.send()
    } finally {
      loadingStore.finishLoading()
    }

    response.ensureSuccess()

    return response.getBodyAs<CurrentInfo>()
  }
}
