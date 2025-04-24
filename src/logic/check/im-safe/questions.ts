import type { Question } from '@/logic/check/common/interfaces'
import { LimitationLevel, NO_LIMITATION, SUSPENDED } from '@/logic/check/common/interfaces'

export const illnessQuestion: Question = {
  text: '思考に支障のある症状があるか？',
  options: [
    {
      value: 1,
      label: 'ない',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: 'ある',
      limitation: SUSPENDED,
    },
  ],
}

export const medicationQuestion: Question = {
  text: '運転を控えるべき薬を服用しているか？',
  options: [
    {
      value: 1,
      label: '服用していない',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: '服用している',
      limitation: SUSPENDED,
    },
  ],
}

export const stressQuestion: Question = {
  text: 'ストレスチェック表の今日の残存ポイントは？',
  options: [
    {
      value: 1,
      label: '-4以上',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: '-5以下',
      limitation: {
        text: '運行時間を合計2時間以内に制限',
        level: LimitationLevel.LIMITED_HEAVY,
      },
    },
    {
      value: 3,
      label: '-10以下',
      limitation: SUSPENDED,
    },
  ],
}

export const alcoholQuestion: Question = {
  text: '飲酒から10時間以上経過しているか？',
  options: [
    {
      value: 1,
      label: '経過している',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: '経過していない',
      limitation: SUSPENDED,
    },
  ],
}

export const fatigueQuestion: Question = {
  text: '睡眠は十分取れているか？',
  options: [
    {
      value: 1,
      label: '十分取れている',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: '軽度の睡眠不足',
      limitation: {
        text: '運行時間を合計3時間以内に制限',
        level: LimitationLevel.LIMITED_MODERATE,
      },
    },
    {
      value: 3,
      label: '重度の睡眠不足',
      limitation: SUSPENDED,
    },
  ],
}

export const emotionQuestion: Question = {
  text: '抑うつ、イライラ、動悸があるか？',
  options: [
    {
      value: 1,
      label: 'ない',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: 'ある',
      limitation: SUSPENDED,
    },
  ],
}

export const imSafeQuestions: { [key: string]: Question } = {
  illness: illnessQuestion,
  medication: medicationQuestion,
  stress: stressQuestion,
  alcohol: alcoholQuestion,
  fatigue: fatigueQuestion,
  emotion: emotionQuestion,
}
