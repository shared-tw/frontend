<script setup lang="ts">
defineProps<{
  to: string
}>()

</script>

<template>
  <router-link :to="to" class="rounded-lg border bg-white border-gray-light p-4 flex-1">
    <div class="text-primary text-28px flex justify-center mb-3">
      <slot name="icon" />
    </div>
    <div class="text-sm text-center">
      <slot />
    </div>
  </router-link>
</template>
