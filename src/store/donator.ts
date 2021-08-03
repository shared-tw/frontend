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
  async createDonation(donation: DonationCreation[]) {
    return donationApi.createDonation(donation)
  },
  async editDonation(donation: DonationModification[]) {
    return donationApi.editDonation(donation)
  },
}

export default {
  state,
  actions,
}
