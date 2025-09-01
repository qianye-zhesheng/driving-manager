import { ApiParams } from '../../../logic/session/api-params'
import { DateOption } from '../../../logic/session/input-form'
import { describe, it, expect } from 'vitest'

describe('ApiParams', () => {
  it('should throw error if InputForm.odometer is undefined', () => {
    expect(() => {
      ApiParams.of({ dateOption: DateOption.Today, odometer: undefined })
    }).toThrow('Odometer is undefined')
  })

  it('should not throw error if dateOption is Today and others are valid', () => {
    expect(() => {
      ApiParams.of({ dateOption: DateOption.Today, odometer: 100 })
    }).not.toThrowError()
  })

  it('should throw erorr if dateOption is Specify and date is undefined', () => {
    expect(() => {
      ApiParams.of({ dateOption: DateOption.Specify, odometer: 100, date: undefined })
    }).toThrow('Date is undefined')
  })

  it('should throw error if dateOption is Specify and date is invalid', () => {
    expect(() => {
      ApiParams.of({ dateOption: DateOption.Specify, odometer: 100, date: '2025-01-32' })
    }).toThrow('Date format is invalid')
  })

  it('should not throw error if dateOption is Specify and others are valid ', () => {
    expect(() => {
      ApiParams.of({ dateOption: DateOption.Specify, odometer: 100, date: '2025-01-31' })
    }).not.toThrowError()
  })

  it('should return today if dateOption is Today', () => {
    const params = ApiParams.of({ dateOption: DateOption.Today, odometer: 100 })
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const expectedDateString = `${year}-${month}-${day}`
    expect(params.getFormattedDate()).toBe(expectedDateString)
  })

  it('should return specified date if dateOption is Specify', () => {
    const params = ApiParams.of({
      dateOption: DateOption.Specify,
      odometer: 100,
      date: '2025-01-31',
    })
    expect(params.getFormattedDate()).toBe('2025-01-31')
  })

  it('should return odometer value', () => {
    const params = ApiParams.of({ dateOption: DateOption.Today, odometer: 150 })
    expect(params.getOdometer()).toBe(150)
  })
})
