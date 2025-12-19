<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { signOut } from 'aws-amplify/auth'
import { DeployMode } from '@/config/deploy-mode'
import { Authenticator } from '@/logic/auth/authenticator'

const isAuthenticated = ref(false)

const isDevelopmentMode: boolean = DeployMode.isDevelopment()

onMounted(async () => {
  isAuthenticated.value = await Authenticator.isAuthenticated()
})

async function onSignOut() {
  await signOut()
}
</script>
<template>
  <header
    class="container-fluid d-flex justify-content-between align-items-center py-3 bg-primary bg-gradient text-white"
  >
    <h1>
      <RouterLink class="text-light text-decoration-none" :to="{ name: 'home' }"
        >Driving Manager</RouterLink
      >
      <span v-if="isDevelopmentMode" class="bg-warning text-dark ms-5 px-3 fs-2">Development</span>
    </h1>
    <BButton variant="light" v-if="isAuthenticated" @click="onSignOut">ログアウト</BButton>
  </header>
</template>
