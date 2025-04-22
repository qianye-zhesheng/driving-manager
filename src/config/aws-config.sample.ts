import type { ResourcesConfig } from 'aws-amplify'

const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'your_user_pool_id',
      userPoolClientId: 'your_user_pool_client_id',
      loginWith: {
        oauth: {
          domain: 'your_cognito_domain',
          scopes: ['email', 'openid', 'phone'],
          redirectSignIn: ['http://localhost:5173/'],
          redirectSignOut: ['http://localhost:5173/'],
          responseType: 'code',
        },
      },
    },
  },
}

export default awsConfig
