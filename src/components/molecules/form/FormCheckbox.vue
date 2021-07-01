<script setup lang="ts">
import { defineProps } from 'vue'
import { Field } from 'vee-validate'

defineProps({
  value: {
    type: Boolean,
    default: false,
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
})
</script>

<template>
  <Field
    v-slot="{ field }"
    :name="name"
    type="checkbox"
    :value="value"
    :label="label"
    class="relative w-full pb-6"
    as="div"
  >
    <AppCheckbox v-bind="field" :name="name" :disabled="disabled">
      {{ label }}
    </AppCheckbox>
    <FormErrorMessage :name="name" />
  </Field>
</template>
