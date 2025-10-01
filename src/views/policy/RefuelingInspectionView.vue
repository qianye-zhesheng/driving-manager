<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="給油時点検" />
  <section>
    <h2 class="mb-3">点検項目</h2>
    <BListGroup class="mb-3">
      <BListGroupItem>タイヤ空気圧調整</BListGroupItem>
    </BListGroup>
    <p>【注】空気を入れた後、携帯用空気圧計で別途計測する場合は、規定の空気圧+30kPaを入れる。</p>
  </section>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
