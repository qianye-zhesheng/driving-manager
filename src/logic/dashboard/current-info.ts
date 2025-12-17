export interface CurrentInfo {
  todaysCheck?: CheckResult
  activeSession?: DrivingSession
}

export interface CheckResult {
  readonly checkedAt: string
  readonly judgement: string
}

export interface DrivingSession {
  readonly date: string
  readonly startOdometer: number
}
