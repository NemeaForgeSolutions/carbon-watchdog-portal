<script setup lang="ts">
import { computed } from 'vue';
import { ChevronRight, Globe, MapPin, Satellite, ShieldAlert, ShieldCheck } from 'lucide-vue-next';
import type { Buyer, FormatNumberFn, Project } from '../types';
import { PROJECT_CARD_CONSTANTS, projectRiskStyles } from '@/constants';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';

const props = withDefaults(
  defineProps<{
    project: Project;
    buyerLinks?: Buyer[];
    formatNumber: FormatNumberFn;
    selected?: boolean;
  }>(),
  {
    buyerLinks: () => [],
    selected: false,
  },
);

const emit = defineEmits<{
  inspect: [project: Project];
}>();

const integrityScore = computed(() => {
  return (
    PROJECT_CARD_CONSTANTS.integrityScores[props.project.riskLevel] ??
    PROJECT_CARD_CONSTANTS.integrityScores.high
  );
});

const coordinatesText = computed(() =>
  props.project.coordinates?.length
    ? `${props.project.coordinates[0].toFixed(3)}°, ${props.project.coordinates[1].toFixed(3)}°`
    : PROJECT_CARD_CONSTANTS.unavailableCoordinatesText,
);
</script>

<template>
  <Card
    class="cw-card-elevated group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-0 transition-all duration-200 cursor-pointer"
    :class="[
      selected
        ? 'border-primary ring-2 ring-primary/30 bg-muted/50 shadow-md'
        : 'hover:-translate-y-0.5 hover:shadow-lg hover:border-border',
      project.riskLevel === 'high' && !selected ? 'hover:border-rose-500/40' : '',
      project.riskLevel === 'medium' && !selected ? 'hover:border-amber-500/40' : '',
      project.riskLevel === 'low' && !selected ? 'hover:border-emerald-500/40' : '',
    ]"
    @click="emit('inspect', project)"
  >
    <!-- Ambient top glow line matching risk level -->
    <div
      class="h-1 w-full"
      :class="
        project.riskLevel === 'high'
          ? 'bg-gradient-to-r from-rose-500 to-amber-500'
          : project.riskLevel === 'medium'
            ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
            : 'bg-gradient-to-r from-emerald-500 to-teal-400'
      "
    ></div>

    <CardContent class="flex flex-1 flex-col justify-between p-4 space-y-3.5">
      <!-- Top Row: Badges & Sensor Tag -->
      <div>
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            <Badge
              variant="outline"
              class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300 text-[11px] py-0 px-2"
            >
              {{ project.creditType }}
            </Badge>
            <Badge
              variant="outline"
              :class="[
                projectRiskStyles[project.riskLevel] ||
                  projectRiskStyles[PROJECT_CARD_CONSTANTS.defaultRiskLevel],
                'border capitalize font-semibold inline-flex items-center gap-1 text-[11px] py-0 px-2',
              ]"
            >
              <span
                class="cw-radar-dot h-1.5 w-1.5 rounded-full"
                :class="
                  project.riskLevel === 'high'
                    ? 'bg-rose-500'
                    : project.riskLevel === 'medium'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                "
                aria-hidden="true"
              ></span>
              {{ project.riskLevel }}{{ PROJECT_CARD_CONSTANTS.riskLabelSuffix }}
            </Badge>
          </div>

          <!-- Sensor Feed Pill -->
          <span class="cw-telemetry-chip text-[9px] py-0.5 px-2">
            <Satellite class="h-2.5 w-2.5 text-sky-500" />
            SAR 10m
          </span>
        </div>

        <!-- Project Title & Country -->
        <div class="mt-2.5">
          <h3
            class="text-base sm:text-lg font-black tracking-tight text-foreground transition-colors group-hover:text-primary"
          >
            {{ project.name }}
          </h3>
          <div class="mt-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MapPin class="h-3 w-3 text-emerald-500 shrink-0" />
            <span>{{ project.country }}</span>
            <span>•</span>
            <span class="font-mono text-[10px]">{{ coordinatesText }}</span>
          </div>
        </div>
      </div>

      <!-- Telemetry Progress Gauge -->
      <div class="border-border/60 bg-muted/30 rounded-xl border p-2.5">
        <div class="flex items-center justify-between text-xs">
          <span
            class="font-bold tracking-wider text-muted-foreground uppercase text-[9px] flex items-center gap-1"
          >
            <ShieldCheck
              v-if="project.riskLevel === 'low'"
              class="h-3 w-3 text-emerald-500"
            />
            <ShieldAlert
              v-else
              class="h-3 w-3 text-amber-500"
            />
            Integrity Score
          </span>
          <span
            class="font-black font-mono text-xs"
            :class="
              project.riskLevel === 'high'
                ? 'text-rose-500'
                : project.riskLevel === 'medium'
                  ? 'text-amber-500'
                  : 'text-emerald-500'
            "
          >
            {{ integrityScore }}%
          </span>
        </div>

        <div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted/80">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="
              project.riskLevel === 'high'
                ? 'bg-rose-500'
                : project.riskLevel === 'medium'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
            "
            :style="{ width: `${integrityScore}%` }"
          ></div>
        </div>

        <div class="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
          <span class="inline-flex items-center gap-1">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            {{ project.status }}
          </span>
          <span class="font-mono text-[9px]">ID: {{ project.id }}</span>
        </div>
      </div>

      <!-- Connected Buyers Section -->
      <div class="space-y-1.5">
        <div
          class="flex items-center justify-between text-[9px] font-bold tracking-wider text-muted-foreground uppercase"
        >
          <span>Linked Institutional Buyers</span>
          <span class="font-mono">{{ buyerLinks?.length || 0 }} mapped</span>
        </div>

        <div
          v-if="buyerLinks?.length"
          class="flex flex-wrap gap-1"
        >
          <span
            v-for="buyer in buyerLinks"
            :key="buyer.id"
            class="border-border/70 bg-card text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium shadow-xs"
          >
            <Globe class="h-2.5 w-2.5 text-sky-500 shrink-0" />
            <span>{{ buyer.name }}</span>
            <span class="font-mono text-[9px] text-muted-foreground font-normal"
              >({{ formatNumber(buyer.exposure) }})</span
            >
          </span>
        </div>
        <div
          v-else
          class="border-border/60 bg-muted/20 rounded-md border p-1.5 text-center text-[10px] text-muted-foreground font-medium"
        >
          No direct buyer exposure mapped
        </div>
      </div>

      <!-- Card Action Trigger -->
      <div class="pt-2 border-t border-border/50 flex items-center justify-between">
        <span class="text-[10px] text-muted-foreground font-mono">Revisit: 5 days</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="h-7 px-2 gap-1 text-xs font-semibold text-primary hover:text-primary/80"
          @click.stop="emit('inspect', project)"
        >
          <span>Telemetry Details</span>
          <ChevronRight class="h-3 w-3" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
