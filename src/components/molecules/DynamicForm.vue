<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import autosize from 'autosize'

import type { FormSchema } from '@/types'

defineProps<{
  schema: FormSchema
  isLoading?: boolean
}>()

defineEmits<{
  (e: 'submit', value: any): void
}>()

onMounted(() => {
  const target = document.querySelectorAll('textarea')
  if (target) { autosize(target) }
})

onUnmounted(() => {
  const target = document.querySelectorAll('textarea')
  if (target) { autosize.destroy(target) }
})

</script>

<template>
  <Form v-slot="{ meta, values, errors }" :validation-schema="schema.validation" :initial-values="schema.values" @submit="$emit('submit', $event)">
    <div class="mb-8">
      <div v-for="{ name, as, label, sublabel, children, show, ...attrs } in schema.fields" :key="name" class="mb-4 text-razz-pink tracking-normal">
        <div v-show="!show || show(values)">
          <label v-if="label" class="block mb-1" :for="name">{{ label }}<span v-if="schema.validation[name]?.includes('required')">*</span><span v-if="sublabel" class="text-xs ml-4 text-black">{{ sublabel }}</span> </label>
          <Field
            :id="name"
            class="w-full d-input"
            :class="{'border-red-400': !!errors[name]}"
            :as="as || 'input'"
            :name="name"
            v-bind="attrs"
          >
            <template v-if="children && children.length">
              <component :is="tag" v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" v-bind="childAttrs">
                {{ text }}
              </component>
            </template>
          </Field>
          <span class="block h-3">
            <ErrorMessage :name="name" class="text-red-400 text-sm" />
          </span>
        </div>
      </div>
    </div>
    <div>
      <slot name="actions" :meta="meta">
        <button class="block uppercase font-medium py-3.5 px-4 w-xs bg-razz-pink rounded text-center text-white">
          <eos-icons:three-dots-loading v-if="isLoading" />
          <span v-else>{{ schema.submitText }}</span>
        </button>
      </slot>
    </div>
  </Form>
</template>
