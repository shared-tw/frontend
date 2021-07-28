<script setup lang="ts">
defineProps<{
  name: string
}>()

</script>

<template>
  <section class="py-3">
    <header class="pb-3 flex justify-between">
      <h2 class="font-medium text-gray-dark">
        {{ name }}
      </h2>
      <slot name="header" />
    </header>
    <div>
      <slot />
    </div>
  </section>
</template>
