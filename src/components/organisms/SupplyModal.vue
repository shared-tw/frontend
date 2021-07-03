<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(true)
</script>
<template>
  <transition name="fade">
    <div v-if="isOpen" class="relative flex flex-col items-end justify-end w-full h-screen">
      <div class="fixed inset-0 bg-black opacity-50 abso " @click="isOpen=false" />
      <div class="relative w-full p-4 bg-white rounded-t text-darkblue">
        <div class="flex justify-between">
          <h3 class="text-lg font-bold">
            本次捐贈項目
          </h3>
          <button type="button" @click="isOpen=false">
            <mdi:close />
          </button>
        </div>
        <p class="pb-3 mt-3 text-sm font-light text-gray-400 border-gray-300">
          請填寫可贊助數量與天數
        </p>
        <div class="p-4 border border-gray-300 rounded">
          <div class="flex justify-between">
            <h2>大型 X 光機</h2>
            <button type="button" class="text-red-500">
              <mdi-light:delete />
            </button>
          </div>
          <p class="pb-3 mt-3 text-sm font-light text-gray-400 border-b border-gray-300">
            06/18 前，尚需 <span class="text-primary-medium"> 100 </span> 個
          </p>
          <div class="grid grid-cols-3 gap-2 my-3 text-sm">
            <div class="col-span-1 ">
              <h3 class="mb-1.5">
                可贊助數量 <span class="text-primary-medium">*</span>
              </h3>
              <AppAddMinusButton />
            </div>
            <div class="col-span-2">
              <h3 class="mb-1.5">
                預計可送達天數 <span class="text-primary-medium">*</span>
              </h3>
              <input type="number" class="w-full p-2 text-gray-400 border border-gray-300 rounded" placeholder="請輸入天數">
            </div>
          </div>
          <div class="mb-3">
            <h3 class="mb-1.5">
              備註欄
            </h3>
            <textarea
              class="w-full h-20 p-3 text-sm border border-gray-300 rounded"
              placeholder="補充說明"
            />
          </div>
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
