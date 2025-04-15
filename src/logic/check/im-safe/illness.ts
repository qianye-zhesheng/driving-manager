import { illnessQuestion } from '@/logic/check/im-safe/questions'
import type { Answer, Limitation } from '@/logic/check/common/interfaces'
import { OptionFinder } from '../common/option-finder'

export class Illness implements Answer {
  private static readonly optionFinder = OptionFinder.of(illnessQuestion)

  constructor(private readonly value: number) {
    if (Illness.optionFinder.doesNotExist(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
  }

  getLimitation(): Limitation {
    return Illness.optionFinder.findByValue(this.value).limitation
  }
}
