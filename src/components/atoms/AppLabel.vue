<script setup lang="ts">

defineProps({
  outline: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>
  <span
    class="tag"
    :class="{'tag-outline': outline}"
  >
    <slot />
  </span>
</template>
