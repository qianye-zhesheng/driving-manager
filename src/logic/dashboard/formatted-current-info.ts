import type { CheckResult, CurrentInfo, DrivingSession } from '@/logic/dashboard/current-info'
import dayjs from 'dayjs'

export interface FormattedCheckResult {
  readonly checkedAt: string
  readonly judgement: string
}

export interface FormattedDrivingSession {
  readonly date: string
  readonly startOdometer: string
}

export class FormattedCurrentInfo {
  readonly todaysCheck?: FormattedCheckResult
  readonly activeSession?: FormattedDrivingSession

  private static readonly NUMBER_FORMATTER = new Intl.NumberFormat('ja-JP')

  constructor(currentInfo: CurrentInfo) {
    const todaysCheck = currentInfo.todaysCheck
    const activeSession = currentInfo.activeSession

    if (todaysCheck !== undefined) {
      this.todaysCheck = FormattedCurrentInfo.formatCheckResult(todaysCheck)
    }

    if (activeSession !== undefined) {
      this.activeSession = FormattedCurrentInfo.formatDrivingSession(activeSession)
    }
  }

  private static formatCheckResult(todaysCheck: CheckResult): FormattedCheckResult {
    return {
      checkedAt: dayjs(todaysCheck.checkedAt).format('YYYY-MM-DD HH:mm'),
      judgement: todaysCheck.judgement,
    }
  }

  private static formatDrivingSession(activeSession: DrivingSession): FormattedDrivingSession {
    return {
      date: dayjs(activeSession.date).format('M月D日'),
      startOdometer: FormattedCurrentInfo.NUMBER_FORMATTER.format(activeSession.startOdometer),
    }
  }
}
