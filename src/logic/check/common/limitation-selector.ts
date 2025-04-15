import type { Answer, Limitation } from '@/logic/check/common/interfaces'

export class LimitationSelector {
  private constructor(private readonly answers: ReadonlyArray<Answer>) {
    if (answers.length === 0) {
      throw new Error('answers is empty')
    }
  }

  static from(answers: ReadonlyArray<Answer>): LimitationSelector {
    return new LimitationSelector(answers)
  }

  selectHighestLimitation(): Limitation {
    const limitations = this.answers.map((answer) => answer.getLimitation())
    const maxLimitation = Math.max(...limitations.map((limitation) => limitation.level))
    return limitations.find((limitation) => limitation.level === maxLimitation) as Limitation
  }
}
