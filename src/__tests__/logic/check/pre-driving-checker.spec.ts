import { describe, test, expect } from 'vitest'

import { PreDrivingChecker } from '../../../logic/check/pre-driving-checker'
import { ImSafeAnswer, WeatherAnswer } from '../../../stores/models/check-answer'
import { SUSPENDED } from '../../../logic/check/common/interfaces'
import { visibilityQuestion } from '../../../logic/check/weather/questions'

describe('PreDrivingCheckerのテスト', () => {
  test('ImSafeの結果がSUSPENDEDの場合、SUSPENDEDの結果を返すこと', () => {
    const imSafeAnswer: ImSafeAnswer = {
      illness: 2,
      medication: 1,
      stress: 1,
      alcohol: 1,
      fatigue: 1,
      emotion: 1,
    }
    const weatherAnswer: WeatherAnswer = {
      wetRoad: 1,
      visibility: 1,
      icyRoad: 1,
      snow: 1,
    }
    const instance = new PreDrivingChecker(imSafeAnswer, weatherAnswer)
    const actual = instance.executeCheck()
    expect(actual).toBe(SUSPENDED.text)
  })

  test('ImSafeの結果がSUSPENDEDでない場合、WeatherCheckerの結果を返すこと', () => {
    const imSafeAnswer: ImSafeAnswer = {
      illness: 1,
      medication: 1,
      stress: 1,
      alcohol: 1,
      fatigue: 1,
      emotion: 1,
    }
    const weatherAnswer: WeatherAnswer = {
      wetRoad: 2,
      visibility: 2,
      icyRoad: 1,
      snow: 1,
    }
    const instance = new PreDrivingChecker(imSafeAnswer, weatherAnswer)
    const actual = instance.executeCheck()
    expect(actual).toBe(visibilityQuestion.options[1].limitation.text)
  })
})
