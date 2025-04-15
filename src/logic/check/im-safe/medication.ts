import { medicationQuestion } from '@/logic/check/im-safe/questions'
import type { Answer, Limitation } from '@/logic/check/common/interfaces'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class Medication implements Answer {
  private static readonly optionFinder = OptionFinder.of(medicationQuestion)

  constructor(private readonly value: number) {
    if (Medication.optionFinder.doesNotExist(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
  }

  getLimitation(): Limitation {
    return Medication.optionFinder.findByValue(this.value).limitation
  }
}
