<script setup lang="ts">
import { ref, computed } from 'vue'
import { onFlash, FlashMessageTypes } from '@/logics/emitter'

const show = ref(false)
const message = ref('')
const emitColor = ref<FlashMessageTypes>()

const colors: Record<FlashMessageTypes, string> = {
  [FlashMessageTypes.success]: 'bg-green-400',
  [FlashMessageTypes.error]: 'bg-red-400',
  [FlashMessageTypes.warning]: 'bg-yellow-300',
  [FlashMessageTypes.secondary]: 'bg-white',
  [FlashMessageTypes.primary]: 'bg-primary',
}

const color = computed(() => {
  return colors[emitColor.value || FlashMessageTypes.success]
})
const textColor = computed(() => {
  return emitColor.value === FlashMessageTypes.warning || emitColor.value === FlashMessageTypes.secondary ? 'text-gray-700' : ''
})
const timeoutId = ref<number | null>(null)

const hideMessage = () => {
  show.value = false
}
const setTransitionDelay = () => {
  if (!show.value) return
  show.value = false
  if (timeoutId.value) { clearTimeout(timeoutId.value) }
  timeoutId.value = window.setTimeout(() => show.value = true, 150)
}
const setDelayedHide = () => {
  if (timeoutId.value) { clearTimeout(timeoutId.value) }
  timeoutId.value = window.setTimeout(hideMessage, 3000)
}

onFlash((payload) => {
  setTransitionDelay()
  message.value = payload.text
  emitColor.value = payload.type
  show.value = true
  setDelayedHide()
})
</script>

<template>
  <transition name="popup">
    <div v-show="show" class="flex transform inset-x-0 transition-all bottom-4 text-gray-700 z-50 fixed justify-center dark:text-gray-100">
      <div
        class="rounded-md py-3 px-8 relative"
        :class="[color, textColor]"
      >
        <button class="text-black text-sm p-1 top-0 right-0 absolute focus:outline-none hover:text-gray-600" @click="hideMessage">
          <jam-close-circle-f />
        </button>
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<style scoped lang='postcss'>
.popup-leave-active {
  @apply -translate-y-0 opacity-100;
}
.popup-leave-to {
  @apply translate-y-6 opacity-0;
}
.popup-enter-active {
  @apply translate-y-6 opacity-0;
}
.popup-enter-to {
  @apply -translate-y-0 opacity-100;
}
</style>
