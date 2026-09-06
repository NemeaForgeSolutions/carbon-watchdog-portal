<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';

defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
}>();
</script>

<template>
  <div class="relative mb-3.5 sm:mb-4">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <!-- Title & Eyebrow Section -->
      <div class="max-w-2xl space-y-1">
        <div class="flex items-center gap-2">
          <Badge
            variant="outline"
            class="border-emerald-500/30 bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1.5 text-[10px] py-0.5 px-2 font-mono"
          >
            <span
              class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            ></span>
            {{ eyebrow }}
          </Badge>
        </div>

        <h1 class="text-xl sm:text-2xl font-black tracking-tight text-foreground">
          {{ title }}
        </h1>

        <p class="text-xs leading-relaxed text-muted-foreground max-w-xl">
          {{ description }}
        </p>

        <div
          v-if="$slots.default"
          class="pt-1"
        >
          <slot></slot>
        </div>
      </div>

      <!-- Sleek Horizontal Telemetry Stat Strip -->
      <div
        v-if="stats?.length"
        class="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:items-center lg:gap-2 shrink-0"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="border-border/60 bg-card/80 rounded-xl border px-3 py-1.5 text-center lg:text-left min-w-[105px] shadow-xs backdrop-blur-md transition-all hover:border-emerald-500/40"
        >
          <p
            class="text-[9px] font-bold tracking-[0.14em] text-muted-foreground uppercase truncate"
          >
            {{ stat.label }}
          </p>
          <p
            class="mt-0.5 text-base sm:text-lg font-black font-mono tracking-tight text-foreground"
          >
            {{ stat.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
