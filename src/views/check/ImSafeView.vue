<script setup lang="ts">
import { imSafeQuestions } from '@/logic/check/im-safe/questions'
import { useCheckAnswersStore } from '@/stores/check-answers'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const checkAnswersStore = useCheckAnswersStore()

const router = useRouter()

const imSafeAnswer = computed(() => {
  return checkAnswersStore.imSafeAnswer
})

const getQuestionTitle = (key: string, question: string): string => {
  return '【' + key + '】' + question
}

const toNext = (): void => {
  router.replace({ name: 'check.weather' })
}
</script>
<template>
  <PageTitle title="運行前チェック" />
  <h2 class="mb-3">ImSafe</h2>

  <BForm @submit.prevent="toNext">
    <template v-for="(question, key) in imSafeQuestions" :key="key">
      <BFormGroup :label="getQuestionTitle(String(key), question.text)" class="mb-3">
        <BFormRadio
          v-for="(option, index) in question.options"
          :key="key + String(index)"
          v-model="imSafeAnswer[key as keyof typeof imSafeAnswer]"
          :name="String(key)"
          :value="option.value"
          required
          >{{ option.label }}</BFormRadio
        >
      </BFormGroup>
    </template>
    <BButton type="submit" variant="primary">次へ</BButton>
  </BForm>
</template>
