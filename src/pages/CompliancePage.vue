<script setup lang="ts">
import PageHero from '@/components/PageHero.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import {
  complianceClaimChecklist as claimChecklist,
  complianceSummaryStats as summaryStats,
} from '@/data/siteContent';
import { complianceMilestones } from '../data/portalData';
</script>

<template>
  <div class="space-y-8 pb-4">
    <PageHero
      eyebrow="Compliance center"
      title="Regulation is moving faster than offset-era reporting habits."
      description="The platform is designed for teams that need substantiation, not slogans: project integrity, buyer exposure, and a review trail that can survive customer or regulator scrutiny."
      :stats="summaryStats"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card
        v-for="(item, index) in complianceMilestones"
        :key="item.title"
        :class="[
          'cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-2xl',
          index === 2 && complianceMilestones.length === 3 ? 'md:col-span-2 xl:col-span-1' : '',
        ]"
      >
        <CardContent class="p-4 sm:p-6">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            {{ item.date }}
          </Badge>
          <h3 class="mt-4 text-lg sm:text-xl font-bold text-foreground">
            {{ item.title }}
          </h3>
          <p class="mt-2.5 sm:mt-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
            {{ item.body }}
          </p>
        </CardContent>
      </Card>
    </section>

    <section class="cw-animate-in cw-delay-2 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Claim checklist
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            What review teams need before a claim goes public.
          </h3>

          <ul class="mt-5 space-y-4">
            <li
              v-for="item in claimChecklist"
              :key="item"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 text-sm leading-6 sm:leading-7 text-muted-foreground shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-muted/70 hover:shadow-md"
            >
              {{ item }}
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Escalation reading
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            How to interpret a high-risk signal.
          </h3>

          <div class="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              A red alert does not automatically invalidate a claim. It means the owner now needs
              evidence review, buyer impact context, and a documented remediation decision.
            </p>
            <p>
              The point of the workflow is to surface legal and reputational consequence while there
              is still time to change the claim language, retire credits, or tighten supporting
              documentation.
            </p>
          </div>

          <div
            class="cw-card-interactive rounded-[1.35rem] border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-7 text-amber-900 dark:text-amber-200 transition-all duration-300 hover:scale-[1.01] hover:border-amber-500/50 hover:shadow-md"
          >
            EU rules limiting offset-based carbon-neutral claims make substantiation the default
            operating posture. Carbon Watchdog keeps the evidence chain ready.
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
</template>
