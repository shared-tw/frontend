<script setup lang="ts">
import { Form } from 'vee-validate'
import { useAuth } from '@/logics/auth'

const { resetPassword } = useAuth()

const schema = {
  email: 'required|email',
}

function onSubmit(values: any) {
  resetPassword(values.email)
}
</script>

<template>
  <Form v-slot="{ meta }" :validation-schema="schema" @submit="onSubmit">
    <FormInput
      name="email"
      type="email"
      label="電子郵件信箱"
      placeholder="user@example.com"
      autocomplete="email"
      required
    />
    <div class="flex mb-4 justify-between items-center">
      <router-link to="/login" class="text-sm underline">
        取消
      </router-link>
      <AppButton type="submit" :disabled="!meta.valid">
        送出
      </AppButton>
    </div>
  </Form>
</template>
