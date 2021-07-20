<script setup lang="ts">
import { useField } from 'vee-validate'
import type { ListItem } from '@/types'

interface Props {
  value?: string
  name: string
  label: string
  disabled?: boolean
  required?: boolean
  children: ListItem[]
}

const props = defineProps<Props>()

const {
  value: inputValue,
  errorMessage,
  handleChange,
} = useField(props.name, undefined, {
  initialValue: props.value || '',
  label: props.label,
})

</script>

<template>
  <div class="w-full pb-6 relative">
    <label :for="name" class="mb-1 block">
      {{ label }}
      <span v-if="required" class="text-primary">*</span>
    </label>
    <AppSelect
      :id="name"
      :name="name"
      :value="inputValue"
      :items="children"
      :error="!!errorMessage"
      placeholder="---選擇---"
      @change="handleChange"
    />
    <FormErrorMessage :name="name" />
  </div>
</template>
