<script setup lang="ts">
import { Form } from 'vee-validate'
import { syncRef } from '@vueuse/core'
import type { ToSchema } from '@/types'
import type { DonatorCreation } from '@/api'
import { useAuth } from '@/logics/auth'
import { ContactMethods } from '@/api'
import { otherContactItems, initialValues } from '@/data'

const { registerDonator } = useAuth()

const schema: ToSchema<DonatorCreation> = {
  email: 'required|email',
  phone: 'required|numeric',
  other_contact_method: 'required',
  other_contact: 'required',
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
      name="email"
      type="email"
      label="電子郵件信箱"
      placeholder="user@example.com"
      autocomplete="email"
      :required="true"
    />
    <FormInput
      name="phone"
      type="tel"
      label="聯絡電話（不含『 - 』）"
      placeholder="0901234564"
      autocomplete="tel"
      :required="true"
    />
    <FormSelect
      name="other_contact_method"
      label="其他聯絡方式"
      :children="otherContactItems"
    />
    <FormInput
      v-if="values.other_contact_method !== ContactMethods.NotSet"
      name="other_contact"
      type="text"
      label="聯絡資訊"
      :placeholder="otherContactItems.find(item => item.value === values.other_contact_method)?.name || ''"
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
