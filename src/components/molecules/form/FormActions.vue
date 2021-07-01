<script setup lang="ts">
import { defineProps } from 'vue'

import type { PropType } from 'vue'
import type { LinkProp } from '@/types'

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object,
    required: true,
  },
  buttonName: {
    type: String,
    required: true,
  },
  link: {
    type: Object as PropType<LinkProp>,
    required: true,
  },
})

</script>

<template>
  <div class="flex justify-between items-center">
    <AppLink :to="link.href" inline>
      {{ link.content }}
    </AppLink>
    <AppButton type="submit" :disabled="!meta.valid" class="inline-flex">
      <IconLoading v-if="isLoading" />
      <span v-else>
        {{ buttonName }}
      </span>
    </AppButton>
  </div>
</template>
