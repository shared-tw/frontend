<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import authStore from '@/store/auth'

const router = useRouter()
const route = useRoute()

if (route.query.token) {
  if (typeof route.query.token === 'string') {
    authStore.state.token = route.query.token
  }
}

if (route.query.unregistered) {
  router.push('/register/donator')
} else {
  router.push('/')
}

</script>

<template>
  <h1>
    Success
  </h1>
</template>
