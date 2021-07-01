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
    <div class="max-w-screen-xl mx-auto flex items-center justify-between">
      <span class="px-2">已勾選 {{ checkedNum }} 項</span>
      <div class="space-x-2">
        <AppLink to="/" outline>
          取消
        </AppLink>
        <AppButton :disabled="isDisabled">
          確認申請
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.toolbar {
  @apply fixed bg-white inset-x-0 bottom-0 py-2 px-3 border;
}
</style>
