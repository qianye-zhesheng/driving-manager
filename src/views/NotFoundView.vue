<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <PageTitle title="404 Not Found" />
  <p>
    お探しのページは見つかりません。<RouterLink :to="{ name: 'home' }">ホームに戻る</RouterLink>
  </p>
</template>
