<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { cityNames } from '@/data'
import { OrganizationTypes } from '@/api'
import donatorStore from '@/store/donator'

import type { ListItem } from '@/types'
import type { GroupedRequiredItems } from '@/api'

const items = ref<GroupedRequiredItems[]>()

onMounted(async() => {
  if (donatorStore.state.orgList.length === 0) {
    await donatorStore.actions.getRequiredItems()
  }
  items.value = donatorStore.state.orgList
})

const orgTypeNames = {
  [OrganizationTypes.Hospital]: '醫院',
  [OrganizationTypes.FireDepartment]: '消防局',
  [OrganizationTypes.PoliceStation]: '警察局',
  [OrganizationTypes.Other]: '其他',
}

const orgTypes = computed(() => {
  const arr: ListItem[] = []

  items.value?.forEach((i) => {
    const item = arr.find(a => a.value === i.organization.type)
    if (!item) {
      arr.push({
        name: orgTypeNames[i.organization.type as OrganizationTypes],
        value: i.organization.type,
      })
    }
  })

  return arr
})

const locationTypes = computed(() => {
  const arr: ListItem[] = []

  items.value?.forEach((i) => {
    const item = arr.find(a => a.value === i.organization.city)
    if (!item) {
      arr.push({
        name: cityNames[i.organization.city],
        value: i.organization.city,
      })
    }
  })

  return arr
})

const open = ref(false)
const selectedCity = ref<ListItem[]>([])
const selectedType = ref<ListItem[]>([])

function selectCity(city: ListItem) {
  if (selectedCity.value.includes(city)) {
    selectedCity.value = selectedCity.value.filter(i => i.name !== city.name)
  } else {
    selectedCity.value.push(city)
  }
}

function selectType(type: ListItem) {
  if (selectedType.value.includes(type)) {
    selectedType.value = selectedType.value.filter(i => i.name !== type.name)
  } else {
    selectedType.value.push(type)
  }
}

const filteredItems = computed(() => {
  if (selectedCity.value.length === 0 && selectedType.value.length === 0) {
    return items.value
  } else {
    return items.value?.filter((i) => {
      const { city, type } = i.organization
      if (selectedCity.value.map(i => i.value).includes(city)) {
        return true
      }
      if (selectedType.value.map(i => i.value).includes(type)) {
        return true
      }
      return false
    })
  }
})

const filteredTitle = computed(() => {
  if (selectedCity.value.length === 0 && selectedType.value.length === 0) {
    return '所有'
  } else {
    let title = [...selectedCity.value, ...selectedType.value].map(i => i.name).join('、')
    if (title.length > 10) {
      title = `${title.slice(0, 10)}...`
    }
    return `「${title}」的`
  }
})

function clearAll() {
  selectedCity.value = []
  selectedType.value = []
}

</script>

<template>
  <div class="flex pb-3 text-sm justify-between">
    <span class="text-gray-darker">
      {{ filteredTitle }}單位需求
    </span>
    <button class="inline-flex items-center text-primary-dark focus:outline-none" @click="open = true">
      <uil:filter />
      篩選
    </button>
  </div>
  <div v-if="items" class="space-y-3">
    <OrgListCard
      v-for="org in filteredItems"
      :key="org.organization.name"
      :org="org"
    />
  </div>
  <AppModal v-model:open="open" name="篩選條件">
    <div>
      <div class="mb-2">
        <span class="text-gray-dark text-sm">
          需求地點
        </span>
        <div class="overflow-y-auto py-2">
          <div class="flex space-x-2">
            <button
              v-for="city in locationTypes"
              :key="city.value"
              class="tag focus:outline-none"
              :class="{'tag-outline': !selectedCity.includes(city)}"
              @click="selectCity(city)"
            >
              {{ city.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="mb-2">
        <span class="text-gray-dark text-sm">
          單位類型
        </span>
        <div class="overflow-y-auto py-2">
          <div class="flex space-x-2">
            <button
              v-for="type in orgTypes"
              :key="type.value"
              class="tag focus:outline-none"
              :class="{'tag-outline': !selectedType.includes(type)}"
              @click="selectType(type)"
            >
              {{ type.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppButton size="large" class="w-full" @click="clearAll">
      清除篩選
    </AppButton>
  </AppModal>
</template>
