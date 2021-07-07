<script setup lang="ts">
import { useApply } from '@/logics/apply'
import { computed } from 'vue'

const {
  checkedItems,
  deleteItem,
} = useApply()

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['update:open'])

const isOpen = computed({
  get: () => props.open,
  set: v => emit('update:open', v),
})
</script>
<template>
  <AppModal v-model:open="isOpen" name="本次捐贈物資">
    <div class="pb-18">
      <p class="pb-3 text-sm font-light text-gray-400 border-$shared-bc">
        請填寫可贊助數量與天數
      </p>
      <div class="space-y-3">
        <div v-for="item in checkedItems" :key="item.id" class="p-4 border border-$shared-bc rounded">
          <div class="flex justify-between items-start">
            <ApplyItemInfo :item="item" />
            <button type="button" class="text-red-400 p-0.5 focus:outline-none" @click="deleteItem(item)">
              <uil:trash-alt />
            </button>
          </div>
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
              <AppInput type="number" class="h-36.8px" placeholder="請輸入天數" />
            </div>
          </div>
          <div class="mb-3">
            <h3 class="mb-1.5">
              備註欄
            </h3>
            <textarea
              class="w-full h-20 p-3 text-sm border border-$shared-bc rounded"
              placeholder="補充說明"
            />
          </div>
        </div>
      </div>
    </div>
  </AppModal>
</template>
