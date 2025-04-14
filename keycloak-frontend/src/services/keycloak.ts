// src/keycloak.ts
import Keycloak from 'keycloak-js'
import { useAuthStore } from '@/stores/auth.ts'

const keycloak = new Keycloak({
  url: 'http://localhost:8080/', // URL Keycloak-сервера
  realm: 'prosvetov',
  clientId: 'backend-examples-lab4',
})

export const initializeKeycloak = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    keycloak
      .init()
      .then((authenticated) => {
        resolve(authenticated)
        console.log('Keycloak initialized', authenticated)
      })
      .catch((err) => {
        console.error('Keycloak Initialization Error:', err)
        reject(err)
      })
  })
}

export default keycloak
