import { fatigueQuestion } from '@/logic/check/im-safe/questions'
import type { Answer, Limitation } from '@/logic/check/common/interfaces'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class Fatigue implements Answer {
  private static readonly optionFinder = OptionFinder.of(fatigueQuestion)

  constructor(private readonly value: number) {
    if (Fatigue.optionFinder.doesNotExist(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
  }

  getLimitation(): Limitation {
    return Fatigue.optionFinder.findByValue(this.value).limitation
  }
}
