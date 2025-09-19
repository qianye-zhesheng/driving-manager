<script setup lang="ts">
import SmartSubmitForm from '@/components/form/smart-submit-form.vue'
import { DateOption, type InputForm, dateOptions, isDateRequired } from '@/logic/session/input-form'
import { PutEndApi } from '@/logic/session/put-end-api'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive<InputForm>({
  dateOption: DateOption.Today,
  date: undefined,
  odometer: undefined,
})

const dateRequired = computed(() => isDateRequired(form.dateOption))

const onSubmit = async (): Promise<void> => {
  const successful = await new PutEndApi(form).put()
  if (successful) {
    router.replace({ name: 'session.start-complete' })
  }
}
</script>

<template>
  <PageTitle title="運行終了" />
  <SmartSubmitForm :onSubmit="onSubmit" v-slot="{ submitting }">
    <BFormRadioGroup
      v-model="form.dateOption"
      :options="dateOptions"
      name="date-options"
      class="mb-4"
    ></BFormRadioGroup>
    <BFormGroup label="日付" class="mb-4" v-if="dateRequired"
      ><BFormInput
        v-model="form.date"
        type="date"
        name="date"
        class="ms-3"
        :required="dateRequired"
      />
    </BFormGroup>
    <BFormGroup label="開始メーター値" class="mb-4"
      ><BFormInput
        v-model.number="form.odometer"
        type="number"
        name="odometer"
        class="ms-3"
        min="1"
        step="1"
        required
      />
    </BFormGroup>
    <BButton type="submit" variant="primary" :disabled="submitting">送信</BButton>
  </SmartSubmitForm>
</template>
