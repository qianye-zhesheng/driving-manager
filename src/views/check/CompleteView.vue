<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="運行前チェック" />
  <p>送信しました（ダミー）</p>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'home' }">ホームへ戻る</RouterLink></p>
</template>
