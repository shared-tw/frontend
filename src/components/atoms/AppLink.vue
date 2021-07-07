<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  to?: string | object
  href?: string
  outline?: boolean
  inline?: boolean
  light?: boolean
  size?: 'big'
  newWindow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: () => '',
  href: '',
  outline: false,
  inline: false,
  newWindow: true,
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
    :target="newWindow ? '_blank' : undefined"
    rel="noopener"
    :class="linkClass"
  >
    <div v-if="$slots.icon" class="mr-1 inline-block">
      <slot name="icon" />
    </div>
    <slot />
  </a>
</template>
