<script setup lang="ts">
import { computed } from 'vue';
import { AlertTriangle, Satellite } from 'lucide-vue-next';
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

const confidencePct = computed(() => Math.round((alert.confidence || 0) * 100));
</script>

<template>
  <div
    class="cw-card-elevated group relative flex flex-col gap-3 rounded-[1.25rem] border p-4 shadow-md backdrop-blur-xl transition-all duration-200 hover:translate-x-1 hover:border-primary/50 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="flex items-center gap-2.5 flex-wrap">
      <Badge
        variant="outline"
        class="border-emerald-500/30 bg-emerald-500/10 font-bold text-emerald-700 capitalize dark:text-emerald-300 inline-flex items-center gap-1.5 text-xs"
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
          'border font-semibold text-xs transition-transform duration-200 hover:scale-105',
        ]"
      >
        <AlertTriangle
          v-if="alert.severity === 'high'"
          class="h-3 w-3 mr-1 inline text-rose-500"
        />
        {{ alertSeverityLabels[alert.severity] || ALERT_CARD_CONSTANTS.fallbackSeverityLabel }}
      </Badge>

      <span class="cw-telemetry-chip text-[10px]">
        <Satellite class="h-3 w-3 text-sky-500" />
        SAR Pass
      </span>
    </div>

    <div class="flex-1 min-w-0 sm:px-3">
      <span class="text-xs font-semibold text-foreground block truncate">
        {{ alert.location }}
      </span>
    </div>

    <div class="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
      <div class="w-16 hidden md:block">
        <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            class="h-full rounded-full transition-all"
            :class="
              alert.severity === 'high'
                ? 'bg-rose-500'
                : alert.severity === 'medium'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
            "
            :style="{ width: `${confidencePct}%` }"
          ></div>
        </div>
      </div>

      <span class="font-mono text-xs font-bold text-muted-foreground">
        {{ confidencePct }}{{ ALERT_CARD_CONSTANTS.confidenceSuffix }}
      </span>
    </div>
  </div>
</template>
