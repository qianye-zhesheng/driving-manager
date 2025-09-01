export interface InputForm {
  dateOption: DateOption
  date: string | undefined
  odometer: number | undefined
}

export const DateOption = {
  Today: 'today',
  Specify: 'specify',
} as const

export function isDateRequired(dateOption: DateOption): boolean {
  return dateOption === DateOption.Specify
}

export type DateOption = (typeof DateOption)[keyof typeof DateOption]

export const dateOptions = [
  { text: '今日', value: DateOption.Today },
  { text: '日付を指定して修正', value: DateOption.Specify },
]
