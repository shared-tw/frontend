<script setup lang="ts">
import { useOrg } from '@/logics/apply'

import type { RequiredItem } from '@/api'

const { changeItem, isChecked } = useOrg()

defineProps<{ item: RequiredItem }>()

</script>

<template>
  <li class="card">
    <div class="flex">
      <div class="inline-flex h-full mr-2">
        <AppCheckbox :id="`${item.id}`" :checked="isChecked(item.id)" @change="changeItem(item, $event)" />
      </div>
      <ApplyItemInfo :item="item" />
    </div>
  </li>
</template>
<style lang="postcss" scoped>
.card {
  @apply border-1 border-gray rounded-lg
    py-3 px-4 mb-2.5 bg-white
    relative;
}
</style>
