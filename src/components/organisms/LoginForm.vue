<script setup lang="ts">
import { syncRef } from '@vueuse/core'
import type { FormSchema } from '@/types'
import { useAuth } from '@/logics/auth'

const { login } = useAuth()

const schema: FormSchema = {
  fields: [
    {
      name: 'username',
      label: '帳號',
      placeholder: 'username',
      autocomplete: 'username',
    },
    {
      name: 'password',
      type: 'password',
      label: '密碼',
      placeholder: 'password',
      autocomplete: 'current-password',
    },
  ],
  validation: {
    username: 'required',
    password: 'required|min:8',
  },
}

const isLoading = ref(false)

function onSubmit(values: any) {
  const { loading } = login(values)
  syncRef(loading, isLoading)
}
</script>

<template>
  <DynamicForm :schema="schema" @submit="onSubmit">
    <template #actions="{ meta }">
      <FormActions
        button-name="登入"
        :link="{
          content: '忘記密碼',
          href: '/account/password_reset'
        }"
        :is-loading="isLoading"
        :meta="meta"
      />
    </template>
  </DynamicForm>
</template>
