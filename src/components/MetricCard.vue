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
  }>(),
  {
    detail: '',
    accent: METRIC_CARD_CONSTANTS.defaultAccent,
  },
);
</script>

<template>
  <Card
    :class="
      cn(
        'cw-card-interactive overflow-hidden border p-0 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl',
        metricAccentClasses[props.accent],
      )
    "
  >
    <CardContent class="p-5 sm:p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
            {{ props.label }}
          </p>
          <strong
            class="mt-3 block text-3xl font-black tracking-tight text-foreground sm:text-4xl transition-transform duration-200 hover:scale-[1.02]"
            >{{ props.value }}</strong
          >
        </div>

        <Badge
          variant="outline"
          class="border-border/80 bg-muted/60 text-xs font-semibold text-foreground inline-flex items-center gap-1.5"
        >
          <span
            class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500"
            aria-hidden="true"
          ></span>
          {{ props.detail || METRIC_CARD_CONSTANTS.fallbackDetail }}
        </Badge>
      </div>

      <p class="mt-3 text-sm leading-6 text-muted-foreground">
        {{ props.detail || METRIC_CARD_CONSTANTS.fallbackDescription }}
      </p>
    </CardContent>
  </Card>
</template>

