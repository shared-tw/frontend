import { userApi } from '@/api'

import type { UserMe } from '@/api'

const state = reactive<{
  user: UserMe | null
}>({
  user: null,
})

const actions = {
  async getUser() {
    return userApi
      .getUsersMe()
      .then(({ data }) => {
        state.user = data
      })
  },
}

export default {
  state,
  actions,
}
