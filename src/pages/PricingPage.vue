<script setup lang="ts">
import { useRouter } from 'vue-router';
import PageHero from '@/components/PageHero.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import {
  pricingCommercialNotes as commercialNotes,
  pricingIncludedInEveryPlan as includedInEveryPlan,
  pricingPlans as plans,
  pricingSummaryStats as summaryStats,
} from '@/data/siteContent';

const router = useRouter();
</script>

<template>
  <div class="space-y-8 pb-4">
    <PageHero
      eyebrow="Commercial packaging"
      title="Plans that match how monitoring becomes an operating function."
      description="The packaging is designed around maturity: prove the workflow, scale the portfolio, then formalize governance and customer-facing diligence."
      :stats="summaryStats"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Commercial model
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Pricing follows monitored exposure, workflow depth, and governance needs.
          </h3>
          <ul class="mt-5 space-y-3">
            <li
              v-for="note in commercialNotes"
              :key="note"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border px-4 py-3 text-sm leading-7 text-muted-foreground shadow-xs transition-all duration-300 hover:border-emerald-500/40 hover:bg-muted/70"
            >
              {{ note }}
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-2xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge variant="secondary" class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300">
            Included in every plan
          </Badge>
          <ul class="mt-5 space-y-3">
            <li
              v-for="item in includedInEveryPlan"
              :key="item"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border px-4 py-3 text-sm leading-7 text-muted-foreground shadow-xs transition-all duration-300 hover:border-sky-500/40 hover:bg-muted/70"
            >
              {{ item }}
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>

    <section class="cw-animate-in cw-delay-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(plan, index) in plans"
        :key="plan.name"
        :class="[
          'cw-card-interactive transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl',
          plan.featured
            ? 'border-emerald-500/40 bg-card/95 text-card-foreground shadow-[0_24px_60px_rgba(16,185,129,0.18)] backdrop-blur-xl ring-2 ring-emerald-500/30'
            : 'border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl hover:border-emerald-500/40',
          index === 2 && plans.length === 3 ? 'md:col-span-2 lg:col-span-1' : '',
        ]"
      >
        <CardContent class="p-5 sm:p-6 lg:p-7">
          <div class="flex items-center justify-between gap-3">
            <Badge
              variant="secondary"
              :class="
                plan.featured
                  ? 'border-emerald-500/40 bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-300'
                  : 'border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300'
              "
            >
              {{ plan.name }}
            </Badge>
            <span
              v-if="plan.featured"
              class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[0.68rem] font-bold tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-300"
            >
              Most common start
            </span>
          </div>

          <p class="mt-4 sm:mt-5 text-2xl sm:text-3xl font-black text-foreground">
            {{ plan.price }}
            <span class="text-muted-foreground text-xs sm:text-sm font-semibold">{{ plan.cadence }}</span>
          </p>
          <p class="mt-2.5 sm:mt-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
            {{ plan.fit }}
          </p>

          <ul class="mt-4 sm:mt-5 space-y-2 text-sm text-foreground">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="border-border/80 bg-muted/40 rounded-[1rem] border px-3 py-2.5 font-medium shadow-xs transition-colors duration-200 hover:border-emerald-500/40 hover:bg-muted/70"
            >
              {{ feature }}
            </li>
          </ul>

          <Button
            class="mt-6 w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            :variant="
              plan.featured ? 'default' : plan.name === 'Enterprise' ? 'outline' : 'secondary'
            "
            @click="router.push('/request-demo')"
          >
            {{ plan.cta }}
          </Button>
        </CardContent>
      </Card>
    </section>
  </div>
</template>
