import { flash, FlashMessageTypes } from '@/logics/emitter'
import authStore from '@/store/auth'
import config from '@/config'

import type { JWTTokenCreation, DonatorCreation, OrganizationCreation } from '@/api'

export function useAuth() {
  const isAuthorized = computed(() => authStore.state.authenticated)

  function login(user: JWTTokenCreation) {
    const loading = ref(true)

    authStore.actions.login(user)
      .then(() => {
        loading.value = false
        flash('成功登入', { type: FlashMessageTypes.success })
      })

    return {
      loading,
    }
  }

  function logout() {
    authStore.actions.logout()
    flash('已登出', { type: FlashMessageTypes.success })
  }

  function registerDonator(data: DonatorCreation) {
    const loading = ref(true)

    authStore.actions.registerDonator(data)
      .then(() => {
        loading.value = false
        flash('註冊成功', { type: FlashMessageTypes.success })
      })

    return {
      loading,
    }
  }

  function registerOrg(data: OrganizationCreation) {
    const {
      username,
      password,
    } = data

    const loading = ref(true)

    authStore.actions.registerOrg(data)
      .then(() => {
        loading.value = false
        flash('註冊成功', { type: FlashMessageTypes.success })

        login({
          username,
          password,
        })
      })

    return {
      loading,
    }
  }

  function resetPassword(email: string) {
    // eslint-disable-next-line no-console
    console.log(email)
  }

  const lineLoginUrl = config.SSOUrls.line

  return {
    login,
    lineLoginUrl,
    logout,
    isAuthorized,
    registerDonator,
    registerOrg,
    resetPassword,
  }
}
