import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { authApi, registerApi } from '@/api'
import { RegisterDonatorArgs, RegisterOrgArgs, LoginArgs } from '@/types'
import { flash, EmitTypes } from '@/logics/emitter'

import type { JWTToken } from '@/api'

export const userId = useStorage<string>('user_id', '')
export const userToken = useStorage<string>('access_token', '')
export const userRefreshToken = useStorage<string>('fresh_token', '')

export function useAuth() {
  const router = useRouter()

  const isAuthorized = computed(() => {
    return userToken.value !== ''
  })

  function login(user: LoginArgs) {
    const loading = ref(true)
    const result = ref<JWTToken | null>(null)
    const error = ref<any>(null)

    authApi.createJwtToken({
      username: user.username,
      password: user.password,
    }).then(({ data }) => {
      const { access, refresh } = data

      userToken.value = access
      userRefreshToken.value = refresh || ''

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
  function loginWithLine() {
    window.open('https://shared-tw.herokuapp.com/oauth/line/login?next=/oauth/interaction')
  }
  function loginWithFacebook() {
    // eslint-disable-next-line no-alert
    alert('Login with Facebook')
  }
  function loginWithGoogle() {
    // eslint-disable-next-line no-alert
    alert('Login with Google')
  }

  function logout() {
    userToken.value = ''
    userRefreshToken.value = ''
    router.push('/')

    flash('已登出', EmitTypes.Success)
  }

  function resetPassword(email: string) {
    // eslint-disable-next-line no-alert
    alert(email)
  }

  function registerDonator(data: RegisterDonatorArgs) {
    const {
      email,
      tel,
      otherContactType,
      otherContent,
    } = data

    const loading = ref(true)
    const error = ref<any>(null)

    registerApi.createDonator({
      email,
      phone: tel,
      other_contact_method: otherContactType,
      other_contact: otherContent || '',
    }).then(({ data }) => {
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

  function registerOrg(data: RegisterOrgArgs) {
    const {
      username,
      password,
      passwordConfirm,
      tel,
      otherContactType,
      otherContent,
      orgType,
      orgTypeOther,
      orgCity,
      orgAddress,
      orgOfficeHours,
      orgName,
    } = data

    const loading = ref(true)
    const error = ref<any>(null)

    registerApi.createOrganization({
      email: '',
      username,
      password,
      confirmed_password: passwordConfirm,
      name: orgName,
      type: orgType,
      type_other: orgTypeOther || '',
      city: orgCity,
      phone: tel,
      address: orgAddress,
      office_hours: orgOfficeHours,
      other_contact_method: otherContactType,
      other_contact: otherContent || '',
    }).then(({ data }) => {
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
    loginWithLine,
    loginWithFacebook,
    loginWithGoogle,
    logout,
    isAuthorized,
    resetPassword,
    registerDonator,
    registerOrg,
  }
}
