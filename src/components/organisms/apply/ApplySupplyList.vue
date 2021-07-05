<script setup lang="ts">
import { defineProps } from 'vue'

import type { RequiredItem } from '@/api'

defineProps<{ items: RequiredItem[] }>()

</script>

<template>
  <div class="pb-2">
    <ul class="space-y-2">
      <ApplyListItem v-for="item in items" :key="item.id" :item="item" />
    </ul>
  </div>
</template>
