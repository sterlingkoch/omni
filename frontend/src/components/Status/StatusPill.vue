<!--
Copyright (c) 2026 Sidero Labs, Inc.

Use of this software is governed by the Business Source License
included in the LICENSE file.
-->
<script setup lang="ts">
import { cn } from '@/methods/utils'

import { statusPillClass, type StatusTone } from './statusTone'

const { tone } = defineProps<{ tone: StatusTone }>()
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex w-fit items-center gap-1.5 rounded-full py-px pr-2 pl-1.75 text-xs font-semibold whitespace-nowrap ring-1 ring-inset',
        statusPillClass[tone],
      )
    "
  >
    <span class="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
    <slot />
  </span>
</template>
