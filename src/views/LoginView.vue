<script setup lang="ts">
import { signInWithRedirect } from 'aws-amplify/auth'
import { signOut } from 'aws-amplify/auth'
async function signIn() {
  await signInWithRedirect()
}

async function onSignOut() {
  await signOut()
}
</script>
<template>
  <section>
    <h1>login</h1>
    <button @click="signIn">Sign In</button>
    <button @click="onSignOut">Sign Out</button>
  </section>
</template>
