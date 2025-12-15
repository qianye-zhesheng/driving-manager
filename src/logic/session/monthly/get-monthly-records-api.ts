import type { MonthlyRecordSearchForm } from '@/logic/session/monthly/search-form'
import type { MonthlyRecords } from '@/logic/session/monthly/monthly-records'
import { GetApi } from '@/logic/api/get-api'
import type { ApiResponse } from '@/logic/api/api-response'

export class GetMonthlyRecordsApi {
  private static readonly PATH: string = 'session/get-monthly-records'

  constructor(private readonly monthlySearchForm: MonthlyRecordSearchForm) {}

  public async get(): Promise<MonthlyRecords> {
    const parameters = {
      year: this.monthlySearchForm.year,
      month: this.monthlySearchForm.month,
    }

    const api: GetApi = GetApi.configure()
      .setPath(GetMonthlyRecordsApi.PATH)
      .setParameters(parameters)
      .build()

    const response: ApiResponse = await api.send()

    response.ensureSuccess()

    return response.getBodyAs<MonthlyRecords>()
  }
}
