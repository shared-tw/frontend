<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  checkedNum: {
    type: Number,
    default: 0,
  },
  isDisabled: {
    type: Boolean,
    default: true,
  },
})

</script>

<template>
  <div class="toolbar">
    <span class="text-gray-dark">
      已選擇
      <span :class="{'text-primary': checkedNum}">{{ checkedNum }}</span>
      項
    </span>
    <div class="space-x-2">
      <AppButton :disabled="isDisabled">
        確認申請
      </AppButton>
    </div>
  </div>
</template>

<style lang="postcss">
.toolbar {
  @apply flex items-center justify-between
    py-5 px-4 box-shaodw fixed bottom-0 left-0 right-0;
  box-shadow: 0px -2px 4px rgba(0, 138, 138, 0.05), 0px -4px 6px rgba(0, 138, 138, 0.05);
}
/* @apply fixed bg-white inset-x-0 bottom-0 py-2 px-3 border; */
</style>
