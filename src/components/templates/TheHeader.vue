<script setup lang="ts">
import authStore from '@/store/auth'

</script>

<template>
  <header
    class="bg-white h-$header-height px-3 inset-x-0 top-0 z-20 fixed shadow"
  >
    <div class="container flex h-$header-height mx-auto max-w-screen-xl text-primary items-center">
      <AppLogo class="h-55px flex-1" />
      <div v-if="!$route.path.startsWith('/login')" class="pl-auto">
        <router-link v-if="authStore.state.authenticated" to="/user" class="icon-btn">
          <ic:round-account-circle />
        </router-link>
        <AppLink v-else to="/login" outline>
          登入
        </AppLink>
      </div>
    </div>
  </header>
</template>
