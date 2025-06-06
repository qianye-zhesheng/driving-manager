import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import App from './App.vue'
import router from './router'
import { Amplify } from 'aws-amplify'
import awsConfig from '@/config/aws-config'
import { useErrorStore } from '@/stores/error'

Amplify.configure(awsConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createBootstrap())

app.config.errorHandler = (err, instance, info) => {
  console.error('Error:', err)
  console.error('Component instance:', instance)
  console.error('Info:', info)

  const errorStore = useErrorStore()
  errorStore.addError('アプリケーションエラーが発生しました。ホーム画面から再度お試しください。')
}

app.mount('#app')
