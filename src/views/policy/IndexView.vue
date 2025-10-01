<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
</script>
<template>
  <PageTitle title="規程集" />
  <BListGroup class="mb-3">
    <BListGroupItem :to="{ name: 'policy.daily-inspection' }">運行前点検</BListGroupItem>
    <BListGroupItem :to="{ name: 'policy.refueling-inspection' }">給油時点検</BListGroupItem>
    <BListGroupItem :to="{ name: 'policy.monthly-inspection' }">月次点検</BListGroupItem>
    <BListGroupItem :to="{ name: 'policy.annual-inspection' }">年次点検</BListGroupItem>
  </BListGroup>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'home' }">ホームへ戻る</RouterLink></p>
</template>
