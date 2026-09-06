<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  Orbit,
  Radio,
  Satellite,
  ShieldCheck,
  Users,
} from 'lucide-vue-next';
import CarbonOrbit from '../components/CarbonOrbit.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import { CARBON_PROJECTS, LIVE_RISK_REPORTS } from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { OVERVIEW_ANIMATION_TARGETS } from '@/constants';

const { openProjectDossier, openBuyerDossier, formatCurrency } = useCarbonDossier();

// Executive metrics with animated counter effect
const animatedProjects = ref(0);
const animatedAlerts = ref(0);
const animatedBuyers = ref(0);

onMounted(() => {
  const duration = OVERVIEW_ANIMATION_TARGETS.duration;
  const start = performance.now();

  const animate = (time: number) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    animatedProjects.value = Math.floor(ease * OVERVIEW_ANIMATION_TARGETS.projects);
    animatedAlerts.value = Math.floor(ease * OVERVIEW_ANIMATION_TARGETS.alerts);
    animatedBuyers.value = Math.floor(ease * OVERVIEW_ANIMATION_TARGETS.buyers);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      animatedProjects.value = OVERVIEW_ANIMATION_TARGETS.projects;
      animatedAlerts.value = OVERVIEW_ANIMATION_TARGETS.alerts;
      animatedBuyers.value = OVERVIEW_ANIMATION_TARGETS.buyers;
    }
  };

  requestAnimationFrame(animate);
});

const heroStats = computed(() => [
  { label: 'Sentinel Orbital Swath', value: '100% Lat/Long' },
  { label: 'Revisit Cycle', value: '5-Day Radar' },
  { label: 'Portfolio at Risk', value: '$48.6M' },
]);

const priorityProject = computed(
  () => CARBON_PROJECTS.find((p) => p.name === 'Amazon Forest Reserve') || CARBON_PROJECTS[0],
);

const spotlightProjects = computed(() => CARBON_PROJECTS.slice(0, 8));
const recentReports = computed(() => LIVE_RISK_REPORTS);

const handleOpenPriority = () => {
  openProjectDossier(priorityProject.value);
};
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- HERO SECTION: ORBITAL INTELLIGENCE VISUALIZATION (PRESERVES 3D ANIMATION) -->
    <section class="relative">
      <CarbonOrbit
        eyebrow="Orbital Climate Intelligence & Portfolio Risk"
        title="Physical assurance for carbon portfolios."
        description="Continuous satellite surveillance tracking canopy degradation, synthetic radar coherence drift, and corporate disclosure risk across global carbon credits."
        :stats="heroStats"
      />

      <!-- Interactive Monitored Project Ground-Track HUD -->
      <div
        class="mt-3 p-3.5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-lg"
      >
        <div class="flex items-center justify-between text-xs font-mono mb-2.5">
          <div
            class="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider"
          >
            <Radio class="h-3.5 w-3.5 animate-pulse text-emerald-600 dark:text-emerald-400" />
            <span>Monitored Ground-Track Locations (Click to inspect telemetry)</span>
          </div>
          <span class="text-muted-foreground text-[11px] hidden sm:inline"
            >12 Active Planetary Targets</span
          >
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <button
            v-for="p in spotlightProjects"
            :key="p.id"
            type="button"
            class="p-2.5 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 hover:bg-card dark:hover:bg-slate-900 hover:border-emerald-500/40 text-left transition group relative overflow-hidden shadow-2xs"
            @click="openProjectDossier(p)"
          >
            <div
              class="flex items-center justify-between text-[10px] font-mono text-muted-foreground"
            >
              <span>{{ p.country }}</span>
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="
                  p.riskTier === 'critical' || p.riskTier === 'high'
                    ? 'bg-rose-500 animate-ping'
                    : 'bg-emerald-500 dark:bg-emerald-400'
                "
              ></span>
            </div>
            <span
              class="text-xs font-bold text-foreground dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition block truncate mt-1"
            >
              {{ p.name }}
            </span>
            <div
              class="flex items-center justify-between text-[10px] font-mono mt-1 text-muted-foreground"
            >
              <span class="capitalize">{{ p.riskTier }}</span>
              <span class="text-emerald-700 dark:text-emerald-400 font-semibold"
                >{{ p.confidence }}%</span
              >
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION 8: EXECUTIVE METRICS -->
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <!-- Metric 1 -->
      <Card
        class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition"
      >
        <CardContent class="p-4 sm:p-5">
          <span
            class="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground block"
          >
            Projects Under Watch
          </span>
          <div class="mt-2 flex items-baseline gap-2">
            <span
              class="text-3xl sm:text-4xl font-black font-mono tracking-tight text-foreground dark:text-white"
            >
              {{ animatedProjects }}
            </span>
            <Badge
              variant="outline"
              class="border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-mono text-[10px]"
            >
              +12 this quarter
            </Badge>
          </div>
          <p class="text-[11px] text-muted-foreground mt-2 font-mono">
            Continuous Sentinel-1 & 2 pass
          </p>
        </CardContent>
      </Card>

      <!-- Metric 2 -->
      <Card
        class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl shadow-xl hover:border-rose-500/40 transition"
      >
        <CardContent class="p-4 sm:p-5">
          <span
            class="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground block"
          >
            Active Alerts
          </span>
          <div class="mt-2 flex items-baseline gap-2">
            <span
              class="text-3xl sm:text-4xl font-black font-mono tracking-tight text-rose-600 dark:text-rose-400"
            >
              {{ animatedAlerts }}
            </span>
            <Badge
              variant="outline"
              class="border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-mono text-[10px]"
            >
              3 critical
            </Badge>
          </div>
          <p class="text-[11px] text-muted-foreground mt-2 font-mono">
            Degradation signals verified
          </p>
        </CardContent>
      </Card>

      <!-- Metric 3 -->
      <Card
        class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition"
      >
        <CardContent class="p-4 sm:p-5">
          <span
            class="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground block"
          >
            Monitored Buyers
          </span>
          <div class="mt-2 flex items-baseline gap-2">
            <span
              class="text-3xl sm:text-4xl font-black font-mono tracking-tight text-foreground dark:text-white"
            >
              {{ animatedBuyers }}
            </span>
            <Badge
              variant="outline"
              class="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono text-[10px]"
            >
              9 high exposure
            </Badge>
          </div>
          <p class="text-[11px] text-muted-foreground mt-2 font-mono">
            Across Fortune 500 & airlines
          </p>
        </CardContent>
      </Card>

      <!-- Metric 4 -->
      <Card
        class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition"
      >
        <CardContent class="p-4 sm:p-5">
          <span
            class="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground block"
          >
            Highest Exposure
          </span>
          <div class="mt-2 flex items-baseline gap-2">
            <span
              class="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-700 dark:text-emerald-400"
            >
              $48.6M
            </span>
            <Badge
              variant="outline"
              class="border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-mono text-[10px]"
            >
              portfolio at risk
            </Badge>
          </div>
          <p class="text-[11px] text-muted-foreground mt-2 font-mono">
            Delta Air Lines portfolio liability
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- SECTION 9: PRIORITY BRIEFING BANNER -->
    <section
      class="p-5 sm:p-6 rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-500/10 via-card/90 to-card/95 dark:from-rose-950/30 dark:via-slate-950/80 dark:to-slate-950/90 shadow-2xl backdrop-blur-xl relative overflow-hidden text-foreground"
    >
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        <div class="space-y-3 max-w-3xl">
          <div class="flex flex-wrap items-center gap-2.5">
            <span
              class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest bg-rose-500/20 border border-rose-500/40 text-rose-700 dark:text-rose-300 uppercase flex items-center gap-1.5"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping"></span>
              PRIORITY BRIEFING
            </span>
            <span class="text-xs font-mono text-muted-foreground"
              >Detection: 2026-09-06 17:14 UTC</span
            >
            <span class="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold"
              >Sentinel-1 SAR Verified (94% Conf.)</span
            >
          </div>

          <div class="space-y-1">
            <h3 class="text-xl sm:text-2xl font-black text-foreground dark:text-white font-sans">
              Amazon Forest Reserve — Forest-cover degradation detected across 2.8 km²
            </h3>
            <p class="text-sm text-foreground/80 dark:text-slate-300 leading-relaxed font-sans">
              Critical radar backscatter drop (-4.2 dB) and 22.9% optical NDVI collapse observed
              along the north-west concession boundary. Directly exposes
              <strong class="text-foreground dark:text-white font-mono">Delta Air Lines</strong>
              with <strong class="text-rose-600 dark:text-rose-400 font-mono">$48.6M</strong> in
              active carbon-neutral claim liability.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            <div
              class="p-2 rounded-lg bg-muted/60 dark:bg-black/40 border border-border/70 dark:border-white/5"
            >
              <span class="text-muted-foreground text-[10px] block uppercase">Status</span>
              <strong class="text-rose-600 dark:text-rose-400 font-bold">ESCALATED REVIEW</strong>
            </div>
            <div
              class="p-2 rounded-lg bg-muted/60 dark:bg-black/40 border border-border/70 dark:border-white/5"
            >
              <span class="text-muted-foreground text-[10px] block uppercase">Risk Tier</span>
              <strong class="text-amber-600 dark:text-amber-400 font-bold">HIGH RISK</strong>
            </div>
            <div
              class="p-2 rounded-lg bg-muted/60 dark:bg-black/40 border border-border/70 dark:border-white/5"
            >
              <span class="text-muted-foreground text-[10px] block uppercase">Affected Area</span>
              <strong class="text-foreground dark:text-white font-bold">2.8 km² Clearcut</strong>
            </div>
            <div
              class="p-2 rounded-lg bg-muted/60 dark:bg-black/40 border border-border/70 dark:border-white/5"
            >
              <span class="text-muted-foreground text-[10px] block uppercase">Top Buyer</span>
              <strong class="text-sky-700 dark:text-cyan-300 font-bold">Delta ($48.6M)</strong>
            </div>
          </div>
        </div>

        <div class="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
          <Button
            type="button"
            class="bg-rose-600 hover:bg-rose-500 text-white font-mono uppercase tracking-wider font-bold text-xs px-5 py-3 shadow-xl gap-2"
            @click="handleOpenPriority"
          >
            <AlertTriangle class="h-4 w-4" />
            OPEN INVESTIGATION
          </Button>
          <Button
            type="button"
            variant="outline"
            class="border-border/80 dark:border-white/15 bg-card/60 dark:bg-white/5 text-foreground dark:text-slate-300 hover:bg-muted text-xs font-mono"
            @click="openBuyerDossier('Delta Air Lines')"
          >
            View Delta Exposure
          </Button>
        </div>
      </div>
    </section>

    <!-- SECTION 10: LIVE INTELLIGENCE FEED (TWO-COLUMN) -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- COLUMN 1: SPOTLIGHTED PROJECTS (7 COLS) -->
      <div class="lg:col-span-7 space-y-4">
        <div
          class="flex items-center justify-between border-b border-border/70 dark:border-white/10 pb-2"
        >
          <div>
            <h3
              class="text-sm font-mono font-bold uppercase tracking-wider text-foreground dark:text-white flex items-center gap-2"
            >
              <Orbit class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Spotlighted Monitored Projects
            </h3>
            <p class="text-xs text-muted-foreground">
              High-liability targets carrying corporate exposure
            </p>
          </div>
          <RouterLink
            to="/watchlist"
            class="text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 font-semibold"
          >
            All Watchlist <ChevronRight class="h-3 w-3" />
          </RouterLink>
        </div>

        <div class="grid gap-3">
          <div
            v-for="p in spotlightProjects"
            :key="p.id"
            class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 hover:bg-card/100 dark:hover:bg-slate-900/80 hover:border-emerald-500/40 transition cursor-pointer group shadow-sm"
            @click="openProjectDossier(p)"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    :class="[
                      p.riskTier === 'critical'
                        ? 'border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                        : p.riskTier === 'high'
                          ? 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                          : p.riskTier === 'medium'
                            ? 'border-yellow-500/40 bg-yellow-500/15 text-yellow-700 dark:text-yellow-300'
                            : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
                      'font-mono uppercase text-[10px]',
                    ]"
                  >
                    {{ p.riskTier }}
                  </Badge>
                  <span class="text-[10px] font-mono text-muted-foreground uppercase">{{
                    p.creditType
                  }}</span>
                </div>
                <h4
                  class="text-base font-bold text-foreground dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition font-sans mt-1 truncate"
                >
                  {{ p.name }}
                </h4>
                <div
                  class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono mt-0.5"
                >
                  <span class="flex items-center gap-1 text-foreground/80 dark:text-slate-300">
                    <MapPin class="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    {{ p.country }}
                  </span>
                  <span>•</span>
                  <span>{{ p.registryId }}</span>
                  <span>•</span>
                  <span
                    >Centroid: {{ p.coordinates[0].toFixed(2) }}°,
                    {{ p.coordinates[1].toFixed(2) }}°</span
                  >
                </div>
              </div>

              <div class="text-right font-mono shrink-0">
                <span class="text-sm font-bold text-foreground dark:text-white block">{{
                  formatCurrency(p.financialExposure)
                }}</span>
                <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold"
                  >{{ p.confidence }}% CONF</span
                >
              </div>
            </div>

            <div
              class="mt-3 pt-2.5 border-t border-border/50 dark:border-white/5 flex items-center justify-between text-xs font-mono text-muted-foreground"
            >
              <div class="truncate mr-2">
                <span class="text-muted-foreground/80">Corporate Buyers:</span>
                <span class="text-foreground/90 dark:text-slate-300 ml-1 font-semibold">{{
                  p.buyers.join(', ')
                }}</span>
              </div>
              <span
                class="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition shrink-0"
              >
                Inspect <ChevronRight class="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMN 2: RECENT RISK REPORTS (5 COLS TIMELINE) -->
      <div class="lg:col-span-5 space-y-4">
        <div
          class="flex items-center justify-between border-b border-border/70 dark:border-white/10 pb-2"
        >
          <div>
            <h3
              class="text-sm font-mono font-bold uppercase tracking-wider text-foreground dark:text-white flex items-center gap-2"
            >
              <Satellite class="h-4 w-4 text-sky-600 dark:text-cyan-400" />
              Recent Risk Reports
            </h3>
            <p class="text-xs text-muted-foreground">Chronological telemetry feed</p>
          </div>
          <span class="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping"></span>
        </div>

        <div class="space-y-3">
          <div
            v-for="evt in recentReports"
            :key="evt.id"
            class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 hover:bg-card dark:hover:bg-slate-900/60 transition space-y-2 cursor-pointer group shadow-sm"
            @click="openProjectDossier(evt.projectOrBuyer)"
          >
            <div class="flex items-center justify-between text-xs font-mono">
              <div class="flex items-center gap-2">
                <div
                  class="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                  :class="
                    evt.severity === 'critical'
                      ? 'bg-rose-500/20 text-rose-700 dark:text-rose-400'
                      : evt.severity === 'high'
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-400'
                  "
                >
                  <AlertCircle
                    v-if="evt.iconType === 'alert'"
                    class="h-4 w-4"
                  />
                  <Radio
                    v-else-if="evt.iconType === 'radar'"
                    class="h-4 w-4"
                  />
                  <ShieldCheck
                    v-else-if="evt.iconType === 'shield'"
                    class="h-4 w-4"
                  />
                  <Users
                    v-else
                    class="h-4 w-4"
                  />
                </div>
                <div>
                  <strong
                    class="text-foreground dark:text-white block group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition"
                    >{{ evt.title }}</strong
                  >
                  <span class="text-[11px] text-muted-foreground">{{ evt.projectOrBuyer }}</span>
                </div>
              </div>

              <span class="text-[10px] text-muted-foreground shrink-0">{{ evt.timeAgo }}</span>
            </div>

            <p
              class="text-xs text-foreground/80 dark:text-slate-300 font-sans leading-relaxed pl-9"
            >
              {{ evt.details }}
            </p>

            <div
              class="flex items-center justify-between pl-9 text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/50 dark:border-white/5"
            >
              <span
                >Confidence:
                <strong class="text-foreground dark:text-white">{{ evt.confidence }}%</strong></span
              >
              <span
                class="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-0.5"
              >
                View Dossier <ArrowUpRight class="h-2.5 w-2.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
