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
    <ul class="space-y-2">
      <ApplyListItem v-for="item in list" :key="item.id" :item="item" />
    </ul>
  </div>
</template>
