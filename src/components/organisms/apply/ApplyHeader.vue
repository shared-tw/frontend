<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  name: String,
})

</script>

<template>
  <header class="header">
    <AppLink to="/" inline class="icon-btn text-black text-xl absolute left-0">
      <template #icon>
        <uil:angle-left />
      </template>
    </AppLink>
    <h2 class="font-medium">
      {{ name }}
    </h2>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  @apply
    relative
    h-$header-height
    flex items-center justify-center
    bg-white
    fixed top-0 inset-x-0;
  box-shadow: 0px 1px 2px rgba(0, 138, 138, 0.06), 0px 1px 3px rgba(0, 138, 138, 0.05);
}
</style>
