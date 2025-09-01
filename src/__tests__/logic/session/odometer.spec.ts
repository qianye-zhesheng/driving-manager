import { describe, it, expect } from 'vitest'
import { Odometer } from '../../../logic/session/odometer'

describe('Odometer', () => {
  it('should throw an error if initialized with a non-integer value', () => {
    expect(() => Odometer.of(1.5)).toThrow('Odometer value must be a non-negative integer.')
    expect(() => Odometer.of(NaN)).toThrow('Odometer value must be a non-negative integer.')
  })

  it('should throw an error if initialized with a non-positive number', () => {
    expect(() => Odometer.of(-1)).toThrow('Odometer value must be a non-negative integer.')
    expect(() => Odometer.of(0)).toThrow('Odometer value must be a non-negative integer.')
  })

  it('should not throw an error if initialized with a positive integer', () => {
    expect(() => Odometer.of(1)).not.toThrow()
    expect(() => Odometer.of(10)).not.toThrow()
    expect(() => Odometer.of(999999)).not.toThrow()
  })

  it('get() should return the initialized value', () => {
    const odo1 = Odometer.of(1)
    expect(odo1.get()).toBe(1)

    const odo10 = Odometer.of(10)
    expect(odo10.get()).toBe(10)

    const odoMax = Odometer.of(999999)
    expect(odoMax.get()).toBe(999999)
  })
})
