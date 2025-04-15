import type { ImSafeAnswer, WeatherAnswer } from '@/stores/models/check-answer'
import { ImSafeChecker } from '@/logic/check/im-safe/im-safe-checker'
import { WeatherChecker } from '@/logic/check/weather/weather-checker'
import type { ImSafeResult } from '@/logic/check/im-safe/im-safe-result'

export class PreDrivingChecker {
  constructor(
    private readonly imSafeAnswer: ImSafeAnswer,
    private readonly weatherAnswer: WeatherAnswer,
  ) {}

  executeCheck(): string {
    const imSafeResult: ImSafeResult = new ImSafeChecker(this.imSafeAnswer).executeCheck()

    if (imSafeResult.isSuspended()) {
      return imSafeResult.getLimitation().text
    }

    return new WeatherChecker(this.weatherAnswer, imSafeResult).executeCheck().text
  }
}
