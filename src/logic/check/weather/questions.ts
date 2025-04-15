import {
  LimitationLevel,
  NO_LIMITATION,
  SUSPENDED,
  type Question,
} from '@/logic/check/common/interfaces'

export const wetRoadQuestion: Question = {
  text: '路面が濡れているか？',
  options: [
    {
      value: 1,
      label: '濡れていない',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: '濡れている',
      limitation: NO_LIMITATION,
      additionalLimitation: SUSPENDED,
    },
  ],
}

export const visibilityQuestion: Question = {
  text: '雨や霧で視界が悪いか？',
  options: [
    {
      value: 1,
      label: '悪くない',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: '悪い',
      limitation: {
        text: '稼働予定が4h以下なら、昼休憩に加えて小休止1回追加、4h以上なら、昼休憩に加えて小休止2回追加',
        level: LimitationLevel.LIMITED_LIGHT,
      },
      additionalLimitation: SUSPENDED,
    },
  ],
}

export const icyRoadQuestion: Question = {
  text: '路面が凍結しているか？',
  options: [
    {
      value: 1,
      label: '凍結していない',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: '凍結している',
      limitation: NO_LIMITATION,
      additionalLimitation: SUSPENDED,
    },
  ],
}

export const snowQuestion: Question = {
  text: '雪が積もっているか？',
  options: [
    {
      value: 1,
      label: '積もっていない',
      limitation: NO_LIMITATION,
    },
    {
      value: 2,
      label: '積もっている',
      limitation: SUSPENDED,
    },
  ],
}
