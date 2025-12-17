<script setup lang="ts">
import { FormattedCurrentInfo } from '@/logic/dashboard/formatted-current-info'
import { GetCurrentInfoApi } from '@/logic/dashboard/get-current-info-api'
import { computed, onMounted, ref } from 'vue'

const currentInfo = ref<FormattedCurrentInfo>({})

onMounted(async () => {
  currentInfo.value = await new GetCurrentInfoApi()
    .get()
    .then((data) => new FormattedCurrentInfo(data))
})

const activeSessionTitle = computed(() => {
  if (currentInfo.value == undefined || currentInfo.value.activeSession == undefined) {
    return ''
  }
  return currentInfo.value.activeSession.date + 'の運行'
})
</script>
<template>
  <BCard v-if="currentInfo.todaysCheck" title="運行前チェック結果" class="mb-3">
    <BCardText
      >{{ currentInfo.todaysCheck.judgement }}<br />
      チェック日時：{{ currentInfo.todaysCheck.checkedAt }}</BCardText
    >
  </BCard>
  <BCard v-if="currentInfo.activeSession" :title="activeSessionTitle" class="mb-3">
    <BCardText>開始メーター値：{{ currentInfo.activeSession.startOdometer }}</BCardText>
  </BCard>
</template>
