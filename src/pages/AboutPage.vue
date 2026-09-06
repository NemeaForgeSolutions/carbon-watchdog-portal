<script setup lang="ts">
import PageHero from '@/components/PageHero.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import {
  aboutOperatingPrinciples as operatingPrinciples,
  aboutSummaryStats as summaryStats,
} from '@/data/siteContent';
import { complianceMilestones, methodologySteps, portfolioThemes } from '../data/portalData';
</script>

<template>
  <div class="space-y-8 pb-4">
    <PageHero
      eyebrow="Platform rationale"
      title="Built for the period after credit issuance, when claims still need to be defended."
      description="Carbon Watchdog exists for operating teams that need to understand whether a project remains defensible, how buyer exposure is distributed, and what evidence is ready for internal or external review."
      :stats="summaryStats"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(theme, index) in portfolioThemes"
        :key="theme.title"
        :class="[
          'cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-2xl',
          index === 2 && portfolioThemes.length === 3 ? 'md:col-span-2 lg:col-span-1' : '',
        ]"
      >
        <CardContent class="p-4 sm:p-6">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            {{ theme.label }}
          </Badge>
          <h3 class="mt-4 text-lg sm:text-xl font-bold text-foreground">
            {{ theme.title }}
          </h3>
          <p class="mt-2.5 sm:mt-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
            {{ theme.body }}
          </p>
        </CardContent>
      </Card>
    </section>

    <section class="cw-animate-in cw-delay-2 grid gap-6 xl:grid-cols-[1fr_1fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Market pressure
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Claim scrutiny is becoming an operating requirement.
          </h3>

          <div class="mt-5 space-y-4">
            <div
              v-for="milestone in complianceMilestones"
              :key="milestone.title"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md"
            >
              <p class="text-[10px] font-bold tracking-[0.22em] text-emerald-700 uppercase dark:text-emerald-400">
                {{ milestone.date }}
              </p>
              <h4 class="mt-2 text-base sm:text-lg font-bold text-foreground">
                {{ milestone.title }}
              </h4>
              <p class="mt-2 text-sm leading-6 sm:leading-7 text-muted-foreground">
                {{ milestone.body }}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Operating principles
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            What the platform needs to do well.
          </h3>

          <ul class="mt-5 space-y-4">
            <li
              v-for="principle in operatingPrinciples"
              :key="principle"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 text-sm leading-6 sm:leading-7 text-muted-foreground shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md"
            >
              {{ principle }}
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>

    <Card class="cw-animate-in cw-delay-3 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6 lg:p-7">
        <Badge variant="secondary" class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300">
          Workflow backbone
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          Four stages from imagery to a defensible decision.
        </h3>

        <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
          <div
            v-for="step in methodologySteps"
            :key="step.step"
            class="border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 sm:p-5 shadow-sm"
          >
            <p class="text-[10px] font-bold tracking-[0.22em] text-emerald-700 uppercase dark:text-emerald-400">
              Step {{ step.step }}
            </p>
            <h4 class="mt-2 text-base sm:text-lg font-bold text-foreground">
              {{ step.title }}
            </h4>
            <p class="mt-2 text-sm leading-6 sm:leading-7 text-muted-foreground">
              {{ step.body }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
