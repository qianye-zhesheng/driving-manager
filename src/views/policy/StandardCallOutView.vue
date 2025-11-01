<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="スタンダードコールアウト" />
  <section>
    <h2 class="mb-3">目的</h2>
    <p>運行時に抜け漏れなく安全確認を行うため、状況ごとのコールアウトを定める。</p>
  </section>
  <section>
    <h2 class="mb-3">対象</h2>
    <p>バイクの運行時を対象とする。</p>
  </section>
  <section>
    <h2 class="mb-3">内容</h2>

    <BAccordion free class="mb-3">
      <BAccordionItem title="路上からの発進時">
        （右バックミラーを見て） ミラーよし<br />
        後ろよし
      </BAccordionItem>

      <BAccordionItem title="路上からのUターン発進時">
        （右バックミラーを見て） ミラーよし<br />
        後ろよし<br />
        対向よし
      </BAccordionItem>

      <BAccordionItem title="信号待ちからの発進時">
        （左バックミラーを見て）ミラーよし<br />
        （右バックミラーを見て）ミラーよし<br />
        信号よし
      </BAccordionItem>

      <BAccordionItem title="交差点の直進時">
        （交差点に入る前に）<br />
        （信号があれば）信号よし<br />
        対向よし<br />
        <br />
        （交差点に差しかかってから）<br />
        右よし<br />
        左よし
      </BAccordionItem>

      <BAccordionItem title="交差点の左折時">
        （交差点に入る前に）<br />
        （信号があれば）信号よし<br />
        対向よし<br />
        <br />
        （左バックミラーを見て）ミラーよし<br />
        後ろよし<br />
        <br />
        歩行者よし
      </BAccordionItem>

      <BAccordionItem title="交差点の右折時">
        （信号があれば）信号よし（停止線を越えて一旦停止）<br />
        <br />
        （対向車がいなくなってから）<br />
        対向よし<br />
        後ろよし<br />
        <br />
        歩行者よし
      </BAccordionItem>

      <BAccordionItem title="住宅街の交差点の直進時">
        右よし<br />
        左よし
      </BAccordionItem>

      <BAccordionItem title="住宅街の交差点の左折時">
        右よし<br />
        左よし<br />
        <br />
        （左バックミラーを見て）ミラーよし<br />
        後ろよし
      </BAccordionItem>

      <BAccordionItem title="住宅街の交差点の右折時">
        右よし<br />
        左よし<br />
        対向よし<br />
        <br />
        （右バックミラーを見て）ミラーよし<br />
        後ろよし
      </BAccordionItem>

      <BAccordionItem title="非優先道路から交差点に入るとき、または出庫するとき">
        （カーブミラーを見て）ミラーよし<br />
        <br />
        （交差点のギリギリ手前で、歩行者・自転車の飛び出し確認）<br />
        左よし<br />
        右よし<br />
        <br />
        （交差点に少し頭を出して）<br />
        右よし<br />
        左よし<br />
        対向よし<br />
        <br />
        <strong>その後左折・右折する場合</strong><br />
        後ろよし
      </BAccordionItem>

      <BAccordionItem title="車線変更するとき">
        前よし<br />
        （アクセルをニュートラルにする）<br />
        <br />
        （バックミラーを見て）ミラーよし<br />
        後ろよし
      </BAccordionItem>

      <BAccordionItem title="路上に停車するとき">
        （左バックミラーを見て）ミラーよし<br />
        後ろよし
      </BAccordionItem>

      <BAccordionItem title="停車車両等の障害物があるとき">
        対向よし<br />
        （右バックミラーを見て）ミラーよし<br />
        後ろよし<br />
        <br />
        （障害物の右を通過）<br />
        <br />
        （障害物の終端の手前で）<br />
        飛び出しよし<br />
        <br />
        （障害物を通過したら）<br />
        （左バックミラーを見て）ミラーよし<br />
        後ろよし
      </BAccordionItem>

      <BAccordionItem title="物陰があるとき">
        （例）<br />
        ・曲がり角<br />
        ・車庫の出口があるところ<br />
        ・中央分離帯が途切れているところ<br />
        ・公園やこども施設の入口<br />
        ・カーブミラーがある脇道<br />
        <br />
        （カーブミラーがあれば見て）ミラーよし<br />
        飛び出しよし
      </BAccordionItem>

      <BAccordionItem title="交差点以外で横断歩道があるとき">
        （横断歩道の標識を視認したら）<br />
        横断歩道<br />
        <br />
        （歩行者がいないことを見て）歩行者よし
      </BAccordionItem>

      <BAccordionItem title="右への合流">
        前よし<br />
        （右バックミラーを見て）ミラーよし<br />
        後ろよし
      </BAccordionItem>
    </BAccordion>
  </section>
  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
