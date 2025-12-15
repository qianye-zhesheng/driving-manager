import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetMonthlyRecordsApi } from '../../../../logic/session/monthly/get-monthly-records-api'
import { GetApi } from '../../../../logic/api/get-api'
import { ApiResponse } from '../../../../logic/api/api-response'
import type { MonthlyRecords } from '../../../../logic/session/monthly/monthly-records'

const sampleMonthlyRecords: MonthlyRecords = {
  summary: {
    year: 2025,
    month: 12,
    totalOfficialDistance: 200,
    totalPrivateDistance: 50,
    officialPercentage: 80,
    privatePercentage: 20,
  },
  records: [
    {
      operationDate: '2025-12-01',
      startOdometer: 100,
      endOdometer: 150,
      finished: true,
      officialDistance: 40,
      privateDistance: 10,
    },
  ],
}

describe('GetMonthlyRecordsApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('throws when response is 400', async () => {
    vi.spyOn(GetApi.prototype, 'send').mockResolvedValue(
      new ApiResponse(400, false, { message: 'bad request' }),
    )

    const api = new GetMonthlyRecordsApi({ year: 2025, month: 12 })

    await expect(api.get()).rejects.toThrow('API error: bad request')
  })

  it('throws when response is 401', async () => {
    vi.spyOn(GetApi.prototype, 'send').mockResolvedValue(
      new ApiResponse(401, false, { message: 'unauthorized' }),
    )

    const api = new GetMonthlyRecordsApi({ year: 2025, month: 12 })

    await expect(api.get()).rejects.toThrow('API error: unauthorized')
  })

  it('throws when response is 500', async () => {
    vi.spyOn(GetApi.prototype, 'send').mockResolvedValue(
      new ApiResponse(500, false, { message: 'server error' }),
    )

    const api = new GetMonthlyRecordsApi({ year: 2025, month: 12 })

    await expect(api.get()).rejects.toThrow('API error: server error')
  })

  it('returns MonthlyRecords when response is 200', async () => {
    vi.spyOn(GetApi.prototype, 'send').mockResolvedValue(
      new ApiResponse(200, true, sampleMonthlyRecords),
    )

    const api = new GetMonthlyRecordsApi({ year: 2025, month: 12 })

    await expect(api.get()).resolves.toEqual(sampleMonthlyRecords)
  })
})
