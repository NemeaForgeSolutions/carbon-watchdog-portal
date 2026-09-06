<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  HelpCircle,
  Scale,
} from 'lucide-vue-next';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import {
  AUDIT_CHECKLIST_DATA,
  REGULATORY_FRAMEWORKS,
  type AuditChecklistItem,
} from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { AUDIT_STATUS_CYCLE } from '@/constants';

const { showToast } = useCarbonDossier();

// Checklist interactive state
const checklist = ref<AuditChecklistItem[]>([...AUDIT_CHECKLIST_DATA]);

// Status cycle helper
const statusCycle = AUDIT_STATUS_CYCLE;

const cycleItemStatus = (item: AuditChecklistItem) => {
  const currentIdx = statusCycle.indexOf(item.status);
  const nextIdx = (currentIdx + 1) % statusCycle.length;
  item.status = statusCycle[nextIdx];
  showToast(`Updated "${item.title}" to ${item.status}.`);
};

// Evidence Completion Progress calculation
const verifiedCount = computed(() => checklist.value.filter((i) => i.status === 'Verified').length);

const completionPercentage = computed(() => {
  return Math.round((verifiedCount.value / checklist.value.length) * 100);
});

const handleExportEvidencePack = () => {
  showToast(
    `Compiled ${completionPercentage.value}% Evidence Package. PDF audit memorandum dispatched to legal vault.`,
  );
};
</script>

<template>
  <div class="space-y-8 pb-12">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 dark:border-white/10 pb-5"
    >
      <div>
        <div class="flex items-center gap-2">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-700 dark:text-emerald-300 uppercase tracking-widest"
          >
            Assurance & Audit Suite
          </Badge>
          <span class="text-xs font-mono text-muted-foreground dark:text-slate-400"
            >CSRD Art. 29 & SEC 10-K Substantiation</span
          >
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-foreground dark:text-white font-sans mt-1">
          CLAIM VERIFICATION & COMPLIANCE CENTER
        </h1>
        <p class="text-xs text-muted-foreground dark:text-slate-400 max-w-2xl mt-1">
          Ground voluntary offset retirements in satellite permanence evidence to protect corporate
          disclosures against Green Claims litigation.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          size="sm"
          class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase gap-1.5 shadow-md"
          @click="handleExportEvidencePack"
        >
          <Download class="h-3.5 w-3.5" />
          Export Evidence Package
        </Button>
      </div>
    </div>

    <!-- MOCK DATA DISCLAIMER BANNER -->
    <div
      class="p-3.5 rounded-xl border border-border/70 dark:border-white/10 bg-muted/50 dark:bg-slate-900/60 font-mono text-xs text-muted-foreground dark:text-slate-400 flex items-center gap-2"
    >
      <span class="h-2 w-2 rounded-full bg-cyan-500"></span>
      <span class="text-foreground dark:text-slate-300 font-bold uppercase"
        >Mock / Reference Data Notice:</span
      >
      <span
        >Regulatory summaries and checklist rules represent synthetic demonstration models aligned
        with published 2026 standards.</span
      >
    </div>

    <!-- SECTION 17: REGULATORY TRACKER -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2
            class="text-base sm:text-lg font-bold text-foreground dark:text-white font-sans flex items-center gap-2"
          >
            <Scale class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Global Regulatory & Disclosure Tracker
          </h2>
          <p class="text-xs text-muted-foreground dark:text-slate-400 font-mono">
            Standards impacting offset substantiation and carbon claims
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="reg in REGULATORY_FRAMEWORKS"
          :key="reg.id"
          class="p-5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-md dark:shadow-xl space-y-3.5 flex flex-col justify-between"
        >
          <div class="space-y-2">
            <div class="flex items-start justify-between gap-2">
              <Badge
                variant="outline"
                class="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[10px]"
              >
                {{ reg.authority }}
              </Badge>
              <span
                class="text-[10px] font-mono px-2 py-0.5 rounded border"
                :class="
                  reg.internalReviewStatus === 'Audit Ready'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : reg.internalReviewStatus === 'Gaps Identified'
                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                "
              >
                {{ reg.internalReviewStatus }}
              </span>
            </div>

            <h3 class="text-base font-bold text-foreground dark:text-white font-sans">
              {{ reg.name }}
            </h3>

            <div
              class="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-muted-foreground dark:text-slate-400"
            >
              <div>
                <span class="text-[10px] uppercase text-muted-foreground block">Status</span>
                <span class="text-foreground dark:text-slate-200 font-semibold">{{
                  reg.status
                }}</span>
              </div>
              <div>
                <span class="text-[10px] uppercase text-muted-foreground block"
                  >Effective Window</span
                >
                <span class="text-cyan-700 dark:text-cyan-300 font-semibold">{{
                  reg.effectiveDate
                }}</span>
              </div>
            </div>

            <div
              class="p-3 rounded-xl bg-muted/40 dark:bg-black/40 border border-border/50 dark:border-white/5 space-y-1.5 text-xs"
            >
              <div>
                <span class="font-mono text-[10px] text-muted-foreground uppercase block"
                  >Relevance to Offsetting:</span
                >
                <p class="text-foreground/90 dark:text-slate-300 font-sans leading-relaxed">
                  {{ reg.relevance }}
                </p>
              </div>
              <div class="pt-1.5 border-t border-border/40 dark:border-white/5">
                <span class="font-mono text-[10px] text-muted-foreground uppercase block"
                  >Evidence Requirement:</span
                >
                <p class="text-foreground/90 dark:text-slate-300 font-sans leading-relaxed">
                  {{ reg.evidenceRequirement }}
                </p>
              </div>
            </div>
          </div>

          <div class="text-[10px] font-mono text-muted-foreground pt-1">
            {{ reg.scopeNote }}
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 18: AUDIT CHECKLIST -->
    <section class="space-y-4 pt-4">
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 dark:border-white/10 pb-3"
      >
        <div>
          <h2
            class="text-base sm:text-lg font-bold text-foreground dark:text-white font-sans flex items-center gap-2"
          >
            <FileCheck2 class="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            Interactive Pre-Claim Audit Checklist
          </h2>
          <p class="text-xs text-muted-foreground dark:text-slate-400 font-mono">
            Click status tag on any item to cycle review state
          </p>
        </div>

        <!-- Progress Counter -->
        <div class="flex items-center gap-3">
          <div class="text-right font-mono text-xs">
            <span class="text-muted-foreground block text-[10px] uppercase"
              >Diligence Progress</span
            >
            <strong class="text-emerald-600 dark:text-emerald-400 text-sm sm:text-base"
              >{{ completionPercentage }}% complete</strong
            >
          </div>
          <div
            class="w-28 sm:w-36 h-3 bg-muted dark:bg-slate-900 rounded-full border border-border/70 dark:border-white/10 overflow-hidden"
          >
            <div
              class="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500"
              :style="{ width: `${completionPercentage}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Checklist Items Grid -->
      <div class="space-y-2.5">
        <div
          v-for="item in checklist"
          :key="item.id"
          class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 hover:bg-muted/70 dark:hover:bg-slate-900/60 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div class="space-y-1 min-w-0 flex-1">
            <div class="flex items-center gap-2.5">
              <span
                class="h-2 w-2 rounded-full shrink-0"
                :class="
                  item.status === 'Verified'
                    ? 'bg-emerald-500'
                    : item.status === 'Needs Review'
                      ? 'bg-amber-500'
                      : item.status === 'Escalated'
                        ? 'bg-rose-500 animate-ping'
                        : 'bg-slate-400'
                "
              ></span>
              <strong
                class="text-sm font-bold text-foreground dark:text-white font-sans truncate"
                >{{ item.title }}</strong
              >
              <span
                class="font-mono text-[10px] text-muted-foreground border border-border/60 dark:border-white/5 bg-muted/60 dark:bg-white/5 px-1.5 py-0.5 rounded"
              >
                {{ item.category }}
              </span>
            </div>

            <p
              class="text-xs text-foreground/90 dark:text-slate-300 font-sans pl-4 leading-relaxed"
            >
              {{ item.notes }}
            </p>

            <div
              class="flex items-center gap-3 pl-4 text-[10px] font-mono text-muted-foreground pt-0.5"
            >
              <span>Ref: {{ item.evidenceRef }}</span>
              <span>•</span>
              <span>Assignee: {{ item.assignee }}</span>
              <span>•</span>
              <span>Updated: {{ item.lastUpdated }}</span>
            </div>
          </div>

          <!-- Status Button (Interactive Toggle) -->
          <div class="shrink-0 flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              class="px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition flex items-center gap-1.5 cursor-pointer shadow-sm border"
              :class="[
                item.status === 'Verified'
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/25'
                  : item.status === 'Needs Review'
                    ? 'border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25'
                    : item.status === 'Escalated'
                      ? 'border-rose-500/40 bg-rose-500/15 text-rose-800 dark:text-rose-300 hover:bg-rose-500/25'
                      : 'border-border/70 bg-secondary text-secondary-foreground hover:bg-secondary/80',
              ]"
              @click="cycleItemStatus(item)"
            >
              <CheckCircle2
                v-if="item.status === 'Verified'"
                class="h-3.5 w-3.5"
              />
              <Clock
                v-else-if="item.status === 'Needs Review'"
                class="h-3.5 w-3.5"
              />
              <AlertTriangle
                v-else-if="item.status === 'Escalated'"
                class="h-3.5 w-3.5"
              />
              <HelpCircle
                v-else
                class="h-3.5 w-3.5"
              />
              <span>{{ item.status }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
