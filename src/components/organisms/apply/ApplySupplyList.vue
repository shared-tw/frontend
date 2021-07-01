<script setup lang="ts">
import { defineProps } from 'vue'

import type { PropType } from 'vue'
import type { SupplyItem } from '@/types'

defineProps({
  list: {
    type: Array as PropType<SupplyItem[]>,
    required: true,
  },
})

</script>

<template>
  <div class="py-2">
    <header class="mb-4">
      <span class="text-gray-400">
        請選擇欲捐贈之項目
      </span>
    </header>
    <div class="space-y-2">
      <ApplyListHeader />
      <ApplyListItem v-for="item in list" :key="item.id" :item="item" />
    </div>
  </div>
</template>
