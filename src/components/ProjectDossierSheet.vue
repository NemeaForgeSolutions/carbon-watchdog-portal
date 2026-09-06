<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  AlertTriangle,
  Copy,
  ExternalLink,
  MapPin,
  Radio,
  Satellite,
  ShieldAlert,
  Users,
  X,
} from 'lucide-vue-next';
import Sheet from '@/components/ui/sheet/Sheet.vue';
import SheetContent from '@/components/ui/sheet/SheetContent.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ProjectData } from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { PROJECT_DOSSIER_CONSTANTS } from '@/constants';

const props = defineProps<{
  open: boolean;
  project: ProjectData | null;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const { showToast, openBuyerDossier, formatNumber, formatCurrency } = useCarbonDossier();
const copied = ref(false);
const activeTab = ref<'satellite' | 'charts' | 'risk' | 'investigation'>('charts');

const coordinatesString = computed(() => {
  if (!props.project?.coordinates?.length) return 'Coordinates unavailable';
  return `${props.project.coordinates[0].toFixed(4)}°, ${props.project.coordinates[1].toFixed(4)}°`;
});

const copyCoordinates = () => {
  if (typeof navigator !== 'undefined' && props.project?.coordinates) {
    navigator.clipboard.writeText(
      `${props.project.coordinates[0]}, ${props.project.coordinates[1]}`,
    );
    copied.value = true;
    showToast('Coordinates copied to clipboard: ' + coordinatesString.value);
    setTimeout(() => {
      copied.value = false;
    }, PROJECT_DOSSIER_CONSTANTS.copyTimeoutMs);
  }
};

const handleInvestigation = () => {
  showToast(
    `Investigation escalated for ${props.project?.name}. Analyst review assigned to Remote Sensing Core.`,
  );
  emit('update:open', false);
};

// SVG Chart Path generation for NDVI (0.4 to 0.9 range mapped to 200x80 viewBox)
const ndviSvgData = computed(() => {
  if (!props.project?.ndviTrend) return { path: '', baselinePath: '', points: [] };
  const trend = props.project.ndviTrend;
  const width = PROJECT_DOSSIER_CONSTANTS.chartWidth;
  const height = PROJECT_DOSSIER_CONSTANTS.chartHeight;
  const paddingX = PROJECT_DOSSIER_CONSTANTS.paddingX;
  const paddingY = PROJECT_DOSSIER_CONSTANTS.paddingY;

  const minVal = PROJECT_DOSSIER_CONSTANTS.ndviMinVal;
  const maxVal = PROJECT_DOSSIER_CONSTANTS.ndviMaxVal;
  const valRange = maxVal - minVal;

  const points = trend.map((d, i) => {
    const x = paddingX + (i / (trend.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.value - minVal) / valRange) * (height - paddingY * 2);
    const baselineY =
      height - paddingY - ((d.baseline - minVal) / valRange) * (height - paddingY * 2);
    return { x, y, baselineY, ...d };
  });

  const path = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
    '',
  );
  const baselinePath = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.baselineY.toFixed(1)}`,
    '',
  );

  return { path, baselinePath, points, width, height };
});

// SVG Chart Path generation for Radar Drift (0 to -9 dB mapped to 360x120)
const radarSvgData = computed(() => {
  if (!props.project?.radarTrend) return { path: '', points: [] };
  const trend = props.project.radarTrend;
  const width = PROJECT_DOSSIER_CONSTANTS.chartWidth;
  const height = PROJECT_DOSSIER_CONSTANTS.chartHeight;
  const paddingX = PROJECT_DOSSIER_CONSTANTS.paddingX;
  const paddingY = PROJECT_DOSSIER_CONSTANTS.paddingY;

  const minDb = PROJECT_DOSSIER_CONSTANTS.radarMinDb;
  const maxDb = PROJECT_DOSSIER_CONSTANTS.radarMaxDb;
  const range = maxDb - minDb;

  const points = trend.map((d, i) => {
    const x = paddingX + (i / (trend.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.dbDeviation - minDb) / range) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const path = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
    '',
  );
  const zeroY = height - paddingY - ((0 - minDb) / range) * (height - paddingY * 2);

  return { path, points, width, height, zeroY };
});
</script>

<template>
  <Sheet
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <SheetContent
      class="border-l border-border/80 dark:border-white/10 bg-card/95 dark:bg-slate-950/95 text-foreground dark:text-slate-100 flex h-full max-h-[100dvh] w-full flex-col overflow-y-auto p-4 sm:p-6 backdrop-blur-2xl sm:max-w-xl md:max-w-2xl shadow-2xl z-50 transition-all duration-300"
    >
      <div
        v-if="project"
        class="space-y-6"
      >
        <!-- Top Controls / Header -->
        <SheetHeader class="space-y-3 text-left">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <Badge
                variant="outline"
                :class="[
                  project.riskTier === 'critical'
                    ? 'border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                    : project.riskTier === 'high'
                      ? 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                      : project.riskTier === 'medium'
                        ? 'border-yellow-500/40 bg-yellow-500/15 text-yellow-700 dark:text-yellow-300'
                        : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
                  'font-mono uppercase text-[11px] tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5',
                ]"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full animate-ping"
                  :class="
                    project.riskTier === 'critical' || project.riskTier === 'high'
                      ? 'bg-rose-500'
                      : 'bg-emerald-500'
                  "
                ></span>
                {{ project.riskTier }} RISK • {{ project.status }}
              </Badge>

              <Badge
                variant="outline"
                class="border-border/70 dark:border-white/10 bg-muted/60 dark:bg-white/[0.04] text-foreground/80 dark:text-slate-300 font-mono text-[10px]"
              >
                {{ project.creditType }}
              </Badge>
            </div>

            <div class="flex items-center gap-2">
              <span
                class="font-mono text-xs text-emerald-800 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded"
              >
                {{ project.confidence }}% CONFIDENCE
              </span>
              <button
                type="button"
                class="h-7 w-7 rounded-lg border border-border/70 dark:border-white/10 text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-white/10 inline-flex items-center justify-center transition"
                aria-label="Close dossier"
                @click="emit('update:open', false)"
              >
                <X class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <SheetTitle
              class="text-2xl sm:text-3xl font-black tracking-tight text-foreground dark:text-white font-sans"
            >
              {{ project.name }}
            </SheetTitle>

            <SheetDescription
              class="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono"
            >
              <span class="inline-flex items-center gap-1 text-foreground/80 dark:text-slate-300">
                <MapPin class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                {{ project.country }}
              </span>
              <span>•</span>
              <span class="text-emerald-700 dark:text-emerald-400 font-semibold">{{
                project.registryId
              }}</span>
              <span>•</span>
              <span>{{ project.registry }}</span>
            </SheetDescription>
          </div>

          <!-- Coordinates Bar with Copy -->
          <div
            class="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-border/70 dark:border-white/10 bg-muted/50 dark:bg-slate-900/60 font-mono text-xs text-foreground/80 dark:text-slate-300"
          >
            <div class="flex items-center gap-2 truncate">
              <span class="text-[10px] uppercase tracking-wider text-muted-foreground"
                >Centroid:</span
              >
              <span class="text-emerald-700 dark:text-emerald-300 truncate">{{
                coordinatesString
              }}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              class="h-6 px-2 text-[11px] gap-1 hover:bg-muted dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white"
              @click="copyCoordinates"
            >
              <Copy class="h-3 w-3" />
              <span>{{ copied ? 'Copied' : 'Copy' }}</span>
            </Button>
          </div>
        </SheetHeader>

        <!-- KPI Quick Stat Strip -->
        <div
          class="grid grid-cols-3 gap-2 p-3 rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 backdrop-blur-md"
        >
          <div
            class="p-2.5 rounded-xl bg-card/80 dark:bg-white/[0.02] border border-border/60 dark:border-white/5"
          >
            <span class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block"
              >Credits Issued</span
            >
            <strong
              class="text-lg sm:text-xl font-bold font-mono text-foreground dark:text-white mt-0.5 block"
            >
              {{ formatNumber(project.credits) }}
            </strong>
          </div>
          <div
            class="p-2.5 rounded-xl bg-card/80 dark:bg-white/[0.02] border border-border/60 dark:border-white/5"
          >
            <span class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block"
              >Financial Exposure</span
            >
            <strong
              class="text-lg sm:text-xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-0.5 block"
            >
              {{ formatCurrency(project.financialExposure) }}
            </strong>
          </div>
          <div
            class="p-2.5 rounded-xl bg-card/80 dark:bg-white/[0.02] border border-border/60 dark:border-white/5"
          >
            <span class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block"
              >Observation Cadence</span
            >
            <strong
              class="text-sm sm:text-base font-semibold font-mono text-emerald-700 dark:text-emerald-400 mt-1 block flex items-center gap-1"
            >
              <Radio class="h-3 w-3 animate-pulse text-emerald-600 dark:text-emerald-400" />
              5-Day Revisit
            </strong>
          </div>
        </div>

        <Tabs
          v-model="activeTab"
          class="w-full space-y-4"
        >
          <TabsList
            class="flex items-center w-full gap-1 p-1 h-auto rounded-xl border border-border/70 dark:border-white/10 bg-muted/60 dark:bg-slate-900/80 font-mono text-xs"
          >
            <TabsTrigger
              v-for="tab in [
                { id: 'charts', label: 'Vegetation & Radar' },
                { id: 'risk', label: 'Risk Analysis' },
                { id: 'satellite', label: 'Satellite Passes' },
                { id: 'investigation', label: 'Timeline' },
              ]"
              :key="tab.id"
              :value="tab.id"
              class="flex-1 py-1.5 px-2 rounded-lg text-center font-medium transition-all text-xs font-mono data-[state=active]:bg-card data-[state=active]:text-emerald-800 dark:data-[state=active]:bg-white/15 dark:data-[state=active]:text-emerald-300 data-[state=active]:border data-[state=active]:border-emerald-500/30 data-[state=active]:font-semibold data-[state=active]:shadow-xs"
            >
              {{ tab.label }}
            </TabsTrigger>
          </TabsList>

          <!-- TAB 1: VEGETATION TREND & RADAR DRIFT (SVG CHARTS) -->
          <TabsContent
            value="charts"
            class="space-y-4 m-0"
          >
            <!-- Chart 1: NDVI Trend -->
            <div
              class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/50 backdrop-blur-md"
            >
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h4
                    class="text-xs font-mono font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5"
                  >
                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Vegetation Trend (NDVI Optical Time-Series)
                  </h4>
                  <p class="text-[11px] text-muted-foreground dark:text-slate-400 mt-0.5">
                    Sentinel-2 10m Multispectral Index vs 5-Year Baseline
                  </p>
                </div>
                <span
                  class="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded"
                >
                  Live Sensor Feed
                </span>
              </div>

              <!-- SVG Line Chart -->
              <div
                class="relative w-full overflow-hidden rounded-xl bg-muted/50 dark:bg-black/40 border border-border/50 dark:border-white/5 p-2"
              >
                <svg
                  :viewBox="`0 0 ${ndviSvgData.width} ${ndviSvgData.height}`"
                  class="w-full h-36 overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="ndviGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stop-color="#10B981"
                        stop-opacity="0.3"
                      />
                      <stop
                        offset="100%"
                        stop-color="#10B981"
                        stop-opacity="0.0"
                      />
                    </linearGradient>
                  </defs>

                  <!-- Gridlines -->
                  <line
                    v-for="yVal in [30, 60, 90]"
                    :key="yVal"
                    x1="20"
                    :y1="yVal"
                    :x2="ndviSvgData.width - 20"
                    :y2="yVal"
                    stroke="currentColor"
                    class="text-border/60 dark:text-white/10"
                    stroke-dasharray="3 3"
                  />

                  <!-- Baseline Path (Dashed) -->
                  <path
                    :d="ndviSvgData.baselinePath"
                    fill="none"
                    stroke="#94A3B8"
                    stroke-width="1.5"
                    stroke-dasharray="4 4"
                    opacity="0.6"
                  />

                  <!-- Observed NDVI Path -->
                  <path
                    :d="ndviSvgData.path"
                    fill="none"
                    :stroke="
                      project.riskTier === 'high' || project.riskTier === 'critical'
                        ? '#F43F5E'
                        : '#10B981'
                    "
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <!-- Observation Point Nodes -->
                  <circle
                    v-for="(p, i) in ndviSvgData.points"
                    :key="i"
                    :cx="p.x"
                    :cy="p.y"
                    r="3"
                    :fill="
                      project.riskTier === 'high' || project.riskTier === 'critical'
                        ? '#F43F5E'
                        : '#10B981'
                    "
                    class="transition-transform duration-200 hover:scale-150"
                  />
                </svg>

                <!-- Month Labels -->
                <div
                  class="flex justify-between px-2 pt-1 font-mono text-[9px] text-muted-foreground dark:text-slate-400"
                >
                  <span
                    v-for="(p, i) in ndviSvgData.points"
                    :key="i"
                    :class="i % 2 === 0 ? 'inline' : 'hidden sm:inline'"
                  >
                    {{ p.month }}
                  </span>
                </div>
              </div>

              <div
                class="mt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground dark:text-slate-400"
              >
                <span class="flex items-center gap-1">
                  <span
                    class="h-1.5 w-4 border-b-2 border-dashed border-slate-400 inline-block"
                  ></span>
                  Baseline Reference
                </span>
                <span
                  :class="
                    project.riskTier === 'high' || project.riskTier === 'critical'
                      ? 'text-rose-600 dark:text-rose-400 font-bold'
                      : 'text-emerald-700 dark:text-emerald-400 font-bold'
                  "
                >
                  Latest: {{ ndviSvgData.points[ndviSvgData.points.length - 1]?.value }} NDVI
                </span>
              </div>
            </div>

            <!-- Chart 2: Radar Backscatter Drift -->
            <div
              class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/50 backdrop-blur-md"
            >
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h4
                    class="text-xs font-mono font-bold tracking-wider uppercase text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5"
                  >
                    <span class="h-2 w-2 rounded-full bg-cyan-500"></span>
                    Synthetic Aperture Radar (SAR VV/VH Drift)
                  </h4>
                  <p class="text-[11px] text-muted-foreground dark:text-slate-400 mt-0.5">
                    Sentinel-1 C-Band Microwave (Cloud-Penetrating Biomass Loss)
                  </p>
                </div>
                <span
                  class="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 rounded"
                >
                  Active Radar
                </span>
              </div>

              <!-- SVG Radar Bar / Line Chart -->
              <div
                class="relative w-full overflow-hidden rounded-xl bg-muted/50 dark:bg-black/40 border border-border/50 dark:border-white/5 p-2"
              >
                <svg
                  :viewBox="`0 0 ${radarSvgData.width} ${radarSvgData.height}`"
                  class="w-full h-36 overflow-visible"
                >
                  <!-- Baseline 0 dB Line -->
                  <line
                    x1="20"
                    :y1="radarSvgData.height - 15 - ((0 - -9) / 10) * (radarSvgData.height - 30)"
                    :x2="radarSvgData.width - 20"
                    :y2="radarSvgData.height - 15 - ((0 - -9) / 10) * (radarSvgData.height - 30)"
                    stroke="#0284C7"
                    stroke-width="1.5"
                    stroke-dasharray="2 2"
                    opacity="0.8"
                  />

                  <!-- Gridlines -->
                  <line
                    v-for="yVal in [25, 55, 85]"
                    :key="yVal"
                    x1="20"
                    :y1="yVal"
                    :x2="radarSvgData.width - 20"
                    :y2="yVal"
                    stroke="currentColor"
                    class="text-border/60 dark:text-white/10"
                    stroke-dasharray="3 3"
                  />

                  <!-- Radar Drift Path -->
                  <path
                    :d="radarSvgData.path"
                    fill="none"
                    stroke="#0284C7"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <!-- Nodes -->
                  <circle
                    v-for="(p, i) in radarSvgData.points"
                    :key="i"
                    :cx="p.x"
                    :cy="p.y"
                    r="3.5"
                    fill="#0284C7"
                    stroke="#38BDF8"
                    stroke-width="1.5"
                  />
                </svg>

                <!-- Month Labels -->
                <div
                  class="flex justify-between px-2 pt-1 font-mono text-[9px] text-muted-foreground dark:text-slate-400"
                >
                  <span
                    v-for="(p, i) in radarSvgData.points"
                    :key="i"
                    :class="i % 2 === 0 ? 'inline' : 'hidden sm:inline'"
                  >
                    {{ p.month }}
                  </span>
                </div>
              </div>

              <div
                class="mt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground dark:text-slate-400"
              >
                <span class="text-cyan-700 dark:text-cyan-400 font-semibold"
                  >0.0 dB Baseline Target</span
                >
                <span class="font-bold text-rose-600 dark:text-rose-400">
                  Latest Deviation:
                  {{ radarSvgData.points[radarSvgData.points.length - 1]?.dbDeviation }} dB
                </span>
              </div>
            </div>
          </TabsContent>

          <!-- TAB 2: RISK ANALYSIS BREAKDOWN -->
          <TabsContent
            value="risk"
            class="space-y-4 m-0"
          >
            <div
              class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/50 backdrop-blur-md space-y-3"
            >
              <h4
                class="text-xs font-mono font-bold tracking-wider uppercase text-foreground dark:text-slate-300"
              >
                Multi-Sensor Algorithmic Integrity Assessment
              </h4>

              <div class="space-y-2.5 text-xs font-mono">
                <div
                  class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60"
                >
                  <span
                    class="text-muted-foreground dark:text-slate-400 block text-[10px] uppercase"
                    >1. Deforestation Signal</span
                  >
                  <p class="text-foreground dark:text-white font-medium mt-1 font-sans">
                    {{ project.anomalies.deforestationSignal }}
                  </p>
                </div>

                <div
                  class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60"
                >
                  <span
                    class="text-muted-foreground dark:text-slate-400 block text-[10px] uppercase"
                    >2. Vegetation Anomaly</span
                  >
                  <p class="text-rose-600 dark:text-rose-300 font-medium mt-1 font-sans">
                    {{ project.anomalies.vegetationAnomaly }}
                  </p>
                </div>

                <div
                  class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60"
                >
                  <span
                    class="text-muted-foreground dark:text-slate-400 block text-[10px] uppercase"
                    >3. Seasonal Adjustment</span
                  >
                  <p class="text-foreground/90 dark:text-slate-200 font-medium mt-1 font-sans">
                    {{ project.anomalies.seasonalAdjustment }}
                  </p>
                </div>

                <div
                  class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60"
                >
                  <span
                    class="text-muted-foreground dark:text-slate-400 block text-[10px] uppercase"
                    >4. Baseline Deviation</span
                  >
                  <p class="text-amber-700 dark:text-amber-300 font-medium mt-1 font-sans">
                    {{ project.anomalies.baselineDeviation }}
                  </p>
                </div>

                <div
                  class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 flex items-center justify-between"
                >
                  <div>
                    <span
                      class="text-muted-foreground dark:text-slate-400 block text-[10px] uppercase"
                      >5. Algorithmic Confidence</span
                    >
                    <span class="text-foreground dark:text-white font-bold text-sm"
                      >{{ project.confidence }}% (Bayesian Optical + SAR Fusion)</span
                    >
                  </div>
                  <div class="text-right">
                    <span
                      class="text-muted-foreground dark:text-slate-400 block text-[10px] uppercase"
                      >Affected Forest Area</span
                    >
                    <span class="text-rose-600 dark:text-rose-400 font-bold text-sm"
                      >{{ project.anomalies.affectedAreaKm2 }} km²</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Regulatory Caution Box -->
            <div
              class="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-sans"
            >
              <div
                class="flex items-center gap-2 font-bold mb-1 text-amber-700 dark:text-amber-300 font-mono text-[11px]"
              >
                <ShieldAlert class="h-4 w-4 text-amber-500" />
                COMPLIANCE & SUBSTANTIATION DIRECTIVE
              </div>
              Claims underpinned by credits from this issuance face mandatory audit scrutiny under
              EU Green Claims and SEC rules. Baseline overcrediting risk invalidates generic
              carbon-neutral messaging without replacement buffers.
            </div>
          </TabsContent>

          <!-- TAB 3: SATELLITE OBSERVATION TIMELINE -->
          <TabsContent
            value="satellite"
            class="space-y-3 m-0"
          >
            <div
              class="flex items-center justify-between text-xs font-mono text-muted-foreground dark:text-slate-400"
            >
              <span>Chronological Satellite Revisit Log</span>
              <span>Sensor Constellation: ESA Sentinel</span>
            </div>

            <div class="space-y-2.5">
              <div
                v-for="obs in project.satelliteTimeline"
                :key="obs.id"
                class="p-3.5 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-900/60 text-xs font-mono space-y-1.5"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Satellite
                      class="h-3.5 w-3.5"
                      :class="
                        obs.sensor.includes('SAR')
                          ? 'text-cyan-600 dark:text-cyan-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      "
                    />
                    <strong class="text-foreground dark:text-white">{{ obs.sensor }}</strong>
                    <span class="text-[10px] text-muted-foreground">({{ obs.resolution }})</span>
                  </div>
                  <Badge
                    variant="outline"
                    :class="[
                      obs.status === 'Anomaly Detected'
                        ? 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                        : obs.status === 'Signal Drift'
                          ? 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
                      'text-[10px]',
                    ]"
                  >
                    {{ obs.status }}
                  </Badge>
                </div>

                <div class="text-[11px] text-foreground/80 dark:text-slate-300 font-sans">
                  {{ obs.note }}
                </div>

                <div
                  class="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40 dark:border-white/5"
                >
                  <span>{{ obs.date }}</span>
                  <span>Confidence: {{ obs.confidence }}%</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <!-- TAB 4: INVESTIGATION TIMELINE -->
          <TabsContent
            value="investigation"
            class="space-y-3 m-0"
          >
            <div
              class="flex items-center justify-between text-xs font-mono text-muted-foreground dark:text-slate-400"
            >
              <span>Analyst Actions & System Audit Trail</span>
              <span>Immutable Ledger</span>
            </div>

            <div class="space-y-2.5">
              <div
                v-for="inv in project.investigationTimeline"
                :key="inv.id"
                class="p-3.5 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-900/60 text-xs space-y-1.5"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-[11px]"
                    >{{ inv.action }}</span
                  >
                  <span class="font-mono text-[10px] text-muted-foreground">{{
                    inv.timestamp
                  }}</span>
                </div>
                <p class="text-foreground/90 dark:text-slate-200 text-xs leading-relaxed font-sans">
                  {{ inv.details }}
                </p>
                <div
                  class="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/40 dark:border-white/5"
                >
                  <span
                    >Logged by:
                    <strong class="text-foreground dark:text-white">{{ inv.author }}</strong></span
                  >
                  <span>•</span>
                  <span>{{ inv.role }}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <!-- LINKED CORPORATE BUYERS SECTION -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between text-xs font-mono">
            <span
              class="text-foreground dark:text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Users class="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              Connected Corporate Buyers ({{ project.buyers.length }})
            </span>
            <span class="text-muted-foreground dark:text-slate-400"
              >Click buyer to view exposure</span
            >
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="buyer in project.buyers"
              :key="buyer"
              type="button"
              class="p-2.5 rounded-xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-900/60 hover:bg-muted/70 dark:hover:bg-slate-800/80 hover:border-emerald-500/40 text-left transition group"
              @click="openBuyerDossier(buyer)"
            >
              <span
                class="font-bold text-xs text-foreground dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition block truncate"
              >
                {{ buyer }}
              </span>
              <span
                class="text-[10px] font-mono text-muted-foreground flex items-center gap-1 mt-0.5"
              >
                View Dossier <ExternalLink class="h-2.5 w-2.5" />
              </span>
            </button>
          </div>
        </div>

        <!-- BOTTOM ACTION DRAWER CTA -->
        <div
          class="pt-4 border-t border-border/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div class="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
            Last satellite sync: {{ project.lastObservation }}
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              class="border-border/70 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1 sm:flex-none text-xs"
              @click="emit('update:open', false)"
            >
              Close Dossier
            </Button>
            <Button
              type="button"
              size="sm"
              class="bg-rose-600 hover:bg-rose-500 text-white font-mono uppercase tracking-wider font-bold text-xs flex-1 sm:flex-none gap-1.5 shadow-md"
              @click="handleInvestigation"
            >
              <AlertTriangle class="h-3.5 w-3.5" />
              OPEN FULL INVESTIGATION
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
