<script setup lang="ts">
import PageHero from '@/components/PageHero.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import {
  methodsDataSources as dataSources,
  methodsModelChecks as modelChecks,
  methodsSummaryStats as summaryStats,
} from '@/data/siteContent';
import { methodologySteps } from '../data/portalData';
</script>

<template>
  <div class="space-y-8 pb-4">
    <PageHero
      eyebrow="Methodology"
      title="Turn imagery, registry context, and model review into evidence people can use."
      description="Carbon Watchdog is built to explain, not just detect. The workflow keeps the path from source observation to buyer-facing consequence visible for customer, legal, and audit review."
      :stats="summaryStats"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(source, index) in dataSources"
        :key="source.title"
        :class="[
          'cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-2xl',
          index === 2 && dataSources.length === 3 ? 'md:col-span-2 lg:col-span-1' : '',
        ]"
      >
        <CardContent class="p-4 sm:p-6">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Input
          </Badge>
          <h3 class="mt-4 text-lg sm:text-xl font-bold text-foreground">
            {{ source.title }}
          </h3>
          <p class="mt-2.5 sm:mt-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
            {{ source.body }}
          </p>
        </CardContent>
      </Card>
    </section>

    <section class="cw-animate-in cw-delay-2 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Processing chain
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            From scene ingestion to claim-ready report.
          </h3>

          <div class="mt-5 grid gap-4">
            <div
              v-for="step in methodologySteps"
              :key="step.step"
              class="cw-card-interactive border-border/80 bg-muted/50 flex flex-col sm:grid gap-3 rounded-[1.35rem] border p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start"
            >
              <span
                class="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border font-black shadow-xs transition-transform duration-200 hover:scale-110"
              >
                {{ step.step }}
              </span>
              <div>
                <h4 class="text-base sm:text-lg font-bold text-foreground">
                  {{ step.title }}
                </h4>
                <p class="mt-1.5 sm:mt-2 text-sm leading-6 sm:leading-7 text-muted-foreground">
                  {{ step.body }}
                </p>
              </div>
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
            Review controls
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Why the output is operationally usable.
          </h3>

          <ul class="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            <li
              v-for="check in modelChecks"
              :key="check"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-muted/70"
            >
              {{ check }}
            </li>
          </ul>

          <div class="border-border/80 bg-muted/50 mt-6 rounded-[1.35rem] border p-5 shadow-sm">
            <h4 class="text-lg font-bold text-foreground">
              Audit trail promise
            </h4>
            <p class="mt-2 text-sm leading-7 text-muted-foreground">
              Every report preserves the path from source scene, to alert, to explanation, to buyer
              action, so the output can be reviewed months later without losing context.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
</template>
