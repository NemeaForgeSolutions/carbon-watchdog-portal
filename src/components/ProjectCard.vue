<script setup lang="ts">
import { computed } from 'vue';
import type { Buyer, FormatNumberFn, Project } from '../types';
import { PROJECT_CARD_CONSTANTS, projectRiskStyles } from '@/constants';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';

const {
  project,
  buyerLinks = [],
  formatNumber,
} = defineProps<{
  project: Project;
  buyerLinks?: Buyer[];
  formatNumber: FormatNumberFn;
}>();

const exposureText = computed(() => {
  if (!buyerLinks.length) return PROJECT_CARD_CONSTANTS.emptyBuyersText;

  return buyerLinks
    .map((buyer) => `${buyer.name}: ${formatNumber(buyer.exposure)} credits`)
    .join(' • ');
});

const coordinatesText = computed(() =>
  project.coordinates?.length
    ? project.coordinates.join(', ')
    : PROJECT_CARD_CONSTANTS.unavailableCoordinatesText,
);
</script>

<template>
  <Card
    class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-2xl"
  >
    <CardContent class="p-4 sm:p-6">
      <div class="flex items-center justify-between gap-3">
        <Badge
          variant="outline"
          class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300"
        >
          {{ project.creditType }}
        </Badge>
        <Badge
          variant="outline"
          :class="[
            projectRiskStyles[project.riskLevel] ||
              projectRiskStyles[PROJECT_CARD_CONSTANTS.defaultRiskLevel],
            'border capitalize transition-all duration-200 hover:scale-105',
          ]"
        >
          {{ project.riskLevel }}{{ PROJECT_CARD_CONSTANTS.riskLabelSuffix }}
        </Badge>
      </div>

      <div class="mt-4">
        <h3
          class="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
        >
          {{ project.name }}
        </h3>
        <p class="mt-1 text-sm font-medium text-muted-foreground">
          {{ project.country }}
        </p>
      </div>

      <div
        class="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground"
      >
        <span class="inline-flex items-center gap-2 font-medium">
          <span
            class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500"
            aria-hidden="true"
          ></span>
          {{ project.status }}
        </span>
        <span class="font-mono text-[0.7rem] break-all">{{ coordinatesText }}</span>
      </div>

      <div
        class="border-border/80 bg-muted/60 mt-5 rounded-[1rem] border p-3.5 text-sm leading-6 text-foreground"
      >
        <p class="text-[0.68rem] font-bold tracking-[0.14em] text-muted-foreground uppercase">
          {{ PROJECT_CARD_CONSTANTS.buyerExposureTitle }}
        </p>
        <p class="mt-0.5 font-medium break-words">
          {{ exposureText }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>

