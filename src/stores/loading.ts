import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(false)

  function isLoading(): boolean {
    return loading.value
  }

  function startLoading(): void {
    loading.value = true
  }

  function finishLoading(): void {
    loading.value = false
  }

  return { loading, isLoading, startLoading, finishLoading }
})
