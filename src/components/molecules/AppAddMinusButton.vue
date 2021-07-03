<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: null,
  },
})

const value = ref(props.value)

const handleAdd = () => {
  if (value.value >= props.max) return
  value.value++
}

const handleMinus = () => {
  if (value.value <= props.min) return
  value.value--
}

</script>

<template>
  <div class="flex justify-between p-1.5 border border-gray-300 rounded text-primary-dark">
    <button type="button" class="flex items-center justify-center w-6 h-6 font-bold rounded rounded-5 bg-primary-light font-blod" @click=" handleMinus">
      <mdi-light:minus />
    </button>
    <AppInput
      type="number"
      :value="value"
      class="w-6 h-6 px-0 py-0 leading-none text-center border-none rounded-none text-darkblue"
    />
    <button type="button" class="flex items-center justify-center w-6 h-6 font-bold rounded rounded-5 bg-primary-light font-blod" @click="handleAdd">
      <mdi-light:plus />
    </button>
  </div>
</template>
