import { LimitationLevel, type Answer, type Limitation } from '@/logic/check/common/interfaces'

export class ImSafeResult implements Answer {
  constructor(private readonly limitation: Limitation) {}

  getLimitation(): Limitation {
    return this.limitation
  }

  isSuspended(): boolean {
    return this.limitation.level === LimitationLevel.SUSPENDED
  }

  hasNoLimitation(): boolean {
    return this.limitation.level === LimitationLevel.NONE
  }

  hasLimitation(): boolean {
    return !this.hasNoLimitation()
  }
}
