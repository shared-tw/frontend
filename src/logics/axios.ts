import Axios from 'axios'
import { userToken } from '@/logics/auth'
import { authApi } from '@/api'

const axios = Axios.create({
  timeout: 1000,
})

axios.interceptors.request.use((config) => {
  // checking if accessToken exists
  if (userToken.value) {
    config.headers.Authorization = userToken.value
  }
  return config
})

axios.interceptors.response.use(
  response => response,
  async(error) => {
    // extracting response and config objects
    const { response, config } = error
    // checking if error is Authorized error
    if (response.status === 401) {
      // if refresh token exists in local storage proceed
      try {
        // try refreshing token
        const { data } = await authApi.refreshJwtToken()
        const accessToken = data.access
        if (accessToken) {
          // if request is successiful and token exists in response data
          // store it in local storage
          userToken.value = accessToken
          // with new token retry original request
          config.headers.Authorization = accessToken
          return axios(config)
        }
      } catch (e) {
        userToken.value = null
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
    return error
  },
)

export {
  axios,
}
