<script setup lang="ts">
import { computed, ref } from 'vue';
import { ChevronRight, Search } from 'lucide-vue-next';
import Badge from '@/components/ui/badge/Badge.vue';
import Input from '@/components/ui/input/Input.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CARBON_BUYERS } from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { BUYER_HEALTH_OPTIONS, BUYER_URGENCY_OPTIONS } from '@/constants';

const { openBuyerDossier, formatNumber, formatCurrency } = useCarbonDossier();

const searchTerm = ref('');
const selectedUrgency = ref<string>('All');
const selectedHealth = ref<string>('All');

const filteredBuyers = computed(() => {
  return CARBON_BUYERS.filter((b) => {
    if (searchTerm.value) {
      const q = searchTerm.value.toLowerCase();
      const match =
        b.name.toLowerCase().includes(q) ||
        b.industry.toLowerCase().includes(q) ||
        b.projects.some((p) => p.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedUrgency.value !== 'All' && b.remediationUrgency !== selectedUrgency.value)
      return false;
    if (selectedHealth.value !== 'All' && b.portfolioHealth !== selectedHealth.value) return false;
    return true;
  }).sort((a, b) => b.financialExposure - a.financialExposure);
});

const totalCorporateExposure = computed(() =>
  CARBON_BUYERS.reduce((sum, b) => sum + b.financialExposure, 0),
);
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- Top Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 dark:border-white/10 pb-5"
    >
      <div>
        <div class="flex items-center gap-2">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-800 dark:text-emerald-300 uppercase tracking-widest"
          >
            Corporate Directory
          </Badge>
          <span class="text-xs font-mono text-muted-foreground">Buyer Exposure Intelligence</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-foreground dark:text-white font-sans mt-1">
          Corporate Carbon Exposure Directory
        </h1>
        <p class="text-xs text-muted-foreground max-w-2xl mt-1">
          Monitor balance sheet exposure, high-risk project concentrations, and claim defense
          liabilities across institutional buyers.
        </p>
      </div>

      <div class="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <div
          class="p-2.5 rounded-xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-900/60 text-right"
        >
          <span class="text-[10px] text-muted-foreground/80 block uppercase"
            >Total Financial Exposure</span
          >
          <strong class="text-rose-600 dark:text-rose-400 text-sm sm:text-base font-bold">{{
            formatCurrency(totalCorporateExposure)
          }}</strong>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="relative flex-1 max-w-md">
        <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          v-model="searchTerm"
          placeholder="Search buyers, industry sectors, or connected projects..."
          class="pl-9 border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs placeholder:text-muted-foreground"
        />
      </div>

      <div class="flex items-center gap-2 text-xs font-mono">
        <Select v-model="selectedUrgency">
          <SelectTrigger
            class="w-[190px] h-9 px-3 rounded-xl border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
          >
            <SelectValue placeholder="All Remediation Urgencies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="opt in BUYER_URGENCY_OPTIONS"
              :key="opt"
              :value="opt"
            >
              {{ opt === 'All' ? 'All Remediation Urgencies' : opt }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedHealth">
          <SelectTrigger
            class="w-[180px] h-9 px-3 rounded-xl border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
          >
            <SelectValue placeholder="All Health Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="opt in BUYER_HEALTH_OPTIONS"
              :key="opt"
              :value="opt"
            >
              {{ opt === 'All' ? 'All Health Ratings' : opt }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- BUYER CARDS DIRECTORY GRID -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="b in filteredBuyers"
        :key="b.id"
        class="p-5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 hover:bg-card/100 dark:hover:bg-slate-900/80 hover:border-emerald-500/40 transition cursor-pointer group shadow-xl flex flex-col justify-between space-y-4"
        @click="openBuyerDossier(b)"
      >
        <!-- Top: Initials Logo & Name -->
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div
              class="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-slate-800 to-slate-900 border border-border/70 dark:border-white/15 flex items-center justify-center font-mono font-black text-white text-base shadow-inner shrink-0 group-hover:scale-105 transition-transform"
            >
              {{ b.initials }}
            </div>

            <Badge
              variant="outline"
              :class="[
                b.remediationUrgency === 'Immediate'
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                  : b.remediationUrgency === 'Elevated'
                    ? 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                    : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
                'font-mono text-[10px] uppercase',
              ]"
            >
              {{ b.remediationUrgency }} Urgency
            </Badge>
          </div>

          <div>
            <h3
              class="text-lg font-bold text-foreground dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition font-sans"
            >
              {{ b.name }}
            </h3>
            <p class="text-xs text-muted-foreground font-mono mt-0.5 truncate">
              {{ b.industry }}
            </p>
          </div>
        </div>

        <!-- Metrics Grid -->
        <div
          class="grid grid-cols-2 gap-2 p-3 rounded-xl bg-muted/60 dark:bg-black/40 border border-border/60 dark:border-white/5 font-mono text-xs"
        >
          <div>
            <span class="text-[10px] text-muted-foreground/80 uppercase block"
              >Credits Retired</span
            >
            <strong class="text-foreground dark:text-white text-sm">{{
              formatNumber(b.creditsRetired)
            }}</strong>
          </div>
          <div>
            <span class="text-[10px] text-muted-foreground/80 uppercase block">Credits Held</span>
            <strong class="text-foreground/80 dark:text-slate-300 text-sm">{{
              formatNumber(b.creditsHeld)
            }}</strong>
          </div>
          <div>
            <span class="text-[10px] text-muted-foreground/80 uppercase block">High-Risk %</span>
            <strong
              :class="
                b.highRiskPercentage > 40
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              "
              class="text-sm"
            >
              {{ b.highRiskPercentage }}%
            </strong>
          </div>
          <div>
            <span class="text-[10px] text-muted-foreground/80 uppercase block"
              >Exposed Projects</span
            >
            <strong class="text-sky-700 dark:text-cyan-300 text-sm"
              >{{ b.projects.length }} Sites</strong
            >
          </div>
        </div>

        <!-- Health Status Pill & Action -->
        <div
          class="pt-2 border-t border-border/50 dark:border-white/5 flex items-center justify-between text-xs font-mono"
        >
          <span
            class="text-[10px] px-2 py-0.5 rounded font-medium"
            :class="
              b.portfolioHealth === 'Critical Exposure'
                ? 'text-rose-700 dark:text-rose-300 bg-rose-500/15 dark:bg-rose-950/40 border border-rose-500/30'
                : b.portfolioHealth === 'Elevated Risk'
                  ? 'text-amber-700 dark:text-amber-300 bg-amber-500/15 dark:bg-amber-950/40 border border-amber-500/30'
                  : 'text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 dark:bg-emerald-950/40 border border-emerald-500/30'
            "
          >
            {{ b.portfolioHealth }}
          </span>

          <span
            class="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition font-semibold text-[11px]"
          >
            View Dossier <ChevronRight class="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
