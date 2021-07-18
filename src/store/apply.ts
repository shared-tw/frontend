import { useStorage } from '@vueuse/core'

export const needConfirm = useStorage('need-confirm', true)
