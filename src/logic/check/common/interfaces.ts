export const LimitationLevel = {
  NONE: 0,
  LIMITED_LIGHT: 1,
  LIMITED_MODERATE: 2,
  LIMITED_HEAVY: 3,
  SUSPENDED: 4,
} as const

export type LimitationLevel = (typeof LimitationLevel)[keyof typeof LimitationLevel]

export interface Limitation {
  readonly text: string
  readonly level: LimitationLevel
}

export const NO_LIMITATION: Limitation = {
  text: '制限なし',
  level: LimitationLevel.NONE,
}

export const SUSPENDED: Limitation = {
  text: '運行停止',
  level: LimitationLevel.SUSPENDED,
}

export interface Option {
  readonly value: number
  readonly label: string
  readonly limitation: Limitation
  readonly additionalLimitation?: Limitation
}

export interface Question {
  readonly text: string
  readonly options: ReadonlyArray<Option>
}

export interface Answer {
  getLimitation(): Limitation
}
