<script setup lang="ts">
import { useApply } from '@/logics/apply'

const {
  isDisabled,
  supplyInfo,
  checkedItemLen,
} = useApply()

</script>

<template>
  <div v-if="supplyInfo">
    <ApplyHeader :name="supplyInfo.organization.name" />
    <AppContainer>
      <ApplyOrgInfoBar :org="supplyInfo.organization" />
      <ApplySupplyList v-if="supplyInfo.items" :items="supplyInfo.items" />
    </AppContainer>
    <ApplyToolbar :checked-num="checkedItemLen" :is-disabled="isDisabled" />
  </div>
</template>
