<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
</script>
<template>
  <PageTitle title="規程集" />
  <BListGroup class="mb-3">
    <BListGroupItem :to="{ name: 'policy.daily-inspection' }">運行前点検</BListGroupItem>
  </BListGroup>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'home' }">ホームへ戻る</RouterLink></p>
</template>
