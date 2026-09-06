<script setup lang="ts">
import { computed } from 'vue';
import BuyerCard from '../components/BuyerCard.vue';
import MetricCard from '../components/MetricCard.vue';
import PageHero from '../components/PageHero.vue';
import { usePortalData } from '../composables/usePortalData';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';

const { buyers, projects, formatNumber, totalExposure } = usePortalData();

const exposureRows = computed(() =>
  [...buyers.value]
    .sort((left, right) => right.exposure - left.exposure)
    .map((buyer) => ({
      buyer,
      projects: projects.value.filter((project) => project.buyerIds.includes(buyer.id)),
    })),
);

const averageExposure = computed(() => {
  if (!buyers.value.length) return 0;
  return totalExposure.value / buyers.value.length;
});

const priorityBuyer = computed(() => exposureRows.value[0]);
const concentrationShare = computed(() => {
  if (!totalExposure.value || !priorityBuyer.value) return 0;
  return Math.round((priorityBuyer.value.buyer.exposure / totalExposure.value) * 100);
});

const exposureBriefItems = computed(() => [
  {
    label: 'Priority account',
    value: priorityBuyer.value?.buyer.name ?? 'Awaiting buyer data',
    detail: priorityBuyer.value
      ? `${formatNumber(priorityBuyer.value.buyer.exposure)} credits • ${priorityBuyer.value.buyer.region}`
      : 'No exposure data available yet',
  },
  {
    label: 'Largest concentration',
    value: `${concentrationShare.value}%`,
    detail: 'Share of total monitored buyer exposure',
  },
  {
    label: 'Linked projects',
    value: String(priorityBuyer.value?.projects.length ?? 0),
    detail: 'Projects associated with the highest-exposure buyer',
  },
]);

const heroStats = computed(() => [
  { label: 'Buyer accounts', value: String(buyers.value.length) },
  { label: 'Total exposure', value: formatNumber(totalExposure.value) },
  { label: 'Average exposure', value: formatNumber(averageExposure.value) },
]);
</script>

<template>
  <div class="space-y-8">
    <PageHero
      eyebrow="Buyer exposure"
      title="See which buyers absorb concentration risk first."
      description="This view connects monitored projects to the accounts carrying the largest claim and reputational downside, without hiding the core picture behind mode switches."
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
            Exposure briefing
          </Badge>
          <h3 class="mt-3 max-w-2xl text-xl sm:text-2xl font-black text-foreground lg:text-[2.1rem]">
            Start with the buyer carrying the largest share of current monitored exposure.
          </h3>
          <p class="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            The landing section surfaces the priority account, its share of total exposure, and the
            number of linked projects so commercial, legal, and sustainability teams can align on
            where review starts.
          </p>

          <div class="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
            <div
              v-for="(item, index) in exposureBriefItems"
              :key="item.label"
              :class="[
                'cw-card-interactive border-border/80 bg-muted/50 rounded-[1.25rem] sm:rounded-[1.35rem] border p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md',
                index === 2 && exposureBriefItems.length === 3 ? 'sm:col-span-2 lg:col-span-1' : '',
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

          <div
            v-if="priorityBuyer?.projects.length"
            class="border-border/80 bg-muted/40 mt-6 rounded-[1.35rem] border p-4"
          >
            <p class="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
              Projects linked to {{ priorityBuyer.buyer.name }}
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="project in priorityBuyer.projects"
                :key="project.id"
                class="border-border/80 bg-card/80 text-foreground rounded-full border px-3 py-1.5 text-xs font-semibold shadow-xs transition-transform duration-200 hover:scale-105"
              >
                {{ project.name }}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="grid gap-4 sm:grid-cols-2">
        <MetricCard
          label="Buyer accounts"
          :value="buyers.length"
          detail="Active portfolio holders"
          accent="slate"
        />
        <MetricCard
          label="Total exposure"
          :value="formatNumber(totalExposure)"
          detail="Across monitored buyers"
          accent="emerald"
        />
        <MetricCard
          label="Average exposure"
          :value="formatNumber(averageExposure)"
          detail="Per buyer"
          accent="amber"
        />
        <MetricCard
          label="Largest concentration"
          :value="`${concentrationShare}%`"
          detail="Highest single-buyer share"
          accent="blue"
        />
      </div>
    </section>

    <section class="cw-animate-in cw-delay-2 grid gap-6 2xl:grid-cols-[0.92fr_1.08fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Account roster
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Every buyer, visible without switching modes.
          </h3>

          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <BuyerCard
              v-for="buyer in exposureRows.map((row) => row.buyer)"
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
            Concentration matrix
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Buyer-level exposure and linked project context.
          </h3>
          <p class="mt-3 text-sm leading-7 text-muted-foreground">
            The matrix remains visible on the page, and mobile devices can scroll it horizontally
            without breaking the rest of the layout.
          </p>

          <div class="mt-5 space-y-4 md:hidden">
            <div
              v-for="row in exposureRows"
              :key="row.buyer.id"
              class="border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 shadow-sm"
            >
              <div class="flex items-start justify-between gap-3">
                <h4 class="text-base font-bold text-foreground">
                  {{ row.buyer.name }}
                </h4>
                <span class="text-emerald-700 dark:text-emerald-300 text-sm font-semibold">{{ formatNumber(row.buyer.exposure) }} credits</span>
              </div>

              <dl class="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt
                    class="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase"
                  >
                    Region
                  </dt>
                  <dd class="mt-1 text-sm font-medium text-foreground">
                    {{ row.buyer.region }}
                  </dd>
                </div>
                <div>
                  <dt
                    class="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase"
                  >
                    Linked projects
                  </dt>
                  <dd class="mt-1 text-sm font-medium text-foreground">
                    {{ row.projects.length }}
                  </dd>
                </div>
                <div class="sm:col-span-2">
                  <dt
                    class="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase"
                  >
                    Project context
                  </dt>
                  <dd class="mt-2">
                    <div v-if="row.projects.length" class="flex flex-wrap gap-2">
                      <span
                        v-for="project in row.projects"
                        :key="project.id"
                        class="border-border/80 bg-card/80 text-foreground rounded-full border px-3 py-1 text-xs font-semibold shadow-xs"
                      >
                        {{ project.name }}
                      </span>
                    </div>
                    <span v-else class="text-muted-foreground text-sm">No linked projects</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="mt-5 hidden overflow-x-auto md:block">
            <Table class="min-w-[840px]">
              <TableHeader>
                <TableRow class="border-border/80 hover:bg-transparent">
                  <TableHead class="text-muted-foreground pl-0 text-xs font-bold tracking-[0.14em] uppercase">
                    Buyer
                  </TableHead>
                  <TableHead class="text-muted-foreground text-xs font-bold tracking-[0.14em] uppercase">
                    Region
                  </TableHead>
                  <TableHead class="text-muted-foreground text-xs font-bold tracking-[0.14em] uppercase">
                    Exposure
                  </TableHead>
                  <TableHead class="text-muted-foreground pr-0 text-xs font-bold tracking-[0.14em] uppercase">
                    Linked projects
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="row in exposureRows" :key="row.buyer.id" class="border-border/70 hover:bg-muted/40 transition-colors">
                  <TableCell class="pl-0 font-bold text-foreground">
                    {{ row.buyer.name }}
                  </TableCell>
                  <TableCell class="text-muted-foreground font-medium">
                    {{ row.buyer.region }}
                  </TableCell>
                  <TableCell class="text-emerald-700 dark:text-emerald-300 font-semibold font-mono text-xs">
                    {{ formatNumber(row.buyer.exposure) }} credits
                  </TableCell>
                  <TableCell class="pr-0">
                    <div v-if="row.projects.length" class="flex flex-wrap gap-2">
                      <span
                        v-for="project in row.projects"
                        :key="project.id"
                        class="border-border/80 bg-card/80 text-foreground rounded-full border px-3 py-1 text-xs font-semibold shadow-xs"
                      >
                        {{ project.name }}
                      </span>
                    </div>
                    <span v-else class="text-muted-foreground text-sm">No linked projects</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
</template>
