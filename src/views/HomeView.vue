<script setup lang="ts">
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <BListGroup class="container my-3">
    <BListGroupItem
      ><RouterLink class="btn btn-outline-primary" :to="{ name: 'check.check-start' }"
        >運行前チェック</RouterLink
      ></BListGroupItem
    >
    <BListGroupItem>
      <RouterLink class="btn btn-outline-primary" :to="{ name: 'session.input-start' }"
        >運行開始</RouterLink
      >
    </BListGroupItem>
    <BListGroupItem
      ><RouterLink class="btn btn-outline-primary" :to="{ name: 'session.input-end' }"
        >運行終了</RouterLink
      ></BListGroupItem
    >
    <BListGroupItem
      ><RouterLink class="btn btn-outline-primary" :to="{ name: 'session.monthly-records' }"
        >月間距離一覧</RouterLink
      ></BListGroupItem
    >
    <BListGroupItem
      ><RouterLink class="btn btn-outline-primary" :to="{ name: 'policy.index' }"
        >規程集</RouterLink
      ></BListGroupItem
    >
  </BListGroup>
  <DashboardPanel />
</template>
