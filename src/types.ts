import { ContactMethods, OrganizationTypes, Cities } from '@/api'
import type { Ref } from 'vue'

export type ToSchema<T> = { [P in keyof T]: string }

export type UnRef<T> = T extends Ref<infer U> ? U : T

export interface SupplyItem {
  id: number
  name: string
  amount: number
  unit: string
  expiredAt: number
}

export interface TSupplyInfo {
  id: string
  organization: {
    type: string
    name: string
    city: string
  }
  items: SupplyItem[]
}

export interface InputChildren {
  text: string
  value: string
}

export interface LoginArgs {
  username: string
  password: string
}

export interface RegisterDonatorArgs {
  username: string
  email: string
  password: string
  passwordConfirm: string
  tel: string
  invoice: string
  otherContactType: ContactMethods
  otherContent: string | undefined
}

export interface RegisterOrgArgs extends RegisterDonatorArgs {
  orgType: OrganizationTypes
  orgTypeOther: string | undefined
  orgName: string
  orgCity: Cities
  orgAddress: string
  orgOfficeHours: string
}

export interface SupplyProvide {
  amount: number
  date: string
  applyCheck: boolean
}

export interface SupplyOrg {
  type: string
  name: string
  city: string
}

export interface LinkProp {
  content: string
  href: string
}
