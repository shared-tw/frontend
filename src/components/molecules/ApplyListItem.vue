<script setup lang="ts">
import { defineProps } from 'vue'
import { useApply } from '@/logics/apply'
import dayjs from 'dayjs'

import type { SupplyItem } from '@/types'

const { changeItem, isChecked } = useApply()

interface Props {
  item: SupplyItem
}

defineProps<Props>()

</script>

<template>
  <div class="border rounded-md flex border-gray-600 py-2 px-3 items-center">
    <AppCheckbox :checked="isChecked(item.id)" @change="changeItem(item, $event)" />
    <div class="flex space-x-1 flex-1">
      <div class="font-medium mr-auto pr-1 pl-3 w-2/4">
        {{ item.name }}
      </div>
      <div class="px-1 w-1/4">
        {{ item.amount }}/{{ item.unit }}
      </div>
      <div class="px-1 w-1/4">
        {{ dayjs(item.expiredAt).format('MM/DD') }}
      </div>
    </div>
  </div>
</template>
