<script setup lang="ts">

const status = [
  '待確認',
  '待出貨',
  '待收貨',
  '已取消',
]

</script>

<template>
  <nav class="flex items-center">
    <router-link
      v-for="state in status"
      v-slot="{ isActive }"
      :key="state"
      class="py-2"
      :class="{
        'boerder-b-2 border-primary': isActive
      }"
    >
      {{ state }}
    </router-link>
  </nav>
</template>
