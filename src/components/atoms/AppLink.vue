<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'

interface Props {
  to?: string | object
  href?: string
  outline?: boolean
  inline?: boolean
  light?: boolean
  size?: 'big'
}

const props = withDefaults(defineProps<Props>(), {
  to: () => '',
  href: '',
  outline: false,
  inline: false,
})

const linkClass = computed(() => ({
  'btn': !props.inline,
  'btn-outline': props.outline,
  'btn-light': props.light,
  'text-sm underline': props.inline,
}))

</script>

<template>
  <router-link
    v-if="to"
    :to="to"
    :class="linkClass"
  >
    <div v-if="$slots.icon" class="mr-1 inline-block">
      <slot name="icon" />
    </div>
    <slot />
  </router-link>
  <a
    v-else
    :href="href"
    target="_blank"
    rel="noopener"
    :class="linkClass"
  >
    <div v-if="$slots.icon" class="mr-1 inline-block">
      <slot name="icon" />
    </div>
    <slot />
  </a>
</template>
