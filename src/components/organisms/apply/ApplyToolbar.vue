<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useApply } from '@/logics/apply'

const props = defineProps({
  checkedNum: {
    type: Number,
    default: 0,
  },
  isDisabled: {
    type: Boolean,
    default: true,
  },
})

const isOpen = ref(false)
const openConfirm = ref(false)

const {
  checkedItems,
} = useApply()

watch(() => props.isDisabled, (i) => {
  if (i) {
    isOpen.value = false
  }
})

function sendApply(confirmed: boolean) {
  if (!confirmed) return
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(checkedItems.value, null, 2))
}

</script>

<template>
  <div class="toolbar">
    <span class="text-gray-dark">
      已選擇
      <span :class="{'text-primary': checkedNum}">{{ checkedNum }}</span>
      項
    </span>
    <div class="space-x-2">
      <AppButton v-if="isOpen === false" :disabled="isDisabled" size="large" @click="isOpen = true">
        確認申請
      </AppButton>
      <AppButton v-else :disabled="isDisabled" size="large" @click="openConfirm = true">
        確認送出
      </AppButton>
    </div>
  </div>
  <AppModal v-model:open="isOpen" name="本次捐贈物資">
    <SupplyModal />
  </AppModal>
  <ConfirmModel v-model:open="openConfirm" @confirm="sendApply" />
</template>

<style lang="postcss">
.toolbar {
  @apply flex items-center justify-between bg-white
    p-4 box-shaodw fixed bottom-0 left-0 right-0 z-40;
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  box-shadow: 0px -2px 4px rgba(0, 138, 138, 0.05), 0px -4px 6px rgba(0, 138, 138, 0.05);
}
/* @apply fixed bg-white inset-x-0 bottom-0 py-2 px-3 border; */
</style>
