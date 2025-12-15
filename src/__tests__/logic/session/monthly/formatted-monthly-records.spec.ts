import { describe, it, expect } from 'vitest'
import { FormattedMonthlyRecords } from '../../../../logic/session/monthly/formatted-monthly-records'
import type { MonthlyRecords } from '../../../../logic/session/monthly/monthly-records'

const sampleMonthlyRecords: MonthlyRecords = {
  summary: {
    year: 2025,
    month: 12,
    totalOfficialDistance: 1234,
    totalPrivateDistance: 56,
    officialPercentage: 95,
    privatePercentage: 5,
  },
  records: [
    {
      operationDate: '2025-12-01',
      startOdometer: 1000,
      endOdometer: 1100,
      finished: true,
      officialDistance: 90,
      privateDistance: 10,
    },
    {
      operationDate: '2025-12-02',
      startOdometer: 1100,
      finished: false,
      officialDistance: 0,
      privateDistance: 20,
    },
  ],
}

describe('FormattedMonthlyRecords', () => {
  it('formats summary and records correctly', () => {
    const formatted = new FormattedMonthlyRecords(sampleMonthlyRecords)

    expect(formatted.summary.year).toBe(2025)
    expect(formatted.summary.month).toBe(12)
    expect(formatted.summary.totalOfficialDistance).toBe('1,234 km')
    expect(formatted.summary.totalPrivateDistance).toBe('56 km')
    expect(formatted.summary.officialPercentage).toBe('95%')
    expect(formatted.summary.privatePercentage).toBe('5%')

    expect(formatted.records).toHaveLength(2)

    expect(formatted.records[0].operationDate).toBe('2025-12-01')
    expect(formatted.records[0].startOdometer).toBe('1,000')
    expect(formatted.records[0].endOdometer).toBe('1,100')
    expect(formatted.records[0].officialDistance).toBe('90')
    expect(formatted.records[0].privateDistance).toBe('10')

    expect(formatted.records[1].operationDate).toBe('2025-12-02')
    expect(formatted.records[1].startOdometer).toBe('1,100')
    expect(formatted.records[1].endOdometer).toBe('')
    expect(formatted.records[1].officialDistance).toBe('0')
    expect(formatted.records[1].privateDistance).toBe('20')
  })
})
