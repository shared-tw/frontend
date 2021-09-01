<script setup lang="ts">
import type { FormSchema } from '@/types'
import { useAuth } from '@/logics/auth'

const { resetPassword } = useAuth()

const schema: FormSchema = {
  fields: [
    {
      name: 'email',
      type: 'email',
      label: '電子郵件信箱',
      placeholder: 'user@example.com',
      autocomplete: 'email',
    },
  ],
  validation: {
    email: 'required|email',
  },
}

function onSubmit(values: any) {
  resetPassword(values.email)
}
</script>

<template>
  <DynamicForm :schema="schema" @submit="onSubmit">
    <template #actions="{ meta }">
      <div class="flex mb-4 justify-between items-center">
        <router-link to="/login" class="text-sm underline">
          取消
        </router-link>
        <AppButton type="submit" :disabled="!meta.valid">
          送出
        </AppButton>
      </div>
    </template>
  </DynamicForm>
</template>
