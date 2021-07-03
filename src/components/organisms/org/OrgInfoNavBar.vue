<script setup lang="ts">
import { defineProps } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

// function goBack() {
//   router.back()
// }

defineProps({
  org: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <div class="flex items-center justify-between mb-3.5">
    <p class="text-gray-dark ">
      請選擇欲捐贈之項目
    </p>
    <div>
      <span class="tag tag-outline mr-2.5">
        {{ org.city }}
      </span>
      <span class="tag">
        {{ org.type }}
      </span>
    </div>
  </div>
  <!-- <div class="flex items-center py-4 mb-2 border-b border-gray-500">
    <button class="text-xl inline-flex mr-2 p-1 -ml-2 focus:outline-none" @click="goBack">
      <uil:angle-left />
    </button>
    <h2 class="text-xl font-bold mr-auto">
      {{ org.name }}
    </h2>
    <AppLabel class="mr-2">
      {{ org.type }}
    </AppLabel>
    <AppLabel outline>
      {{ org.city }}
    </AppLabel>
  </div> -->
</template>
