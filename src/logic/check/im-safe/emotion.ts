import { emotionQuestion } from '@/logic/check/im-safe/questions'
import type { Answer, Limitation } from '@/logic/check/common/interfaces'
import { OptionFinder } from '@/logic/check/common/option-finder'

export class Emotion implements Answer {
  private static readonly optionFinder = OptionFinder.of(emotionQuestion)

  constructor(private readonly value: number) {
    if (Emotion.optionFinder.doesNotExist(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
  }

  getLimitation(): Limitation {
    return Emotion.optionFinder.findByValue(this.value).limitation
  }
}
