import mitt from 'mitt'
import { onMounted } from 'vue'

export type Colors = 'green' | 'red' | 'yellow' | 'white'
export type FlashPayload = { color: Colors; message: string }
export const FLASH_EVENT = Symbol('flashMessage')

type MittEvent = {
  [FLASH_EVENT]: FlashPayload
}

export const emitter = mitt<MittEvent>()

export const EmitTypes = {
  Success: 'green',
  Danger: 'red',
  Warning: 'yellow',
  Info: 'white',
} as const

export const flash = (message: string, color: Colors): void => {
  emitter.emit(FLASH_EVENT, {
    message,
    color,
  })
}

export function onFlash(fn: (e: FlashPayload) => void) {
  onMounted(() => {
    emitter.on(FLASH_EVENT, (e) => {
      if (!e) return
      fn(e)
    })
  })
}
