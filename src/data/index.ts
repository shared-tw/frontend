import type { FieldChildren } from '@/types'
import { OrganizationTypes } from '@/api'

import { data, select_columns } from './tw-county-list.json'

export const TWCountyList: FieldChildren[] = data.map((item) => {
  return {
    tag: 'option',
    text: item[select_columns.indexOf('NAME_2014')],
    value: item[select_columns.indexOf('ISO3166')],
  }
}).filter((item) => {
  return !!item.text
})

const cityNames: Record<string, string> = {}

const orgTypeNames = {
  [OrganizationTypes.Hospital]: '醫院',
  [OrganizationTypes.FireDepartment]: '消防局',
  [OrganizationTypes.PoliceStation]: '警察局',
  [OrganizationTypes.Other]: '其他',
} as Record<string, string>

TWCountyList.forEach((i) => {
  cityNames[i.value] = i.text
})

export { cityNames, orgTypeNames }

export * from './form'
