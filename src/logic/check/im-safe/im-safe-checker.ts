import { Illness } from '@/logic/check/im-safe/illness'
import type { Answer, Limitation } from '@/logic/check/common/interfaces'
import { Medication } from '@/logic/check/im-safe/medication'
import { Stress } from '@/logic/check/im-safe/stress'
import type { ImSafeAnswer } from '@/stores/models/check-answer'
import { LimitationSelector } from '@/logic/check/common/limitation-selector'
import { ImSafeResult } from '@/logic/check/im-safe/im-safe-result'
import { Alcohol } from '@/logic/check/im-safe/alcohol'
import { Fatigue } from '@/logic/check/im-safe/fatigue'
import { Emotion } from '@/logic/check/im-safe/emotion'

export class ImSafeChecker {
  private readonly answers: ReadonlyArray<Answer>

  constructor(inputAnswer: ImSafeAnswer) {
    this.answers = [
      new Illness(inputAnswer.illness),
      new Medication(inputAnswer.medication),
      new Stress(inputAnswer.stress),
      new Alcohol(inputAnswer.alcohol),
      new Fatigue(inputAnswer.fatigue),
      new Emotion(inputAnswer.emotion),
    ]
  }

  executeCheck(): ImSafeResult {
    const limitation: Limitation = LimitationSelector.from(this.answers).selectHighestLimitation()
    return new ImSafeResult(limitation)
  }
}
