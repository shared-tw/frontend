<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  name: String,
})

</script>

<template>
  <header class="header">
    <AppLink to="/" inline class="icon-btn text-black z-1 text-xl">
      <template #icon>
        <uil:angle-left />
      </template>
    </AppLink>
    <h2 class="title">
      {{ name }}
    </h2>
  </header>
</template>
<style lang="postcss" scoped>
.header {
  @apply
    flex items-center
    py-4
    bg-white
    fixed top-0 right-0 left-0;
  box-shadow: 0px 1px 2px rgba(0, 138, 138, 0.06), 0px 1px 3px rgba(0, 138, 138, 0.05);
}

.title {
  @apply
    absolute
    top-0 left-0 right-0 bottom-0
    flex items-center justify-center
    leading-normal
    text-blue-darkest
    py-4;
}
</style>
