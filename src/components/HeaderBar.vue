<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { signOut } from 'aws-amplify/auth'

const userStore = useUserStore()
const isAuthenticated = ref(false)

onMounted(async () => {
  isAuthenticated.value = await userStore.isAuthenticated()
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
    </h1>
    <BButton variant="light" v-if="isAuthenticated" @click="onSignOut">ログアウト</BButton>
  </header>
</template>
