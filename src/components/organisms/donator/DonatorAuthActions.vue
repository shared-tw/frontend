<script setup lang="ts">
import { useAuth } from '@/logics/auth'

const {
  lineLoginUrl,
} = useAuth()

</script>

<template>
  <div class="space-y-3 pb-6">
    <span class="py-2 block">一般民眾：</span>
    <AppLink class="w-full bg-line" :href="lineLoginUrl" :new-window="false">
      Line 登入 / 註冊
    </AppLink>
  </div>
</template>
