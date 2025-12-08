<script setup lang="ts">
import SmartSubmitForm from '@/components/form/smart-submit-form.vue'
import PageTitle from '@/components/PageTitle.vue'
import { DeployMode } from '@/config/deploy-mode'
import { GetApi } from '@/logic/api/get-api'
import { PostApi } from '@/logic/api/post-api'
import { PutApi } from '@/logic/api/put-api'
import { reactive } from 'vue'
const isDevelopment = DeployMode.isDevelopment()

interface InputForm {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string | undefined
  body: string | undefined
}

const form = reactive<InputForm>({
  method: 'POST',
  endpoint: undefined,
  body: undefined,
})

interface Result {
  status: number
  body: string
}

const result = reactive<Result>({
  status: 0,
  body: '',
})

const methods = ['GET', 'POST', 'PUT']

const onSubmit = async (): Promise<void> => {
  result.status = 0
  result.body = ''

  if (form.method === 'GET') {
    try {
      const response = await GetApi.configure()
        .setPath(form.endpoint as string)
        .setParameters(JSON.parse(form.body as string))
        .build()
        .send()
      result.body = response.getBody() as string
      result.status = response.getStatusCode()
    } catch (error) {
      result.body = (error as Error).message
    }
    return
  }

  if (form.method === 'POST') {
    try {
      const response = await PostApi.configure()
        .setPath(form.endpoint as string)
        .setBody(JSON.parse(form.body as string))
        .build()
        .send()
      result.body = response.getBody() as string
      result.status = response.getStatusCode()
    } catch (error) {
      result.body = (error as Error).message
    }
    return
  }

  if (form.method === 'PUT') {
    try {
      const response = await PutApi.configure()
        .setPath(form.endpoint as string)
        .setBody(JSON.parse(form.body as string))
        .build()
        .send()
      result.body = response.getBody() as string
      result.status = response.getStatusCode()
    } catch (error) {
      result.body = (error as Error).message
    }
    return
  }
}
</script>
<template>
  <PageTitle title="バックエンドAPIテスト" />
  <div v-if="isDevelopment">
    <p class="mb-2">この画面は開発環境でのみ表示されます。</p>
    <SmartSubmitForm :onSubmit="onSubmit" v-slot="{ submitting }">
      <BFormGroup label="HTTPメソッド" class="mb-4">
        <BFormSelect v-model="form.method" :options="methods" name="method" class="ms-3" required />
      </BFormGroup>
      <BFormGroup label="エンドポイント(冒頭・末尾にスラッシュは不要)" class="mb-4">
        <BFormInput
          type="text"
          v-model="form.endpoint"
          placeholder="sample/post-data"
          name="endpoint"
          class="ms-3"
          required
        />
      </BFormGroup>
      <BFormGroup label="リクエストボディ(JSON形式)" class="mb-4">
        <BFormTextarea
          v-model="form.body"
          placeholder='例: {"key": "value"}'
          rows="6"
          class="ms-3"
          required
        ></BFormTextarea>
      </BFormGroup>
      <BButton type="submit" variant="primary" class="mb-4" :disabled="submitting">送信</BButton>
    </SmartSubmitForm>
    <p class="mb3">status: {{ result.status }}</p>
    <pre>body: {{ result.body }}</pre>
  </div>
  <div v-else>
    <p>開発環境以外では使用できません。</p>
  </div>
</template>
