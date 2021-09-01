<script setup lang="ts">
const props = defineProps<{
  id?: string
  name?: string
  value?: string
  items: {
    name: string
    value: string
  }[]
  size?: 'sm'
  error?: boolean
  placeholder?: string
}>()

const emit = defineEmits(['change'])

const currentValue = ref(props.value)

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  currentValue.value = target.value
  emit('change', target.value)
}

</script>

<template>
  <div
    class="d-input"
    :class="[
      {'d-input-sm': size === 'sm'},
      {'border-red-400': error},
      $attrs.class
    ]"
  >
    <select
      :id="id"
      :name="name"
      :value="value"
      class="w-full h-full outline-none"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" :disabled="true" :selected="true">
        {{ placeholder }}
      </option>
      <option v-for="{ name, value } in items" :key="value" :value="value">
        {{ name }}
      </option>
    </select>
  </div>
</template>
