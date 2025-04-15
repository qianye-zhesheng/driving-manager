import { stressQuestion } from '@/logic/check/im-safe/questions'
import type { Answer, Limitation } from '@/logic/check/common/interfaces'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class Stress implements Answer {
  private static readonly optionFinder = OptionFinder.of(stressQuestion)

  constructor(private readonly value: number) {
    if (Stress.optionFinder.doesNotExist(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
  }

  getLimitation(): Limitation {
    return Stress.optionFinder.findByValue(this.value).limitation
  }
}
