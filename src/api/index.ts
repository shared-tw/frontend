import { API_ENDPOINT } from '@/constants'
import { axios } from '@/logics/axios'
import { AuthenticationApi, RegisterApi, PublicApi, OrganizationApi } from './generate'

export const authApi = new AuthenticationApi(undefined, API_ENDPOINT)
export const registerApi = new RegisterApi(undefined, API_ENDPOINT)
export const publicApi = new PublicApi(undefined, API_ENDPOINT)

export const orgApi = new OrganizationApi(undefined, API_ENDPOINT, axios)

export * from './generate'
