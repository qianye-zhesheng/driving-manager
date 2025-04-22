import type { ResourcesConfig } from 'aws-amplify'

const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'your_user_pool_id',
      userPoolClientId: 'your_user_pool_client_id',
      identityPoolId: 'your_identity_pool_id',
      loginWith: {
        email: true,
        oauth: {
          domain: 'your_cognito_domain',
          scopes: ['email', 'openid', 'phone'],
          redirectSignIn: ['http://localhost:5173/'],
          redirectSignOut: ['http://localhost:5173/'],
          responseType: 'code',
        },
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
        nickname: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
}

export default awsConfig
