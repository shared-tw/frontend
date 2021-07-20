<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
interface Props {
  id?: string
  placeholder?: string
  type?: string
  value?: number | string
  error?: boolean
  autocomplete?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm'
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  error: false,
  autocomplete: 'off',
  disabled: false,
  required: false,
})

defineEmits<{
  (e: 'change', value: Event): void
  (e: 'blur', value: FocusEvent): void
  (e: 'click', value: MouseEvent): void
}>()

</script>

<template>
  <!-- eslint-disable vue/require-explicit-emits -->
  <input
    :type="type"
    :value="value"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :disabled="disabled"
    class="d-input"
    :class="[
      {'d-input-sm': size === 'sm'},
      {'border-negative': error},
      $attrs.class
    ]"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @click="$emit('click', $event)"
  >
</template>
