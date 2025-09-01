export class Odometer {
  private readonly value: number

  constructor(initialValue: number) {
    if (!Number.isInteger(initialValue) || initialValue < 0) {
      throw new Error('Odometer value must be a non-negative integer.')
    }
    this.value = initialValue
  }

  get(): number {
    return this.value
  }
}
