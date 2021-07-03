<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="relative flex items-center justify-center w-full h-full">
      <div class="fixed inset-0 bg-black opacity-50 " @click="isOpen=false" />
      <div
        class="z-10 flex flex-col items-center justify-center w-full p-6 font-sans font-normal bg-white rounded sm:w-5/6 sm:mx-auto text-darkblue"
      >
        <h3 class="relative w-full mb-4 text-xl font-bold text-center">
          確認送出
          <span class="absolute right-0 text-base" @click="isOpen=false"><mdi:close /></span>
        </h3>
        <p>
          確認後，我們會將您的聯絡資訊提供給需求方，以利雙方聯繫
        </p>
        <div class="flex w-full sm:w-auto mt-9 align-center">
          <FormCheckbox
            name="noShow"
            :value="false"
            label="以後不在顯示"
          />
        </div>
        <div class="flex justify-end w-full ">
          <AppButton outline class="text-gray-400 border-gray-300 hover:bg-gray-300 hover:text-white ">
            取消
          </AppButton>
          <AppButton class="ml-3 bg-darkblue hover:bg-blue-900 ">
            提供聯絡資訊
          </AppButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
