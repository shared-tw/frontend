import { onMounted, ref } from 'vue'
import { donationApi } from '@/api'

import type { GroupedRequiredItems } from '@/api'
import { AxiosError } from 'axios'

const items = ref<GroupedRequiredItems[] | null>(null)

export function getDonationItems() {
  const error = ref<AxiosError | undefined>()
  onMounted(async() => {
    if (items.value) return
    await donationApi
      .listRequiredItems()
      .then(({ data }) => {
        items.value = data
      })
      .catch(e => error.value = e)
  })

  return {
    items,
    error,
  }
}
