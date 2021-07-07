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
