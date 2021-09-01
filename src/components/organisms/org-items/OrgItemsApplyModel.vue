<script setup lang="ts">
import { Form } from 'vee-validate'
import { useOrg } from '@/logics/apply'

const {
  checkedItems,
  deleteItem,
} = useOrg()

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['update:open'])

const isOpen = computed({
  get: () => props.open,
  set: v => emit('update:open', v),
})

function onSubmit(values: any) {
}
</script>
<template>
  <AppModal v-model:open="isOpen" name="本次捐贈物資">
    <Form v-slot="{ meta }" class="pb-18" @submit="onSubmit">
      {{ meta }}
      <p class="pb-3 text-sm font-light text-gray-400 border-$shared-bc">
        請填寫可贊助數量與天數
      </p>
      <div class="space-y-3">
        <div v-for="item in checkedItems" :key="item.id" class="p-4 border border-$shared-bc rounded">
          <div class="flex justify-between items-start pb-3 border-b border-$shared-bc">
            <ApplyItemInfo :item="item" />
          </div>
          <div class="flex space-x-3 pt-3 text-sm">
            <div class="flex-1">
              <FormAddMinus
                :name="`${item.id}.qty`"
                label="可贊助數量"
                :max="item.amount"
                required
              />
            </div>
            <div class="flex-1">
              <FormInput
                type="number"
                :name="`${item.id}.days`"
                label="預計可送達天數"
                placeholder="請輸入天數"
              />
            </div>
          </div>
          <FormTextarea :name="`${item.id}.text`" placeholder="補充說明" label="備註欄" required />
          <div class="border-t border-$shared-bc pt-3 flex justify-end">
            <AppButton inline @click="deleteItem(item)">
              <template #icon>
                <uil:trash-alt class="text-negative" />
              </template>
              刪除此筆訂單
            </AppButton>
          </div>
        </div>
      </div>
    </Form>
  </AppModal>
</template>
