import { reactive } from 'vue'
import { donationApi } from '@/api'

import type { GroupedRequiredItems, Donation, DonationCreation, DonationModification } from '@/api'

const state = reactive<{
  orgList: GroupedRequiredItems[]
  donations: Donation[]
}>({
  orgList: [],
  donations: [],
})

const actions = {
  async getRequiredItems() {
    return donationApi
      .listRequiredItems()
      .then((res) => {
        state.orgList = res.data
      })
  },
  async getDonations() {
    return donationApi.listDonations()
      .then((res) => {
        state.donations = res.data
      })
  },
  async createDonation(id: number, donation: DonationCreation) {
    return donationApi.createDonation(id, donation)
  },
  async editDonation(id: number, donation: DonationModification) {
    return donationApi.editDonation(id, donation)
  },
}

export default {
  state,
  actions,
}
