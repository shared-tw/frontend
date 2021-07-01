<script setup lang="ts">
import { ref } from 'vue'
import { syncRef } from '@vueuse/core'
import { Form } from 'vee-validate'
import { useAuth } from '@/logics/auth'
import { ContactMethods } from '@/api'
import { TWCountyList, otherContactItems, needInvoiceItems, orgTypes, initialValues } from '@/data'

import type { ToSchema, RegisterOrgArgs } from '@/types'

const { registerOrg } = useAuth()

const schema: ToSchema<RegisterOrgArgs> = {
  username: 'required',
  email: 'required|email',
  password: 'required|min:8',
  passwordConfirm: 'required|confirmed:@password',
  tel: 'required|numeric',
  orgType: 'required',
  orgTypeOther: '',
  orgName: 'required',
  orgCity: 'required',
  orgAddress: 'required',
  orgOfficeHours: 'required',
  invoice: 'required',
  otherContactType: '',
  otherContent: '',
}

const isLoading = ref(false)

function onSubmit(values: RegisterOrgArgs) {
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
      required
    />
    <FormInput
      name="email"
      type="email"
      label="電子郵件信箱"
      placeholder="user@example.com"
      autocomplete="email"
      required
    />
    <FormInput
      name="password"
      type="password"
      label="密碼"
      placeholder="password"
      autocomplete="new-password"
      required
    />
    <FormInput
      name="passwordConfirm"
      type="password"
      label="確認密碼"
      placeholder="password"
      autocomplete="current-password"
      required
    />
    <FormInput
      name="tel"
      type="tel"
      label="聯絡電話（不含『 - 』）"
      placeholder="0901234564"
      autocomplete="tel"
      required
    />
    <FormSelect
      name="orgType"
      label="單位類型"
      :children="orgTypes"
      required
    />
    <FormInput
      v-if="values.orgType === 'other'"
      name="orgTypeOther"
      label=""
      placeholder="單位類型"
    />
    <FormInput
      name="orgName"
      type="text"
      label="單位正式名稱"
      required
    />
    <FormSelect
      name="orgCity"
      label="單位縣市"
      :children="TWCountyList"
      required
    />
    <FormInput
      name="orgAddress"
      type="text"
      label="單位地址"
      required
    />
    <FormInput
      name="orgOfficeHours"
      type="text"
      label="聯絡時間 (ex. 10:00~17:00)"
      required
    />
    <FormSelect
      name="otherContactType"
      label="其他聯絡方式"
      :children="otherContactItems"
    />
    <FormInput
      v-if="values.otherContactType !== ContactMethods.NotSet"
      name="otherContact"
      label=""
      :placeholder="otherContactItems.find(item => item.value === values.otherContactType)?.text || ''"
    />
    <FormRadio
      name="invoice"
      label="是否需要收據"
      :children="needInvoiceItems"
      required
    />
    <RegisterActions :is-loading="isLoading" :meta="meta" />
  </Form>
</template>
