import { reactive } from 'vue'
import { orgApi } from '@/api'

import type { RequiredItem, RequiredItemCreation, DonationModification } from '@/api'

const state = reactive<{
  items: RequiredItem[]
}>({
  items: [],
})

const actions = {
  async getRequiredItems() {
    return orgApi
      .listOrganizationRequiredItems()
      .then((res) => {
        state.items = res.data
      })
  },
  async createRequiredItem(item: RequiredItemCreation) {
    await orgApi.createOrganizationRequiredItem(item)
  },
  async deleteRequiredItem(id: number) {
    await orgApi.deleteOrganizationRequiredItems(id)
  },
  async editRequiredItem(id: number, item: DonationModification) {
    await orgApi.editOrganizationDonation(id, item)
  },
}

export default {
  state,
  actions,
}
