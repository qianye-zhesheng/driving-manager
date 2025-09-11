<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="運行終了" />
  <p>送信しました</p>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'home' }">ホームへ戻る</RouterLink></p>
</template>
