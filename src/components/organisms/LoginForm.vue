<script setup lang="ts">
import { Form } from 'vee-validate'
import { useAuth } from '@/logics/auth'
import { ref } from 'vue'
import { syncRef } from '@vueuse/core'

const { login } = useAuth()

const schema = {
  username: 'required',
  password: 'required|min:8',
}

const isLoading = ref(false)

function onSubmit(values: any) {
  const { loading } = login(values)
  syncRef(loading, isLoading)
}
</script>

<template>
  <Form v-slot="{ meta }" :validation-schema="schema" class="mb-6" @submit="onSubmit">
    <FormInput
      name="username"
      type="text"
      label="帳號"
      placeholder="username"
      autocomplete="username"
    />
    <FormInput
      name="password"
      type="password"
      label="密碼"
      placeholder="password"
      autocomplete="current-password"
    />
    <FormActions
      button-name="登入"
      :link="{
        content: '忘記密碼',
        href: '/account/password_reset'
      }"
      :is-loading="isLoading"
      :meta="meta"
    />
  </Form>
</template>
