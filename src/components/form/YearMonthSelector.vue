<script setup lang="ts">
import { START_YEAR } from '@/config/start-year'
import { computed } from 'vue'

const props = defineProps<{ year: number; month: number }>()
const emit = defineEmits<{
  (e: 'update:year', v: number): void
  (e: 'update:month', v: number): void
}>()

const year = computed<number>({
  get: () => props.year,
  set: (v) => emit('update:year', v),
})

const month = computed<number>({
  get: () => props.month,
  set: (v) => emit('update:month', v),
})

const END_YEAR = new Date().getFullYear() + 1

type Option = { value: number; text: string }

const yearOptions: Option[] = []

for (let y = START_YEAR; y <= END_YEAR; y++) {
  yearOptions.push({ value: y, text: `${y}年` })
}

const monthOptions: Option[] = []

for (let m = 1; m <= 12; m++) {
  monthOptions.push({ value: m, text: `${m}月` })
}
</script>
<template>
  <BFormSelect v-model="year" :options="yearOptions" class="mb-3" />

  <BFormSelect v-model="month" :options="monthOptions" class="mb-3" />
</template>
