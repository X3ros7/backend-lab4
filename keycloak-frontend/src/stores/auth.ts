import { defineStore } from 'pinia'
import keycloak from '@/services/keycloak.ts'
import { ref, watch } from 'vue'
import type { KeycloakProfile } from 'keycloak-js'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref<boolean>(false)
  const userInfo = ref<Object>({})

  watch(
    () => authenticated.value,
    async (newValue) => {
      if (newValue) {
        userInfo.value = JSON.parse(JSON.stringify(await keycloak.loadUserProfile()))
      } else {
        userInfo.value = {}
      }
    },
  )
  const login = async (path: any) => {
    await keycloak.login({
      redirectUri: window.location.origin + '/callback?path=' + path,
    })
  }
  const logout = async () => {
    await keycloak.logout({
      redirectUri: window.location.origin,
    })
    authenticated.value = false
  }
  const keycloakInstance = () => {
    return keycloak
  }
  return {
    authenticated,
    userInfo,
    login,
    logout,
    keycloakInstance,
  }
})
