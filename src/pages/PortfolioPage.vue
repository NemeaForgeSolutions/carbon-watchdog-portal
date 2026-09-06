<script setup lang="ts">
import { computed } from 'vue';
import MetricCard from '../components/MetricCard.vue';
import ProjectCard from '../components/ProjectCard.vue';
import PageHero from '../components/PageHero.vue';
import { usePortalData } from '../composables/usePortalData';
import type { Project, RiskLevel } from '../types';
import { riskLevelPriority } from '@/constants/ui';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';

const { projects, reports, formatNumber, buyerLinksByProject, getRiskLabel } = usePortalData();

const riskCounts = computed<Record<RiskLevel, number>>(() => ({
  low: projects.value.filter((project) => project.riskLevel === 'low').length,
  medium: projects.value.filter((project) => project.riskLevel === 'medium').length,
  high: projects.value.filter((project) => project.riskLevel === 'high').length,
}));

const sortedProjects = computed(() =>
  [...projects.value].sort((left, right) => {
    const riskDelta = riskLevelPriority[left.riskLevel] - riskLevelPriority[right.riskLevel];
    if (riskDelta !== 0) return riskDelta;
    return left.name.localeCompare(right.name);
  }),
);

const priorityProject = computed<Project | undefined>(() => sortedProjects.value[0]);

const priorityReport = computed(() =>
  priorityProject.value
    ? (reports.value.find((report) => report.projectId === priorityProject.value?.id) ??
      reports.value[0])
    : reports.value[0],
);

const recentHeat = computed(() =>
  reports.value.slice(0, 3).map((report) => ({
    projectId: report.projectId,
    signal: getRiskLabel(report.overallRisk),
    summary: report.summary,
  })),
);

const portfolioBriefItems = computed(() => [
  {
    label: 'Priority review',
    value: priorityProject.value?.name ?? 'Awaiting project data',
    detail: priorityProject.value
      ? `${getRiskLabel(priorityProject.value.riskLevel)} risk • ${priorityProject.value.country}`
      : 'No monitored projects available yet',
  },
  {
    label: 'Linked buyers',
    value: String(priorityProject.value ? buyerLinksByProject(priorityProject.value).length : 0),
    detail: 'Buyers tied to the top-priority project',
  },
  {
    label: 'Latest signal',
    value: priorityReport.value ? getRiskLabel(priorityReport.value.overallRisk) : 'No report',
    detail: priorityReport.value?.summary ?? 'No report summary available yet',
  },
]);

const heroStats = computed(() => [
  { label: 'Total projects', value: String(projects.value.length) },
  { label: 'Low risk', value: String(riskCounts.value.low) },
  { label: 'Medium risk', value: String(riskCounts.value.medium) },
  { label: 'High risk', value: String(riskCounts.value.high) },
]);
</script>

<template>
  <div class="space-y-8">
    <PageHero
      eyebrow="Portfolio atlas"
      title="A living map of integrity across the monitored book."
      description="Projects are ordered by current review pressure, then tied back to buyer exposure so portfolio and compliance teams can see where follow-up starts."
      :stats="heroStats"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1.5"
          >
            <span class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
            Portfolio briefing
          </Badge>
          <h3 class="mt-3 max-w-2xl text-xl sm:text-2xl font-black text-foreground lg:text-[2.1rem]">
            Lead with the project carrying the clearest current escalation signal.
          </h3>
          <p class="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            This summary keeps the highest-priority project, its buyer linkage, and the latest
            report narrative visible before the full project grid below.
          </p>

          <div class="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
            <div
              v-for="(item, index) in portfolioBriefItems"
              :key="item.label"
              :class="[
                'cw-card-interactive border-border/80 bg-muted/50 rounded-[1.25rem] sm:rounded-[1.35rem] border p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md',
                index === 2 && portfolioBriefItems.length === 3 ? 'sm:col-span-2 lg:col-span-1' : '',
              ]"
            >
              <p class="text-[0.68rem] font-bold tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-400">
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

      <div class="grid gap-4 sm:grid-cols-2">
        <MetricCard
          label="Total projects"
          :value="projects.length"
          detail="All active sites"
          accent="slate"
        />
        <MetricCard
          label="Low risk"
          :value="riskCounts.low"
          detail="Stable integrity"
          accent="emerald"
        />
        <MetricCard
          label="Medium risk"
          :value="riskCounts.medium"
          detail="Watchlist"
          accent="amber"
        />
        <MetricCard
          label="High risk"
          :value="riskCounts.high"
          detail="Needs escalation"
          accent="blue"
        />
      </div>
    </section>

    <section class="cw-animate-in cw-delay-2 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge
                variant="secondary"
                class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
              >
                Project roster
              </Badge>
              <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
                Monitored projects ordered by review pressure.
              </h3>
            </div>

            <p class="max-w-md text-sm leading-7 text-muted-foreground">
              High-risk projects appear first so the grid reads like a work queue instead of a flat
              catalog.
            </p>
          </div>

          <div v-if="sortedProjects.length" class="mt-6 grid gap-4 md:grid-cols-2">
            <ProjectCard
              v-for="project in sortedProjects"
              :key="project.id"
              :project="project"
              :buyer-links="buyerLinksByProject(project)"
              :format-number="formatNumber"
            />
          </div>

          <div
            v-else
            class="border-border/80 bg-muted/50 text-muted-foreground mt-6 rounded-[1.35rem] border p-4 text-sm"
          >
            No monitored projects are available yet.
          </div>
        </CardContent>
      </Card>

      <div class="grid gap-6">
        <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
          <CardContent class="p-4 sm:p-6 lg:p-7">
            <Badge
              variant="secondary"
              class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
            >
              Heat summary
            </Badge>
            <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
              Where the current pressure sits.
            </h3>

            <template v-if="recentHeat.length">
              <div class="mt-5 space-y-4 md:hidden">
                <div
                  v-for="item in recentHeat"
                  :key="item.projectId"
                  class="border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 shadow-sm"
                >
                  <div class="flex items-start justify-between gap-3">
                    <h4 class="text-base font-bold text-foreground">
                      {{ item.projectId }}
                    </h4>
                    <span
                      class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                      :class="
                        item.signal === 'High'
                          ? 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                          : item.signal === 'Medium'
                            ? 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                            : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      "
                    >
                      {{ item.signal }}
                    </span>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-muted-foreground">
                    {{ item.summary }}
                  </p>
                </div>
              </div>

              <div class="mt-5 hidden overflow-x-auto md:block">
                <Table class="min-w-[560px]">
                  <TableHeader>
                    <TableRow class="border-border/80 hover:bg-transparent">
                      <TableHead class="text-muted-foreground pl-0 text-xs font-bold tracking-[0.14em] uppercase">
                        Project
                      </TableHead>
                      <TableHead class="text-muted-foreground text-xs font-bold tracking-[0.14em] uppercase">
                        Signal
                      </TableHead>
                      <TableHead class="text-muted-foreground pr-0 text-xs font-bold tracking-[0.14em] uppercase">
                        Summary
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="item in recentHeat" :key="item.projectId" class="border-border/70 hover:bg-muted/40 transition-colors">
                      <TableCell class="pl-0 font-bold text-foreground">
                        {{
                          item.projectId
                        }}
                      </TableCell>
                      <TableCell>
                        <span
                          class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                          :class="
                            item.signal === 'High'
                              ? 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                              : item.signal === 'Medium'
                                ? 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          "
                        >
                          {{ item.signal }}
                        </span>
                      </TableCell>
                      <TableCell class="pr-0 text-muted-foreground">
                        {{ item.summary }}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </template>

            <div
              v-else
              class="border-border/80 bg-muted/50 text-muted-foreground mt-5 rounded-[1.35rem] border p-4 text-sm"
            >
              No recent monitoring reports are available yet.
            </div>
          </CardContent>
        </Card>

        <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
          <CardContent class="p-4 sm:p-6 lg:p-7">
            <Badge variant="secondary" class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300">
              Operating note
            </Badge>
            <p class="mt-4 text-sm leading-7 text-muted-foreground">
              <span class="font-bold text-foreground">
                {{ priorityProject?.name || 'The current top-priority project' }}
              </span>
              <span>
                {{
                  priorityProject
                    ? ` is leading the review queue with ${buyerLinksByProject(priorityProject).length} linked buyer${buyerLinksByProject(priorityProject).length === 1 ? '' : 's'}.`
                    : ' will appear here once portfolio data is available.'
                }}
              </span>
            </p>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              Keep the project grid and heat summary together during review so the signal,
              geography, and buyer consequence stay visible in the same scan path.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>
