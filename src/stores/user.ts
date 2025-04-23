import { defineStore } from 'pinia'
import { getCurrentUser } from 'aws-amplify/auth'

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

  return { isAuthenticated }
})
