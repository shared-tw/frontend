<script setup lang="ts">
import { useApply } from '@/logics/apply'

const {
  isDisabled,
  supplyInfo,
  checkedItemLen,
} = useApply()

</script>

<template>
  <ApplyHeader :name="supplyInfo.organization.name" />
  <AppContainer class="pt-6">
    <OrgInfoNavBar :org="supplyInfo.organization" />
    <ApplySupplyList :list="supplyInfo.items" />
  </AppContainer>
  <ApplyToolbar :checked-num="checkedItemLen" :is-disabled="isDisabled" />
</template>
