<script setup lang="ts">
import { useOrg } from '@/logics/apply'
import donatorStore from '@/store/donator'

onMounted(async() => {
  await donatorStore.actions.getDonations()
  // console.log(donatorStore.state.donations)
})

const {
  org,
  isDisabled,
  checkedItemLen,
  isApplyModelOpen,
  isConfirmModelOpen,
  sendApply,
} = useOrg()

function handleToolbarClick() {
  if (!isApplyModelOpen.value) {
    isApplyModelOpen.value = true
  } else {
    sendApply()
  }
}
</script>

<template>
  <div v-if="org">
    <NavigationHeader :name="org.organization.name" />
    <UserDonationStateNavbar />
    <AppContainer>
      <OrgItemsInfo :org="org.organization" />
      <OrgItemsList :items="org.items" />
    </AppContainer>
    <OrgItemsToolbar
      :btn-text="isApplyModelOpen ? '全部取消' : '取消此筆捐贈'"
      :checked-num="checkedItemLen"
      :is-disabled="isDisabled"
      @send="handleToolbarClick()"
    />
    <OrgItemsApplyModel v-model:open="isApplyModelOpen" />
    <ConfirmModel v-model:open="isConfirmModelOpen" @confirm="sendApply" />
  </div>
</template>
