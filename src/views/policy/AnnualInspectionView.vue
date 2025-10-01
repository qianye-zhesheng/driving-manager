<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="年次点検" />
  <section>
    <h2 class="mb-3">実施時期</h2>
    <p>毎月10月初めに実施</p>
  </section>
  <section>
    <h2 class="mb-3">点検項目</h2>
    <BListGroup class="mb-3">
      <BListGroupItem>専門業者による12ヶ月点検</BListGroupItem>
      <BListGroupItem>ブリーザードレンの清掃</BListGroupItem>
    </BListGroup>
  </section>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
