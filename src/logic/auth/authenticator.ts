import { fetchAuthSession, getCurrentUser, type AuthSession } from 'aws-amplify/auth'
import { useErrorStore } from '@/stores/error'
import { AuthSessionIdToken } from '@/logic/auth/auth-session-id-token'

export class Authenticator {
  public static async isAuthenticated(): Promise<boolean> {
    try {
      await getCurrentUser()
      return true
    } catch (error) {
      console.log('User not authenticated:', error)
      return false
    }
  }

  public static async fetchIdToken(): Promise<string> {
    const errorStore = useErrorStore()

    try {
      const authSession: AuthSession = await fetchAuthSession()
      return AuthSessionIdToken.of(authSession).get()
    } catch (error) {
      errorStore.addError('認証情報の取得に失敗しました。再度ログインしてください。')
      throw error
    }
  }
}
