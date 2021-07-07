<script setup lang="ts">
import { useAuth } from '@/logics/auth'

const {
  lineLoginUrl,
} = useAuth()

</script>

<template>
  <div class="space-y-3 py-4 border-t">
    <AppLink class="w-full bg-line" :href="lineLoginUrl" :new-window="false">
      使用 Line 登入 / 註冊
    </AppLink>
  </div>
</template>
