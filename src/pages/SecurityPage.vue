<script setup lang="ts">
import { FileCheck2, ShieldCheck } from 'lucide-vue-next';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { SECURITY_CARDS } from '@/constants';

const { showToast } = useCarbonDossier();

const securityCards = SECURITY_CARDS;

const handleDownloadWhitepaper = () => {
  showToast('Security Architecture Whitepaper & Diligence Package dispatched.');
};
</script>

<template>
  <div class="space-y-8 pb-16">
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
            Trust & Security Center
          </Badge>
          <span class="text-xs font-mono text-muted-foreground dark:text-slate-400"
            >Institutional Governance & Infrastructure Controls</span
          >
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-foreground dark:text-white font-sans mt-1">
          Enterprise Security Architecture
        </h1>
        <p class="text-xs text-muted-foreground dark:text-slate-400 max-w-2xl mt-1">
          High-integrity safeguards protecting confidential corporate carbon holdings, proprietary
          portfolio coordinates, and legal disclosure packs.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          size="sm"
          class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase gap-1.5 shadow-md"
          @click="handleDownloadWhitepaper"
        >
          <FileCheck2 class="h-3.5 w-3.5" />
          Security Whitepaper (PDF)
        </Button>
      </div>
    </div>

    <!-- MANDATORY PROTOTYPE TRUST DISCLAIMER -->
    <div
      class="p-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-card to-card dark:from-emerald-950/30 dark:via-slate-950/80 dark:to-slate-950 font-mono text-xs text-muted-foreground dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-xl"
    >
      <div class="flex items-center gap-3">
        <ShieldCheck class="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div>
          <span class="text-foreground dark:text-white font-bold block font-sans"
            >Institutional Trust Transparency Notice</span
          >
          <span class="text-muted-foreground dark:text-slate-400 text-[11px]"
            >Carbon Watchdog explicitly distinguishes architectural capabilities and readiness from
            formal third-party audits.</span
          >
        </div>
      </div>
      <Badge
        variant="outline"
        class="border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] shrink-0"
      >
        SOC 2 Readiness Architecture
      </Badge>
    </div>

    <!-- 8 SECURITY CONTROLS CARDS -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="card in securityCards"
        :key="card.title"
        class="p-5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-md dark:shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition group"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <component
              :is="card.icon"
              class="h-6 w-6"
              :class="card.color"
            />
            <span
              class="text-[10px] font-mono text-muted-foreground border border-border/60 dark:border-white/10 bg-muted/60 dark:bg-white/5 px-2 py-0.5 rounded"
            >
              {{ card.badge }}
            </span>
          </div>

          <div>
            <h3
              class="text-base font-bold text-foreground dark:text-white font-sans group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition"
            >
              {{ card.title }}
            </h3>
            <span
              class="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5 block"
            >
              ● {{ card.status }}
            </span>
          </div>

          <p class="text-xs text-foreground/80 dark:text-slate-300 font-sans leading-relaxed">
            {{ card.desc }}
          </p>
        </div>

        <div
          class="pt-3 border-t border-border/40 dark:border-white/5 font-mono text-[10px] text-muted-foreground leading-normal"
        >
          {{ card.disclaimer }}
        </div>
      </div>
    </div>
  </div>
</template>
