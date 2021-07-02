<script setup lang="ts">
import { defineProps, toRefs, ref, computed } from 'vue'
import dayjs from 'dayjs'

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

const expended = ref(false)

const showExpend = computed(() => total.value > 3)

const limitItems = computed(() => {
  return expended.value ? items.value : items.value.slice(0, 3)
})
</script>

<template>
  <AppCard>
    <div class="flex space-x-2 mb-1 items-center">
      <h2 class="font-bold flex-1 text-xl">
        {{ organization.name }}
      </h2>
      <AppLabel outline>
        {{ organization.type }}
      </AppLabel>
      <AppLabel>
        {{ organization.city }}
      </AppLabel>
    </div>
    <div class="border-collapse text-sm mb-1 w-full table">
      <div class="table-header-group">
        <div class="table-row">
          <div class="p-1 w-2/4 table-cell">
            品項
          </div>
          <div class="p-1 w-1/4 table-cell">
            數量
          </div>
          <div class="text-right p-1 w-1/4 table-cell">
            期限
          </div>
        </div>
      </div>
      <div class="table-row-group">
        <div v-for="item in limitItems" :key="item.id" class="border-t table-row">
          <div class="p-1 table-cell">
            {{ item.name }}
          </div>
          <div class="p-1 table-cell">
            {{ item.amount }}/{{ item.unit }}
          </div>
          <div class="text-right p-1 table-cell">
            {{ dayjs(item.expiredAt).format('MM/DD') }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showExpend" class="px-8">
      <button class="border-t border-gray-100 text-center text-sm w-full pt-1 text-gray-400 focus:outline-none hover:text-gray-500" @click="expended = !expended">
        <span v-if="!expended">顯示更多</span>
        <span v-else>縮小</span>
      </button>
    </div>
    <div class="flex mt-2 justify-between items-center">
      <span class="text-sm px-1 text-gray-400">
        總計 {{ total }} 項
      </span>
      <AppLink size="sm" :to="`/apply?id=${id}`">
        我要幫忙
      </AppLink>
    </div>
  </AppCard>
</template>
