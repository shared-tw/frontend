import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { getDonationItems } from '@/api'

import type { RequiredItem } from '@/api'

const allCheckedItems = useStorage<Record<string, RequiredItem[]>>('checked-apply-items', {})

export function useApply() {
  const route = useRoute()
  const router = useRouter()
  const { org } = route.params
  const { items, error } = getDonationItems()

  watch(error, (e) => {
    if (e) {
      router.push('/')
    }
  })

  const supplyInfo = computed(() => {
    return items.value?.find(item => item.organization.name === org)
  })

  const orgName = computed(() => supplyInfo.value?.organization.name)

  const checkedItems = computed(() => {
    if (orgName.value && !allCheckedItems.value[orgName.value]) {
      allCheckedItems.value[orgName.value] = []
    }

    return orgName.value ? allCheckedItems.value[orgName.value] : []
  })

  function isChecked(id: string) {
    return !!checkedItems.value.find(item => item.id === id)
  }

  function deleteItem(item: RequiredItem) {
    if (!orgName.value) return
    allCheckedItems.value[orgName.value] = allCheckedItems.value[orgName.value].filter(i => i.id !== item.id)
  }

  function changeItem(item: RequiredItem, e: Event) {
    const checked = (e.target as HTMLInputElement).checked
    if (!orgName.value) return
    if (checked) {
      if (!isChecked(item.id)) {
        allCheckedItems.value[orgName.value].push(item)
      }
    } else {
      deleteItem(item)
    }
  }

  const checkedItemLen = computed(() => checkedItems.value.length)
  const isDisabled = computed(() => checkedItemLen.value <= 0)

  return {
    isDisabled,
    supplyInfo,
    checkedItems,
    checkedItemLen,
    changeItem,
    deleteItem,
    isChecked,
  }
}
