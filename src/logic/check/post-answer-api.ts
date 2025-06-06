import type { ImSafeAnswer, WeatherAnswer } from '@/stores/models/check-answer'
import { PostApi } from '@/logic/api/post-api'
import type { ApiResponse } from '@/logic/api/api-response'
import { useUserStore } from '@/stores/user'

export class PostAnswerApi {
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

    PostApi.configure()
      .setPath('check/post-answer')
      .setBody(JSONBody)
      .build()
      .send()
      .then((response: ApiResponse) => {
        response.ensureSuccess()
      })
  }
}
