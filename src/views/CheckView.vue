<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { useCheckAnswersStore } from '@/stores/check-answers'
import { useRouter } from 'vue-router'

const router = useRouter()

const checkAnswersStore = useCheckAnswersStore()
const initialize = (): void => {
  checkAnswersStore.resetAnswers()
  router.push({ name: 'check.imsafe' })
}
</script>
<template>
  <PageTitle title="運行前チェック" />
  <BButton variant="primary" @click="initialize">開始</BButton>
</template>
