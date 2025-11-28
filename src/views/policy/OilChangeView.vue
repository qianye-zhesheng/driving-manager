<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="エンジンオイル交換" />
  <section>
    <h2 class="mb-3">実施時期</h2>
    <p>走行距離3000kmごと、または1年ごと</p>
  </section>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
