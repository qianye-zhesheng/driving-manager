import { alcoholQuestion } from '@/logic/check/im-safe/questions'
import type { Answer, Limitation } from '@/logic/check/common/interfaces'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class Alcohol implements Answer {
  private static readonly optionFinder = OptionFinder.of(alcoholQuestion)

  constructor(private readonly value: number) {
    if (Alcohol.optionFinder.doesNotExist(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
  }

  getLimitation(): Limitation {
    return Alcohol.optionFinder.findByValue(this.value).limitation
  }
}
