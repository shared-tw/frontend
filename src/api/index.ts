import config from '@/config'
import httpClient from '@/api/httpClient'
import { AuthenticationApi, RegistrationApi, DonatorApi, OrganizationApi } from './generate'

export const authApi = new AuthenticationApi(undefined, config.apiUrl, httpClient)
export const registerApi = new RegistrationApi(undefined, config.apiUrl, httpClient)
export const donationApi = new DonatorApi(undefined, config.apiUrl, httpClient)

export const orgApi = new OrganizationApi(undefined, config.apiUrl, httpClient)

export * from './generate'
