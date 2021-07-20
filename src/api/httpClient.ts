import Axios from 'axios'
import consola from 'consola'
import { useRouter } from 'vue-router'
import { flash, FlashMessageTypes } from '@/logics/emitter'
import authStore from '@/store/auth'
import config from '@/config'

import type { AxiosRequestConfig, AxiosError } from 'axios'

const httpClient = Axios.create({
  timeout: config.httpClientTimeout,
})

// For these paths, we force remove the withAuth flag.
const withCredentialPaths = [
  '/api/auth/token',
  '/api/auth/token/refresh',
]

// For these paths, we don't emit an error because we handle them
// downstream.
const excludeErrorHandlePaths = [
  '/access/login',
]

const requestInterceptor = async(config: AxiosRequestConfig) => {
  withCredentialPaths.forEach((path) => {
    if (config.url?.endsWith(path)) {
      config.withCredentials = true
    }
  })

  return config
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const errorInterceptor = async(error: AxiosError) => {
  let message: string | undefined

  // Check if its a network / server error.
  if (!error.response) {
    // Network / Server Error.
    if (error.message) message = error.message
    consola.debug(message || 'Network error')
    return Promise.reject(error)
  }

  // All other errors
  if (error.response.data) message = error.response.data
  if (error.response.data.error.message) message = error.response.data.error.message

  const url = error.config.url || ''
  switch (error.response.status) {
    case 500:
      consola.debug(error.response.status, error.message, message)
      flash(message || 'Server error', { type: FlashMessageTypes.error })
      break
    case 400:
      consola.debug(error.response.status, error.message, message)
      if (!excludeErrorHandlePaths.includes(url)) {
        flash(message || 'Server error', { type: FlashMessageTypes.error })
      }
      break
    case 401:
      // eslint-disable-next-line no-case-declarations
      if (url !== '/api/auth/token/refresh') {
        const token = await authStore.actions.refreshToken()
        if (token) {
          return httpClient(error.config)
        }
      } else {
        const router = useRouter()
        router.push('/login')
      }
      break
    case 404:
      consola.debug(error.response.status, error.message, message)
      break
    default:
      consola.debug(error.response.status, error.message)
      flash(message || 'Server error', { type: FlashMessageTypes.error })
  }

  return Promise.reject(error)
}

httpClient.interceptors.request.use(requestInterceptor, errorInterceptor)
httpClient.interceptors.response.use(response => response, errorInterceptor)

export default httpClient
