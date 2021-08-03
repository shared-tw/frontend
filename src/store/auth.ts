import { reactive, watch } from 'vue'
import { router } from '@/router'
import { authApi, registerApi } from '@/api'
import httpClient from '@/api/httpClient'

import type { JWTTokenCreation, DonatorCreation, OrganizationCreation, Donator, Organization } from '@/api'
import { useStorage } from '@vueuse/core'

const auth = useStorage('authenticated', 'false')

const state = reactive<{
  token: string
  authenticated: boolean
  donator: Donator | null
  org: Organization | null
}>({
  token: '',
  authenticated: auth.value === 'true',
  donator: null,
  org: null,
})

watch(() => state.token, (token) => {
  if (state.token) {
    state.authenticated = true
    // set to authenticated
    auth.value = 'true'
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    state.authenticated = false
    // remove authenticated
    auth.value = 'false'
    delete httpClient.defaults.headers.common.Authorization
  }
})

const actions = {
  async login(loginData: JWTTokenCreation) {
    return authApi.createJwtToken(loginData)
      .then((res) => {
        state.token = res.data.access
        router.push('/')
      })
      .catch((err) => {
        state.token = ''
        return Promise.reject(err)
      })
  },
  async logout() {
    state.token = ''
    router.push('/')
  },
  async refreshToken() {
    return authApi.refreshJwtToken()
      .then((res) => {
        state.token = res.data.access
        return Promise.resolve(state.token)
      })
      .catch(() => {
        Promise.resolve()
      })
  },
  async registerDonator(data: DonatorCreation) {
    return registerApi.createDonator(data)
      .then((res) => {
        state.donator = res.data
        return Promise.resolve(res.data)
      })
  },
  async registerOrg(data: OrganizationCreation) {
    return registerApi.createOrganization(data)
      .then((res) => {
        state.org = res.data
        return Promise.resolve(res.data)
      })
  },
}

export default {
  state,
  actions,
}
