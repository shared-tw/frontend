<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { syncRef } from '@vueuse/core'
import { useAuth } from '@/logics/auth'
import { ContactMethods } from '@/api'
import { otherContactItems, needInvoiceItems, initialValues } from '@/data'

import type { ToSchema, RegisterDonatorArgs } from '@/types'

const { registerDonator } = useAuth()

const schema: ToSchema<RegisterDonatorArgs> = {
  username: 'required',
  email: 'required|email',
  password: 'required|min:8',
  passwordConfirm: 'required|confirmed:@password',
  tel: 'required|numeric',
  invoice: 'required',
  otherContactType: '',
  otherContent: '',
}

const isLoading = ref(false)

function onSubmit(values: any) {
  const { loading } = registerDonator(values)
  syncRef(loading, isLoading)
}
</script>

<template>
  <Form v-slot="{ meta, values }" :validation-schema="schema" :initial-values="initialValues" @submit="onSubmit">
    <FormInput
      name="username"
      label="帳號名稱"
      placeholder="username"
      autocomplete="username"
      :required="true"
    />
    <FormInput
      name="email"
      type="email"
      label="電子郵件信箱"
      placeholder="user@example.com"
      autocomplete="email"
      :required="true"
    />
    <FormInput
      name="password"
      type="password"
      label="密碼"
      placeholder="password"
      autocomplete="new-password"
      :required="true"
    />
    <FormInput
      name="passwordConfirm"
      type="password"
      label="確認密碼"
      placeholder="password"
      autocomplete="current-password"
      :required="true"
    />
    <FormInput
      name="tel"
      type="tel"
      label="聯絡電話（不含『 - 』）"
      placeholder="0901234564"
      autocomplete="tel"
      :required="true"
    />
    <FormSelect
      name="otherContactType"
      label="其他聯絡方式"
      :children="otherContactItems"
    />
    <FormInput
      v-if="values.otherContactType !== ContactMethods.NotSet"
      name="otherContact"
      type="text"
      label=""
      :placeholder="otherContactItems.find(item => item.value === values.otherContactType)?.text || ''"
    />
    <FormRadio
      name="invoice"
      label="是否需要收據"
      :children="needInvoiceItems"
      :required="true"
    />
    <FormActions
      button-name="註冊"
      :link="{
        content: '取消',
        href: '/login'
      }"
      :is-loading="isLoading"
      :meta="meta"
    />
  </Form>
</template>
