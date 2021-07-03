<script setup lang="ts">
import { defineProps, toRefs, computed } from 'vue'

import type { TSupplyInfo } from '@/types'

interface Props {
  supplyInfo: TSupplyInfo
}

const props = defineProps<Props>()

const {
  id,
  organization,
  items,
} = toRefs(props.supplyInfo)

const total = computed(() => items.value.length)

const supplyNames = ['N95', '防護服', '醫療器材']

const supplyItemsText = computed(() => {
  let text = ''
  text += supplyNames.slice(0, 3).join('、')
  text += supplyNames.length > 3 ? '...等' : ''
  return text
})
</script>

<template>
  <AppCard>
    <div class="flex space-x-2 mb-2 items-center">
      <h2 class="font-bold flex-1 text-xl">
        {{ organization.name }}
      </h2>
      <AppLabel>
        {{ organization.city }}
      </AppLabel>
    </div>
    <div class="text-sm mb-4">
      需求：{{ supplyItemsText }}
    </div>
    <div class="flex mt-2 justify-between items-center">
      <span class="text-sm px-1 text-gray-400">
        共有 {{ total }} 件需求
      </span>
      <AppLink :to="`/${id}/supply`" outline>
        查看需求
      </AppLink>
    </div>
  </AppCard>
</template>
