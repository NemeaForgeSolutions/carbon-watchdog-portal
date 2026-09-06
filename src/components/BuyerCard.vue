<script setup lang="ts">
import type { Buyer, FormatNumberFn } from '../types';
import { BUYER_CARD_CONSTANTS } from '@/constants';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';

const { buyer, formatNumber } = defineProps<{
  buyer: Buyer;
  formatNumber: FormatNumberFn;
}>();
</script>

<template>
  <Card
    class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-2xl"
  >
    <CardContent class="p-4 sm:p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3
            class="text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
          >
            {{ buyer.name }}
          </h3>
          <p class="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
            {{ buyer.region }}
          </p>
        </div>
        <Badge
          variant="secondary"
          class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
        >
          {{ BUYER_CARD_CONSTANTS.badgeLabel }}
        </Badge>
      </div>

      <div class="mt-4 sm:mt-5 flex items-baseline gap-2">
        <strong
          class="text-2xl sm:text-4xl font-black tracking-tight text-foreground transition-transform duration-200 hover:scale-[1.02]"
          >{{ formatNumber(buyer.exposure) }}</strong
        >
        <span class="text-xs sm:text-sm font-semibold text-muted-foreground">{{
          BUYER_CARD_CONSTANTS.creditUnit
        }}</span>
      </div>

      <p class="mt-2 text-xs font-medium text-muted-foreground">
        {{ BUYER_CARD_CONSTANTS.exposureDescription }}
      </p>
    </CardContent>
  </Card>
</template>

