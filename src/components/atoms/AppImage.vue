<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  imgtype: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
})

</script>

<template>
  <img
    class="h-auto max-w-full"
    :width="props.width"
    :src="`${props.url}.${props.imgtype}`"
    :srcset="`${props.url}_1x.${props.imgtype} 1x, ${props.url}_2x.${props.imgtype} 2x,${props.url}_3x.${props.imgtype} 3x`"
    :alt="props.alt"
  >
</template>
