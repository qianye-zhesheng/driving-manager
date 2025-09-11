<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <BListGroup class="container mt-3">
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
  </BListGroup>
</template>
