import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { ImSafeAnswer, WeatherAnswer } from '@/stores/models/check-answer'
import { PostAnswerApi } from '@/logic/check/post-answer-api'

export const useCheckAnswersStore = defineStore('checkAnswers', () => {
  const initialImSafeAnswer: ImSafeAnswer = {
    illness: 0,
    medication: 0,
    stress: 0,
    alcohol: 0,
    fatigue: 0,
    emotion: 0,
  }

  const initialWeatherAnswer: WeatherAnswer = {
    wetRoad: 0,
    visibility: 0,
    icyRoad: 0,
    snow: 0,
  }

  const imSafeAnswer = reactive(initialImSafeAnswer)
  const weatherAnswer = reactive(initialWeatherAnswer)

  function resetAnswers(): void {
    imSafeAnswer.illness = 0
    imSafeAnswer.medication = 0
    imSafeAnswer.stress = 0
    imSafeAnswer.alcohol = 0
    imSafeAnswer.fatigue = 0
    imSafeAnswer.emotion = 0
    weatherAnswer.wetRoad = 0
    weatherAnswer.visibility = 0
    weatherAnswer.icyRoad = 0
    weatherAnswer.snow = 0
  }

  async function saveAnswers(judgement: string): Promise<void> {
    const postAnswerApi = new PostAnswerApi(imSafeAnswer, weatherAnswer, judgement)
    await postAnswerApi.post()
  }

  return { imSafeAnswer, weatherAnswer, resetAnswers, saveAnswers }
})
