import type { Answer, Limitation, Option } from '@/logic/check/common/interfaces'
import { wetRoadQuestion } from '@/logic/check/weather/questions'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class WetRoad implements Answer {
  private static readonly optionFinder = OptionFinder.of(wetRoadQuestion)

  constructor(
    private readonly answerValue: number,
    private readonly hasImSafeLimitation: boolean,
  ) {
    if (WetRoad.optionFinder.doesNotExist(answerValue)) {
      throw new Error(`Invalid value: ${answerValue}`)
    }
  }

  getLimitation(): Limitation {
    const option: Option = WetRoad.optionFinder.findByValue(this.answerValue)

    if (!this.hasImSafeLimitation) {
      return option.limitation
    }

    if (option.additionalLimitation === undefined) {
      return option.limitation
    }

    return option.additionalLimitation
  }
}
