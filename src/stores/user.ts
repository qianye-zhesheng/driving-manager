import { defineStore } from 'pinia'
import { fetchAuthSession, getCurrentUser, type AuthSession } from 'aws-amplify/auth'
import { ref } from 'vue'
import { useErrorStore } from '@/stores/error'
import { AuthSessionIdToken } from '@/logic/auth/auth-session-id-token'

export const useUserStore = defineStore('user', () => {
  const errorStore = useErrorStore()

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
      errorStore.addError('ユーザー情報の取得に失敗しました。再度ログインしてください。')
      throw error
    }
    return userId.value
  }

  function clearUser() {
    userId.value = ''
    idToken.value = ''
  }

  async function fetchIdToken(): Promise<string> {
    try {
      const authSession: AuthSession = await fetchAuthSession()
      idToken.value = AuthSessionIdToken.of(authSession).get()
    } catch (error) {
      errorStore.addError('認証情報の取得に失敗しました。再度ログインしてください。')
      throw error
    }
    return idToken.value
  }

  return { isAuthenticated, fetchUserId, clearUser, fetchIdToken }
})
