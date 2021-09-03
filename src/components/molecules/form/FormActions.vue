<script setup lang="ts">
import type { UnRef, LinkProp } from '@/types'
import type { FormContext } from 'vee-validate'

interface Props {
  isLoading?: boolean
  meta: UnRef<FormContext['meta']>
  buttonName: string
  link: LinkProp
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
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
