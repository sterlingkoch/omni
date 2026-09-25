<!--
Copyright (c) 2026 Sidero Labs, Inc.

Use of this software is governed by the Business Source License
included in the LICENSE file.
-->
<script setup lang="ts">
import type { Resource } from '@/api/grpc'
import type { ClusterStatusSpec } from '@/api/omni/specs/omni.pb'
import { ClusterStatusSpecPhase } from '@/api/omni/specs/omni.pb'
import StatusPill from '@/components/Status/StatusPill.vue'
import { toneFromTextClass } from '@/components/Status/statusTone'

type Props = {
  cluster?: Resource<ClusterStatusSpec>
}

defineProps<Props>()

const phaseName = (cluster?: Resource<ClusterStatusSpec>): string => {
  switch (cluster?.spec.phase) {
    case ClusterStatusSpecPhase.SCALING_UP:
      return 'Scaling Up'
    case ClusterStatusSpecPhase.SCALING_DOWN:
      return 'Scaling Down'
    case ClusterStatusSpecPhase.RUNNING:
      if (cluster?.spec.ready) {
        return 'Running'
      } else {
        return 'Not Ready'
      }
    case ClusterStatusSpecPhase.DESTROYING:
      return 'Destroying'
    default:
      return 'Unknown'
  }
}

const phaseClass = (cluster?: Resource<ClusterStatusSpec>): string => {
  switch (cluster?.spec.phase) {
    case ClusterStatusSpecPhase.SCALING_UP:
    case ClusterStatusSpecPhase.SCALING_DOWN:
      return 'text-yellow-y1'
    case ClusterStatusSpecPhase.RUNNING:
      if (cluster?.spec.ready) {
        return 'text-green-g1'
      } else {
        return 'text-red-r1'
      }
    case ClusterStatusSpecPhase.DESTROYING:
      return 'text-red-r1'
    default:
      return 'text-yellow-y1'
  }
}
</script>

<template>
  <StatusPill :tone="toneFromTextClass(phaseClass(cluster))">
    {{ phaseName(cluster) }}
  </StatusPill>
</template>
