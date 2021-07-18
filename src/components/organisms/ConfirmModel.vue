<script setup lang="ts">
import { needConfirm } from '@/store/apply'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm', value: boolean): void
}>()

function hadnleCheck(e: Event) {
  const target = e.target as HTMLInputElement
  needConfirm.value = !target.checked
}

function confirm() {
  emit('confirm', true)
  emit('update:open', false)
}
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center p-3" @click="$emit('update:open', false)">
      <div class="z-10 w-full p-6 bg-white rounded-lg sm:w-5/6 sm:mx-auto text-darkblue" @click.stop>
        <h3 class="flex items-center justify-center mb-4 text-lg font-medium">
          <span class="text-primary inline-block mr-2 pt-0.5">
            <uil:info-circle />
          </span>
          請提供聯絡資料
        </h3>
        <p class="mb-6">
          確認後，我們會將您的聯絡資訊提供給需求方，以利雙方聯繫。
        </p>
        <div class="flex mb-4">
          <AppCheckbox
            name="noShow"
            :checked="!needConfirm"
            @change="hadnleCheck"
          >
            <span :class="{'text-gray': needConfirm}">以後不在顯示</span>
          </AppCheckbox>
        </div>
        <div class="flex justify-end space-x-4">
          <button outline class="text-primary focus:outline-none px-2 py-1" @click="$emit('update:open', false)">
            取消
          </button>
          <AppButton size="large" @click="confirm">
            確認提供
          </AppButton>
        </div>
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
</style>
