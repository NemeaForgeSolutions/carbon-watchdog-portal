<script setup lang="ts">
import type { MetricAccent } from '../types';
import { METRIC_CARD_CONSTANTS, metricAccentClasses } from '@/constants';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    detail?: string;
    accent?: MetricAccent;
    trend?: string;
  }>(),
  {
    detail: '',
    accent: METRIC_CARD_CONSTANTS.defaultAccent,
    trend: '',
  },
);
</script>

<template>
  <Card
    :class="
      cn(
        'cw-card-elevated group relative overflow-hidden rounded-[1.35rem] border p-0 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
        metricAccentClasses[props.accent],
      )
    "
  >
    <!-- Ambient micro-accent line -->
    <div
      class="h-0.5 w-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      :class="
        props.accent === 'emerald'
          ? 'bg-emerald-500'
          : props.accent === 'amber'
            ? 'bg-amber-500'
            : props.accent === 'blue'
              ? 'bg-sky-500'
              : 'bg-slate-400'
      "
    ></div>

    <CardContent class="p-4 sm:p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-[0.66rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
            {{ props.label }}
          </p>
          <strong
            class="mt-2 block text-2xl sm:text-3xl font-black tracking-tight text-foreground font-mono transition-transform duration-200 group-hover:scale-[1.02]"
          >
            {{ props.value }}
          </strong>
        </div>

        <Badge
          variant="outline"
          class="border-border/80 bg-muted/60 text-[11px] font-semibold text-foreground inline-flex items-center gap-1.5 shrink-0"
        >
          <span
            class="cw-radar-dot h-1.5 w-1.5 rounded-full"
            :class="
              props.accent === 'emerald'
                ? 'bg-emerald-500'
                : props.accent === 'amber'
                  ? 'bg-amber-500'
                  : props.accent === 'blue'
                    ? 'bg-sky-500'
                    : 'bg-emerald-500'
            "
            aria-hidden="true"
          ></span>
          {{ props.detail || METRIC_CARD_CONSTANTS.fallbackDetail }}
        </Badge>
      </div>

      <div
        class="mt-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-2.5"
      >
        <span class="truncate">{{
          props.detail || METRIC_CARD_CONSTANTS.fallbackDescription
        }}</span>
        <span
          v-if="props.trend"
          class="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0"
        >
          {{ props.trend }}
        </span>
      </div>
    </CardContent>
  </Card>
</template>
