import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const errorMessage = ref('')

  function setError(message: string): void {
    errorMessage.value = message
  }
  function clearError(): void {
    errorMessage.value = ''
  }
  function hasError(): boolean {
    return errorMessage.value !== ''
  }
  return { errorMessage, setError, clearError, hasError }
})
