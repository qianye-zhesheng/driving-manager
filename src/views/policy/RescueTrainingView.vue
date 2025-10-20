<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="救命訓練" />
  <section>
    <h2 class="mb-3">実施時期</h2>
    <p>2年に1回実施</p>
  </section>
  <section>
    <h2 class="mb-3">内容</h2>
    <p>
      消防署等で行われる普通救命講習Ⅰ（成人向け心肺蘇生法）とⅢ（小児向け心肺蘇生法）を交互に受講する。
    </p>
  </section>

  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
