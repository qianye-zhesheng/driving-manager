import { describe, it, expect } from 'vitest'
import { Odometer } from '../../../logic/session/odometer'

describe('Odometer', () => {
  it('should throw an error if initialized with a non-integer value', () => {
    expect(() => new Odometer(1.5)).toThrow('Odometer value must be a non-negative integer.')
    expect(() => new Odometer(NaN)).toThrow('Odometer value must be a non-negative integer.')
  })

  it('should throw an error if initialized with a negative number', () => {
    expect(() => new Odometer(-1)).toThrow('Odometer value must be a non-negative integer.')
    expect(() => new Odometer(-100)).toThrow('Odometer value must be a non-negative integer.')
  })

  it('should not throw an error if initialized with a non-negative integer', () => {
    expect(() => new Odometer(0)).not.toThrow()
    expect(() => new Odometer(10)).not.toThrow()
    expect(() => new Odometer(999999)).not.toThrow()
  })

  it('get() should return the initialized value', () => {
    const odo0 = new Odometer(0)
    expect(odo0.get()).toBe(0)

    const odo10 = new Odometer(10)
    expect(odo10.get()).toBe(10)

    const odoMax = new Odometer(999999)
    expect(odoMax.get()).toBe(999999)
  })
})
