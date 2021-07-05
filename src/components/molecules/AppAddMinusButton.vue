<script setup lang="ts">
import { ref } from 'vue'

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
  <div class="flex justify-between p-1 border border-$shared-bc rounded-md text-primary-dark">
    <button class="tag rounded-md p-1" light @click="handleMinus">
      <uil:minus />
    </button>
    <AppInput
      type="number"
      :value="value"
      class="w-6 h-6 px-0 py-0 leading-none text-center border-none rounded-none text-darkblue"
    />
    <button class="tag rounded-md p-1" @click="handleAdd">
      <uil:plus />
    </button>
  </div>
</template>
