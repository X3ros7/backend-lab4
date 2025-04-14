import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeKeycloak } from '@/services/keycloak.ts'
import { useAuthStore } from '@/stores/auth.ts'

initializeKeycloak()
  .then((authenticated) => {
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
    console.log('Keycloak initialized', authenticated)
    const authStore = useAuthStore()
    authStore.authenticated = authenticated
  })
  .catch((err) => {
    console.error('Keycloak init error', err)
  })




