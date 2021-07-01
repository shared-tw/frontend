<script setup lang="ts">
import { defineProps } from 'vue'
import { useField } from 'vee-validate'
import type { PropType } from 'vue'
import type { InputChildren } from '@/types'

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
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  children: {
    type: Array as PropType<InputChildren[]>,
    required: true,
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
    <select
      :id="name"
      :name="name"
      :value="inputValue"
      class="border border-tansparent rounded-md outline-none w-full py-2.5 px-3 focus:border-gray-400"
      :class="{ 'border-red-400': !!errorMessage }"
      @change="handleChange"
      @blur="handleBlur"
    >
      <option v-for="{ value, text } in children" :key="value" :value="value">
        {{ text }}
      </option>
    </select>
    <FormErrorMessage :name="name" />
  </div>
</template>
