<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(props.name, undefined, {
  initialValue: props.value,
  label: props.label,
})

</script>

<template>
  <div class="w-full pb-6 relative">
    <label :for="name" class="mb-1 block">
      {{ label }}
      <span v-if="required" class="text-red-400">*</span>
    </label>
    <AppInput
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :error="!!errorMessage"
      @input="handleChange"
      @blur="handleBlur"
    />
    <FormErrorMessage :name="name" />
  </div>
</template>
