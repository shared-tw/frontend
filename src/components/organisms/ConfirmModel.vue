<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="relative w-full h-full flex justify-center items-center">
      <div class="bg-black opacity-50 fixed inset-0 " @click="isOpen=false" />
      <div
        class=" sm:w-5/6 sm:mx-auto  w-full  p-6 bg-white text-darkblue z-10 flex  justify-center items-center  flex-col rounded  font-sans font-normal"
      >
        <h3 class="text-center text-xl  font-bold mb-4 relative w-full">
          確認送出
          <span class="absolute right-0 text-base" @click="isOpen=false"><mdi:close /></span>
        </h3>
        <p>
          確認後，我們會將您的聯絡資訊提供給需求方，以利雙方聯繫
        </p>
        <div class="mt-9 w-full flex align-center sm:w-auto ">
          <FormCheckbox
            name="noShow"
            :value="false"
            label="以後不在顯示"
          />
        </div>
        <div class="flex justify-end w-full ">
          <AppButton class="btn-outline text-gray-400 border-gray-300  hover:bg-gray-300 hover:text-white ">
            取消
          </AppButton>
          <AppButton class="bg-darkblue ml-3 hover:bg-blue-900 ">
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
