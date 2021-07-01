<script setup lang="ts">
import { ref, computed } from 'vue'
import { onFlash } from '@/logics/emitter'

import type { Colors } from '@/logics/emitter'

const show = ref(false)
const message = ref('')
const emitColor = ref<Colors>()

const colors: Record<Colors, string> = {
  green: 'bg-green-400',
  red: 'bg-red-400',
  yellow: 'bg-yellow-300',
  white: 'bg-white',
}

const color = computed(() => {
  return colors[emitColor.value || 'green']
})
const textColor = computed(() => {
  return emitColor.value === 'yellow' || emitColor.value === 'white' ? 'text-gray-700' : ''
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
  message.value = payload.message
  emitColor.value = payload.color
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
