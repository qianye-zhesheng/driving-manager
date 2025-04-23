<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <BListGroup class="container mt-3">
    <BListGroupItem
      ><RouterLink class="btn btn-outline-primary" :to="{ name: 'check' }"
        >運行前チェック</RouterLink
      ></BListGroupItem
    >
    <BListGroupItem>運行開始</BListGroupItem>
    <BListGroupItem>運行終了</BListGroupItem>
  </BListGroup>
</template>
