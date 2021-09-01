import { ContactMethods, OrganizationTypes } from '@/api'
import { ListItem, FieldChildren } from '@/types'

export const defaultSelectOption: FieldChildren = {
  tag: 'option',
  text: '--- 選擇 ---',
  disabled: true,
  selected: true,
}

export const formContactMethods: FieldChildren[] = [
  defaultSelectOption,
  {
    tag: 'option',
    text: 'Line',
    value: ContactMethods.Line,
  },
  {
    tag: 'option',
    text: 'Facebook',
    value: ContactMethods.Fb,
  },
  {
    tag: 'option',
    text: 'Email',
    value: ContactMethods.Email,
  },
]

export const needInvoiceItems: ListItem[] = [
  {
    name: '是',
    value: 'yes',
  },
  {
    name: '否',
    value: 'no',
  },
]

export const formOrgTypes: FieldChildren[] = [
  {
    tag: 'option',
    text: '醫院',
    value: OrganizationTypes.Hospital,
  },
  {
    tag: 'option',
    text: '警局',
    value: OrganizationTypes.PoliceStation,
  },
  {
    tag: 'option',
    text: '消防局',
    value: OrganizationTypes.FireDepartment,
  },
  {
    tag: 'option',
    text: '其他',
    value: OrganizationTypes.Other,
  },
]

export const initialValues = {
  otherContactType: ContactMethods.NotSet,
  invoice: 'no',
}
