import type { ImSafeAnswer, WeatherAnswer } from '@/stores/models/check-answer'
import { PostApi } from '@/logic/api/post-api'
import { ApiResponse } from '@/logic/api/api-response'

export class PostAnswerApi {
  private static readonly PATH: string = 'check/post-answer'

  public constructor(
    private readonly imSafeAnswer: ImSafeAnswer,
    private readonly weatherAnswer: WeatherAnswer,
    private readonly judgement: string,
  ) {}

  public async post(): Promise<void> {
    const JSONBody = {
      imSafeAnswer: this.imSafeAnswer,
      weatherAnswer: this.weatherAnswer,
      judgement: this.judgement,
    }

    const api: PostApi = PostApi.configure().setPath(PostAnswerApi.PATH).setBody(JSONBody).build()

    const response: ApiResponse = await api.send()

    response.ensureSuccess()
  }
}
