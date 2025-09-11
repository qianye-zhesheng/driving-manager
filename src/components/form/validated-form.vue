<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  onSubmit: () => Promise<void>
}>()

const submitting = ref(false)
const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true
  try {
    await props.onSubmit()
  } finally {
    submitting.value = false
  }
}
</script>
<template>
  <BForm @submit.prevent="handleSubmit">
    <slot :submitting="submitting" />
  </BForm>
</template>
