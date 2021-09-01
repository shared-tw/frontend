import type { Ref } from 'vue'

export type ToSchema<T> = { [P in keyof T]: string }

export type UnRef<T> = T extends Ref<infer U> ? U : T

export type ListItem = {
  name: string
  value: string
}

export interface LinkProp {
  content: string
  href: string
}

export interface FieldChildren {
  tag: string
  text: string
  [k: string]: any
}

export interface FieldSchema {
  as?: string
  name: string
  label?: string
  sublabel?: string
  children?: FieldChildren[]
  show?: (values: any) => boolean
  [k: string]: any
}

export interface FormSchema {
  fields: FieldSchema[]
  validation: any
  values?: { [k: string]: any }
  submitText?: string
}
