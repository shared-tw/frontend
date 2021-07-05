<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const props = defineProps({
  side: {
    type: String,
    default: 'bottom',
  },
  show: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
})

const defaultSide = `drawer-${props.side}`
const isShow = ref(props.show)
const container = ref<HTMLDivElement>()

const open = () => isShow.value = true
const close = () => isShow.value = false

const handleOutsideClick = (e: Event) => {
  e.stopPropagation()

  if (!container.value?.contains(e.target as Node)) {
    close()
  }
}

useEventListener(document, 'click', handleOutsideClick)
</script>

<template>
  <div
    ref="container"
    class="relative"
  >
    <slot />
    <div @click="open">
      <slot name="toggle" />
    </div>

    <div
      class="drawer"
      :class="{
        open: isShow,
        [defaultSide]: true,
        rounded
      }"
    >
      <button
        v-if="showClose"
        class="icon-btn"
        @click="close"
      >
        <uim:multiply />
      </button>
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.drawer {
  @apply
    p-2 z-50
    border-t-1 border-gray-900
    shadow-md
    bg-white
    fixed
    opacity-0
    duration-500 ease-out;
}

.drawer.open { @apply opacity-100 ; }
.drawer-bottom {
  @apply transition-top top-300 bottom-0 left-0 right-0;
}
.drawer-bottom.rounded { @apply rounded-t-md; }
.drawer-bottom.open { @apply top-50; }

.drawer-left {
  @apply
    transition-left
    top-0 bottom-0 left-0 right-300
    transform -translate-x-2;
}

.drawer-left.rounded { @apply rounded-r-md; }
.drawer-left.open { @apply left-0 right-40; }

.drawer-right {
  @apply transition-left top-0 bottom-0 left-300 right-0;
}
.drawer-left.rounded { @apply rounded-l-md; }
.drawer-right.open { @apply left-50 right-0; }

.icon-btn {
  @apply absolute top-0 right-0;
}
</style>
