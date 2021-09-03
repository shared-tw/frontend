<script setup lang="ts">

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

</script>

<template>
  <div class="">
    <div
      v-for="(message, idx) in props.data"
      :key="idx + Math.random().toString(36).substring(2, 9)"
      :class="{ scheduleLine: idx !== props.data.length-1 }"
      class="mb-2 ml-5 text-cool-gray-400 scheduleDot relative"
    >
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="postcss">
.scheduleDot::after {
  @apply content w-3 h-3 bg-green-500 absolute -left-5 rounded-full top-5/9 transform -translate-y-1/2;
}

.scheduleLine::before {
  @apply content absolute w-0.5 h-8 bg-green-500 -left-3.6 top-5/9;
}
</style>
