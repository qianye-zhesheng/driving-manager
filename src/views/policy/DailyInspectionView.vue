<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="運行前点検" />
  <section>
    <h2 class="mb-3">点検項目</h2>
    <BListGroup class="mb-3">
      <BListGroupItem>前ブレーキの遊び（1〜2cm）</BListGroupItem>
      <BListGroupItem>後ブレーキの遊び（2〜3cm）</BListGroupItem>
      <BListGroupItem>前輪タイヤ</BListGroupItem>
      <BListGroupItem>後輪タイヤ</BListGroupItem>
      <BListGroupItem>エンジン始動</BListGroupItem>
      <BListGroupItem>前側の指示器</BListGroupItem>
      <BListGroupItem>フロントライト点灯・切り替え</BListGroupItem>
      <BListGroupItem>クラクション</BListGroupItem>
      <BListGroupItem>後側の指示器</BListGroupItem>
      <BListGroupItem>テールランプ点灯</BListGroupItem>
      <BListGroupItem>前ブレーキランプ点灯</BListGroupItem>
      <BListGroupItem>後ブレーキランプ点灯</BListGroupItem>
      <BListGroupItem>エンジン停止</BListGroupItem>
      <BListGroupItem>エンジンオイル（雨天時は省略可）</BListGroupItem>
    </BListGroup>
  </section>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
