import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { authApi, registerApi } from '@/api'
import { flash, EmitTypes } from '@/logics/emitter'

import type { JWTToken, JWTTokenCreation, DonatorCreation, OrganizationCreation } from '@/api'

export const userId = useStorage<string>('user_id', '')
export const userToken = ref<string | null>(null)

export function useAuth() {
  const router = useRouter()

  const isAuthorized = computed(() => {
    return !!userToken.value
  })

  function login(user: JWTTokenCreation) {
    const loading = ref(true)
    const result = ref<JWTToken | null>(null)
    const error = ref<any>(null)

    authApi.createJwtToken({
      username: user.username,
      password: user.password,
    }).then(({ data }) => {
      const { access } = data

      userToken.value = access

      result.value = data
      loading.value = false

      router.push('/')

      flash('登入成功', EmitTypes.Success)
    }).catch((err: Error) => {
      loading.value = false
      error.value = err
      // eslint-disable-next-line no-console
      console.error(err)

      flash('登入失敗', EmitTypes.Danger)
    })

    return {
      loading,
      error,
    }
  }

  // handle SSO logins
  const lineLoginUrl = 'https://shared-tw.icu/api/oauth/line/login?next=/oauth/interaction'

  function logout() {
    userToken.value = ''
    router.push('/')

    flash('已登出', EmitTypes.Success)
  }

  function resetPassword(email: string) {
    // eslint-disable-next-line no-alert
    alert(email)
  }

  function registerDonator(data: DonatorCreation) {
    const loading = ref(true)
    const error = ref<any>(null)

    registerApi.createDonator(data).then(({ data }) => {
      const { id } = data
      userId.value = `${id}`
      loading.value = false

      flash('註冊成功', EmitTypes.Success)
    }).catch((err: Error) => {
      loading.value = false
      error.value = err.message

      flash('註冊失敗', EmitTypes.Danger)

      // eslint-disable-next-line no-console
      console.error(err)
    })

    return {
      loading,
      error,
    }
  }

  function registerOrg(data: OrganizationCreation) {
    const {
      username,
      password,
    } = data

    const loading = ref(true)
    const error = ref<any>(null)

    registerApi.createOrganization(data).then(({ data }) => {
      const { id } = data
      userId.value = `${id}`
      loading.value = false

      flash('註冊成功', EmitTypes.Success)

      return login({
        username,
        password,
      })
    }).catch((err: Error) => {
      loading.value = false
      error.value = err.message

      flash('註冊失敗', EmitTypes.Danger)

      // eslint-disable-next-line no-console
      console.error(err)
    })

    return {
      loading,
      error,
    }
  }

  return {
    login,
    lineLoginUrl,
    logout,
    isAuthorized,
    resetPassword,
    registerDonator,
    registerOrg,
  }
}
