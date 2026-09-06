<script setup lang="ts">
import { Database, Layers, Orbit, Radio, Satellite, ShieldCheck } from 'lucide-vue-next';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { METHODS_PIPELINE_STEPS } from '@/constants';

const pipelineSteps = METHODS_PIPELINE_STEPS;
</script>

<template>
  <div class="space-y-10 pb-12">
    <!-- Top Header -->
    <div class="border-b border-border/70 dark:border-white/10 pb-6">
      <div class="flex items-center gap-2">
        <Badge
          variant="secondary"
          class="border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-700 dark:text-emerald-300 uppercase tracking-widest"
        >
          Scientific Methodology
        </Badge>
        <span class="text-xs font-mono text-muted-foreground dark:text-slate-400"
          >Remote Sensing & Algorithmic Assurance</span
        >
      </div>
      <h1
        class="text-3xl sm:text-4xl font-black text-foreground dark:text-white font-sans mt-2 tracking-tight"
      >
        FROM ORBITAL SIGNAL TO PORTFOLIO RISK
      </h1>
      <p
        class="text-sm sm:text-base text-muted-foreground dark:text-slate-300 max-w-3xl mt-2 leading-relaxed"
      >
        How Carbon Watchdog fuses European Space Agency Copernicus telemetry with voluntary registry
        accounting to quantify physical integrity and financial claim risk.
      </p>
    </div>

    <!-- SECTION 19: THE 8-STAGE SCIENTIFIC PIPELINE -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2
            class="text-lg font-bold text-foreground dark:text-white font-sans flex items-center gap-2"
          >
            <Orbit class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            End-to-End Surveillance Pipeline
          </h2>
          <p class="text-xs text-muted-foreground dark:text-slate-400 font-mono">
            Continuous processing flow from orbital capture to executive decision
          </p>
        </div>
      </div>

      <!-- Pipeline Cards (Grid with directional arrows) -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        <div
          v-for="step in pipelineSteps"
          :key="step.step"
          class="p-5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-md dark:shadow-xl space-y-3 relative group hover:border-emerald-500/40 transition"
        >
          <div class="flex items-center justify-between">
            <span
              class="h-8 w-8 rounded-xl bg-muted dark:bg-white/5 border border-border/60 dark:border-white/10 font-mono font-bold text-xs text-foreground dark:text-white flex items-center justify-center"
            >
              {{ step.step }}
            </span>
            <component
              :is="step.icon"
              class="h-5 w-5"
              :class="step.color"
            />
          </div>

          <div>
            <span
              class="text-[10px] font-mono text-muted-foreground dark:text-slate-400 uppercase tracking-wider block"
              >{{ step.subtitle }}</span
            >
            <h3
              class="text-base font-bold text-foreground dark:text-white font-sans group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition"
            >
              {{ step.title }}
            </h3>
          </div>

          <p class="text-xs text-foreground/80 dark:text-slate-300 font-sans leading-relaxed">
            {{ step.desc }}
          </p>
        </div>
      </div>
    </section>

    <!-- IN-DEPTH EXPLANATIONS OF SENSORS & BASELINES -->
    <section class="grid md:grid-cols-2 gap-6">
      <Card
        class="border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 backdrop-blur-xl"
      >
        <CardContent class="p-6 space-y-3">
          <div class="flex items-center gap-2">
            <Satellite class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Sentinel-2 Optical Multispectral
            </h3>
          </div>
          <p class="text-xs text-foreground/80 dark:text-slate-300 leading-relaxed font-sans">
            Operates in 13 spectral bands spanning visible, red edge, near infrared (NIR), and
            shortwave infrared (SWIR). Provides 10m spatial resolution and a 5-day revisit cadence
            at the equator. Used primarily for computing normalized difference vegetation indices
            (NDVI) and identifying photosynthetic dieback.
          </p>
        </CardContent>
      </Card>

      <Card
        class="border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 backdrop-blur-xl"
      >
        <CardContent class="p-6 space-y-3">
          <div class="flex items-center gap-2">
            <Radio class="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Sentinel-1 Synthetic Aperture Radar (SAR)
            </h3>
          </div>
          <p class="text-xs text-foreground/80 dark:text-slate-300 leading-relaxed font-sans">
            Transmits microwave C-band signals (5.405 GHz) that penetrate persistent tropical cloud
            decks, smoke, and haze. Measures polarization backscatter (VV + VH) to detect structural
            canopy changes and clearcut road intrusion completely independent of daylight and
            weather.
          </p>
        </CardContent>
      </Card>

      <Card
        class="border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 backdrop-blur-xl"
      >
        <CardContent class="p-6 space-y-3">
          <div class="flex items-center gap-2">
            <Database class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Registry Baselines & Crediting Ledgers
            </h3>
          </div>
          <p class="text-xs text-foreground/80 dark:text-slate-300 leading-relaxed font-sans">
            Ingests official Verra VCS, Gold Standard, and ACR project boundaries, issuance volumes,
            and historical baseline equations. Directly cross-examines claimed deforestation
            prevention against actual real-time planetary canopy observations.
          </p>
        </CardContent>
      </Card>

      <Card
        class="border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 backdrop-blur-xl"
      >
        <CardContent class="p-6 space-y-3">
          <div class="flex items-center gap-2">
            <Layers class="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Multi-Sensor Fusion Engine
            </h3>
          </div>
          <p class="text-xs text-foreground/80 dark:text-slate-300 leading-relaxed font-sans">
            Combines optical vegetation metrics, radar coherence changes, elevation models, and
            meteorological precipitation data before firing any alert. Ensures that no risk notice
            is raised on single-sensor artifacts or fleeting seasonal dry downs.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- SECTION 20: SCIENCE QUALITY CONTROL -->
    <section class="space-y-4 pt-4 border-t border-border/70 dark:border-white/10">
      <div>
        <h2
          class="text-lg font-bold text-foreground dark:text-white font-sans flex items-center gap-2"
        >
          <ShieldCheck class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Science Quality Control & Rigor
        </h2>
        <p class="text-xs text-muted-foreground dark:text-slate-400 font-mono">
          Institutional safeguards against false alarms and inaccurate exposure readings
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- QC 1: False Positive Suppression -->
        <div
          class="p-5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 space-y-2.5 font-sans"
        >
          <span
            class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-bold"
            >Safeguard 1</span
          >
          <h4 class="text-base font-bold text-foreground dark:text-white">
            False Positive Suppression
          </h4>
          <p class="text-xs text-foreground/80 dark:text-slate-300 leading-relaxed">
            Requires at least 2 consecutive orbital passes confirming signal drop across both
            optical and radar spectrums before upgrading an alert to formal review.
          </p>
        </div>

        <!-- QC 2: Seasonal Drift Correction -->
        <div
          class="p-5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 space-y-2.5 font-sans"
        >
          <span
            class="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block font-bold"
            >Safeguard 2</span
          >
          <h4 class="text-base font-bold text-foreground dark:text-white">
            Seasonal Drift Correction
          </h4>
          <p class="text-xs text-foreground/80 dark:text-slate-300 leading-relaxed">
            Applies multi-year harmonic time-series decomposition to model deciduous leaf-fall and
            dry season browning without misclassifying it as deforestation.
          </p>
        </div>

        <!-- QC 3: Confidence Scoring -->
        <div
          class="p-5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 space-y-2.5 font-sans"
        >
          <span
            class="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block font-bold"
            >Safeguard 3</span
          >
          <h4 class="text-base font-bold text-foreground dark:text-white">
            Confidence Scoring (0–100%)
          </h4>
          <p class="text-xs text-foreground/80 dark:text-slate-300 leading-relaxed">
            Every observation delivers an explicit Bayesian probability score reflecting sensor
            spatial overlap, atmospheric clarity, and signal-to-noise ratios.
          </p>
        </div>

        <!-- QC 4: Human Review Escalation -->
        <div
          class="p-5 rounded-2xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-950/60 space-y-2.5 font-sans"
        >
          <span
            class="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block font-bold"
            >Safeguard 4</span
          >
          <h4 class="text-base font-bold text-foreground dark:text-white">
            Human Analyst Escalation
          </h4>
          <p class="text-xs text-foreground/80 dark:text-slate-300 leading-relaxed">
            All Critical Risk notifications exceeding $10M in corporate exposure must undergo
            peer-reviewed triage by senior remote sensing specialists.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
