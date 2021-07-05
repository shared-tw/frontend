<script setup lang="ts">

interface Props {
  value?: boolean
  name?: string
  disabled?: boolean
  checked?: boolean
}

withDefaults(defineProps<Props>(), {
  value: false,
  name: 'checkbox',
})

defineEmits<{
  (e: 'change', value: Event): void
  (e: 'input', value: Event): void
  (e: 'blur', value: FocusEvent): void
}>()
</script>

<template>
  <label class="inline-flex items-center select-none" :class="{'text-gray-300': disabled}">
    <span class="checkbox__input">
      <input
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :checked="checked"
        @change="$emit('change', $event)"
        @blur="$emit('blur', $event)"
        @input="$emit('input', $event)"
      >
      <span class="checkbox__control">
        <uim:check-circle class="checked text-primary" />
        <uim:circle class="text-gray" />
      </span>
    </span>
    <slot />
  </label>
</template>

<style lang="postcss">
.checkbox__input {
  @apply inline-block relative w-30px h-30px mr-1 align-middle;
  > * {
    @apply absolute inset-0 w-full h-full;
  }
  .checkbox__control {
    @apply inline-flex;
    @apply relative w-full h-full;
    .checked {
      @apply opacity-0;
    }
    svg {
      @apply absolute inset-0 w-full h-full transition-opacity;
    }
  }
  input {
    @apply opacity-0 m-0;
    &:checked + .checkbox__control .checked {
      @apply opacity-100;
    }
    &:checked + .checkbox__control svg {
      @apply opacity-0;
    }
    &:disabled + .checkbox__control {
      @apply text-gray-300;
    }
  }
}
</style>
