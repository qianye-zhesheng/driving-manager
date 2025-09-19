import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { PutApi } from '@/logic/api/put-api'
import { ApiResponse } from '@/logic/api/api-response'
import { useErrorStore } from '@/stores/error'
import { type InputForm } from '@/logic/session/input-form'
import { ApiParams } from '@/logic/session/api-params'

dayjs.extend(customParseFormat)

export class PutEndApi {
  private static readonly PATH: string = 'session/put-end'

  private readonly apiParams: ApiParams

  constructor(readonly inputForm: InputForm) {
    this.apiParams = ApiParams.of(inputForm)
  }

  public async put(): Promise<boolean> {
    const userStore = useUserStore()
    const userId = await userStore.fetchUserId()

    const JSONBody = {
      userId: userId,
      date: this.apiParams.getFormattedDate(),
      odometer: this.apiParams.getOdometer(),
    }

    const api: PutApi = PutApi.configure().setPath(PutEndApi.PATH).setBody(JSONBody).build()

    const response: ApiResponse = await api.send()

    if (response.isIrregularDataError()) {
      const errorStore = useErrorStore()
      errorStore.addError(response.getErrorMessage())
      return false
    }

    response.ensureSuccess()
    return true
  }
}
