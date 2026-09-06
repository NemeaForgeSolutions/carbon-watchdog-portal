import type { ComparisonGroup, WatchlistProject } from './planData';

export type WatchlistStatusFilter = WatchlistProject['status'] | 'All';
export type WatchlistSortField = 'name' | 'country' | 'status';
export type WatchlistSortDirection = 'asc' | 'desc';
export type WatchlistSearchField = 'name' | 'country' | 'topBuyerExposure';
export type WatchlistMobileFieldKey = 'country' | 'activity' | 'topBuyerExposure' | 'why';
export type WatchlistTableColumnKey =
  | 'project'
  | 'country'
  | 'activity'
  | 'status'
  | 'topBuyerExposure'
  | 'why';

type WatchlistToneStatus = WatchlistProject['status'] | ComparisonGroup['rows'][number]['status'];

type WatchlistOption<TValue extends string> = {
  value: TValue;
  label: string;
};

type WatchlistFieldConfig<TKey extends string> = {
  key: TKey;
  label: string;
  wrapperClass?: string;
  valueClass?: string;
};

type WatchlistTableColumnConfig = {
  key: WatchlistTableColumnKey;
  label: string;
  headClass?: string;
  cellClass: string;
};

export const watchlistDefaults = {
  searchTerm: '',
  selectedStatus: 'All',
  sortBy: 'name',
  sortDirection: 'asc',
  priorityCount: 3,
} as const;

export const watchlistStatusOptions: WatchlistStatusFilter[] = [
  'All',
  'Flagged',
  'Watch',
  'Control',
  'Domestic watch',
];

export const watchlistStatusSummaries: Array<{
  label: WatchlistProject['status'];
  status: WatchlistProject['status'];
}> = [
  { label: 'Flagged', status: 'Flagged' },
  { label: 'Watch', status: 'Watch' },
  { label: 'Control', status: 'Control' },
  { label: 'Domestic watch', status: 'Domestic watch' },
];

export const watchlistSearchFields: WatchlistSearchField[] = [
  'name',
  'country',
  'topBuyerExposure',
];

export const watchlistSortFieldOptions: WatchlistOption<WatchlistSortField>[] = [
  { value: 'name', label: 'Project name' },
  { value: 'country', label: 'Country' },
  { value: 'status', label: 'Status' },
];

export const watchlistSortDirectionOptions: WatchlistOption<WatchlistSortDirection>[] = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

export const watchlistPageCopy = {
  hero: {
    eyebrow: 'Target watchlist',
    title: 'Prioritize the projects that make the platform immediately legible.',
    description:
      'These targets tie directly to named buyer exposure, public scrutiny, or a locally understandable claim narrative, which makes them the right starting set for demo and pilot conversations.',
  },
  controls: {
    badge: 'Watchlist controls',
    title: 'Filter the operating shortlist without changing views.',
    description:
      'The controls stay simple: search, status scope, and sort order. The full table remains visible below so the user never loses context.',
    searchLabel: 'Search projects, countries, or buyers',
    searchPlaceholder: 'Name, country, or buyer exposure',
    resetLabel: 'Reset filters',
    sortFieldLabel: 'Sort by',
    sortFieldPlaceholder: 'Select a field',
    sortDirectionLabel: 'Direction',
    sortDirectionPlaceholder: 'Select a direction',
    statusFiltersLabel: 'Status filters',
  },
  priority: {
    badge: 'Priority queue',
    title: 'Start with the targets that best explain the product.',
    description:
      'These cards show the first three filtered results so the shortlist remains scannable even before the full target matrix below.',
    topExposureLabel: 'Top exposure:',
    emptyState:
      'No projects match the current filters. Reset the controls or widen the status scope.',
  },
  matrix: {
    badge: 'Target matrix',
    title: 'Full target list with exposure context and rationale.',
    projectIdLabel: 'ID',
    emptyState:
      'No projects match your current filters. Try changing the status scope, search term, or sort order.',
    note:
      'Tonnage reflects all-time retired credits from the buyer-project output. Status tags combine documented scrutiny and local demo value, and should still be rechecked before external use.',
  },
  comparison: {
    badge: 'Same buyer, different verdict',
    title: 'The clearest contrast mechanic in the current watchlist.',
  },
  summary: {
    visibleProjectsLabel: 'Visible projects',
    visibleProjectsDetailPrefix: 'Out of',
    trackedTargetsLabel: 'tracked targets',
    activeFilterLabel: 'Active filter',
    activeFilterDetail: 'Status scope applied to the shortlist',
    sortOrderLabel: 'Sort order',
    directionLabels: {
      asc: 'Ascending',
      desc: 'Descending',
    },
  },
} as const;

export const watchlistMobileFields: WatchlistFieldConfig<WatchlistMobileFieldKey>[] = [
  { key: 'country', label: 'Country' },
  { key: 'activity', label: 'Activity' },
  { key: 'topBuyerExposure', label: 'Top exposure', wrapperClass: 'sm:col-span-2' },
  {
    key: 'why',
    label: 'Why this one',
    wrapperClass: 'sm:col-span-2',
    valueClass: 'mt-1 text-sm leading-6 text-muted-foreground',
  },
];

export const watchlistTableColumns: WatchlistTableColumnConfig[] = [
  { key: 'project', label: 'Project', headClass: 'pl-0', cellClass: 'pl-0 align-top' },
  { key: 'country', label: 'Country', cellClass: 'align-top text-muted-foreground' },
  { key: 'activity', label: 'Activity', cellClass: 'align-top text-muted-foreground' },
  { key: 'status', label: 'Status', cellClass: 'align-top' },
  { key: 'topBuyerExposure', label: 'Top exposure', cellClass: 'align-top text-muted-foreground' },
  { key: 'why', label: 'Why this one', headClass: 'pr-0', cellClass: 'pr-0 align-top text-muted-foreground' },
];

export const watchlistStatusToneClasses: Record<WatchlistToneStatus, string> = {
  Flagged: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium',
  Watch: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-medium',
  Control: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium',
  'Domestic watch': 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300 font-medium',
  Unreviewed: 'border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300 font-medium',
};