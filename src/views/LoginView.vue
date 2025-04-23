<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { signInWithRedirect } from 'aws-amplify/auth'
import PageTitle from '@/components/PageTitle.vue'

const userStore = useUserStore()
const isAuthenticated = ref(false)

onMounted(async () => {
  isAuthenticated.value = await userStore.isAuthenticated()
})

async function signIn() {
  await signInWithRedirect()
}
</script>
<template>
  <template v-if="isAuthenticated">
    <p class="mt-3">
      すでにログインされています。<RouterLink :to="{ name: 'home' }">ホームに戻る</RouterLink>
    </p>
  </template>
  <template v-else>
    <PageTitle title="ログイン" />
    <BButton variant="outline-primary" @click="signIn">AWS Cognitoでログイン</BButton>
  </template>
</template>
