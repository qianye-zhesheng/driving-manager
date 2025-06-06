<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { computed } from 'vue'

const errorStore = useErrorStore()
const errorMessages = computed(() => errorStore.errorMessages)

const hasErrors = computed(() => {
  return errorStore.hasErrors()
})

const clearErrors = () => {
  errorStore.clearErrors()
}
</script>
<template>
  <BCard v-if="hasErrors" title="エラー" class="my-3 bg-danger border-danger text-white">
    <BCardText>
      <template v-for="(errorMessage, index) in errorMessages" :key="index">
        <p>{{ errorMessage }}</p>
      </template>
      <BButton @click="clearErrors">閉じる</BButton>
    </BCardText>
  </BCard>
</template>
