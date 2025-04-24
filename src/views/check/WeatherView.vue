<script setup lang="ts">
import { weatherQuestions } from '@/logic/check/weather/questions'
import { useCheckAnswersStore } from '@/stores/check-answers'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

const checkAnswersStore = useCheckAnswersStore()

const router = useRouter()

const weatherAnswer = computed(() => {
  return checkAnswersStore.weatherAnswer
})

const getQuestionTitle = (index: number, question: string): string => {
  return '【Q' + (index + 1) + '】' + question
}

const onSubmit = (): void => {
  router.replace({ name: 'check.judge' })
}
</script>
<template>
  <PageTitle title="運行前チェック" />
  <h2 class="mb-3">気象条件</h2>

  <BForm @submit.prevent="onSubmit">
    <template v-for="(question, key, ix) in weatherQuestions" :key="key">
      <BFormGroup :label="getQuestionTitle(ix, question.text)" class="mb-3">
        <BFormRadio
          v-for="(option, index) in question.options"
          :key="key + String(index)"
          v-model="weatherAnswer[key as keyof typeof weatherAnswer]"
          :name="String(key)"
          :value="option.value"
          required
          >{{ option.label }}</BFormRadio
        >
      </BFormGroup>
    </template>
    <RouterLink class="btn btn-outline-primary me-3" :to="{ name: 'check.imsafe' }"
      >戻る</RouterLink
    >
    <BButton type="submit" variant="primary">判定</BButton>
  </BForm>
</template>
