<script setup lang="ts">
import { onMounted } from 'vue'
import authStore from '@/store/auth'

onMounted(async() => {
  await authStore.actions.refreshToken()
})
</script>

<template>
  <TheHeader v-show="!$route.params.org" />
  <router-view />
  <FlashMessage />
</template>
