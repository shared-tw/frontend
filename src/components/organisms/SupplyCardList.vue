<script setup lang="ts">
import { supplyInfos } from '@/data'
</script>

<template>
  <div class="space-y-3">
    <OrgListCard
      v-for="(supplyInfo, idx) in supplyInfos"
      :key="idx + Math.random().toString(36).substring(2, 9)"
      :supply-info="supplyInfo"
    />
  </div>
</template>
