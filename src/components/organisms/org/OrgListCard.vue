<script setup lang="ts">
import { defineProps, toRefs, ref, computed } from 'vue'
import dayjs from 'dayjs'

import type { PropType } from 'vue'
import type { TSupplyInfo } from '@/types'

const props = defineProps({
  supplyInfo: {
    type: Object as PropType<TSupplyInfo>,
    required: true,
  },
})

const {
  id,
  organization,
  items,
} = toRefs(props.supplyInfo)

const total = computed(() => items.value.length)

const expended = ref(false)

const showExpend = computed(() => total.value > 3)

const limitItems = computed(() => {
  return expended.value ? items.value : items.value.slice(0, 3)
})
</script>

<template>
  <AppCard>
    <div class="flex items-center mb-1 space-x-2">
      <h2 class="text-xl font-bold flex-1">
        {{ organization.name }}
      </h2>
      <AppLabel outline>
        {{ organization.type }}
      </AppLabel>
      <AppLabel>
        {{ organization.city }}
      </AppLabel>
    </div>
    <div class="table w-full border-collapse mb-1 text-sm">
      <div class="table-header-group">
        <div class="table-row">
          <div class="table-cell p-1 w-2/4">
            品項
          </div>
          <div class="table-cell p-1 w-1/4">
            數量
          </div>
          <div class="table-cell p-1 w-1/4 text-right">
            期限
          </div>
        </div>
      </div>
      <div class="table-row-group">
        <div v-for="item in limitItems" :key="item.id" class="table-row border-t">
          <div class="table-cell p-1">
            {{ item.name }}
          </div>
          <div class="table-cell p-1">
            {{ item.amount }}/{{ item.unit }}
          </div>
          <div class="table-cell p-1 text-right">
            {{ dayjs(item.expiredAt).format('MM/DD') }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showExpend" class="px-8">
      <button class="w-full text-center text-sm text-gray-400 border-t border-gray-100 pt-1 hover:text-gray-500 focus:outline-none" @click="expended = !expended">
        <span v-if="!expended">顯示更多</span>
        <span v-else>縮小</span>
      </button>
    </div>
    <div class="flex justify-between items-center mt-2">
      <span class="text-gray-400 text-sm px-1">
        總計 {{ total }} 項
      </span>
      <AppLink size="sm" :to="`/apply?id=${id}`">
        我要幫忙
      </AppLink>
    </div>
  </AppCard>
</template>
