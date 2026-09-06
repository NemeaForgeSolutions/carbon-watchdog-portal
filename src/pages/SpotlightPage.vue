<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { spotlightReasons, spotlightRunnerUpHighlights as runnerUpHighlights } from '@/data/siteContent';
import PageHero from '../components/PageHero.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { spotlightStatusStyles } from '@/constants';
import { buyerSpotlight } from '../data/planData';

const flaggedCount = computed(
  () => buyerSpotlight.filter((row) => row.status === 'Flagged').length,
);
const unreviewedCount = computed(
  () => buyerSpotlight.filter((row) => row.status !== 'Flagged').length,
);
const countriesCovered = computed(() => new Set(buyerSpotlight.map((row) => row.country)).size);

const summaryStats = computed(() => [
  { label: 'Delta tonnes', value: '2.65M' },
  { label: 'Retirement events', value: '81' },
  { label: 'Distinct projects', value: '16' },
  { label: 'Flagged watchlist links', value: String(flaggedCount.value) },
]);

const statusTone = (status: string) =>
  spotlightStatusStyles[status] || spotlightStatusStyles.default;

</script>

<template>
  <div class="space-y-8 pb-4">
    <PageHero
      eyebrow="Buyer spotlight"
      title="Delta remains the cleanest first-contact exposure story."
      description="If the portal needs one buyer to open on, Delta is still the strongest choice: flagged watchlist overlap, a public legal narrative, and a retirement trail that makes the case easy to defend."
      :stats="summaryStats"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge variant="secondary" class="border-amber-500/30 bg-amber-500/10 font-semibold text-amber-800 dark:text-amber-300">
            Why Delta leads
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            The narrative is specific, traceable, and commercially legible.
          </h3>

          <ul class="mt-5 space-y-3">
            <li
              v-for="reason in spotlightReasons"
              :key="reason"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border px-4 py-3 text-sm leading-7 text-muted-foreground shadow-xs transition-all duration-300 hover:border-emerald-500/40 hover:bg-muted/70"
            >
              {{ reason }}
            </li>
          </ul>

          <div class="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <div class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.15rem] border p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md">
              <p class="text-[0.66rem] sm:text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                Flagged links
              </p>
              <p class="mt-1 sm:mt-2 text-xl sm:text-2xl font-black text-foreground">
                {{ flaggedCount }}
              </p>
            </div>
            <div class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.15rem] border p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md">
              <p class="text-[0.66rem] sm:text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                Unreviewed
              </p>
              <p class="mt-1 sm:mt-2 text-xl sm:text-2xl font-black text-foreground">
                {{ unreviewedCount }}
              </p>
            </div>
            <div class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.15rem] border p-3.5 sm:p-4 shadow-sm col-span-2 sm:col-span-1 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md">
              <p class="text-[0.66rem] sm:text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                Countries
              </p>
              <p class="mt-1 sm:mt-2 text-xl sm:text-2xl font-black text-foreground">
                {{ countriesCovered }}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-2xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge variant="secondary" class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300">
            Runner-up option
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Shell remains the scale story if size is the selling point.
          </h3>
          <p class="mt-3 text-sm leading-7 text-muted-foreground">
            Delta is the sharper first narrative. Shell is the larger number, and it can work when
            the audience responds more strongly to total volume than to litigation-linked scrutiny.
          </p>

          <div class="mt-5 grid gap-3">
            <div
              v-for="item in runnerUpHighlights"
              :key="item.label"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 shadow-sm transition-all duration-300 hover:border-sky-500/40 hover:bg-muted/70 hover:shadow-md"
            >
              <p class="text-[0.68rem] font-bold tracking-[0.18em] text-sky-700 uppercase dark:text-sky-400">
                {{ item.label }}
              </p>
              <p class="mt-2 text-lg font-bold text-foreground">
                {{ item.value }}
              </p>
              <p class="mt-1 text-sm leading-6 text-muted-foreground">
                {{ item.detail }}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>

    <Card class="cw-animate-in cw-delay-2 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6 lg:p-7">
        <Badge variant="secondary" class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300">
          Retirement-linked projects
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          Delta-linked retirements across the current project set.
        </h3>

        <div class="mt-5 space-y-4 md:hidden">
          <div
            v-for="row in buyerSpotlight"
            :key="row.project"
            class="border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 shadow-sm"
          >
            <div class="flex items-start justify-between gap-3">
              <h4 class="text-base font-bold text-foreground">
                {{ row.project }}
              </h4>
              <span
                class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                :class="statusTone(row.status)"
              >
                {{ row.status }}
              </span>
            </div>

            <dl class="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt class="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                  Country
                </dt>
                <dd class="mt-1 text-sm font-medium text-foreground">
                  {{ row.country }}
                </dd>
              </div>
              <div>
                <dt class="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                  Tonnes retired
                </dt>
                <dd class="mt-1 text-sm font-medium text-foreground">
                  {{ row.tonnes }}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="mt-5 hidden overflow-x-auto md:block">
          <Table class="min-w-[760px]">
            <TableHeader>
              <TableRow class="border-border/80 hover:bg-transparent">
                <TableHead class="text-muted-foreground pl-0 text-xs font-bold tracking-[0.14em] uppercase">
                  Project
                </TableHead>
                <TableHead class="text-muted-foreground text-xs font-bold tracking-[0.14em] uppercase">
                  Country
                </TableHead>
                <TableHead class="text-muted-foreground text-xs font-bold tracking-[0.14em] uppercase">
                  Tonnes retired
                </TableHead>
                <TableHead class="text-muted-foreground pr-0 text-xs font-bold tracking-[0.14em] uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in buyerSpotlight" :key="row.project" class="border-border/70 hover:bg-muted/40 transition-colors">
                <TableCell class="pl-0 font-bold text-foreground">
                  {{ row.project }}
                </TableCell>
                <TableCell class="text-muted-foreground font-medium">
                  {{ row.country }}
                </TableCell>
                <TableCell class="text-muted-foreground font-mono text-xs">
                  {{ row.tonnes }}
                </TableCell>
                <TableCell class="pr-0">
                  <span
                    class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                    :class="statusTone(row.status)"
                  >
                    {{ row.status }}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div class="mt-5 grid gap-4 lg:grid-cols-2">
          <div
            class="rounded-[1.35rem] border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-7 text-amber-900 dark:text-amber-200"
          >
            Delta alone touches the flagged projects needed for the strongest first narrative, which
            makes it the cleanest outreach hook and the most persuasive demo open.
          </div>
          <div
            class="rounded-[1.35rem] border border-sky-500/30 bg-sky-500/10 p-4 text-sm leading-7 text-sky-900 dark:text-sky-200"
          >
            Shell is the better backup when the audience needs a bigger scale signal, but Delta
            remains easier to explain and validate quickly.
          </div>
        </div>

        <p class="text-muted-foreground mt-4 text-xs leading-6">
          “Unreviewed” does not mean safe. It only means the project has not yet been mapped to a
          documented scrutiny case inside this prototype layer.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
