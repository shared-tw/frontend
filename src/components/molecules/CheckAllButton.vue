<script setup lang="ts">
defineProps<{
  to: string
}>()

</script>

<template>
  <AppLink inline :to="to" class="no-underline text-primary-dark inline-flex items-center">
    看全部
    <uil:arrow-up-right class="inline align-text-top" />
  </AppLink>
</template>
