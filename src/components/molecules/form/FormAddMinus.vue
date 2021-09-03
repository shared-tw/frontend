<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  label?: string
  required?: boolean
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  required: false,
  min: 1,
  max: 10,
})

const {
  value: inputValue,
  errorMessage,
  handleChange,
  handleBlur,
} = useField(props.name, undefined, {
  initialValue: props.min,
  label: props.label,
})

// todo: change useField's value without handleChange or handleBlur

</script>

<template>
  <div class="w-full pb-6 relative">
    <label :for="name" class="mb-1 block">
      {{ label }}
      <span v-if="required" class="text-primary">*</span>
    </label>
    <AppAddMinusButton
      :value="inputValue"
      :error="!!errorMessage"
      :min="min"
      :max="max"
      @change="handleChange"
      @blur="handleBlur"
    />
    <FormErrorMessage :name="name" />
  </div>
</template>
