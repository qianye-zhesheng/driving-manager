<script setup lang="ts">
import { illnessQuestion } from '@/logic/check/im-safe/questions'

console.log(illnessQuestion.text)
</script>

<template>
  <p>{{ illnessQuestion.text }}</p>
  <ul>
    <li v-for="(option, index) in illnessQuestion.options" :key="index">
      {{ option.label }}
    </li>
  </ul>
</template>
