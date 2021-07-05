<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  proccess: {
    type: Array,
    default: [],
  },
})

const isActive = ref(false)

</script>

<template>
  <div class="flex items-center" @click="isActive = !isActive">
    <p>申請捐贈進度</p>
    <span v-if="isActive" class="ml-3 text-cyan-500">收合</span>
    <span v-else class="ml-3 text-cyan-500">展開</span>
    <ic:twotone-keyboard-arrow-down v-if="isActive" />
    <ic:twotone-keyboard-arrow-up v-else />
  </div>
  <ProcessLine
    v-if="isActive"
    :data="props.proccess"
  />
</template>
