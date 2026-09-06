<script setup lang="ts">
import { CheckCircle2, ExternalLink, FileCheck2, ShieldAlert, X } from 'lucide-vue-next';
import Sheet from '@/components/ui/sheet/Sheet.vue';
import SheetContent from '@/components/ui/sheet/SheetContent.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import type { BuyerData } from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { BUYER_DOSSIER_CONSTANTS } from '@/constants';

const props = defineProps<{
  open: boolean;
  buyer: BuyerData | null;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const { showToast, openProjectDossier, formatNumber, formatCurrency } = useCarbonDossier();

const handleClaimEvidence = () => {
  showToast(
    `Generating Evidence Package for ${props.buyer?.name}. Audit bundle compiling satellite passes and legal filings.`,
  );
  emit('update:open', false);
};
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
        v-if="buyer"
        class="space-y-6"
      >
        <!-- Top Controls / Header -->
        <SheetHeader class="space-y-3 text-left">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <Badge
                variant="outline"
                :class="[
                  buyer.remediationUrgency === 'Immediate'
                    ? 'border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                    : buyer.remediationUrgency === 'Elevated'
                      ? 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                      : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
                  'font-mono uppercase text-[11px] tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5',
                ]"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full animate-ping"
                  :class="
                    buyer.remediationUrgency === 'Immediate' ? 'bg-rose-500' : 'bg-emerald-500'
                  "
                ></span>
                {{ buyer.remediationUrgency }} URGENCY • {{ buyer.portfolioHealth }}
              </Badge>

              <span
                class="text-xs font-mono text-muted-foreground bg-muted/60 dark:bg-white/[0.04] px-2 py-0.5 rounded border border-border/70 dark:border-white/10"
              >
                {{ buyer.industry }}
              </span>
            </div>

            <button
              type="button"
              class="h-7 w-7 rounded-lg border border-border/70 dark:border-white/10 text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-white/10 inline-flex items-center justify-center transition"
              aria-label="Close buyer dossier"
              @click="emit('update:open', false)"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-slate-800 to-slate-900 border border-border/70 dark:border-white/15 flex items-center justify-center text-lg font-black text-white font-mono shadow-inner shrink-0"
            >
              {{ buyer.initials }}
            </div>
            <div>
              <SheetTitle
                class="text-2xl sm:text-3xl font-black tracking-tight text-foreground dark:text-white font-sans"
              >
                {{ buyer.name }}
              </SheetTitle>
              <SheetDescription class="text-xs text-muted-foreground font-mono mt-0.5">
                {{ BUYER_DOSSIER_CONSTANTS.dossierSubtitle }}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <!-- SECTION 1: PORTFOLIO EXPOSURE -->
        <div
          class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/50 backdrop-blur-md space-y-3"
        >
          <h4
            class="text-xs font-mono font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-300"
          >
            Portfolio Exposure & Liability Metrics
          </h4>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div
              class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 font-mono"
            >
              <span class="text-[10px] uppercase text-muted-foreground block">Credits Retired</span>
              <strong class="text-lg font-bold text-foreground dark:text-white mt-0.5 block">
                {{ formatNumber(buyer.creditsRetired) }}
              </strong>
            </div>

            <div
              class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 font-mono"
            >
              <span class="text-[10px] uppercase text-muted-foreground block">Credits Held</span>
              <strong class="text-lg font-bold text-foreground dark:text-white mt-0.5 block">
                {{ formatNumber(buyer.creditsHeld) }}
              </strong>
            </div>

            <div
              class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 font-mono"
            >
              <span class="text-[10px] uppercase text-muted-foreground block"
                >Total Financial Risk</span
              >
              <strong class="text-lg font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">
                {{ formatCurrency(buyer.financialExposure) }}
              </strong>
            </div>

            <div
              class="p-3 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 font-mono"
            >
              <span class="text-[10px] uppercase text-muted-foreground block"
                >High-Risk Exposure</span
              >
              <strong class="text-lg font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">
                {{ buyer.highRiskPercentage }}%
              </strong>
            </div>
          </div>
        </div>

        <!-- SECTION 2: PROJECT CONCENTRATION (HORIZONTAL BAR VISUALIZATION) -->
        <div
          class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/50 backdrop-blur-md space-y-3"
        >
          <div class="flex items-center justify-between">
            <h4
              class="text-xs font-mono font-bold tracking-wider uppercase text-foreground dark:text-slate-200"
            >
              Project Concentration Breakdown
            </h4>
            <span class="text-[10px] font-mono text-muted-foreground dark:text-slate-400"
              >Share of Total Monitored Credits</span
            >
          </div>

          <!-- Native SVG / CSS Horizontal Bar Stack -->
          <div class="space-y-2.5">
            <div
              v-for="item in buyer.concentration"
              :key="item.projectName"
              class="space-y-1"
            >
              <div class="flex items-center justify-between text-xs font-mono">
                <button
                  type="button"
                  class="font-medium text-foreground dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-300 transition text-left truncate flex items-center gap-1.5"
                  @click="openProjectDossier(item.projectName)"
                >
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="
                      item.riskTier === 'critical'
                        ? 'bg-rose-500'
                        : item.riskTier === 'high'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                    "
                  ></span>
                  <span class="truncate">{{ item.projectName }}</span>
                  <ExternalLink class="h-2.5 w-2.5 text-muted-foreground" />
                </button>
                <div class="flex items-center gap-2 shrink-0">
                  <span class="text-muted-foreground dark:text-slate-400"
                    >{{ formatNumber(item.tonnes) }} t</span
                  >
                  <strong class="text-foreground dark:text-white w-9 text-right"
                    >{{ item.pct }}%</strong
                  >
                </div>
              </div>

              <!-- Bar -->
              <div
                class="h-2 w-full bg-muted dark:bg-slate-950 rounded-full overflow-hidden border border-border/50 dark:border-white/5"
              >
                <div
                  class="h-full rounded-full transition-all duration-700 ease-out"
                  :class="
                    item.riskTier === 'critical'
                      ? 'bg-rose-500'
                      : item.riskTier === 'high'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                  "
                  :style="{ width: `${item.pct}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 3: FLAGGED CLAIMS -->
        <div
          class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/50 backdrop-blur-md space-y-3"
        >
          <div class="flex items-center justify-between">
            <h4
              class="text-xs font-mono font-bold tracking-wider uppercase text-foreground dark:text-slate-200 flex items-center gap-1.5"
            >
              <ShieldAlert class="h-3.5 w-3.5 text-amber-500" />
              Corporate Claims Under Scrutiny
            </h4>
            <span class="text-[10px] font-mono text-muted-foreground dark:text-slate-400"
              >CSRD & Green Claims Audit</span
            >
          </div>

          <div class="space-y-2.5">
            <div
              v-for="(c, i) in buyer.claims"
              :key="i"
              class="p-3.5 rounded-xl border border-border/60 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 space-y-2 text-xs"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <strong class="text-foreground dark:text-white font-sans text-sm"
                  >"{{ c.claim }}"</strong
                >
                <Badge
                  variant="outline"
                  :class="[
                    c.verificationStatus === 'Verified'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : c.verificationStatus === 'Flagged Non-Compliant'
                        ? 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                        : 'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300',
                    'font-mono text-[10px]',
                  ]"
                >
                  {{ c.verificationStatus }}
                </Badge>
              </div>

              <p class="text-foreground/90 dark:text-slate-300 font-sans text-xs leading-relaxed">
                {{ c.riskNote }}
              </p>

              <div
                class="flex items-center justify-between font-mono text-[10px] text-muted-foreground pt-1 border-t border-border/40 dark:border-white/5"
              >
                <span>Evidence Completeness Score</span>
                <span
                  :class="
                    c.evidenceScore < 50
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  "
                  class="font-bold"
                >
                  {{ c.evidenceScore }}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 4: REMEDIATION ACTIONS -->
        <div
          class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/50 backdrop-blur-md space-y-3"
        >
          <h4
            class="text-xs font-mono font-bold tracking-wider uppercase text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5"
          >
            <CheckCircle2 class="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            Recommended Remediation Actions
          </h4>

          <ul class="space-y-2 text-xs font-sans">
            <li
              v-for="(action, idx) in buyer.recommendedActions"
              :key="idx"
              class="p-3 rounded-xl border border-border/50 dark:border-white/5 bg-card/70 dark:bg-slate-950/50 flex items-start gap-2.5 text-foreground/90 dark:text-slate-200 leading-relaxed"
            >
              <span
                class="h-5 w-5 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5"
              >
                {{ idx + 1 }}
              </span>
              <span>{{ action }}</span>
            </li>
          </ul>
        </div>

        <!-- BOTTOM ACTION DRAWER CTA -->
        <div
          class="pt-4 border-t border-border/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div class="text-[11px] font-mono text-muted-foreground">
            {{ BUYER_DOSSIER_CONSTANTS.assuranceCycleText }}
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
              class="bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase tracking-wider font-bold text-xs flex-1 sm:flex-none gap-1.5 shadow-md"
              @click="handleClaimEvidence"
            >
              <FileCheck2 class="h-3.5 w-3.5" />
              VIEW CLAIM EVIDENCE
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
