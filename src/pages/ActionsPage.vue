<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { actionsSummaryStats as summaryStats } from '@/data/siteContent';
import PageHero from '../components/PageHero.vue';
import { nextActions, provenanceNotes } from '../data/planData';
</script>

<template>
  <div class="space-y-6 pb-4">
    <PageHero
      eyebrow="Execution sequence"
      title="The checklist the team can actually follow"
      description="These are the immediate moves from the attached plan, reorganized into a working sequence that goes from blocked setup work into proof, packaging, and buyer outreach."
      :stats="summaryStats"
    />

    <Card class="cw-animate-in cw-delay-1 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6">
        <Badge variant="secondary" class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300">
          Immediate next actions
        </Badge>

        <div class="mt-5 space-y-3">
          <div
            v-for="(action, index) in nextActions"
            :key="action.title"
            class="cw-card-interactive border-border/80 bg-muted/50 flex gap-4 rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-sm font-black text-emerald-700 dark:text-emerald-300 transition-transform duration-200 hover:scale-110"
            >
              {{ index + 1 }}
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-foreground">
                {{ action.title }}
              </h3>
              <p class="mt-1.5 sm:mt-2 text-sm leading-6 sm:leading-7 text-muted-foreground">
                {{ action.body }}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="cw-animate-in cw-delay-2 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6">
        <Badge variant="secondary" class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300">
          Guardrails
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          What to recheck before using any of this outside the portal
        </h3>

        <ul class="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
          <li
            v-for="note in provenanceNotes"
            :key="note"
            class="cw-card-interactive border-border/80 bg-muted/50 rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-muted/70"
          >
            {{ note }}
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
