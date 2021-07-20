<script setup lang="ts">
import { onMounted } from 'vue'
import authStore from '@/store/auth'

onMounted(async() => {
  await authStore.actions.refreshToken()
})
</script>

<template>
  <router-view />
  <FlashMessage />
</template>
