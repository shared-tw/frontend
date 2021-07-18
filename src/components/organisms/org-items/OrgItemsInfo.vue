<script setup lang="ts">
import { orgTypeNames, cityNames } from '@/data'

import type { OrganizationSummary } from '@/api'

defineProps<{ org: OrganizationSummary }>()

</script>

<template>
  <div class="flex items-center justify-between py-4">
    <p class="text-gray-dark ">
      請選擇欲捐贈之項目
    </p>
    <div class="inline-flex">
      <span class="tag tag-outline mr-2.5">
        {{ cityNames[org.city] }}
      </span>
      <span class="tag">
        {{ orgTypeNames[org.type] }}
      </span>
    </div>
  </div>
</template>
