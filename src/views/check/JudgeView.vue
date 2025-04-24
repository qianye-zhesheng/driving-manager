<script setup lang="ts">
import { PreDrivingChecker } from '@/logic/check/pre-driving-checker'
import { useCheckAnswersStore } from '@/stores/check-answers'
import { computed } from 'vue'

const checkAnswersStore = useCheckAnswersStore()

const imSafeAnswer = computed(() => {
  return checkAnswersStore.imSafeAnswer
})

const weatherAnswer = computed(() => {
  return checkAnswersStore.weatherAnswer
})

const result = computed(() => {
  return new PreDrivingChecker(imSafeAnswer.value, weatherAnswer.value).executeCheck()
})
</script>
<template>
  <PageTitle title="運行前チェック" />
  <h2 class="mb-3">判定結果</h2>
  <BCard class="mb-3">
    <BCardText>
      {{ result }}
    </BCardText>
  </BCard>
</template>
