<script setup lang="ts">
import { syncRef } from '@vueuse/core'
import type { FormSchema } from '@/types'
import { useAuth } from '@/logics/auth'
import { formContactMethods } from '@/data'

const { registerDonator } = useAuth()

const schema: FormSchema = {
  fields: [
    {
      name: 'email',
      type: 'email',
      label: '電子郵件信箱',
      placeholder: 'user@example.com',
      autocomplete: 'email',
    },
    {
      name: 'phone',
      type: 'tel',
      label: '聯絡電話（不含『 - 』）',
      placeholder: '0901234564',
      autocomplete: 'tel',
    },
    {
      name: 'other_contact_method',
      label: '其他聯絡方式',
      as: 'select',
      children: formContactMethods,
    },
    {
      name: 'other_contact',
      type: 'text',
      label: '聯絡資訊',
      show: v => v.other_contact_method !== '',
    },
  ],
  validation: {
    email: 'required|email',
    phone: 'required',
    other_contact_method: 'required',
  },
}

const isLoading = ref(false)

function onSubmit(values: any) {
  const { loading } = registerDonator(values)
  syncRef(loading, isLoading)
}
</script>

<template>
  <DynamicForm :schema="schema" @submit="onSubmit">
    <template #actions="{ meta }">
      <FormActions
        button-name="註冊"
        :link="{
          content: '取消',
          href: '/login'
        }"
        :is-loading="isLoading"
        :meta="meta"
      />
    </template>
  </DynamicForm>
</template>
