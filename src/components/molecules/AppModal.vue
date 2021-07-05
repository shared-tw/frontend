<script setup lang="ts">
defineProps<{
  name: string
  open: boolean
}>()

defineEmits(['update:open'])

</script>

<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 z-30 flex flex-col justify-end" @click="$emit('update:open', false)" />
  </transition>
  <transition name="slide-bottom">
    <div v-if="open" class="fixed bottom-0 inset-x-0 bg-white rounded-t-xl w-screen p-4 z-31 max-h-screen grid">
      <header class="flex justify-between mb-3">
        <span class="text-lg">
          {{ name }}
        </span>
        <button class="p-1 text-gray-dark" @click="$emit('update:open', false)">
          <uil:multiply />
        </button>
      </header>
      <div class="overflow-x-auto">
        <slot />
      </div>
    </div>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: transform 0.15s linear;
  transform: translateY(0)
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translateY(100%)
}
</style>
