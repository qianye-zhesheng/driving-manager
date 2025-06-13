import type { ImSafeAnswer, WeatherAnswer } from '@/stores/models/check-answer'
import { PostApi } from '@/logic/api/post-api'
import { ApiResponse } from '@/logic/api/api-response'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'

export class PostAnswerApi {
  private static readonly PATH: string = 'check/post-answer'

  public constructor(
    private readonly imSafeAnswer: ImSafeAnswer,
    private readonly weatherAnswer: WeatherAnswer,
    private readonly judgement: string,
  ) {}

  public async post(): Promise<void> {
    const userStore = useUserStore()
    const userId = await userStore.fetchUserId()
    const JSONBody = {
      userId: userId,
      imSafeAnswer: this.imSafeAnswer,
      weatherAnswer: this.weatherAnswer,
      judgement: this.judgement,
    }

    const api: PostApi = PostApi.configure().setPath(PostAnswerApi.PATH).setBody(JSONBody).build()

    const loadingStore = useLoadingStore()

    try {
      loadingStore.startLoading()
      const response: ApiResponse = await api.send()
      response.ensureSuccess()
    } catch (error) {
      throw error
    } finally {
      loadingStore.finishLoading()
    }
  }
}
