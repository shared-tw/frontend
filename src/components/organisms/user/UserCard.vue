<script setup lang="ts">
import userStore from '@/store/user'
import { onMounted, computed } from 'vue'

onMounted(async() => {
  await userStore.actions.getUser()
})

const user = computed(() => userStore.state.user)
</script>

<template>
  <div class="flex py-4 px-5 bg-primary-lightest border border-primary-medium rounded-md">
    <div class="rounded-full bg-primary h-8 w-8 flex items-center justify-center">
      <span class="text-lg font-medium text-white">
        {{ user?.name.slice(0, 1) }}
      </span>
    </div>
    <div class="mx-4 flex flex-col">
      <span class="text-lg font-bold">{{ user?.name }}</span>
      <span class="text-sm">{{ user?.email }}</span>
    </div>
    <div class="ml-auto">
      <CheckAllButton to="/" />
    </div>
  </div>
</template>
