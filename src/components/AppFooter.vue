<script setup lang="ts">
import { ArrowRight, FileCheck2, Lock, Orbit, ShieldCheck } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import type { NavSection } from '../constants/navigation';
import { APP_FOOTER_CONSTANTS } from '@/constants';

defineProps<{
  sections: NavSection[];
}>();

const telemetryPillars = APP_FOOTER_CONSTANTS.telemetryPillars;
</script>

<template>
  <footer
    class="w-full border-t border-border/70 dark:border-white/10 bg-card/90 dark:bg-[#030706]/95 backdrop-blur-2xl transition-colors duration-300 mt-auto text-foreground relative z-20"
  >
    <!-- Subtle Top Accent Line -->
    <div
      class="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 dark:via-emerald-500/50 to-transparent"
    ></div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <!-- Top Row: Brand, Constellation Status & Primary Diligence Action -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        <!-- Brand & Description -->
        <div class="space-y-3.5 max-w-xl">
          <div class="flex flex-wrap items-center gap-3">
            <RouterLink
              to="/"
              class="flex items-center gap-2.5 group"
            >
              <div
                class="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-sky-500 text-slate-950 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform"
              >
                <Orbit class="h-4 w-4" />
              </div>
              <span class="text-base font-black tracking-tight text-foreground font-sans">
                CARBON WATCHDOG
              </span>
            </RouterLink>

            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 font-mono tracking-wide"
            >
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                ></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Sentinel Constellation Active · Orbit Sync Nominal
            </span>
          </div>

          <p class="text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {{ APP_FOOTER_CONSTANTS.description }} Autonomous earth-observation verification
            delivering continuous project surveillance, counterparty exposure analysis, and
            defensible audit evidence for high-integrity carbon markets.
          </p>

          <div
            class="flex flex-wrap items-center gap-3 text-[11px] font-mono text-muted-foreground/90"
          >
            <span class="flex items-center gap-1">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              13 Target Projects Monitored
            </span>
            <span class="text-border">•</span>
            <span>10m Spatial Resolution</span>
            <span class="text-border">•</span>
            <span>6-Day Radar Cadence</span>
            <span class="text-border">•</span>
            <span class="text-emerald-700 dark:text-emerald-400 font-semibold"
              >Zero Synthetic Drift</span
            >
          </div>
        </div>

        <!-- Fast Actions & Diligence Intake -->
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:self-center shrink-0"
        >
          <RouterLink
            to="/request-demo"
            class="group inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:brightness-110 transition-all cursor-pointer"
          >
            <span>Book Operating Briefing</span>
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>

          <RouterLink
            to="/how-it-works"
            class="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-border/80 dark:border-white/10 hover:border-border dark:hover:border-white/20 bg-muted/30 dark:bg-white/[0.03] hover:bg-muted/60 dark:hover:bg-white/[0.06] text-xs font-semibold text-foreground transition-all cursor-pointer"
          >
            <Orbit class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Satellite Methodology</span>
          </RouterLink>
        </div>
      </div>

      <!-- Earth Observation Telemetry & Assurance Foundations -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
        <div
          v-for="pillar in telemetryPillars"
          :key="pillar.name"
          class="p-3.5 rounded-xl border border-border/70 dark:border-white/10 bg-card/60 dark:bg-white/[0.02] hover:bg-card dark:hover:bg-white/[0.04] transition-all duration-200 group"
        >
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <div
                class="h-7 w-7 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"
              >
                <component
                  :is="pillar.icon"
                  class="h-3.5 w-3.5"
                />
              </div>
              <span class="text-xs font-bold text-foreground font-sans tracking-tight">
                {{ pillar.name }}
              </span>
            </div>
            <span
              class="text-[9px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-muted dark:bg-white/10 text-muted-foreground"
            >
              {{ pillar.badge }}
            </span>
          </div>
          <div
            class="text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-400 mb-1"
          >
            {{ pillar.spec }}
          </div>
          <p class="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
            {{ pillar.description }}
          </p>
        </div>
      </div>

      <!-- Multi-Column Institutional Navigation -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
        <div
          v-for="section in sections"
          :key="section.title"
          class="space-y-3.5"
        >
          <div class="flex items-center gap-2 pb-2 border-b border-border/50 dark:border-white/10">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <h4
              class="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/90 dark:text-slate-300"
            >
              {{ section.title }}
            </h4>
          </div>

          <ul
            class="space-y-2"
            :aria-label="section.title"
          >
            <li
              v-for="item in section.items"
              :key="item.to"
            >
              <RouterLink
                :to="item.to"
                class="group flex items-center justify-between text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-0.5"
              >
                <span class="group-hover:translate-x-0.5 transition-transform">
                  {{ item.label }}
                </span>
                <ChevronRight
                  class="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500"
                />
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Legal, Security & Operational Health -->
      <div
        class="border-t border-border/70 dark:border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
      >
        <!-- Copyright & Data Attributions -->
        <div class="space-y-1 text-center md:text-left">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span class="font-mono font-medium">© 2026 Carbon Watchdog Technologies Inc.</span>
            <span class="text-border hidden sm:inline">•</span>
            <span class="font-medium text-foreground/80">Institutional Climate Intel OS</span>
            <span class="text-border hidden sm:inline">•</span>
            <span class="font-mono text-[11px] text-muted-foreground">Release v2.4.0-PROD</span>
          </div>
          <p class="text-[11px] text-muted-foreground/80 max-w-xl">
            Earth observation data processed under European Space Agency Copernicus Programme Open
            Access and NASA JPL radar telemetry. Provided exclusively for institutional risk
            diligence, legal substantiation, and procurement governance.
          </p>
        </div>

        <!-- Compliance & Security Badges -->
        <div class="flex flex-wrap items-center justify-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/40 dark:bg-white/[0.04] border border-border/70 dark:border-white/10 text-[10px] font-mono font-medium text-foreground/90 shadow-2xs"
          >
            <ShieldCheck class="h-3 w-3 text-emerald-500" />
            CSRD Art. 29a
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/40 dark:bg-white/[0.04] border border-border/70 dark:border-white/10 text-[10px] font-mono font-medium text-foreground/90 shadow-2xs"
          >
            <Lock class="h-3 w-3 text-sky-500" />
            SOC 2 Type II
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/40 dark:bg-white/[0.04] border border-border/70 dark:border-white/10 text-[10px] font-mono font-medium text-foreground/90 shadow-2xs"
          >
            <FileCheck2 class="h-3 w-3 text-teal-500" />
            ISO 14064-2
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/25 text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Telemetry 99.99%
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
