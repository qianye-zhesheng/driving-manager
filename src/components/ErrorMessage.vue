<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { computed } from 'vue'

const errorStore = useErrorStore()
const errorMessage = computed(() => errorStore.errorMessage)

const hasError = computed(() => {
  return errorStore.hasError()
})

const clearError = () => {
  errorStore.clearError()
}
</script>
<template>
  <BCard v-if="hasError" title="エラー" class="my-3 bg-danger border-danger text-white">
    <BCardText>
      <p>{{ errorMessage }}</p>
      <BButton @click="clearError">閉じる</BButton>
    </BCardText>
  </BCard>
</template>
