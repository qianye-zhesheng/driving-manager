import { defineStore } from 'pinia'
import { fetchAuthSession, getCurrentUser, type AuthSession } from 'aws-amplify/auth'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  async function isAuthenticated(): Promise<boolean> {
    try {
      await getCurrentUser()
      return true
    } catch (error) {
      console.log('User not authenticated:', error)
      return false
    }
  }

  const userId = ref('')
  const idToken = ref('')

  async function fetchUserId(): Promise<string> {
    if (userId.value !== '') {
      return userId.value
    }

    try {
      const user = await getCurrentUser()
      userId.value = user?.userId
    } catch (error) {
      console.error('Error fetching user ID:', error)
      userId.value = ''
    }
    return userId.value
  }

  function clearUser() {
    userId.value = ''
    idToken.value = ''
  }

  async function fetchIdToken(): Promise<string> {
    if (idToken.value !== '') {
      return idToken.value
    }

    try {
      const authSession = await fetchAuthSession()
      idToken.value = pickIdTokenFrom(authSession)
    } catch (error) {
      console.error('Error fetching ID token:', error)
      idToken.value = ''
    }
    return idToken.value
  }

  function pickIdTokenFrom(authSession: AuthSession): string {
    const tokens = authSession.tokens
    if (tokens == undefined || tokens.idToken == undefined) {
      console.log('No ID token found in auth session')
      return ''
    }
    return tokens.idToken.toString()
  }

  return { isAuthenticated, fetchUserId, clearUser, fetchIdToken }
})
