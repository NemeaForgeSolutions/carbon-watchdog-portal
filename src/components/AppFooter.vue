<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { NavSection } from '../constants/navigation';
import { APP_FOOTER_CONSTANTS } from '@/constants';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';

defineProps<{
  sections: NavSection[];
}>();
</script>

<template>
  <Card
    class="border-border/80 bg-background/84 rounded-[1.5rem] shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
  >
    <CardContent class="p-5 sm:p-6 lg:p-8">
      <div
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.25fr_repeat(2,minmax(0,0.75fr))_1fr] lg:gap-8"
      >
        <div class="space-y-4 sm:col-span-2 lg:col-span-1">
          <p
            class="text-[0.64rem] font-bold tracking-[0.24em] text-emerald-600 uppercase dark:text-emerald-400"
          >
            {{ APP_FOOTER_CONSTANTS.eyebrow }}
          </p>
          <CardTitle class="text-foreground max-w-sm text-2xl font-black tracking-[-0.04em]">
            {{ APP_FOOTER_CONSTANTS.title }}
          </CardTitle>
          <p class="text-muted-foreground max-w-xl text-sm leading-7">
            {{ APP_FOOTER_CONSTANTS.description }}
          </p>
          <RouterLink
            :to="APP_FOOTER_CONSTANTS.briefingCta.to"
            class="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-500/50 dark:text-emerald-200"
          >
            {{ APP_FOOTER_CONSTANTS.briefingCta.label }}
          </RouterLink>
        </div>

        <div v-for="section in sections" :key="section.title" class="space-y-3">
          <p class="text-foreground text-sm font-semibold">
            {{ section.title }}
          </p>
          <nav class="flex flex-col gap-2" :aria-label="section.title">
            <RouterLink
              v-for="item in section.items"
              :key="item.to"
              :to="item.to"
              class="text-muted-foreground hover:text-foreground text-sm transition"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>

        <div
          class="border-border/70 bg-muted/40 space-y-3 rounded-[1.35rem] border p-4 sm:col-span-2 lg:col-span-1"
        >
          <p class="text-foreground text-sm font-semibold">
            {{ APP_FOOTER_CONSTANTS.focus.title }}
          </p>
          <p class="text-muted-foreground text-sm leading-7">
            {{ APP_FOOTER_CONSTANTS.focus.description }}
          </p>
        </div>
      </div>

      <div
        class="border-border/70 text-muted-foreground mt-8 flex flex-col gap-3 border-t pt-4 text-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="inline-flex items-center gap-2">
          <span class="cw-radar-dot h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
          {{ APP_FOOTER_CONSTANTS.bottom.assurance }}
        </p>
        <p>{{ APP_FOOTER_CONSTANTS.bottom.audience }}</p>
      </div>
    </CardContent>
  </Card>
</template>

