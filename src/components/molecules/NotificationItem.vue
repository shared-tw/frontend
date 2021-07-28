<script setup lang="ts">
defineProps<{
  state: 'confirmed' | 'canceled'
  message: string
}>()

</script>

<template>
  <li>
    <router-link to="/" class="flex items-center space-x-2 p-2">
      <div class="text-xl">
        <uil:check v-if="state === 'confirmed'" class="text-primary" />
        <uil:exclamation-triangle v-else-if="state === 'canceled'" class="text-negative" />
      </div>
      <p class="text-sm truncate">
        {{ message }}
      </p>
    </router-link>
  </li>
</template>
