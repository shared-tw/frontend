<script setup lang="ts">
import { ref, watch } from 'vue'

const isOpen = ref(true)
const supplement = ref('')
const deliveryDays = ref(1)

watch(deliveryDays, () => {
  if (deliveryDays.value < 0)deliveryDays.value = 1
})

</script>
<template>
  <transition name="fade">
    <div v-if="isOpen" class="relative flex flex-col items-end justify-end w-full h-screen">
      <div class="fixed inset-0 bg-black opacity-50 " @click="isOpen=false" />
      <div class="relative w-full px-4 pb-4 bg-white rounded-t text-darkblue  h-screen overflow-scroll">
        <div class="bg-white py-2 sticky top-0">
          <div class="flex justify-between ">
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
        </div>
        <!-- v-for="(item, index) in items" :key="index" -->
        <div class="p-4 border border-gray-300 rounded mb-4">
          <div class="flex justify-between">
            <!-- item -->
            <h2>大型 X 光機</h2>
            <button type="button" class="text-red-500">
              <mdi-light:delete />
            </button>
          </div>
          <p class="pb-3 mt-3 text-sm font-light text-gray-400 border-b border-gray-300">
            <!-- item.number -->
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
              <input v-model.number="deliveryDays" type="number" class="w-full p-2 text-gray-400 border border-gray-300 rounded" :class="{'border-red-500':deliveryDays>10,'focus:border-red-500':deliveryDays>10}" placeholder="請輸入天數">
              <p v-show="deliveryDays>10" class="text-sm text-red-500 mt-2">
                天數請限制於 10 天內
              </p>
            </div>
          </div>
          <div class="mb-3">
            <!-- item.id -->
            <label for="message" class="block mb-1.5" @click="supplement='123'">
              備註欄
            </label>
            <textarea
              v-show="supplement==='123' "
              id="message"
              class="w-full h-20 p-3 text-sm border border-gray-300 rounded"
              placeholder="補充說明"
            />
          </div>
        </div>
        <div class="p-4 border border-gray-300 rounded mb-4">
          <div class="flex justify-between">
            <!-- item -->
            <h2>大型 X 光機</h2>
            <button type="button" class="text-red-500">
              <mdi-light:delete />
            </button>
          </div>
          <p class="pb-3 mt-3 text-sm font-light text-gray-400 border-b border-gray-300">
            <!-- item.number -->
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
              <input v-model.number="deliveryDays" type="number" class="w-full p-2 text-gray-400 border border-gray-300 rounded" :class="{'border-red-500':deliveryDays>10,'focus:border-red-500':deliveryDays>10}" placeholder="請輸入天數">
              <p v-show="deliveryDays>10" class="text-sm text-red-500 mt-2">
                天數請限制於 10 天內
              </p>
            </div>
          </div>
          <div class="mb-3">
            <!-- item.id -->
            <label for="message" class="block mb-1.5" @click="supplement='123'">
              備註欄
            </label>
            <textarea
              v-show="supplement==='123' "
              id="message"
              class="w-full h-20 p-3 text-sm border border-gray-300 rounded"
              placeholder="補充說明"
            />
          </div>
        </div>
        <div class="p-4 border border-gray-300 rounded mb-4">
          <div class="flex justify-between">
            <!-- item -->
            <h2>大型 X 光機</h2>
            <button type="button" class="text-red-500">
              <mdi-light:delete />
            </button>
          </div>
          <p class="pb-3 mt-3 text-sm font-light text-gray-400 border-b border-gray-300">
            <!-- item.number -->
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
              <input v-model.number="deliveryDays" type="number" class="w-full p-2 text-gray-400 border border-gray-300 rounded" :class="{'border-red-500':deliveryDays>10,'focus:border-red-500':deliveryDays>10}" placeholder="請輸入天數">
              <p v-show="deliveryDays>10" class="text-sm text-red-500 mt-2">
                天數請限制於 10 天內
              </p>
            </div>
          </div>
          <div class="mb-3">
            <!-- item.id -->
            <label for="message" class="block mb-1.5" @click="supplement='123'">
              備註欄
            </label>
            <textarea
              v-show="supplement==='123' "
              id="message"
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
