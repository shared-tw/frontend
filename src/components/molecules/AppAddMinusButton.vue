<script setup lang="ts">
interface Props {
  value?: number
  error?: boolean
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  value: 1,
  error: false,
  min: 1,
  max: 10,
})

const input = ref<HTMLInputElement>()

defineEmits<{
  (e: 'change', value: Event): void
  (e: 'blur', value: FocusEvent): void
}>()

const handleAdd = () => {
  if (props.value >= props.max) return
  input.value?.dispatchEvent(new Event('change'))
  input.value?.dispatchEvent(new FocusEvent('blur'))
}

const handleMinus = () => {
  if (props.value <= props.min) return
  input.value?.dispatchEvent(new Event('change'))
  input.value?.dispatchEvent(new FocusEvent('blur'))
}

</script>

<template>
  <div
    class="flex justify-between d-input p-1"
    :class="{
      'border-negative': error
    }"
  >
    <button class="tag rounded-md p-1 text-primary-medium text-15px" @click="handleMinus">
      <uil:minus />
    </button>
    <input
      ref="input"
      :value="value"
      type="number"
      class="appearance-none w-full text-center outline-none text-darkblue"
      @change="$emit('change', $event)"
      @blur="$emit('blur', $event)"
    >
    <button class="tag rounded-md p-1 text-15px" @click="handleAdd">
      <uil:plus />
    </button>
  </div>
</template>
