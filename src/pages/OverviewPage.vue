<script setup lang="ts">
import { computed } from 'vue';
import AlertCard from '../components/AlertCard.vue';
import BuyerCard from '../components/BuyerCard.vue';
import CarbonOrbit from '../components/CarbonOrbit.vue';
import MetricCard from '../components/MetricCard.vue';
import ProjectCard from '../components/ProjectCard.vue';
import { usePortalData } from '../composables/usePortalData';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';

const {
  projects,
  buyers,
  reports,
  loading,
  errorMessage,
  formatNumber,
  totalAlerts,
  totalExposure,
  overallRisk,
  buyerLinksByProject,
  getRiskLabel,
} = usePortalData();

const heroStats = computed(() => [
  { label: 'Projects under watch', value: String(projects.value.length) },
  { label: 'Buyer portfolios', value: String(buyers.value.length) },
  { label: 'Active alerts', value: String(totalAlerts.value) },
]);

const spotlightProjects = computed(() => projects.value.slice(0, 3));
const spotlightReports = computed(() => reports.value.slice(0, 2));
const priorityProject = computed(
  () =>
    projects.value.find((project) => project.riskLevel === 'high') ?? spotlightProjects.value[0],
);
const highestExposureBuyer = computed(
  () => [...buyers.value].sort((left, right) => right.exposure - left.exposure)[0],
);
const latestReport = computed(() => reports.value[0]);
const latestAlert = computed(() => latestReport.value?.alerts[0]);
const displayErrorMessage = computed(() =>
  errorMessage.value && !errorMessage.value.startsWith('Sandbox mode') ? errorMessage.value : '',
);

const briefingItems = computed(() => [
  {
    label: 'Priority project',
    value: priorityProject.value?.name ?? 'Monitoring sync pending',
    detail: priorityProject.value
      ? `${getRiskLabel(priorityProject.value.riskLevel)} risk • ${priorityProject.value.country}`
      : 'Waiting for monitored project data',
  },
  {
    label: 'Highest buyer exposure',
    value: highestExposureBuyer.value?.name ?? 'Buyer map pending',
    detail: highestExposureBuyer.value
      ? `${formatNumber(highestExposureBuyer.value.exposure)} credits • ${highestExposureBuyer.value.region}`
      : 'Waiting for buyer exposure data',
  },
  {
    label: 'Latest alert',
    value: latestAlert.value?.type ?? 'No active alert',
    detail: latestAlert.value
      ? `${Math.round((latestAlert.value.confidence || 0) * 100)}% confidence • ${latestAlert.value.location}`
      : latestReport.value
        ? `${getRiskLabel(latestReport.value.overallRisk)} risk • ${latestReport.value.projectId}`
        : 'Waiting for monitoring report data',
  },
]);
</script>

<template>
  <div class="space-y-8 pb-4">
    <section class="cw-animate-in">
      <CarbonOrbit
        eyebrow="Satellite-grade carbon assurance"
        title="Watch every credit after issuance."
        description="Carbon Watchdog tracks project integrity, maps the signal to the buyer portfolio, and keeps the story understandable for sustainability teams, audit leads, and executives."
        :stats="heroStats"
      />
    </section>

    <section class="cw-animate-in cw-delay-2 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1.5"
          >
            <span class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
            Live portfolio brief
          </Badge>
          <h3 class="mt-3 max-w-2xl text-xl sm:text-2xl font-black text-foreground lg:text-[2.1rem]">
            Start with the projects, buyers, and signals that need attention now.
          </h3>
          <p class="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Monitoring status, buyer exposure, and alert confidence stay visible without extra
            clicks, so the landing page behaves like an operational dashboard instead of a pitch
            screen.
          </p>

          <div class="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
            <div
              v-for="(item, index) in briefingItems"
              :key="item.label"
              :class="[
                'cw-card-interactive border-border/80 bg-muted/50 rounded-[1.25rem] sm:rounded-[1.35rem] border p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md',
                index === 2 && briefingItems.length === 3 ? 'sm:col-span-2 lg:col-span-1' : '',
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

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <MetricCard
          label="Projects monitored"
          :value="projects.length"
          detail="Global portfolio"
          accent="slate"
        />
        <MetricCard
          label="Credits exposed"
          :value="formatNumber(totalExposure)"
          detail="Across active buyers"
          accent="emerald"
        />
        <MetricCard
          label="Alerts detected"
          :value="totalAlerts"
          detail="In latest cycle"
          accent="amber"
        />
        <MetricCard
          label="Portfolio risk"
          :value="overallRisk"
          detail="Latest monitoring view"
          accent="blue"
        />
      </div>
    </section>

    <section class="cw-animate-in cw-delay-3 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge
                variant="secondary"
                class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
              >
                Project pulse
              </Badge>
              <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
                Projects that need review now
              </h3>
            </div>

            <p class="max-w-md text-sm leading-7 text-muted-foreground">
              Each card ties current project condition to buyer exposure so the review queue is
              understandable even for non-technical teams.
            </p>
          </div>

          <div class="mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            <ProjectCard
              v-for="project in spotlightProjects"
              :key="project.id"
              :project="project"
              :buyer-links="buyerLinksByProject(project)"
              :format-number="formatNumber"
            />
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
              Risk narrative
            </Badge>
            <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
              What changed this cycle
            </h3>

            <div class="mt-5 space-y-4">
              <AlertCard
                v-for="report in spotlightReports"
                :key="report.reportId"
                :alert="
                  report.alerts[0] || {
                    type: 'no-alert',
                    severity: 'low',
                    location: report.projectId,
                    confidence: 0.99,
                    detectedAt: report.reportId,
                  }
                "
              />
            </div>

            <div
              class="border-border/80 bg-muted/50 mt-5 rounded-[1.35rem] border p-4 text-sm leading-7 text-muted-foreground"
            >
              The highest concern remains the Mangrove Protection Zone in Indonesia, where
              persistent land-use change weakens the integrity of the credited area and creates a
              direct buyer exposure problem.
            </div>
          </CardContent>
        </Card>

        <Card class="border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl">
          <CardContent class="p-4 sm:p-5">
            <Badge
              variant="secondary"
              class="border-emerald-500/30 bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-300"
            >
              Sandbox mode
            </Badge>
            <p class="mt-3 text-sm leading-7 text-emerald-900/90 dark:text-emerald-100/90">
              Sample data is displayed because the live API is unavailable. The layout keeps that
              state visible without pushing the rest of the dashboard off-screen.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="cw-animate-in cw-delay-4 grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Buyer exposure
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Who is carrying the risk
          </h3>

          <div class="mt-5 space-y-4">
            <BuyerCard
              v-for="buyer in buyers.slice(0, 3)"
              :key="buyer.id"
              :buyer="buyer"
              :format-number="formatNumber"
            />
          </div>
        </CardContent>
      </Card>

      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Status stream
          </Badge>
          <h3 class="mt-3 text-2xl font-black text-foreground">
            Latest monitoring reports
          </h3>

          <div class="mt-5 space-y-4">
            <div
              v-for="report in reports.slice(0, 2)"
              :key="report.reportId"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-lg"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="outline" class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300">
                  {{ report.reportId }}
                </Badge>
                <Badge
                  variant="outline"
                  :class="
                    report.overallRisk === 'high'
                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                      : report.overallRisk === 'medium'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  "
                >
                  {{ getRiskLabel(report.overallRisk) }} risk
                </Badge>
              </div>

              <p class="mt-4 text-sm leading-7 text-muted-foreground">
                {{ report.summary }}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>

    <div
      v-if="loading"
      class="border-border/80 bg-card/80 text-muted-foreground rounded-[1.35rem] border p-4 text-sm backdrop-blur-md"
    >
      Loading portfolio intelligence...
    </div>

    <div
      v-if="displayErrorMessage"
      class="rounded-[1.35rem] border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-100"
    >
      {{ displayErrorMessage }}
    </div>
  </div>
</template>
