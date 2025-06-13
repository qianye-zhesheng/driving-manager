<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { computed } from 'vue'

const loadingStore = useLoadingStore()

const isLoading = computed(() => {
  return loadingStore.isLoading()
})
</script>
<template>
  <BSpinner
    v-if="isLoading"
    label="Spinning"
    variant="secondary"
    class="position-fixed top-50 start-50"
    style="width: 3rem; height: 3rem"
  />
</template>
