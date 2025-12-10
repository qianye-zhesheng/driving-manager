<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <PageTitle title="月次定期訓練" />
  <section>
    <h2 class="mb-3">目的</h2>
    <p>非常事態発生時に冷静に対応できるよう、イメージトレーニングを行う。</p>
  </section>

  <section>
    <h2 class="mb-3">実施時期</h2>
    <p>毎月月初に実施</p>
  </section>

  <section>
    <h2 class="mb-3">内容</h2>

    <h3 class="mb-2">事故発生時の緊急対応</h3>

    <BAccordion free class="mb-3">
      <BAccordionItem title="1. 二次災害の防止">バイクを安全な場所に移動する</BAccordionItem>

      <BAccordionItem title="2. けが人の救護">
        <a href="https://www.med.or.jp/99/cpr.html" target="_blank" rel="noopener noreferrer"
          >心肺蘇生法</a
        ><br />
        必要であれば119番通報
      </BAccordionItem>

      <BAccordionItem title="3. 警察に連絡">110番通報</BAccordionItem>

      <BAccordionItem title="4. 相手方の確認"
        >以下を免許証等により確認する<br />
        <ul>
          <li>氏名</li>
          <li>住所</li>
          <li>連絡先</li>
          <li>けがの内容</li>
        </ul>
        相手が車両の場合はさらに以下を確認する<br />
        <ul>
          <li>ナンバー</li>
          <li>車名</li>
          <li>車両の色</li>
          <li>車両の損傷箇所</li>
          <li>保険会社名・証券番号</li>
        </ul></BAccordionItem
      >

      <BAccordionItem title="5. 目撃者の確認"
        >目撃者がいれば、氏名・連絡先を確認する</BAccordionItem
      >

      <BAccordionItem title="6. 任意保険の事故受付に連絡">
        アクサ損害保険 バイク保険 <a href="tel:0120699644">0120-699-644</a>
      </BAccordionItem>

      <BAccordionItem title="7. 物的損害を記録">車両や周囲の損害状況を写真に撮る</BAccordionItem>

      <BAccordionItem title="8. 配達プラットフォームのサポートに連絡">
        Uber Driverアプリ内で以下を行う<br />
        <ul>
          <li>サポートに連絡して、配達中のリクエストをキャンセルする</li>
          <li>盾のマークをタップして、「事故を報告する」から事故報告を行う</li>
        </ul>
      </BAccordionItem>
    </BAccordion>

    <h3 class="mb-2">事後の対応</h3>

    <BAccordion free class="mb-3">
      <BAccordionItem title="事故証明の取得">交通事故証明書を取得する</BAccordionItem>

      <BAccordionItem title="加害者側の事後対応"
        >お見舞いに伺う<br />
        保険会社を通じて示談交渉を行う</BAccordionItem
      >

      <BAccordionItem title="被害者側の事後対応">
        治療が終わったら、事故の日から2年以内に加害者側の保険会社と示談交渉を行う<br />
        治療が長引く場合は、加害者側の自賠責保険に仮渡金請求もできる
      </BAccordionItem>
    </BAccordion>
  </section>

  <p><RouterLink class="btn btn-primary" :to="{ name: 'policy.index' }">戻る</RouterLink></p>
</template>
