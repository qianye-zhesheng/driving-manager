import type { Answer, Limitation, Option } from '@/logic/check/common/interfaces'
import { icyRoadQuestion } from '@/logic/check/weather/questions'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class IcyRoad implements Answer {
  private static readonly optionFinder = OptionFinder.of(icyRoadQuestion)

  constructor(
    private readonly answerValue: number,
    private readonly hasImSafeLimitation: boolean,
  ) {
    if (IcyRoad.optionFinder.doesNotExist(answerValue)) {
      throw new Error(`Invalid value: ${answerValue}`)
    }
  }

  getLimitation(): Limitation {
    const option: Option = IcyRoad.optionFinder.findByValue(this.answerValue)

    if (!this.hasImSafeLimitation) {
      return option.limitation
    }

    if (option.additionalLimitation === undefined) {
      return option.limitation
    }

    return option.additionalLimitation
  }
}
