import type { Answer, Limitation } from '@/logic/check/common/interfaces'
import { WetRoad } from '@/logic/check/weather/wet-road'
import { LimitationSelector } from '@/logic/check/common/limitation-selector'
import type { WeatherAnswer } from '@/stores/models/check-answer'
import type { ImSafeResult } from '@/logic/check/im-safe/im-safe-result'
import { Visibility } from '@/logic/check/weather/visibility'
import { IcyRoad } from '@/logic/check/weather/icy-road'
import { Snow } from '@/logic/check/weather/snow'

export class WeatherChecker {
  private readonly answers: ReadonlyArray<Answer>

  constructor(inputAnswer: WeatherAnswer, imSafeResult: ImSafeResult) {
    if (imSafeResult.isSuspended()) {
      throw new Error('ImSafeResult is suspended')
    }
    const hasImSafeLimitation = imSafeResult.hasLimitation()
    this.answers = [
      imSafeResult,
      new WetRoad(inputAnswer.wetRoad, hasImSafeLimitation),
      new Visibility(inputAnswer.visibility, hasImSafeLimitation),
      new IcyRoad(inputAnswer.icyRoad, hasImSafeLimitation),
      new Snow(inputAnswer.snow, hasImSafeLimitation),
    ]
  }

  executeCheck(): Limitation {
    return LimitationSelector.from(this.answers).selectHighestLimitation()
  }
}
