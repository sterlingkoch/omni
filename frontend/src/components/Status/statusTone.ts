// Copyright (c) 2026 Sidero Labs, Inc.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.

export type StatusTone = 'success' | 'warning' | 'danger' | 'info'

export const statusPillClass: Record<StatusTone, string> = {
  success: 'bg-status-success-subtle text-status-success-text ring-status-success-subtle-border',
  warning: 'bg-status-warning-subtle text-status-warning-text ring-status-warning-subtle-border',
  danger: 'bg-status-danger-subtle text-status-danger-text ring-status-danger-subtle-border',
  info: 'bg-status-info-subtle text-status-info-text ring-status-info-subtle-border',
}

export const statusDotClass: Record<StatusTone, string> = {
  success: 'bg-status-success-text',
  warning: 'bg-status-warning-text',
  danger: 'bg-status-danger-text',
  info: 'bg-status-info-text',
}

/** Reads the tone from the text colour class a status was drawn with before it became a pill. */
export function toneFromTextClass(textClass?: string): StatusTone {
  if (!textClass) return 'info'
  if (textClass.includes('green')) return 'success'
  if (textClass.includes('yellow')) return 'warning'
  if (textClass.includes('red')) return 'danger'

  return 'info'
}

export function toneFromSeverity(severity?: string): StatusTone {
  switch (severity) {
    case 'Critical':
    case 'High':
      return 'danger'
    case 'Medium':
      return 'warning'
    default:
      return 'info'
  }
}
