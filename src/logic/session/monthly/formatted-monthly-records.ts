import type { MonthlyRecords } from './monthly-records'

export interface FormattedSessionRecord {
  readonly operationDate: string
  readonly startOdometer: string
  readonly endOdometer: string
  readonly officialDistance: string
  readonly privateDistance: string
}

export interface FormattedSummary {
  readonly year: number
  readonly month: number
  readonly totalOfficialDistance: string
  readonly totalPrivateDistance: string
  readonly officialPercentage: string
  readonly privatePercentage: string
}

export class FormattedMonthlyRecords {
  readonly summary: FormattedSummary
  readonly records: FormattedSessionRecord[]

  private static readonly NUMBER_FORMATTER = new Intl.NumberFormat('ja-JP')

  constructor(monthlyRecords: MonthlyRecords) {
    this.summary = {
      year: monthlyRecords.summary.year,
      month: monthlyRecords.summary.month,
      totalOfficialDistance:
        FormattedMonthlyRecords.format(monthlyRecords.summary.totalOfficialDistance) + ' km',
      totalPrivateDistance:
        FormattedMonthlyRecords.format(monthlyRecords.summary.totalPrivateDistance) + ' km',
      officialPercentage: `${monthlyRecords.summary.officialPercentage}%`,
      privatePercentage: `${monthlyRecords.summary.privatePercentage}%`,
    }

    this.records = monthlyRecords.records.map((record) => ({
      operationDate: record.operationDate,
      startOdometer: FormattedMonthlyRecords.format(record.startOdometer),
      endOdometer:
        record.endOdometer === undefined ? '' : FormattedMonthlyRecords.format(record.endOdometer),
      officialDistance: FormattedMonthlyRecords.format(record.officialDistance),
      privateDistance: FormattedMonthlyRecords.format(record.privateDistance),
    }))
  }

  private static format(number: number): string {
    return FormattedMonthlyRecords.NUMBER_FORMATTER.format(number)
  }
}
