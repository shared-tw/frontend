import { API_ENDPOINT } from '@/constants'
import { axios } from '@/logics/axios'
import { AuthenticationApi, RegistrationApi, DonatorApi, OrganizationApi } from './generate'

export const authApi = new AuthenticationApi(undefined, API_ENDPOINT)
export const registerApi = new RegistrationApi(undefined, API_ENDPOINT)
export const donationApi = new DonatorApi(undefined, API_ENDPOINT)

export const orgApi = new OrganizationApi(undefined, API_ENDPOINT, axios)

export * from './generate'
export * from './donation'
