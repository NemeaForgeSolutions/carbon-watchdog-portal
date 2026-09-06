<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowRightLeft, ExternalLink, ShieldAlert } from 'lucide-vue-next';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CARBON_BUYERS, CARBON_PROJECTS } from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';

const { openBuyerDossier, openProjectDossier, formatNumber, formatCurrency } = useCarbonDossier();

// Buyer Selectors (Default: Delta Air Lines vs Shell)
const selectedBuyer1Id = ref('buyer-delta');
const selectedBuyer2Id = ref('buyer-shell');

const buyer1 = computed(
  () => CARBON_BUYERS.find((b) => b.id === selectedBuyer1Id.value) || CARBON_BUYERS[0],
);
const buyer2 = computed(
  () => CARBON_BUYERS.find((b) => b.id === selectedBuyer2Id.value) || CARBON_BUYERS[1],
);

// Comparison Metrics
const riskDifferential = computed(() => {
  const diff = buyer1.value.highRiskPercentage - buyer2.value.highRiskPercentage;
  return {
    diff: Math.abs(diff),
    higher: diff > 0 ? buyer1.value.name : buyer2.value.name,
    isEqual: diff === 0,
  };
});

// Projects connected to Buyer 1 and Buyer 2
const buyer1Projects = computed(() =>
  CARBON_PROJECTS.filter((p) => p.buyers.includes(buyer1.value.name)),
);
const buyer2Projects = computed(() =>
  CARBON_PROJECTS.filter((p) => p.buyers.includes(buyer2.value.name)),
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
            class="border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-700 dark:text-emerald-300 uppercase tracking-widest"
          >
            Head-to-Head Spotlight
          </Badge>
          <span class="text-xs font-mono text-muted-foreground dark:text-slate-400"
            >Institutional Exposure Comparison</span
          >
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-foreground dark:text-white font-sans mt-1">
          Corporate Carbon Risk Differential
        </h1>
        <p class="text-xs text-muted-foreground dark:text-slate-400 max-w-2xl mt-1">
          Direct side-by-side contrast of retirement volumes, unhedged financial liability, and
          substantiation defense scores.
        </p>
      </div>

      <!-- Buyer Dropdown Selectors -->
      <div class="flex flex-wrap items-center gap-2 font-mono text-xs">
        <Select v-model="selectedBuyer1Id">
          <SelectTrigger
            class="w-[190px] h-9 px-3 rounded-xl border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-100 font-bold"
          >
            <SelectValue placeholder="Select Buyer 1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="b in CARBON_BUYERS"
              :key="b.id"
              :value="b.id"
            >
              {{ b.name }}
            </SelectItem>
          </SelectContent>
        </Select>

        <span class="text-muted-foreground font-bold">VS</span>

        <Select v-model="selectedBuyer2Id">
          <SelectTrigger
            class="w-[190px] h-9 px-3 rounded-xl border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-100 font-bold"
          >
            <SelectValue placeholder="Select Buyer 2" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="b in CARBON_BUYERS"
              :key="b.id"
              :value="b.id"
            >
              {{ b.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- VISUAL RISK DIFFERENTIAL BANNER -->
    <section
      class="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-slate-950 dark:via-amber-950/20 dark:to-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs backdrop-blur-xl"
    >
      <div class="flex items-center gap-3">
        <div
          class="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0"
        >
          <ArrowRightLeft class="h-5 w-5" />
        </div>
        <div>
          <span class="text-muted-foreground dark:text-slate-400 uppercase text-[10px] block"
            >Calculated Exposure Spread</span
          >
          <span class="text-sm sm:text-base font-bold text-foreground dark:text-white font-sans">
            {{ riskDifferential.higher }} carries a
            <strong class="text-rose-600 dark:text-rose-400"
              >{{ riskDifferential.diff }}% higher</strong
            >
            concentration of distressed offsets.
          </span>
        </div>
      </div>

      <Badge
        variant="outline"
        class="border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300 px-3 py-1 font-bold shrink-0 uppercase"
      >
        Delta Differential: {{ riskDifferential.diff }}% Points
      </Badge>
    </section>

    <!-- SIDE-BY-SIDE CARDS COMPARISON -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- BUYER 1 CARD -->
      <Card
        class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-lg dark:shadow-2xl space-y-4"
      >
        <CardContent class="p-5 sm:p-6 space-y-5">
          <!-- Buyer 1 Header -->
          <div
            class="flex items-start justify-between gap-3 border-b border-border/70 dark:border-white/10 pb-4"
          >
            <div class="flex items-center gap-3">
              <div
                class="h-12 w-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-mono font-black text-base"
              >
                {{ buyer1.initials }}
              </div>
              <div>
                <h3 class="text-xl font-black text-foreground dark:text-white font-sans">
                  {{ buyer1.name }}
                </h3>
                <span class="text-xs font-mono text-muted-foreground dark:text-slate-400">{{
                  buyer1.industry
                }}</span>
              </div>
            </div>

            <Badge
              variant="outline"
              :class="[
                buyer1.remediationUrgency === 'Immediate'
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                  : 'border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300',
                'font-mono text-[10px] uppercase',
              ]"
            >
              {{ buyer1.remediationUrgency }} Urgency
            </Badge>
          </div>

          <!-- Comparison Metrics Table -->
          <div class="space-y-2 font-mono text-xs divide-y divide-border/60 dark:divide-white/5">
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >Credits Held in Reserve:</span
              >
              <strong class="text-foreground dark:text-white">{{
                formatNumber(buyer1.creditsHeld)
              }}</strong>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >All-Time Credits Retired:</span
              >
              <strong class="text-foreground dark:text-white">{{
                formatNumber(buyer1.creditsRetired)
              }}</strong>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >Monitored Project Count:</span
              >
              <strong class="text-cyan-700 dark:text-cyan-300"
                >{{ buyer1.projects.length }} Projects</strong
              >
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400">High-Risk Exposure %:</span>
              <strong class="text-rose-600 dark:text-rose-400"
                >{{ buyer1.highRiskPercentage }}%</strong
              >
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400">Balance Sheet Exposure:</span>
              <strong class="text-rose-600 dark:text-rose-400">{{
                formatCurrency(buyer1.financialExposure)
              }}</strong>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >Portfolio Health Rating:</span
              >
              <span class="text-amber-700 dark:text-amber-300 font-bold">{{
                buyer1.portfolioHealth
              }}</span>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >Flagged Claims Scrutiny:</span
              >
              <strong class="text-rose-600 dark:text-rose-400"
                >{{ buyer1.claims.length }} Under Review</strong
              >
            </div>
          </div>

          <Button
            type="button"
            class="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/70 dark:border-white/10 font-mono text-xs gap-1.5"
            @click="openBuyerDossier(buyer1)"
          >
            Open Full {{ buyer1.name }} Dossier <ExternalLink class="h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>

      <!-- BUYER 2 CARD -->
      <Card
        class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-lg dark:shadow-2xl space-y-4"
      >
        <CardContent class="p-5 sm:p-6 space-y-5">
          <!-- Buyer 2 Header -->
          <div
            class="flex items-start justify-between gap-3 border-b border-border/70 dark:border-white/10 pb-4"
          >
            <div class="flex items-center gap-3">
              <div
                class="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 flex items-center justify-center font-mono font-black text-base"
              >
                {{ buyer2.initials }}
              </div>
              <div>
                <h3 class="text-xl font-black text-foreground dark:text-white font-sans">
                  {{ buyer2.name }}
                </h3>
                <span class="text-xs font-mono text-muted-foreground dark:text-slate-400">{{
                  buyer2.industry
                }}</span>
              </div>
            </div>

            <Badge
              variant="outline"
              :class="[
                buyer2.remediationUrgency === 'Immediate'
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                  : 'border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300',
                'font-mono text-[10px] uppercase',
              ]"
            >
              {{ buyer2.remediationUrgency }} Urgency
            </Badge>
          </div>

          <!-- Comparison Metrics Table -->
          <div class="space-y-2 font-mono text-xs divide-y divide-border/60 dark:divide-white/5">
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >Credits Held in Reserve:</span
              >
              <strong class="text-foreground dark:text-white">{{
                formatNumber(buyer2.creditsHeld)
              }}</strong>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >All-Time Credits Retired:</span
              >
              <strong class="text-foreground dark:text-white">{{
                formatNumber(buyer2.creditsRetired)
              }}</strong>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >Monitored Project Count:</span
              >
              <strong class="text-cyan-700 dark:text-cyan-300"
                >{{ buyer2.projects.length }} Projects</strong
              >
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400">High-Risk Exposure %:</span>
              <strong class="text-rose-600 dark:text-rose-400"
                >{{ buyer2.highRiskPercentage }}%</strong
              >
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400">Balance Sheet Exposure:</span>
              <strong class="text-rose-600 dark:text-rose-400">{{
                formatCurrency(buyer2.financialExposure)
              }}</strong>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >Portfolio Health Rating:</span
              >
              <span class="text-amber-700 dark:text-amber-300 font-bold">{{
                buyer2.portfolioHealth
              }}</span>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-muted-foreground dark:text-slate-400"
                >Flagged Claims Scrutiny:</span
              >
              <strong class="text-rose-600 dark:text-rose-400"
                >{{ buyer2.claims.length }} Under Review</strong
              >
            </div>
          </div>

          <Button
            type="button"
            class="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/70 dark:border-white/10 font-mono text-xs gap-1.5"
            @click="openBuyerDossier(buyer2)"
          >
            Open Full {{ buyer2.name }} Dossier <ExternalLink class="h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- COMPARISON OF THEIR MOST VULNERABLE PROJECTS -->
    <section class="space-y-4 pt-4">
      <h3
        class="text-base font-bold text-foreground dark:text-white font-sans flex items-center gap-2"
      >
        <ShieldAlert class="h-4 w-4 text-rose-500" />
        Vulnerable Target Projects Head-to-Head Comparison
      </h3>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Buyer 1 Vulnerable Projects -->
        <div class="space-y-2">
          <span
            class="text-xs font-mono text-muted-foreground dark:text-slate-400 uppercase tracking-wider block"
          >
            {{ buyer1.name }} — Monitored Sites ({{ buyer1Projects.length }})
          </span>
          <div
            v-for="p in buyer1Projects"
            :key="p.id"
            class="p-3.5 rounded-xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 hover:bg-muted/70 dark:hover:bg-slate-900 transition cursor-pointer group flex items-center justify-between"
            @click="openProjectDossier(p)"
          >
            <div>
              <strong
                class="text-foreground dark:text-white text-xs block group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition"
                >{{ p.name }}</strong
              >
              <span class="text-[11px] font-mono text-muted-foreground dark:text-slate-400"
                >{{ p.country }} • {{ p.creditType }}</span
              >
            </div>
            <div class="text-right font-mono text-xs">
              <Badge
                variant="outline"
                :class="
                  p.riskTier === 'high' || p.riskTier === 'critical'
                    ? 'text-rose-700 dark:text-rose-300 border-rose-500/40'
                    : 'text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                "
              >
                {{ p.riskTier }}
              </Badge>
              <span class="text-[10px] text-muted-foreground block mt-0.5">{{
                formatCurrency(p.financialExposure)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Buyer 2 Vulnerable Projects -->
        <div class="space-y-2">
          <span
            class="text-xs font-mono text-muted-foreground dark:text-slate-400 uppercase tracking-wider block"
          >
            {{ buyer2.name }} — Monitored Sites ({{ buyer2Projects.length }})
          </span>
          <div
            v-for="p in buyer2Projects"
            :key="p.id"
            class="p-3.5 rounded-xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 hover:bg-muted/70 dark:hover:bg-slate-900 transition cursor-pointer group flex items-center justify-between"
            @click="openProjectDossier(p)"
          >
            <div>
              <strong
                class="text-foreground dark:text-white text-xs block group-hover:text-amber-600 dark:group-hover:text-amber-300 transition"
                >{{ p.name }}</strong
              >
              <span class="text-[11px] font-mono text-muted-foreground dark:text-slate-400"
                >{{ p.country }} • {{ p.creditType }}</span
              >
            </div>
            <div class="text-right font-mono text-xs">
              <Badge
                variant="outline"
                :class="
                  p.riskTier === 'high' || p.riskTier === 'critical'
                    ? 'text-rose-700 dark:text-rose-300 border-rose-500/40'
                    : 'text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                "
              >
                {{ p.riskTier }}
              </Badge>
              <span class="text-[10px] text-muted-foreground block mt-0.5">{{
                formatCurrency(p.financialExposure)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
