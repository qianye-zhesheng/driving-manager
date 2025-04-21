import type { ResourcesConfig } from 'aws-amplify' // Adjust the import path as needed
// Adjust the import path as needed

const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'your_user_pool_id',
      userPoolClientId: 'your_user_pool_client_id',
      identityPoolId: 'your_identity_pool_id',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
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
