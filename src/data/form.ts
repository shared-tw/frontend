import { ContactMethods, OrganizationTypes } from '@/api'
import { ListItem } from '@/types'

export const otherContactItems: ListItem[] = [
  {
    name: 'Line',
    value: ContactMethods.Line,
  },
  {
    name: 'Facebook',
    value: ContactMethods.Fb,
  },
  {
    name: 'Email',
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

export const orgTypes: ListItem[] = [
  {
    name: '醫院',
    value: OrganizationTypes.Hospital,
  },
  {
    name: '警局',
    value: OrganizationTypes.PoliceStation,
  },
  {
    name: '消防局',
    value: OrganizationTypes.FireDepartment,
  },
  {
    name: '其他',
    value: OrganizationTypes.Other,
  },
]

export const initialValues = {
  otherContactType: ContactMethods.NotSet,
  invoice: 'no',
}
