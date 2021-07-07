<script setup lang="ts">
import { useAuth } from '@/logics/auth'

const { isAuthorized } = useAuth()

const menuList = [
  {
    title: '機構單位需求',
    path: '',
  },
  {
    title: '愛心捐贈',
    path: '',
  },
  {
    title: '相關平台',
    path: '',
  },
]

</script>

<template>
  <header
    class="bg-white h-$header-height px-2 inset-x-0 top-0 z-20 fixed shadow"
  >
    <div class="container flex h-$header-height mx-auto max-w-screen-xl text-primary items-center justify-between">
      <AppPopover class="icon-btn text-black">
        <ic:round-menu />
        <template #content>
          <ul class="bg-white border rounded -mt-2 text-base text-black ml-2 py-1">
            <li v-for="(menu, index) in menuList" :key="index" class="py-2.5 px-6 active:text-primary">
              {{ menu.title }}
            </li>
          </ul>
        </template>
      </AppPopover>
      <AppLogo class="h-55px flex-1" />
      <div class="px-2" :class="{'opacity-0 pointer-events-none': $route.path === '/login'}">
        <button v-if="isAuthorized" class="icon-btn">
          <ic:round-account-circle />
        </button>
        <AppLink v-else to="/login" outline>
          登入
        </AppLink>
      </div>
    </div>
  </header>
</template>
