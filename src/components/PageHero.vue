<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';

defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
}>();
</script>

<template>
  <Card
    class="border-border/80 relative overflow-hidden bg-gradient-to-br from-card/95 via-card/85 to-card/70 shadow-2xl backdrop-blur-2xl"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_88%_14%,rgba(14,165,233,0.15),transparent_30%)] transition-opacity duration-1000"
    ></div>
    <CardContent class="relative p-4 sm:p-7 lg:p-10">
      <div class="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-end">
        <div class="max-w-3xl">
          <Badge
            variant="secondary"
            class="cw-animate-in cw-delay-1 border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-2"
          >
            <span class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
            {{ eyebrow }}
          </Badge>
          <CardTitle
            class="cw-animate-in cw-delay-2 mt-3 sm:mt-4 max-w-4xl text-2xl sm:text-4xl lg:text-[3.25rem] leading-[1.08] sm:leading-[1.04] font-black tracking-tight text-foreground"
          >
            {{ title }}
          </CardTitle>
          <CardDescription
            class="cw-animate-in cw-delay-3 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 text-muted-foreground"
          >
            {{ description }}
          </CardDescription>
          <div v-if="$slots.default" class="cw-animate-in cw-delay-4 mt-5 sm:mt-6">
            <slot></slot>
          </div>
        </div>

        <div
          v-if="stats?.length"
          class="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1 xl:grid-cols-2"
        >
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            :class="[
              'cw-animate-in cw-card-interactive border-border/80 bg-muted/50 rounded-[1.15rem] sm:rounded-[1.35rem] border p-3.5 sm:px-5 sm:py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-lg',
              index === 0 ? 'cw-delay-3' : index === 1 ? 'cw-delay-4' : index === 2 ? 'cw-delay-5' : 'cw-delay-6',
              index === 2 && stats.length === 3 ? 'col-span-2 sm:col-span-1' : '',
            ]"
          >
            <p
              class="text-[0.66rem] sm:text-[0.68rem] font-bold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-400"
            >
              {{ stat.label }}
            </p>
            <p class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-black tracking-tight text-foreground transition-transform duration-200 group-hover:scale-105">
              {{ stat.value }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
