<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
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
      <span v-if="required" class="text-primary">*</span>
    </label>
    <AppTextarea
      :value="inputValue"
      :placeholder="placeholder"
      :error="!!errorMessage"
      :disabled="disabled"
      @change="handleChange"
      @blur="handleBlur"
    />
    <FormErrorMessage :name="name" />
  </div>
</template>
