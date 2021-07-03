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
  <li class="card">
    <div class="card-body">
      <label class="text-2xl mr-1" :for="`${item.id}`">
        <input
          :id="`${item.id}`"
          type="checkbox"
          class="hidden"
          :checked="isChecked(item.id)"
          @change="changeItem(item, $event)"
        >
        <uim:check-circle v-if="isChecked(item.id)" class="text-primary" />
        <uim:circle v-else class="text-gray" />
      </label>
      <div>
        <h3 class="text-blue-darkest mb-1">
          {{ item.name }}
        </h3>
        <p class="text-gray-dark">
          {{ dayjs(item.expiredAt).format('MM/DD') }} 前，尚須
          <span class="text-primary">
            {{ item.amount }}
          </span>
          個
        </p>
      </div>
    </div>
  </li>
</template>
<style lang="postcss" scoped>
.card {
  @apply border-1 border-gray rounded-lg
    py-3 px-4 mb-2.5
    relative;
}

.card-body {
  @apply flex;

  & label:before {
    content: '';
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
  }
}
</style>
