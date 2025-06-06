import type { AuthSession } from 'aws-amplify/auth'

export class AuthSessionIdToken {
  private readonly idToken: string

  private constructor(authSession: AuthSession) {
    const tokens = authSession.tokens
    if (tokens === undefined || tokens.idToken === undefined) {
      throw new Error('ID token not found in auth session')
    }
    this.idToken = tokens.idToken.toString()
  }

  public static of(authSession: AuthSession): AuthSessionIdToken {
    return new AuthSessionIdToken(authSession)
  }

  public get(): string {
    return this.idToken
  }
}
