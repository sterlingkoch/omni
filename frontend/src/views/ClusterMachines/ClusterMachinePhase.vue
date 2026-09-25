<!--
Copyright (c) 2026 Sidero Labs, Inc.

Use of this software is governed by the Business Source License
included in the LICENSE file.
-->
<script setup lang="ts">
import type { Resource } from '@/api/grpc'
import type { ClusterMachineStatusSpec } from '@/api/omni/specs/omni.pb'
import { ClusterMachineStatusSpecStage } from '@/api/omni/specs/omni.pb'
import { MachineStatusLabelConnected } from '@/api/resources'
import StatusPill from '@/components/Status/StatusPill.vue'
import { toneFromTextClass } from '@/components/Status/statusTone'
import Tooltip from '@/components/Tooltip/Tooltip.vue'

const connected = (machine: Resource<ClusterMachineStatusSpec>): boolean => {
  if (
    machine.spec.stage === ClusterMachineStatusSpecStage.POWERING_ON ||
    machine.spec.stage === ClusterMachineStatusSpecStage.POWERED_OFF
  ) {
    return true
  }

  return machine?.metadata.labels?.[MachineStatusLabelConnected] === ''
}

const stageName = (machine: Resource<ClusterMachineStatusSpec>): string => {
  switch (machine?.spec.stage) {
    case ClusterMachineStatusSpecStage.BOOTING:
      return 'Booting'
    case ClusterMachineStatusSpecStage.INSTALLING:
      return 'Installing'
    case ClusterMachineStatusSpecStage.UPGRADING:
      return 'Upgrading'
    case ClusterMachineStatusSpecStage.CONFIGURING:
      return 'Configuring'
    case ClusterMachineStatusSpecStage.RUNNING:
      if (machine?.spec.ready || !connected(machine)) {
        return 'Running'
      } else {
        return 'Not Ready'
      }
    case ClusterMachineStatusSpecStage.REBOOTING:
      return 'Rebooting'
    case ClusterMachineStatusSpecStage.SHUTTING_DOWN:
      return 'Shutting Down'
    case ClusterMachineStatusSpecStage.DESTROYING:
      return 'Destroying'
    case ClusterMachineStatusSpecStage.BEFORE_DESTROY:
      return 'Preparing to Destroy'
    case ClusterMachineStatusSpecStage.POWERING_ON:
      return 'Powering On'
    case ClusterMachineStatusSpecStage.POWERED_OFF:
      return 'Powered Off'
    default:
      return 'Unknown'
  }
}

const stageClass = (machine: Resource<ClusterMachineStatusSpec>): string => {
  switch (machine?.spec.stage) {
    case ClusterMachineStatusSpecStage.BOOTING:
    case ClusterMachineStatusSpecStage.INSTALLING:
    case ClusterMachineStatusSpecStage.UPGRADING:
    case ClusterMachineStatusSpecStage.CONFIGURING:
    case ClusterMachineStatusSpecStage.REBOOTING:
    case ClusterMachineStatusSpecStage.POWERING_ON:
      return 'text-yellow-y1'
    case ClusterMachineStatusSpecStage.RUNNING:
      if (machine?.spec.ready || !connected(machine)) {
        return 'text-green-g1'
      } else {
        return 'text-red-r1'
      }
    case ClusterMachineStatusSpecStage.POWERED_OFF:
      return 'text-naturals-n10'
    case ClusterMachineStatusSpecStage.SHUTTING_DOWN:
    case ClusterMachineStatusSpecStage.BEFORE_DESTROY:
    case ClusterMachineStatusSpecStage.DESTROYING:
      return 'text-red-r1'
    default:
      return 'text-yellow-y1'
  }
}

type Props = {
  machine: Resource<ClusterMachineStatusSpec>
}

defineProps<Props>()
</script>

<template>
  <div>
    <Tooltip
      placement="bottom"
      :description="
        connected(machine) ? undefined : 'The machine is unreachable. The last known state is shown'
      "
    >
      <StatusPill :tone="connected(machine) ? toneFromTextClass(stageClass(machine)) : 'info'">
        <span data-testid="cluster-machine-stage-name" class="truncate">
          {{ stageName(machine) || '' }}
        </span>
      </StatusPill>
    </Tooltip>
  </div>
</template>
