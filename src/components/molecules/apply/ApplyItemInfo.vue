<script setup lang="ts">
import dayjs from 'dayjs'

import type { RequiredItem } from '@/api'

defineProps<{ item: RequiredItem }>()

</script>

<template>
  <div>
    <h3 class="text-blue-darkest mb-1 font-medium">
      {{ item.name }}
    </h3>
    <p class="text-gray-dark text-sm">
      {{ dayjs(item.ended_date).format('MM/DD') }} 前，尚須
      <span class="text-primary">
        {{ item.amount }}
      </span>
      個
    </p>
  </div>
</template>
