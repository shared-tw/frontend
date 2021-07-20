import mitt from 'mitt'
import { onMounted } from 'vue'

export const FLASH_EVENT = Symbol('flashMessage')

export enum FlashMessageTypes {
  success = 'success',
  error = 'error',
  warning = 'warning',
  primary = 'primary',
  secondary = 'secondary'
}

export interface FlashOptions {
  type?: FlashMessageTypes
}

export interface FlashEmitOptions extends FlashOptions {
  text: string
}

type MittEvent = {
  [FLASH_EVENT]: FlashEmitOptions
}

export const emitter = mitt<MittEvent>()

export const flash = (message: string, options: FlashOptions): void => {
  emitter.emit(FLASH_EVENT, {
    text: message,
    ...options,
  })
}

export function onFlash(fn: (event: FlashEmitOptions) => void) {
  onMounted(() => {
    emitter.on(FLASH_EVENT, (event) => {
      if (!event) return
      fn(event)
    })
  })
}
