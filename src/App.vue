<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
</script>

<template>
  <HeaderBar />
  <main class="container mb-5">
    <ErrorMessage />
    <RouterView />
  </main>
</template>
