<script setup lang="ts">
import { PreDrivingChecker } from '@/logic/check/pre-driving-checker'
import { useCheckAnswersStore } from '@/stores/check-answers'
import PageTitle from '@/components/PageTitle.vue'
import { useRouter } from 'vue-router'

const checkAnswersStore = useCheckAnswersStore()

const router = useRouter()

const imSafeAnswer = checkAnswersStore.imSafeAnswer
const weatherAnswer = checkAnswersStore.weatherAnswer

const result: string = new PreDrivingChecker(imSafeAnswer, weatherAnswer).executeCheck()

const onSubmit = (): void => {
  // TODO : Implement the logic to send the result to the server
  checkAnswersStore.resetAnswers()
  router.replace({ name: 'check.complete' })
}
</script>
<template>
  <PageTitle title="運行前チェック" />
  <h2 class="mb-3">判定結果</h2>
  <BCard class="mb-3">
    <BCardText>
      {{ result }}
    </BCardText>
  </BCard>
  <BButton variant="primary" @click="onSubmit">結果を送信</BButton>
</template>
