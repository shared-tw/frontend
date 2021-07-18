<script setup lang="ts">
defineProps({
  checkedNum: {
    type: Number,
    default: 0,
  },
  isDisabled: {
    type: Boolean,
    default: true,
  },
  btnText: {
    type: String,
    required: true,
  },
})

defineEmits<{
  (e: 'send', value: void): void
}>()

</script>

<template>
  <div class="toolbar toolbar-shadow">
    <span class="text-gray-dark">
      已選擇
      <span :class="{'text-primary': checkedNum}">{{ checkedNum }}</span>
      項
    </span>
    <AppButton :disabled="isDisabled" size="large" @click="$emit('send')">
      {{ btnText }}
    </AppButton>
  </div>
</template>

<style lang="postcss">
.toolbar {
  @apply flex items-center justify-between bg-white
    p-4 box-shaodw fixed bottom-0 left-0 right-0 z-40;
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
}
</style>
