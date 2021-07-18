<script setup lang="ts">
import { useOrg } from '@/logics/apply'

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
    <OrgItemsHeader :name="org.organization.name" />
    <AppContainer>
      <OrgItemsInfo :org="org.organization" />
      <OrgItemsList :items="org.items" />
    </AppContainer>
    <OrgItemsToolbar
      :btn-text="isApplyModelOpen ? '確認申請' : '送出申請'"
      :checked-num="checkedItemLen"
      :is-disabled="isDisabled"
      @send="handleToolbarClick()"
    />
    <OrgItemsApplyModel v-model:open="isApplyModelOpen" />
    <ConfirmModel v-model:open="isConfirmModelOpen" @confirm="sendApply" />
  </div>
</template>
