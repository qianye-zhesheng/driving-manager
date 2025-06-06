import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const errorMessages = ref([] as string[])

  function addError(message: string): void {
    errorMessages.value.push(message)
  }
  function clearErrors(): void {
    errorMessages.value = [] as string[]
  }
  function hasErrors(): boolean {
    return errorMessages.value.length > 0
  }
  return { errorMessages, addError, clearErrors, hasErrors }
})
