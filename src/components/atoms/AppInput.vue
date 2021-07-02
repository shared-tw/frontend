<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
// eslint-disable-next-line import/first
import { defineEmits, defineProps, withDefaults } from 'vue'

interface Props {
  id?: string
  placeholder?: string
  type?: string
  value?: number | string
  error?: boolean
  autocomplete?: string
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  error: false,
  autocomplete: 'off',
  disabled: false,
  required: false,
})

defineEmits<{
  (e: 'input', value: Event): void
  (e: 'blue', value: FocusEvent): void
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
    class="border border-tansparent rounded-md outline-none w-full py-2 px-3 focus:border-gray-400"
    :class="[
      {'border-red-400': error},
      $attrs.class
    ]"
    @input="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @click="$emit('click', $event)"
  >
</template>
