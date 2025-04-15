import type { Answer, Limitation, Option } from '@/logic/check/common/interfaces'
import { snowQuestion } from '@/logic/check/weather/questions'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class Snow implements Answer {
  private static readonly optionFinder = OptionFinder.of(snowQuestion)

  constructor(
    private readonly answerValue: number,
    private readonly hasImSafeLimitation: boolean,
  ) {
    if (Snow.optionFinder.doesNotExist(answerValue)) {
      throw new Error(`Invalid value: ${answerValue}`)
    }
  }

  getLimitation(): Limitation {
    const option: Option = Snow.optionFinder.findByValue(this.answerValue)

    if (!this.hasImSafeLimitation) {
      return option.limitation
    }

    if (option.additionalLimitation === undefined) {
      return option.limitation
    }

    return option.additionalLimitation
  }
}
