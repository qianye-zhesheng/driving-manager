<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="復帰訓練" />
  <section>
    <h2 class="mb-3">実施時期</h2>
    <p>1ヶ月以上運行を休んだとき、復帰前に実施</p>
  </section>
  <section>
    <h2 class="mb-3">運行手順訓練</h2>
    <p>スタンダードコールアウトを実践しながら走行訓練を行う。</p>
    <p>
      一周30分コース×2回<br />
      （スタンダードコールアウトの項目をすべて使うようコースを設定する）
    </p>
    <p>各回の後にはふりかえりを行う。</p>
  </section>
  <section>
    <h2 class="mb-3">ナビゲーション訓練</h2>
    <p>配達ナビのナビゲーションによる、初見ルートへの到達訓練を行う。</p>
    <p>ランダムに選んだ場所へ3地点</p>
    <p>各回の後にはふりかえりを行う。</p>
  </section>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
