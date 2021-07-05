<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  inline?: boolean
  outline?: boolean
  light?: boolean
  size?: 'large'
}>()

const linkClass = computed(() => ({
  'btn': !props.inline,
  'btn-outline': props.outline,
  'btn-light': props.light,
  'text-sm underline': props.inline,
  'btn-large': props.size === 'large',
}))

defineEmits(['click'])

</script>

<template>
  <button
    :class="linkClass"
    @click="$emit('click', $event)"
  >
    <div v-if="$slots.icon" class="inline-block mr-1">
      <slot name="icon" />
    </div>
    <slot />
  </button>
</template>
