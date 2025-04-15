import type { Answer, Limitation, Option } from '@/logic/check/common/interfaces'
import { visibilityQuestion } from '@/logic/check/weather/questions'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class Visibility implements Answer {
  private static readonly optionFinder = OptionFinder.of(visibilityQuestion)

  constructor(
    private readonly answerValue: number,
    private readonly hasImSafeLimitation: boolean,
  ) {
    if (Visibility.optionFinder.doesNotExist(answerValue)) {
      throw new Error(`Invalid value: ${answerValue}`)
    }
  }

  getLimitation(): Limitation {
    const option: Option = Visibility.optionFinder.findByValue(this.answerValue)

    if (!this.hasImSafeLimitation) {
      return option.limitation
    }

    if (option.additionalLimitation === undefined) {
      return option.limitation
    }

    return option.additionalLimitation
  }
}
