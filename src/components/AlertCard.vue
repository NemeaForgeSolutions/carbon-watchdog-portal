<script setup lang="ts">
import type { Alert } from '../types';
import {
  ALERT_CARD_CONSTANTS,
  alertSeverityDotClasses,
  alertSeverityLabels,
  alertSeverityStyles,
} from '@/constants';
import Badge from '@/components/ui/badge/Badge.vue';

const { alert } = defineProps<{
  alert: Alert;
}>();
</script>

<template>
  <div
    class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground flex flex-col gap-2.5 rounded-[1.25rem] border p-4 shadow-md backdrop-blur-xl transition-all duration-200 hover:translate-x-1 hover:border-emerald-500/50 hover:shadow-lg md:grid md:grid-cols-[auto_auto_minmax(0,1fr)_auto] md:items-center md:gap-3"
  >
    <div class="flex flex-wrap items-center justify-between gap-2 md:contents">
      <div class="flex items-center gap-2">
        <Badge
          variant="outline"
          class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 capitalize dark:text-emerald-300 inline-flex items-center gap-1.5"
        >
          <span
            class="cw-radar-dot h-1.5 w-1.5 rounded-full"
            :class="alertSeverityDotClasses[alert.severity] || alertSeverityDotClasses.low"
            aria-hidden="true"
          ></span>
          {{ alert.type }}
        </Badge>

        <Badge
          variant="outline"
          :class="[
            alertSeverityStyles[alert.severity] ||
              alertSeverityStyles[ALERT_CARD_CONSTANTS.fallbackSeverity],
            'border transition-transform duration-200 hover:scale-105',
          ]"
        >
          {{ alertSeverityLabels[alert.severity] || ALERT_CARD_CONSTANTS.fallbackSeverityLabel }}
        </Badge>
      </div>

      <span class="font-mono text-xs font-semibold text-muted-foreground md:hidden">
        {{ Math.round((alert.confidence || 0) * 100) }}{{ ALERT_CARD_CONSTANTS.confidenceSuffix }}
      </span>
    </div>

    <span class="text-sm font-medium text-foreground">{{ alert.location }}</span>

    <span
      class="hidden font-mono text-xs font-semibold text-muted-foreground md:block md:text-right"
    >
      {{ Math.round((alert.confidence || 0) * 100) }}{{ ALERT_CARD_CONSTANTS.confidenceSuffix }}
    </span>
  </div>
</template>

