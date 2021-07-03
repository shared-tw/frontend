<script setup lang="ts">
import { onMounted } from 'vue'
import { publicApi } from '@/api'
import { supplyInfos, TWCountyList } from '@/data'

onMounted(async() => {
  const { data } = await publicApi.listRequiredItems()
  // eslint-disable-next-line no-console
  console.log(data)
})

const orgTypes = [
  {
    name: '醫院',
    value: 'hospital',
  },
]

const locationTypes = TWCountyList.map(({ text, value }) => {
  return {
    name: text,
    value,
  }
})

</script>

<template>
  <div class="flex pb-3 space-x-4">
    <AppSelect placeholder="單位類型" :items="orgTypes" size="sm" />
    <AppSelect placeholder="地點" :items="locationTypes" size="sm" />
  </div>
  <div class="space-y-3">
    <OrgListCard
      v-for="(supplyInfo, idx) in supplyInfos"
      :key="idx + Math.random().toString(36).substring(2, 9)"
      :supply-info="supplyInfo"
    />
  </div>
</template>
