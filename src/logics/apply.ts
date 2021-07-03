import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supplyInfos } from '@/data'
import { useStorage } from '@vueuse/core'

import { SupplyItem } from '@/types'

const allCheckedItems = useStorage<Record<string, number[]>>('checked-apply-items', {})

export function useApply() {
  const route = useRoute()
  const router = useRouter()
  const { org } = route.params

  const supplyInfo = supplyInfos.find(item => item.id === org)!

  if (!supplyInfo) {
    router.push('/')
  }
  const checkedItems = computed(() => {
    return allCheckedItems.value[supplyInfo.id]
      ? allCheckedItems.value[supplyInfo.id]
      : allCheckedItems.value[supplyInfo.id] = []
  })

  const checkedItemLen = computed(() => checkedItems.value.length)

  const isDisabled = computed(() => checkedItemLen.value <= 0)

  function changeItem(item: SupplyItem, e: Event) {
    const checked = (e.target as HTMLInputElement).checked
    if (checked) {
      if (!isChecked(item.id)) {
        allCheckedItems.value[supplyInfo.id].push(item.id)
      }
    } else {
      allCheckedItems.value[supplyInfo.id] = allCheckedItems.value[supplyInfo.id].filter(i => i !== item.id)
    }
  }

  function isChecked(id: number) {
    return !!checkedItems.value.find(item => item === id)
  }

  return {
    isDisabled,
    supplyInfo,
    checkedItemLen,
    changeItem,
    isChecked,
  }
}
