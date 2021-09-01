<script setup lang="ts">
import { syncRef } from '@vueuse/core'
import { Form } from 'vee-validate'
import type { ToSchema } from '@/types'
import type { OrganizationCreation } from '@/api'
import { useAuth } from '@/logics/auth'
import { ContactMethods } from '@/api'
import { TWCountyList, otherContactItems, orgTypes, initialValues } from '@/data'

const { registerOrg } = useAuth()

const schema: ToSchema<OrganizationCreation> = {
  username: 'required',
  email: 'required|email',
  password: 'required|min:8',
  confirmed_password: 'required|confirmed:@password',
  phone: 'required|numeric',
  type: 'required',
  type_other: '',
  name: 'required',
  city: 'required',
  address: 'required',
  office_hours: 'required',
  other_contact_method: 'required',
  other_contact: 'required',
}

const isLoading = ref(false)

function onSubmit(values: any) {
  const { loading } = registerOrg(values)
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
      name="confirmed_password"
      type="password"
      label="確認密碼"
      placeholder="password"
      autocomplete="current-password"
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
      name="type"
      label="單位類型"
      :children="orgTypes"
      :required="true"
    />
    <FormInput
      v-if="values.orgType === 'other'"
      name="type_other"
      label=""
      placeholder="單位類型"
    />
    <FormInput
      name="name"
      type="text"
      label="單位正式名稱"
      :required="true"
    />
    <FormSelect
      name="city"
      label="單位縣市"
      :children="TWCountyList"
      :required="true"
    />
    <FormInput
      name="address"
      type="text"
      label="單位地址"
      :required="true"
    />
    <FormInput
      name="office_hours"
      type="text"
      label="聯絡時間 (ex. 10:00~17:00)"
      :required="true"
    />
    <FormSelect
      name="other_contact_method"
      label="其他聯絡方式"
      :children="otherContactItems"
      :required="true"
    />
    <FormInput
      v-if="values.other_contact_method !== ContactMethods.NotSet"
      name="other_contact"
      label="聯絡資訊"
      :placeholder="otherContactItems.find(item => item.value === values.other_contact_method)?.name || ''"
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
