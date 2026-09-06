<script setup lang="ts">
import { ListFilter, RotateCcw, Search } from '@lucide/vue';
import { computed, ref } from 'vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import Input from '@/components/ui/input/Input.vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import PageHero from '../components/PageHero.vue';
import type { WatchlistProject } from '../data/planData';
import { comparisonGroups, targetWatchlist } from '../data/planData';
import {
  type WatchlistMobileFieldKey,
  type WatchlistSortDirection,
  type WatchlistSortField,
  type WatchlistStatusFilter,
  type WatchlistTableColumnKey,
  watchlistDefaults,
  watchlistMobileFields,
  watchlistPageCopy,
  watchlistSearchFields,
  watchlistSortDirectionOptions,
  watchlistSortFieldOptions,
  watchlistStatusOptions,
  watchlistStatusSummaries,
  watchlistStatusToneClasses,
  watchlistTableColumns,
} from '../data/watchlistData';

const searchTerm = ref(watchlistDefaults.searchTerm);
const selectedStatus = ref<WatchlistStatusFilter>(watchlistDefaults.selectedStatus);
const sortBy = ref<WatchlistSortField>(watchlistDefaults.sortBy);
const sortDirection = ref<WatchlistSortDirection>(watchlistDefaults.sortDirection);

const filteredProjects = computed(() => {
  const search = searchTerm.value.trim().toLowerCase();

  return targetWatchlist.filter((project) => {
    const matchesStatus = selectedStatus.value === 'All' || project.status === selectedStatus.value;
    const matchesSearch =
      !search ||
      watchlistSearchFields.some((field) => project[field].toLowerCase().includes(search));

    return matchesStatus && matchesSearch;
  });
});

const visibleProjects = computed(() => {
  const sorted = [...filteredProjects.value];

  sorted.sort((left, right) => {
    const leftValue = left[sortBy.value].toLowerCase();
    const rightValue = right[sortBy.value].toLowerCase();
    const direction = sortDirection.value === 'asc' ? 1 : -1;

    if (leftValue < rightValue) return -1 * direction;
    if (leftValue > rightValue) return 1 * direction;
    return 0;
  });

  return sorted;
});

const quickStats = computed(() =>
  watchlistStatusSummaries.map((stat) => ({
    label: stat.label,
    value: targetWatchlist.filter((project) => project.status === stat.status).length,
  })),
);

const priorityProjects = computed(() =>
  visibleProjects.value.slice(0, watchlistDefaults.priorityCount),
);

const summaryCards = computed(() => [
  {
    label: watchlistPageCopy.summary.visibleProjectsLabel,
    value: String(visibleProjects.value.length),
    detail: `${watchlistPageCopy.summary.visibleProjectsDetailPrefix} ${targetWatchlist.length} ${watchlistPageCopy.summary.trackedTargetsLabel}`,
  },
  {
    label: watchlistPageCopy.summary.activeFilterLabel,
    value: selectedStatus.value,
    detail: watchlistPageCopy.summary.activeFilterDetail,
  },
  {
    label: watchlistPageCopy.summary.sortOrderLabel,
    value:
      watchlistSortFieldOptions.find((option) => option.value === sortBy.value)?.label ||
      watchlistSortFieldOptions[0].label,
    detail: watchlistPageCopy.summary.directionLabels[sortDirection.value],
  },
]);

const clearFilters = () => {
  searchTerm.value = watchlistDefaults.searchTerm;
  selectedStatus.value = watchlistDefaults.selectedStatus;
  sortBy.value = watchlistDefaults.sortBy;
  sortDirection.value = watchlistDefaults.sortDirection;
};

const getProjectFieldValue = (project: WatchlistProject, fieldKey: WatchlistMobileFieldKey) =>
  project[fieldKey];

const getTableColumnValue = (project: WatchlistProject, fieldKey: WatchlistTableColumnKey) => {
  if (fieldKey === 'project') return project.name;
  if (fieldKey === 'status') return project.status;

  return project[fieldKey];
};
</script>

<template>
  <div class="space-y-8 pb-4">
    <PageHero
      :eyebrow="watchlistPageCopy.hero.eyebrow"
      :title="watchlistPageCopy.hero.title"
      :description="watchlistPageCopy.hero.description"
      :stats="quickStats.map((stat) => ({ label: stat.label, value: String(stat.value) }))"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            {{ watchlistPageCopy.controls.badge }}
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            {{ watchlistPageCopy.controls.title }}
          </h3>
          <p class="mt-3 text-sm leading-7 text-muted-foreground">
            {{ watchlistPageCopy.controls.description }}
          </p>

          <FieldSet class="mt-6">
            <FieldLegend class="sr-only">
              Watchlist controls
            </FieldLegend>

            <FieldGroup class="gap-5">
              <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <Field class="gap-2">
                  <FieldLabel for="watchlist-search">
                    {{ watchlistPageCopy.controls.searchLabel }}
                  </FieldLabel>
                  <div
                    class="border-border/80 bg-muted/50 flex items-center gap-3 rounded-[1.15rem] border px-4 py-2.5 transition focus-within:border-emerald-500/50"
                  >
                    <Search class="text-muted-foreground h-4 w-4" />
                    <Input
                      id="watchlist-search"
                      v-model="searchTerm"
                      type="text"
                      :placeholder="watchlistPageCopy.controls.searchPlaceholder"
                      class="text-foreground placeholder:text-muted-foreground h-auto border-0 bg-transparent px-0 py-0 text-sm focus-visible:ring-0"
                    />
                  </div>
                  <FieldDescription>
                    Search by project, country, activity, or buyer exposure.
                  </FieldDescription>
                </Field>

                <Button
                  type="button"
                  variant="outline"
                  class="border-border/80 w-full lg:w-auto"
                  @click="clearFilters"
                >
                  <RotateCcw class="h-4 w-4" />
                  {{ watchlistPageCopy.controls.resetLabel }}
                </Button>
              </div>

              <div class="grid gap-5 md:grid-cols-2">
                <Field class="gap-2">
                  <FieldLabel for="watchlist-sort-field">
                    {{ watchlistPageCopy.controls.sortFieldLabel }}
                  </FieldLabel>
                  <Select v-model="sortBy">
                    <SelectTrigger
                      id="watchlist-sort-field"
                      class="border-border/80 w-full"
                    >
                      <SelectValue :placeholder="watchlistPageCopy.controls.sortFieldPlaceholder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="option in watchlistSortFieldOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Choose which attribute drives the visible project order.
                  </FieldDescription>
                </Field>

                <Field class="gap-2">
                  <FieldLabel for="watchlist-sort-direction">
                    {{ watchlistPageCopy.controls.sortDirectionLabel }}
                  </FieldLabel>
                  <Select v-model="sortDirection">
                    <SelectTrigger
                      id="watchlist-sort-direction"
                      class="border-border/80 w-full"
                    >
                      <SelectValue :placeholder="watchlistPageCopy.controls.sortDirectionPlaceholder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="option in watchlistSortDirectionOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Switch between ascending and descending priority views.
                  </FieldDescription>
                </Field>
              </div>

              <FieldSet class="gap-2">
                <FieldLegend variant="label">
                  {{ watchlistPageCopy.controls.statusFiltersLabel }}
                </FieldLegend>
                <FieldDescription>
                  Select a single status to narrow the project watchlist.
                </FieldDescription>
                <div class="flex flex-wrap gap-2">
                  <Button
                    v-for="status in watchlistStatusOptions"
                    :key="status"
                    type="button"
                    variant="outline"
                    size="sm"
                    class="rounded-full"
                    :class="
                      selectedStatus === status
                        ? 'border-emerald-500/40 bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20'
                        : 'border-border/80 bg-muted/50 text-muted-foreground hover:border-emerald-500/30 hover:bg-muted/80 hover:text-foreground'
                    "
                    @click="selectedStatus = status"
                  >
                    <ListFilter
                      v-if="selectedStatus === status"
                      class="h-3.5 w-3.5"
                    />
                    {{ status }}
                  </Button>
                </div>
              </FieldSet>
            </FieldGroup>
          </FieldSet>

          <div class="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <div
              v-for="item in summaryCards"
              :key="item.label"
              class="border-border/80 bg-muted/50 rounded-[1.15rem] border p-3.5 sm:p-4 shadow-sm"
            >
              <p class="text-[0.66rem] sm:text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                {{ item.label }}
              </p>
              <p class="mt-1 sm:mt-2 text-base sm:text-lg font-bold text-foreground">
                {{ item.value }}
              </p>
              <p class="mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-muted-foreground">
                {{ item.detail }}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-amber-500/30 bg-amber-500/10 font-semibold text-amber-800 dark:text-amber-300"
          >
            {{ watchlistPageCopy.priority.badge }}
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            {{ watchlistPageCopy.priority.title }}
          </h3>
          <p class="mt-3 text-sm leading-7 text-muted-foreground">
            {{ watchlistPageCopy.priority.description }}
          </p>

          <div
            v-if="priorityProjects.length"
            class="mt-5 grid gap-4"
          >
            <div
              v-for="project in priorityProjects"
              :key="project.id"
              class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-muted/70 hover:shadow-md"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h4 class="text-lg font-bold text-foreground">
                    {{ project.name }}
                  </h4>
                  <p class="mt-1 text-sm font-medium text-muted-foreground">
                    {{ project.country }} • {{ project.activity }}
                  </p>
                </div>
                <span
                  class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                  :class="watchlistStatusToneClasses[project.status]"
                >
                  {{ project.status }}
                </span>
              </div>

              <p class="mt-3 text-sm text-muted-foreground">
                <span class="font-semibold text-foreground">{{ watchlistPageCopy.priority.topExposureLabel }}</span>
                {{ project.topBuyerExposure }}
              </p>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ project.why }}
              </p>
            </div>
          </div>

          <div
            v-else
            class="border-border/80 bg-muted/50 text-muted-foreground mt-5 rounded-[1.35rem] border p-4 text-sm"
          >
            {{ watchlistPageCopy.priority.emptyState }}
          </div>
        </CardContent>
      </Card>
    </section>

    <Card class="cw-animate-in cw-delay-2 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6 lg:p-7">
        <Badge
          variant="secondary"
          class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
        >
          {{ watchlistPageCopy.matrix.badge }}
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          {{ watchlistPageCopy.matrix.title }}
        </h3>

        <div
          v-if="!visibleProjects.length"
          class="border-border/80 bg-muted/50 text-muted-foreground mt-5 rounded-[1.35rem] border p-5 text-sm"
        >
          {{ watchlistPageCopy.matrix.emptyState }}
        </div>

        <template v-else>
          <div class="mt-5 space-y-4 md:hidden">
            <div
              v-for="project in visibleProjects"
              :key="project.id"
              class="border-border/80 bg-muted/50 rounded-[1.35rem] border p-4 shadow-sm"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h4 class="text-base font-bold text-foreground">
                    {{ project.name }}
                  </h4>
                  <p class="text-muted-foreground mt-1 text-xs font-semibold tracking-[0.18em] uppercase">
                    {{ watchlistPageCopy.matrix.projectIdLabel }} {{ project.id }}
                  </p>
                </div>

                <span
                  class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                  :class="watchlistStatusToneClasses[project.status]"
                >
                  {{ project.status }}
                </span>
              </div>

              <dl class="mt-4 grid gap-3 sm:grid-cols-2">
                <div
                  v-for="field in watchlistMobileFields"
                  :key="field.key"
                  :class="field.wrapperClass"
                >
                  <dt class="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                    {{ field.label }}
                  </dt>
                  <dd :class="field.valueClass || 'mt-1 text-sm font-medium text-foreground'">
                    {{ getProjectFieldValue(project, field.key) }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="mt-5 hidden overflow-x-auto md:block">
            <Table class="min-w-[900px]">
              <TableHeader>
                <TableRow class="border-border/80 hover:bg-transparent">
                  <TableHead
                    v-for="column in watchlistTableColumns"
                    :key="column.key"
                    :class="[column.headClass, 'text-muted-foreground font-bold tracking-[0.14em] uppercase text-xs']"
                  >
                    {{ column.label }}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="project in visibleProjects"
                  :key="project.id"
                  class="border-border/70 hover:bg-muted/40 transition-colors"
                >
                  <TableCell
                    v-for="column in watchlistTableColumns"
                    :key="column.key"
                    :class="column.cellClass"
                  >
                    <template v-if="column.key === 'project'">
                      <div class="font-bold text-foreground">
                        {{ project.name }}
                      </div>
                      <div class="text-muted-foreground text-xs font-mono tracking-wider">
                        {{ watchlistPageCopy.matrix.projectIdLabel }} {{ project.id }}
                      </div>
                    </template>
                    <template v-else-if="column.key === 'status'">
                      <span
                        class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                        :class="watchlistStatusToneClasses[project.status]"
                      >
                        {{ project.status }}
                      </span>
                    </template>
                    <template v-else>
                      {{ getTableColumnValue(project, column.key) }}
                    </template>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </template>

        <p class="text-muted-foreground mt-4 text-xs leading-6">
          {{ watchlistPageCopy.matrix.note }}
        </p>
      </CardContent>
    </Card>

    <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6 lg:p-7">
        <Badge
          variant="secondary"
          class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
        >
          {{ watchlistPageCopy.comparison.badge }}
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          {{ watchlistPageCopy.comparison.title }}
        </h3>

        <div class="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="group in comparisonGroups"
            :key="group.buyer"
            class="border-border/80 bg-muted/40 shadow-sm transition-all hover:border-emerald-500/40"
          >
            <CardContent class="p-5">
              <p class="text-[10px] font-bold tracking-[0.22em] text-emerald-700 uppercase dark:text-emerald-400">
                {{ group.verdict }}
              </p>
              <h4 class="mt-2 text-xl font-black text-foreground">
                {{ group.buyer }}
              </h4>

              <div class="mt-4 space-y-3">
                <div
                  v-for="row in group.rows"
                  :key="row.project"
                  class="border-border/80 bg-card/70 flex items-center justify-between gap-3 rounded-[1rem] border px-3.5 py-3 text-sm"
                >
                  <div>
                    <div class="font-bold text-foreground">
                      {{ row.project }}
                    </div>
                    <div class="text-muted-foreground text-xs font-medium">
                      {{ row.tonnes }}
                    </div>
                  </div>
                  <span
                    class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                    :class="watchlistStatusToneClasses[row.status]"
                  >
                    {{ row.status }}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
