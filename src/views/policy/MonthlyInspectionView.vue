<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="月次点検" />
  <section>
    <h2 class="mb-3">実施時期</h2>
    <p>毎月月初に実施</p>
    <p>1ヶ月以上運行を休んだとき、復帰前に実施</p>
  </section>
  <section>
    <h2 class="mb-3">点検項目</h2>
    <BListGroup class="mb-3">
      <BListGroupItem>チェーンのたるみ</BListGroupItem>
      <BListGroupItem>チェーンの給油</BListGroupItem>
      <BListGroupItem>各部のネジ締め</BListGroupItem>
      <BListGroupItem>ヘルメットのシールド清掃</BListGroupItem>
      <BListGroupItem>タイヤ空気圧の調整</BListGroupItem>
    </BListGroup>
    <p>【注】規定の空気圧+30kPaを入れる。（バルブアタッチメントの着脱時に空気が漏れるため）</p>
  </section>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
