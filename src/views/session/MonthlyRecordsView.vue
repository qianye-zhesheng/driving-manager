<script setup lang="ts">
import SmartSubmitForm from '@/components/form/smart-submit-form.vue'
import { GetMonthlyRecordsApi } from '@/logic/session/monthly/get-monthly-records-api'
import type { MonthlyRecordSearchForm } from '@/logic/session/monthly/search-form'
import { reactive, ref } from 'vue'
import type { TableFieldRaw } from 'bootstrap-vue-next'
import YearMonthSelector from '@/components/form/YearMonthSelector.vue'
import {
  FormattedMonthlyRecords,
  type FormattedSessionRecord,
} from '@/logic/session/monthly/formatted-monthly-records'

const searchForm = reactive<MonthlyRecordSearchForm>({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
})

const monthlyRecords = ref<FormattedMonthlyRecords | null>(null)

const fields: TableFieldRaw<FormattedSessionRecord>[] = [
  { key: 'operationDate', label: '日付' },
  { key: 'startOdometer', label: '開始' },
  { key: 'endOdometer', label: '終了' },
  { key: 'officialDistance', label: '業務' },
  { key: 'privateDistance', label: '私用' },
]

const onSubmit = async (): Promise<void> => {
  monthlyRecords.value = await new GetMonthlyRecordsApi(searchForm)
    .get()
    .then((data) => new FormattedMonthlyRecords(data))
}
</script>
<template>
  <PageTitle title="月間距離一覧" />
  <SmartSubmitForm :onSubmit="onSubmit" v-slot="{ submitting }" class="mb-3">
    <YearMonthSelector v-model:year="searchForm.year" v-model:month="searchForm.month" />

    <BButton type="submit" variant="primary" :disabled="submitting">検索</BButton>
  </SmartSubmitForm>

  <template v-if="monthlyRecords">
    <h2 class="mb-3">{{ monthlyRecords.summary.year }}年{{ monthlyRecords.summary.month }}月</h2>
    <p class="mb-3">
      業務走行: {{ monthlyRecords.summary.totalOfficialDistance }} ({{
        monthlyRecords.summary.officialPercentage
      }})<br />
      私用走行: {{ monthlyRecords.summary.totalPrivateDistance }} ({{
        monthlyRecords.summary.privatePercentage
      }})
    </p>

    <BTable
      v-if="monthlyRecords.records.length > 0"
      :items="monthlyRecords.records"
      :fields="fields"
      striped
      bordered
      responsive
      class="mb-3"
    />
  </template>
</template>
