import { isDateRequired, type InputForm } from '@/logic/session/input-form'
import { Odometer } from '@/logic/session/odometer'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export class ApiParams {
  private static readonly DATE_FORMAT = 'YYYY-MM-DD'

  private constructor(
    private readonly formattedDate: string,
    private readonly odometer: Odometer,
  ) {}

  public static of(inputForm: InputForm): ApiParams {
    if (inputForm.odometer === undefined) {
      throw new Error('Odometer is undefined')
    }

    if (ApiParams.shouldUseToday(inputForm)) {
      return new ApiParams(ApiParams.getToday(), Odometer.of(inputForm.odometer))
    }

    if (inputForm.date === undefined) {
      throw new Error('Date is undefined')
    }

    if (ApiParams.isInvalidDate(inputForm.date)) {
      throw new Error('Date format is invalid')
    }

    return new ApiParams(inputForm.date, Odometer.of(inputForm.odometer))
  }

  public getFormattedDate(): string {
    return this.formattedDate
  }

  public getOdometer(): number {
    return this.odometer.get()
  }

  private static shouldUseToday(inputForm: InputForm): boolean {
    return !isDateRequired(inputForm.dateOption)
  }

  private static getToday(): string {
    return dayjs().format(ApiParams.DATE_FORMAT)
  }

  private static isInvalidDate(date: string): boolean {
    return !dayjs(date, ApiParams.DATE_FORMAT, true).isValid()
  }
}
