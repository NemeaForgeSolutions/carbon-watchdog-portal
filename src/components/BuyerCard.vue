<script setup lang="ts">
import { computed } from 'vue';
import { Building2, ChevronRight, Globe2, ShieldAlert, ShieldCheck } from 'lucide-vue-next';
import type { Buyer, FormatNumberFn, Project } from '../types';
import { BUYER_CARD_CONSTANTS } from '@/constants';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';

const props = withDefaults(
  defineProps<{
    buyer: Buyer;
    formatNumber: FormatNumberFn;
    totalMarketExposure?: number;
    linkedProjects?: Project[];
    selected?: boolean;
  }>(),
  {
    totalMarketExposure: 433000,
    linkedProjects: () => [],
    selected: false,
  },
);

const emit = defineEmits<{
  inspect: [buyer: Buyer];
}>();

const marketShare = computed(() => {
  if (!props.totalMarketExposure || !props.buyer.exposure) return 0;
  return Math.round((props.buyer.exposure / props.totalMarketExposure) * 100);
});

// Risk analysis breakdown for this buyer
const riskBreakdown = computed(() => {
  if (!props.linkedProjects?.length) {
    return { high: 0, medium: 0, low: 100, highVol: 0, medVol: 0, lowVol: props.buyer.exposure };
  }

  const projects = props.linkedProjects;
  const highCount = projects.filter((p) => p.riskLevel === 'high').length;
  const medCount = projects.filter((p) => p.riskLevel === 'medium').length;
  const total = projects.length;

  const highPct = Math.round((highCount / total) * 100);
  const medPct = Math.round((medCount / total) * 100);
  const lowPct = Math.max(0, 100 - highPct - medPct);

  return {
    high: highPct,
    medium: medPct,
    low: lowPct,
    hasHighRisk: highCount > 0,
    hasMedRisk: medCount > 0,
  };
});

const regulatoryBadge = computed(() => {
  if (riskBreakdown.value.high > 0) {
    return {
      label: 'High Claim Risk',
      classes: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
    };
  }
  if (riskBreakdown.value.medium > 0) {
    return {
      label: 'Watchlist Review',
      classes: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300',
    };
  }
  return {
    label: 'Defensible Claim',
    classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  };
});
</script>

<template>
  <Card
    class="cw-card-elevated group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-0 transition-all duration-200 cursor-pointer"
    :class="[
      selected
        ? 'border-primary ring-2 ring-primary/30 bg-muted/50 shadow-md'
        : 'hover:-translate-y-0.5 hover:shadow-lg hover:border-border',
      riskBreakdown.hasHighRisk && !selected ? 'hover:border-rose-500/40' : '',
      riskBreakdown.hasMedRisk && !selected ? 'hover:border-amber-500/40' : '',
    ]"
    @click="emit('inspect', buyer)"
  >
    <!-- Top accent bar based on risk posture -->
    <div
      class="h-1 w-full"
      :class="
        riskBreakdown.hasHighRisk
          ? 'bg-gradient-to-r from-rose-500 to-amber-500'
          : riskBreakdown.hasMedRisk
            ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
            : 'bg-gradient-to-r from-emerald-500 to-teal-400'
      "
    ></div>

    <CardContent class="flex flex-1 flex-col justify-between p-4 space-y-3.5">
      <!-- Top Header Row -->
      <div>
        <div class="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            class="border-border/80 bg-muted/60 text-foreground font-semibold inline-flex items-center gap-1 text-[11px] py-0 px-2"
          >
            <Globe2 class="h-2.5 w-2.5 text-emerald-500" />
            {{ buyer.region }}
          </Badge>

          <Badge
            variant="outline"
            :class="[regulatoryBadge.classes, 'font-semibold text-[11px] py-0 px-2 border']"
          >
            <ShieldAlert
              v-if="riskBreakdown.hasHighRisk"
              class="h-2.5 w-2.5 mr-1 inline"
            />
            <ShieldCheck
              v-else
              class="h-2.5 w-2.5 mr-1 inline"
            />
            {{ regulatoryBadge.label }}
          </Badge>
        </div>

        <!-- Buyer Name & Entity -->
        <div class="mt-2.5 flex items-start gap-2.5">
          <div
            class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted/80 text-foreground font-black border border-border/80 shadow-xs"
          >
            <Building2 class="h-4 w-4 text-primary" />
          </div>

          <div class="min-w-0">
            <h3
              class="text-base sm:text-lg font-black tracking-tight text-foreground transition-colors group-hover:text-primary truncate"
            >
              {{ buyer.name }}
            </h3>
            <p class="text-[11px] text-muted-foreground font-medium">
              {{ BUYER_CARD_CONSTANTS.badgeLabel }} • {{ marketShare }}% portfolio share
            </p>
          </div>
        </div>
      </div>

      <!-- Credit Exposure Telemetry -->
      <div class="border-border/60 bg-muted/30 rounded-xl border p-2.5 space-y-2">
        <div class="flex items-baseline justify-between gap-2">
          <div>
            <span class="text-[9px] font-bold tracking-wider text-muted-foreground uppercase block">
              Monitored Credits
            </span>
            <strong
              class="text-xl sm:text-2xl font-black tracking-tight text-foreground block font-mono"
            >
              {{ formatNumber(buyer.exposure) }}
            </strong>
          </div>
          <span class="text-[11px] font-semibold text-muted-foreground">
            {{ BUYER_CARD_CONSTANTS.creditUnit }}
          </span>
        </div>

        <!-- Stacked Risk Distribution Bar -->
        <div>
          <div
            class="flex items-center justify-between text-[9px] font-semibold text-muted-foreground mb-1"
          >
            <span>Risk Attribution</span>
            <span class="font-mono">
              {{
                riskBreakdown.high > 0
                  ? `${riskBreakdown.high}% High Risk`
                  : `${riskBreakdown.low}% Low Risk`
              }}
            </span>
          </div>

          <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted/80 flex">
            <div
              v-if="riskBreakdown.high > 0"
              class="h-full bg-rose-500 transition-all duration-500"
              :style="{ width: `${riskBreakdown.high}%` }"
              title="High Risk Credits"
            ></div>
            <div
              v-if="riskBreakdown.medium > 0"
              class="h-full bg-amber-500 transition-all duration-500"
              :style="{ width: `${riskBreakdown.medium}%` }"
              title="Medium Risk Credits"
            ></div>
            <div
              v-if="riskBreakdown.low > 0"
              class="h-full bg-emerald-500 transition-all duration-500"
              :style="{ width: `${riskBreakdown.low}%` }"
              title="Low Risk Credits"
            ></div>
          </div>
        </div>
      </div>

      <!-- Linked Projects Pills -->
      <div class="space-y-1.5">
        <div
          class="flex items-center justify-between text-[9px] font-bold tracking-wider text-muted-foreground uppercase"
        >
          <span>Connected Carbon Assets</span>
          <span class="font-mono">{{ linkedProjects?.length || 0 }} mapped</span>
        </div>

        <div
          v-if="linkedProjects?.length"
          class="flex flex-wrap gap-1"
        >
          <span
            v-for="project in linkedProjects"
            :key="project.id"
            class="border-border/70 bg-card text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium shadow-xs"
          >
            <span
              class="h-1.5 w-1.5 rounded-full"
              :class="
                project.riskLevel === 'high'
                  ? 'bg-rose-500'
                  : project.riskLevel === 'medium'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
              "
            ></span>
            <span>{{ project.name }}</span>
          </span>
        </div>
        <div
          v-else
          class="border-border/60 bg-muted/20 rounded-md border p-1.5 text-center text-[10px] text-muted-foreground font-medium"
        >
          No direct project linkages active
        </div>
      </div>

      <!-- Action Row -->
      <div class="pt-2 border-t border-border/50 flex items-center justify-between">
        <span class="text-[10px] text-muted-foreground font-medium">Compliance: 2026 Ready</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="h-7 px-2 gap-1 text-xs font-semibold text-primary hover:text-primary/80"
          @click.stop="emit('inspect', buyer)"
        >
          <span>Diligence File</span>
          <ChevronRight class="h-3 w-3" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
