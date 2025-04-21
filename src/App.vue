<script setup lang="ts">
import { illnessQuestion } from '@/logic/check/im-safe/questions'
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'

console.log(illnessQuestion.text)
</script>

<template>
  <p>{{ illnessQuestion.text }}</p>
  <ul>
    <li v-for="(option, index) in illnessQuestion.options" :key="index">
      {{ option.label }}
    </li>
  </ul>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
