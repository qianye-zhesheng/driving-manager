<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  title: string
}

defineProps<Props>()
</script>
<template>
  <h1 class="my-3 text-dark">{{ title }}</h1>
</template>
