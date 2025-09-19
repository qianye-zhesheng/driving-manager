<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { ref } from 'vue'

const props = defineProps<{
  onSubmit: () => Promise<void>
}>()

const submitting = ref(false)

const loadingStore = useLoadingStore()

const handleSubmit = async () => {
  if (submitting.value) {
    return
  }
  submitting.value = true
  loadingStore.startLoading()
  try {
    await props.onSubmit()
  } finally {
    loadingStore.finishLoading()
    submitting.value = false
  }
}
</script>
<template>
  <BForm @submit.prevent="handleSubmit">
    <slot :submitting="submitting" />
  </BForm>
</template>
