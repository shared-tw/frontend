<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
interface Props {
  id?: string
  placeholder?: string
  value?: number | string
  error?: boolean
  autocomplete?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm'
}

withDefaults(defineProps<Props>(), {
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
  <textarea
    :id="id"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    class="d-input text-sm"
    :class="[
      {'d-input-sm': size === 'sm'},
      {'border-negative': error},
      $attrs.class
    ]"
    rows="3"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @click="$emit('click', $event)"
  />
</template>
