<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
</script>

<template>
  <HeaderBar />
  <main class="container mb-5">
    <ErrorMessage />
    <LoadingSpinner />
    <RouterView />
  </main>
</template>
