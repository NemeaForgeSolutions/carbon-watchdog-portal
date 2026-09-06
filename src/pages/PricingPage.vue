<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { PRICING_MATRIX_FEATURES, PRICING_PLANS } from '@/constants';

const router = useRouter();
const { showToast } = useCarbonDossier();
const annualBilling = ref(true);

const plans = PRICING_PLANS;
const matrixFeatures = PRICING_MATRIX_FEATURES;

const handleSelectPlan = (planName: string) => {
  showToast(`Selected ${planName} Plan. Transferring to commercial briefing.`);
  router.push('/onboarding');
};
</script>

<template>
  <div class="space-y-10 pb-16">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4 pt-4">
      <Badge
        variant="secondary"
        class="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] uppercase tracking-widest"
      >
        Institutional Commercial Architecture
      </Badge>
      <h1
        class="text-3xl sm:text-5xl font-black text-foreground dark:text-white font-sans tracking-tight"
      >
        Precision Intelligence. Defensible Capital.
      </h1>
      <p class="text-sm sm:text-base text-muted-foreground dark:text-slate-300 leading-relaxed">
        Scale carbon portfolio assurance from initial pilot validation to enterprise-grade
        continuous orbital surveillance.
      </p>

      <!-- Billing Frequency Toggle -->
      <div class="flex items-center justify-center gap-3 pt-2 font-mono text-xs">
        <span
          :class="
            !annualBilling
              ? 'text-foreground dark:text-white font-bold'
              : 'text-muted-foreground dark:text-slate-400'
          "
          >Monthly</span
        >
        <button
          type="button"
          class="w-12 h-6 rounded-full bg-muted dark:bg-slate-900 border border-border/80 dark:border-white/20 p-0.5 transition-colors relative"
          @click="annualBilling = !annualBilling"
        >
          <div
            class="h-4.5 w-4.5 rounded-full bg-emerald-500 transition-transform duration-300"
            :class="annualBilling ? 'translate-x-6' : 'translate-x-0.5'"
          ></div>
        </button>
        <div class="flex items-center gap-1.5">
          <span
            :class="
              annualBilling
                ? 'text-foreground dark:text-white font-bold'
                : 'text-muted-foreground dark:text-slate-400'
            "
            >Annual</span
          >
          <span
            class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 dark:bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full"
          >
            Save 20%
          </span>
        </div>
      </div>
    </div>

    <!-- 3 PRICING TIERS -->
    <div class="grid lg:grid-cols-3 gap-6 items-stretch">
      <div
        v-for="plan in plans"
        :key="plan.name"
        :class="[
          'rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative shadow-xl dark:shadow-2xl backdrop-blur-xl',
          plan.featured
            ? 'border-2 border-emerald-500/60 bg-gradient-to-b from-emerald-500/10 via-card to-card dark:from-emerald-950/50 dark:via-slate-950 dark:to-slate-950 ring-4 ring-emerald-500/15 lg:-translate-y-2'
            : 'border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 hover:border-emerald-500/40',
        ]"
      >
        <!-- Popular Badge for Enterprise -->
        <div
          v-if="plan.featured"
          class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-[10px] uppercase tracking-widest shadow-md shadow-emerald-500/30"
        >
          Institutional Choice
        </div>

        <div class="space-y-6">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span
                class="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold"
              >
                {{ plan.badge }}
              </span>
            </div>
            <h3 class="text-2xl font-black text-foreground dark:text-white font-sans">
              {{ plan.name }}
            </h3>
            <p class="text-xs text-muted-foreground dark:text-slate-400 font-sans leading-relaxed">
              {{ plan.tagline }}
            </p>
          </div>

          <!-- Price Readout -->
          <div
            class="p-4 rounded-2xl bg-muted/40 dark:bg-black/40 border border-border/50 dark:border-white/5 font-mono"
          >
            <div class="flex items-baseline gap-1">
              <span class="text-3xl sm:text-4xl font-black text-foreground dark:text-white">
                ${{
                  annualBilling
                    ? plan.annualPrice.toLocaleString()
                    : plan.monthlyPrice.toLocaleString()
                }}
              </span>
              <span class="text-xs text-muted-foreground dark:text-slate-400">/ month</span>
            </div>
            <span class="text-[10px] text-muted-foreground block mt-1"
              >Billed {{ annualBilling ? 'annually' : 'monthly' }} in USD</span
            >
          </div>

          <!-- Specs -->
          <div class="space-y-2.5 text-xs font-mono pt-2">
            <div class="flex items-center justify-between text-muted-foreground">
              <span>Coverage:</span>
              <strong class="text-foreground dark:text-white">{{ plan.projects }}</strong>
            </div>
            <div class="flex items-center justify-between text-muted-foreground">
              <span>Entities:</span>
              <strong class="text-foreground dark:text-white">{{ plan.buyers }}</strong>
            </div>
            <div class="flex items-center justify-between text-muted-foreground">
              <span>Revisit:</span>
              <strong class="text-emerald-700 dark:text-emerald-400">{{ plan.cadence }}</strong>
            </div>
          </div>
        </div>

        <div class="pt-8">
          <Button
            type="button"
            class="w-full font-mono text-xs uppercase tracking-wider font-bold py-3.5 shadow-md transition-all"
            :class="
              plan.featured
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/70 dark:border-white/10'
            "
            @click="handleSelectPlan(plan.name)"
          >
            {{ plan.cta }}
          </Button>
        </div>
      </div>
    </div>

    <!-- SECTION 23: FULL FEATURE COMPARISON MATRIX -->
    <section class="space-y-4 pt-8">
      <div class="text-center space-y-1">
        <h2 class="text-xl sm:text-2xl font-black text-foreground dark:text-white font-sans">
          Institutional Feature Comparison Matrix
        </h2>
        <p class="text-xs text-muted-foreground dark:text-slate-400 font-mono">
          Detailed breakdown of telemetry capabilities and assurance controls
        </p>
      </div>

      <div
        class="rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl overflow-hidden shadow-xl dark:shadow-2xl"
      >
        <Table class="font-mono text-xs">
          <TableHeader>
            <TableRow
              class="border-b border-border/70 dark:border-white/10 bg-muted/60 dark:bg-slate-900/80 hover:bg-muted/60 text-muted-foreground dark:text-slate-400 text-[10px] uppercase tracking-wider"
            >
              <TableHead class="p-4 w-1/3 text-muted-foreground dark:text-slate-400">
                Feature Specification
              </TableHead>
              <TableHead class="p-4 text-center text-muted-foreground dark:text-slate-400">
                Pilot
              </TableHead>
              <TableHead class="p-4 text-center text-muted-foreground dark:text-slate-400">
                Growth
              </TableHead>
              <TableHead
                class="p-4 text-center bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-bold"
              >
                Enterprise
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="divide-y divide-border/60 dark:divide-white/5">
            <TableRow
              v-for="feat in matrixFeatures"
              :key="feat.name"
              class="hover:bg-muted/40 dark:hover:bg-slate-900/50 transition border-b border-border/60 dark:border-white/5"
            >
              <TableCell class="p-4 font-bold text-foreground dark:text-white font-sans">
                {{ feat.name }}
              </TableCell>

              <TableCell class="p-4 text-center text-foreground/80 dark:text-slate-300">
                <span
                  v-if="typeof feat.pilot === 'boolean'"
                  :class="
                    feat.pilot
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground/40'
                  "
                >
                  {{ feat.pilot ? '✓' : '—' }}
                </span>
                <span v-else>{{ feat.pilot }}</span>
              </TableCell>

              <TableCell class="p-4 text-center text-foreground/80 dark:text-slate-300">
                <span
                  v-if="typeof feat.growth === 'boolean'"
                  :class="
                    feat.growth
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground/40'
                  "
                >
                  {{ feat.growth ? '✓' : '—' }}
                </span>
                <span v-else>{{ feat.growth }}</span>
              </TableCell>

              <TableCell
                class="p-4 text-center bg-emerald-500/5 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-semibold"
              >
                <span
                  v-if="typeof feat.enterprise === 'boolean'"
                  :class="
                    feat.enterprise
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground/40'
                  "
                >
                  {{ feat.enterprise ? '✓' : '—' }}
                </span>
                <span v-else>{{ feat.enterprise }}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  </div>
</template>
