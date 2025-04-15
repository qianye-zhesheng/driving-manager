import type { Question, Option } from '@/logic/check/common/interfaces'

export class OptionFinder {
  private constructor(private readonly question: Question) {}

  static of(question: Question): OptionFinder {
    return new OptionFinder(question)
  }

  findByValue(value: number): Option {
    if (this.doesNotExist(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
    const option = this.question.options.find((option) => option.value === value) as Option
    return option
  }

  exists(value: number): boolean {
    return this.question.options.some((option) => option.value === value)
  }

  doesNotExist(value: number): boolean {
    return !this.exists(value)
  }
}
