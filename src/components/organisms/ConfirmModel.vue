<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="relative w-full h-full flex justify-center items-center">
      <div class="bg-black opacity-50 fixed inset-0 " @click="isOpen=false" />
      <div
        class=" sm:w-5/6 sm:mx-auto  w-full  p-6 bg-white text-darkblue z-10 flex  justify-center items-center  flex-col rounded  font-sans"
      >
        <h3 class="text-center text-xl  font-bold mb-4 relative w-full">
          確認送出
          <span class="absolute right-0 text-base" @click="isOpen=false"><mdi:close /></span>
        </h3>
        <p class="font-normal">
          確認後我們會將您的聯絡資訊提供給需求方，以利雙方聯繫
        </p>
        <div class="my-9 w-full flex align-center sm:w-auto ">
          <input id="check" type="checkbox" class="w-5 h-5 mr-2">
          <label for="check" class="font-normal ">以後不在顯示</label>
        </div>
        <div class="flex justify-end w-full ">
          <button class="text-gray-400 px-3  border-gray-300 border rounded hover:bg-gray-300 hover:text-white focus:outline-none">
            取消
          </button>
          <button class="btn bg-darkblue text-white py-2 px-3 rounded ml-3 hover:bg-blue-900 focus:outline-none">
            提供聯絡資訊
          </button>
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
