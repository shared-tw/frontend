import { useStorage } from '@vueuse/core'
import { needConfirm } from '@/store/apply'
import donatorStore from '@/store/donator'

import type { RequiredItem } from '@/api'

const allCheckedItems = useStorage<Record<string, RequiredItem[]>>('checked-apply-items', {})

export function useOrg() {
  const route = useRoute()
  const router = useRouter()
  const { org: orgParam } = route.params

  onMounted(async() => {
    if (donatorStore.state.orgList.length > 0) return
    await donatorStore.actions.getRequiredItems()
  })

  const org = computed(() => {
    return donatorStore.state.orgList.find(item => item.organization.name === orgParam)
  })

  const orgName = computed(() => org.value?.organization.name)

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

  const isApplyModelOpen = ref(false)
  const isConfirmModelOpen = ref(false)

  function sendApply() {
    // eslint-disable-next-line no-alert
    if (needConfirm.value) {
      isConfirmModelOpen.value = true
      return
    }
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(checkedItems.value, null, 2))
    router.push('/thanks')
  }

  return {
    org,
    isDisabled,
    isApplyModelOpen,
    isConfirmModelOpen,
    checkedItems,
    checkedItemLen,
    changeItem,
    deleteItem,
    isChecked,
    sendApply,
  }
}
