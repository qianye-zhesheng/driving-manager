import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Amplify } from 'aws-amplify'
import awsConfig from '@/config/aws-config.dev'
import AmplifyVue from '@aws-amplify/ui-vue'

Amplify.configure(awsConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AmplifyVue)

app.mount('#app')
