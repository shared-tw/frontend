<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  outline: boolean
  size: 'big'
}>()

</script>

<template>
  <button
    class="text-white rounded-full bg-primary"
    :class="{'btn-outline': outline}"
  >
    <div v-if="$slots.icon" class="inline-block mr-1">
      <slot name="icon" />
    </div>
    <slot />
  </button>
</template>
