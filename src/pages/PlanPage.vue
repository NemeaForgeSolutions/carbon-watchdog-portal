<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import {
  planDestinationCards as destinationCards,
  planSectionLinks as sectionLinks,
  planSummaryStats as summaryStats,
} from '@/data/siteContent';
import PageHero from '../components/PageHero.vue';
import {
  buildPhases,
  nextActions,
  portfolioThemes,
  provenanceNotes,
} from '../data/planData';
</script>

<template>
  <div class="space-y-6">
    <PageHero
      eyebrow="Build and Targeting Plan"
      title="What to build, in what order, and where to point it first"
      description="This turns the attached plan into a working product roadmap, tying the build phases directly to the buyer-backed project targets already collected from the registry."
      :stats="summaryStats.map((stat) => ({ label: stat.label, value: stat.value }))"
    >
      <div class="flex flex-wrap gap-2">
        <a
          v-for="link in sectionLinks"
          :key="link.href"
          :href="link.href"
          class="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-slate-100 uppercase transition hover:border-emerald-400/40 hover:text-emerald-100"
        >
          {{ link.label }}
        </a>
      </div>
    </PageHero>

    <section class="cw-animate-in cw-delay-1 grid gap-4 lg:grid-cols-2">
      <Card
        v-for="card in destinationCards"
        :key="card.to"
        class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl"
      >
        <CardContent class="p-4 sm:p-6">
          <Badge variant="secondary" class="border-border/80 bg-muted/60 text-muted-foreground font-semibold">
            Linked workstream
          </Badge>
          <h3 class="mt-3 text-lg sm:text-xl font-bold text-foreground">
            {{ card.title }}
          </h3>
          <p class="mt-2.5 sm:mt-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
            {{ card.description }}
          </p>
          <RouterLink
            :to="card.to"
            class="mt-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:scale-105 hover:border-emerald-500/50 hover:bg-emerald-500/20 active:scale-95 dark:text-emerald-300"
          >
            Open page
          </RouterLink>
        </CardContent>
      </Card>
    </section>

    <Card id="phases" class="cw-animate-in cw-delay-2 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6">
        <Badge variant="secondary" class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300">
          Build phases
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          Six phases from pilot to proof
        </h3>

        <div class="mt-5 space-y-4">
          <article
            v-for="phase in buildPhases"
            :key="phase.id"
            class="cw-card-interactive border-border/80 bg-muted/50 rounded-2xl sm:rounded-3xl border p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md"
          >
            <div class="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
              <div>
                <p class="text-[10px] font-bold tracking-[0.22em] text-emerald-700 uppercase dark:text-emerald-400">
                  Phase {{ phase.id }}
                </p>
                <h4 class="mt-1 text-lg sm:text-xl font-bold text-foreground">
                  {{ phase.title }}
                </h4>
                <p class="mt-1.5 sm:mt-2 text-sm text-muted-foreground">
                  {{ phase.goal }}
                </p>
              </div>
              <span
                class="border-border/80 bg-card/80 text-foreground rounded-full border px-3 py-1 text-xs font-semibold shadow-xs"
              >{{ phase.timeline }}</span>
            </div>

            <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 sm:leading-7 text-muted-foreground">
              <li v-for="task in phase.tasks" :key="task">
                {{ task }}
              </li>
            </ul>

            <p
              class="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm leading-6 sm:leading-7 text-emerald-900 dark:text-emerald-100"
            >
              <span class="font-bold text-emerald-700 dark:text-emerald-300">Output:</span> {{ phase.output }}
            </p>
          </article>
        </div>
      </CardContent>
    </Card>

    <Card id="watchlist" class="cw-animate-in cw-delay-3 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6">
        <Badge variant="secondary" class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300">
          Target watchlist
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          The build exists to land on these 13 projects first
        </h3>
        <p class="mt-3 max-w-3xl text-sm leading-6 sm:leading-7 text-muted-foreground">
          The watchlist is no longer abstract. Every project is picked because it carries real buyer
          exposure, real scrutiny, or a local story that makes the prototype easier to explain.
        </p>

        <div class="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
          <div class="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 shadow-sm">
            <p class="text-[10px] font-bold tracking-[0.22em] text-rose-700 uppercase dark:text-rose-300">
              Flagged
            </p>
            <p class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-black text-foreground">
              9
            </p>
          </div>
          <div class="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-sm">
            <p class="text-[10px] font-bold tracking-[0.22em] text-amber-800 uppercase dark:text-amber-300">
              Watch
            </p>
            <p class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-black text-foreground">
              2
            </p>
          </div>
          <div class="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-sm">
            <p class="text-[10px] font-bold tracking-[0.22em] text-emerald-700 uppercase dark:text-emerald-300">
              Control
            </p>
            <p class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-black text-foreground">
              2
            </p>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap gap-3">
          <RouterLink
            to="/watchlist"
            class="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-500/50 hover:bg-emerald-500/20 dark:text-emerald-300"
          >
            Explore full watchlist
          </RouterLink>
          <RouterLink
            to="/spotlight"
            class="border-border/80 bg-muted/60 text-foreground hover:bg-muted inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition"
          >
            Open buyer spotlight
          </RouterLink>
        </div>
      </CardContent>
    </Card>

    <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(theme, index) in portfolioThemes"
        :key="theme.title"
        :class="[
          'border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl',
          index === 2 && portfolioThemes.length === 3 ? 'md:col-span-2 lg:col-span-1' : '',
        ]"
      >
        <CardContent class="p-4 sm:p-5">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            {{ theme.label }}
          </Badge>
          <h3 class="mt-3 text-lg sm:text-xl font-bold text-foreground">
            {{ theme.title }}
          </h3>
          <p class="mt-2 text-sm leading-6 sm:leading-7 text-muted-foreground">
            {{ theme.body }}
          </p>
        </CardContent>
      </Card>
    </section>

    <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6">
        <Badge variant="secondary" class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300">
          Provenance
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          What still needs verification before external use
        </h3>

        <ul class="mt-5 space-y-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
          <li
            v-for="note in provenanceNotes"
            :key="note"
            class="border-border/80 bg-muted/50 rounded-2xl border p-4 shadow-sm"
          >
            {{ note }}
          </li>
        </ul>

        <p class="text-muted-foreground mt-4 text-xs leading-6">
          Source set includes project and buyer extracts from the repository output folder,
          including buyer-project pairings and the confidence-scored India buyer list referenced in
          the original handover.
        </p>
      </CardContent>
    </Card>

    <Card id="actions" class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6">
        <Badge variant="secondary" class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300">
          Immediate next actions
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          The execution sequence
        </h3>

        <div class="mt-5 grid gap-4 lg:grid-cols-2">
          <article
            v-for="action in nextActions"
            :key="action.title"
            class="border-border/80 bg-muted/50 rounded-2xl border p-4 sm:p-5 shadow-sm"
          >
            <h4 class="text-base sm:text-lg font-bold text-foreground">
              {{ action.title }}
            </h4>
            <p class="mt-1.5 sm:mt-2 text-sm leading-6 sm:leading-7 text-muted-foreground">
              {{ action.body }}
            </p>
          </article>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
