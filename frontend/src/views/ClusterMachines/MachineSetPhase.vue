<!--
Copyright (c) 2026 Sidero Labs, Inc.

Use of this software is governed by the Business Source License
included in the LICENSE file.
-->
<script setup lang="ts">
import pluralize from 'pluralize'

import type { Resource } from '@/api/grpc'
import type { MachineSetStatusSpec } from '@/api/omni/specs/omni.pb'
import { MachineSetPhase } from '@/api/omni/specs/omni.pb'
import TIcon from '@/components/Icon/TIcon.vue'
import StatusPill from '@/components/Status/StatusPill.vue'
import { toneFromTextClass } from '@/components/Status/statusTone'

const phaseName = (machineset: Resource<MachineSetStatusSpec>): string => {
  switch (machineset?.spec.phase) {
    case MachineSetPhase.ScalingUp:
      return 'Scaling Up'
    case MachineSetPhase.ScalingDown:
      return 'Scaling Down'
    case MachineSetPhase.Running:
      if (machineset?.spec.ready) {
        return 'Running'
      } else {
        return 'Not Ready'
      }
    case MachineSetPhase.Destroying:
      return 'Destroying'
    case MachineSetPhase.Failed:
      return 'Failed'
    case MachineSetPhase.Reconfiguring:
      return 'Reconfiguring'
    case MachineSetPhase.Upgrading:
      return 'Upgrading'
    default:
      return 'Unknown'
  }
}

const phaseClass = (machineset?: Resource<MachineSetStatusSpec>) => {
  switch (machineset?.spec.phase) {
    case MachineSetPhase.Upgrading:
    case MachineSetPhase.ScalingUp:
    case MachineSetPhase.ScalingDown:
    case MachineSetPhase.Reconfiguring:
      return 'text-yellow-y1'
    case MachineSetPhase.Running:
      if (machineset?.spec.ready) {
        return 'text-green-g1'
      } else {
        return 'text-red-r1'
      }
    case MachineSetPhase.Failed:
    case MachineSetPhase.Destroying:
      return 'text-red-r1'
    default:
      return 'text-yellow-y1'
  }
}

type Props = {
  item: Resource<MachineSetStatusSpec>
}

defineProps<Props>()
</script>

<template>
  <div class="flex gap-2">
    <StatusPill :tone="toneFromTextClass(phaseClass(item))" data-testid="machine-set-phase-name">
      {{ phaseName(item) || '' }}
    </StatusPill>
    <div v-if="item.spec.locked_updates" class="flex items-center gap-1 text-sky-400">
      <TIcon icon="time" class="h-4" />
      {{ pluralize('Pending Config Update', item.spec.locked_updates, true) }}
    </div>
  </div>
</template>
