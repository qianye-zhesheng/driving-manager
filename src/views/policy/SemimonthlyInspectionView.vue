<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="半月毎点検" />
  <section>
    <h2 class="mb-3">実施時期</h2>
    <p>毎月15日に実施</p>
  </section>
  <section>
    <h2 class="mb-3">点検項目</h2>
    <BListGroup class="mb-3">
      <BListGroupItem>ヘルメットのシールドのコーティング</BListGroupItem>
    </BListGroup>
  </section>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
