<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { cityNames } from '@/data'

import type { GroupedRequiredItems } from '@/api'

interface Props {
  org: GroupedRequiredItems
}

const props = defineProps<Props>()

const {
  name,
  city,
} = toRefs(props.org.organization)

const total = computed(() => props.org.items?.length)

const supplyNames = computed(() => props.org.items?.map(i => i.name))

const supplyItemsText = computed(() => {
  if (!supplyNames.value) return
  let text = ''
  text += supplyNames.value.slice(0, 3).join('、')
  if (text.length > 10) {
    text = `${text.slice(0, 10)}...等`
  }
  return text
})
</script>

<template>
  <AppCard>
    <div class="flex space-x-2 mb-2 items-center">
      <h2 class="font-bold flex-1 text-xl">
        {{ name }}
      </h2>
      <AppLabel>
        {{ cityNames[city] }}
      </AppLabel>
    </div>
    <div class="text-sm mb-4">
      需求：{{ supplyItemsText }}
    </div>
    <div class="flex mt-2 justify-between items-center">
      <span class="text-sm px-1 text-gray-400">
        共有 {{ total }} 件需求
      </span>
      <AppLink :to="`/${name}/supply`" outline>
        查看需求
      </AppLink>
    </div>
  </AppCard>
</template>
