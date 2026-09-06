<script setup lang="ts">
import { computed, ref } from 'vue';
import { AlertTriangle, Download, ExternalLink, Plus, RotateCcw, Search } from 'lucide-vue-next';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CARBON_PROJECTS } from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import {
  WATCHLIST_CREDIT_TYPES,
  WATCHLIST_RISK_TIERS,
  WATCHLIST_SATELLITE_SOURCES,
  WATCHLIST_STATUSES,
} from '@/constants';

const { openProjectDossier, showToast, formatNumber, formatCurrency } = useCarbonDossier();

// Filter Controls
const searchTerm = ref('');
const selectedCreditType = ref<string>('All');
const selectedCountry = ref<string>('All');
const selectedRegistry = ref<string>('All');
const selectedRiskTier = ref<string>('All');
const selectedStatus = ref<string>('All');
const selectedSatelliteSource = ref<string>('All');
const selectedBuyer = ref<string>('All');

const sortBy = ref<'name' | 'riskScore' | 'credits' | 'confidence'>('riskScore');
const sortOrder = ref<'asc' | 'desc'>('desc');

const creditTypes = WATCHLIST_CREDIT_TYPES;
const riskTiers = WATCHLIST_RISK_TIERS;
const statuses = WATCHLIST_STATUSES;
const satelliteSources = WATCHLIST_SATELLITE_SOURCES;

const countries = computed(() => {
  const set = new Set(CARBON_PROJECTS.map((p) => p.country));
  return ['All', ...Array.from(set)];
});

const registries = computed(() => {
  const set = new Set(CARBON_PROJECTS.map((p) => p.registry));
  return ['All', ...Array.from(set)];
});

const buyersList = computed(() => {
  const set = new Set(CARBON_PROJECTS.flatMap((p) => p.buyers));
  return ['All', ...Array.from(set)];
});

// Filtered and Sorted Projects
const filteredProjects = computed(() => {
  return CARBON_PROJECTS.filter((p) => {
    if (searchTerm.value) {
      const q = searchTerm.value.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.registryId.toLowerCase().includes(q) ||
        p.buyers.some((b) => b.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedCreditType.value !== 'All' && p.creditType !== selectedCreditType.value)
      return false;
    if (selectedCountry.value !== 'All' && p.country !== selectedCountry.value) return false;
    if (selectedRegistry.value !== 'All' && p.registry !== selectedRegistry.value) return false;
    if (selectedRiskTier.value !== 'All' && p.riskTier !== selectedRiskTier.value) return false;
    if (selectedStatus.value !== 'All' && p.status !== selectedStatus.value) return false;
    if (
      selectedSatelliteSource.value !== 'All' &&
      !p.satelliteSource.includes(selectedSatelliteSource.value)
    )
      return false;
    if (selectedBuyer.value !== 'All' && !p.buyers.includes(selectedBuyer.value)) return false;
    return true;
  }).sort((a, b) => {
    let result = 0;
    if (sortBy.value === 'riskScore') result = a.riskScore - b.riskScore;
    else if (sortBy.value === 'name') result = a.name.localeCompare(b.name);
    else if (sortBy.value === 'credits') result = a.credits - b.credits;
    else if (sortBy.value === 'confidence') result = a.confidence - b.confidence;
    return sortOrder.value === 'desc' ? -result : result;
  });
});

// Priority Queue (first 3)
const priorityQueue = computed(() => filteredProjects.value.slice(0, 3));

const resetFilters = () => {
  searchTerm.value = '';
  selectedCreditType.value = 'All';
  selectedCountry.value = 'All';
  selectedRegistry.value = 'All';
  selectedRiskTier.value = 'All';
  selectedStatus.value = 'All';
  selectedSatelliteSource.value = 'All';
  selectedBuyer.value = 'All';
  showToast('Filters reset to default view.');
};

const handleExport = () => {
  const csvRows = [
    [
      'Project ID',
      'Name',
      'Country',
      'Credit Type',
      'Registry',
      'Status',
      'Risk Tier',
      'Risk Score',
      'Credits',
      'Confidence',
    ],
    ...filteredProjects.value.map((p) => [
      p.id,
      `"${p.name}"`,
      p.country,
      p.creditType,
      p.registry,
      p.status,
      p.riskTier,
      p.riskScore,
      p.credits,
      `${p.confidence}%`,
    ]),
  ];
  const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'carbon_watchdog_watchlist.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Exported ${filteredProjects.value.length} projects to carbon_watchdog_watchlist.csv`);
};

// Add to Watchlist modal simulation
const addModalOpen = ref(false);
const newProjectName = ref('');
const newProjectCountry = ref('');
const newProjectRegistryId = ref('');
const handleAddProject = () => {
  if (!newProjectName.value) return;
  showToast(`Target "${newProjectName.value}" added to satellite observation queue.`);
  addModalOpen.value = false;
  newProjectName.value = '';
};
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- Top Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 dark:border-white/10 pb-5"
    >
      <div>
        <div class="flex items-center gap-2">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-800 dark:text-emerald-300 uppercase tracking-widest"
          >
            Target Watchlist
          </Badge>
          <span class="text-xs font-mono text-muted-foreground"
            >Institutional Exposure Shortlist</span
          >
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-foreground dark:text-white font-sans mt-1">
          High-Liability Project Watchlist
        </h1>
        <p class="text-xs text-muted-foreground max-w-2xl mt-1">
          Prioritize target projects tied to named buyer exposure, public scrutiny, or active
          satellite degradation signals.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="border-border/80 dark:border-white/15 bg-card/60 dark:bg-white/5 text-foreground dark:text-slate-300 hover:bg-muted text-xs font-mono gap-1.5"
          @click="handleExport"
        >
          <Download class="h-3.5 w-3.5" />
          Export CSV
        </Button>
        <Button
          type="button"
          size="sm"
          class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase gap-1.5 shadow-lg"
          @click="addModalOpen = true"
        >
          <Plus class="h-3.5 w-3.5" />
          Add To Watchlist
        </Button>
      </div>
    </div>

    <!-- FILTER CONTROLS BAR -->
    <Card
      class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
    >
      <CardContent class="p-4 sm:p-5 space-y-4">
        <!-- Search and Reset -->
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div class="relative flex-1">
            <Search
              class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2"
            />
            <Input
              v-model="searchTerm"
              placeholder="Search projects, countries, registry IDs, corporate buyers..."
              class="pl-9 border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs placeholder:text-muted-foreground"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="text-xs font-mono text-muted-foreground hover:text-foreground dark:hover:text-white gap-1"
            @click="resetFilters"
          >
            <RotateCcw class="h-3.5 w-3.5" />
            Reset Filters
          </Button>
        </div>

        <!-- 7-Filter Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs font-mono">
          <!-- Credit Type -->
          <div class="space-y-1">
            <label class="text-[10px] uppercase text-muted-foreground">Credit Type</label>
            <Select v-model="selectedCreditType">
              <SelectTrigger
                size="sm"
                class="w-full h-8 px-2 rounded-lg border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
              >
                <SelectValue placeholder="Credit Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="t in creditTypes"
                  :key="t"
                  :value="t"
                >
                  {{ t }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Risk Tier -->
          <div class="space-y-1">
            <label class="text-[10px] uppercase text-muted-foreground">Risk Tier</label>
            <Select v-model="selectedRiskTier">
              <SelectTrigger
                size="sm"
                class="w-full h-8 px-2 rounded-lg border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs capitalize"
              >
                <SelectValue placeholder="Risk Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="r in riskTiers"
                  :key="r"
                  :value="r"
                >
                  {{ r }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Status -->
          <div class="space-y-1">
            <label class="text-[10px] uppercase text-muted-foreground">Status</label>
            <Select v-model="selectedStatus">
              <SelectTrigger
                size="sm"
                class="w-full h-8 px-2 rounded-lg border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="s in statuses"
                  :key="s"
                  :value="s"
                >
                  {{ s }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Country -->
          <div class="space-y-1">
            <label class="text-[10px] uppercase text-muted-foreground">Country</label>
            <Select v-model="selectedCountry">
              <SelectTrigger
                size="sm"
                class="w-full h-8 px-2 rounded-lg border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
              >
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="c in countries"
                  :key="c"
                  :value="c"
                >
                  {{ c }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Registry -->
          <div class="space-y-1">
            <label class="text-[10px] uppercase text-muted-foreground">Registry</label>
            <Select v-model="selectedRegistry">
              <SelectTrigger
                size="sm"
                class="w-full h-8 px-2 rounded-lg border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
              >
                <SelectValue placeholder="Registry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="reg in registries"
                  :key="reg"
                  :value="reg"
                >
                  {{ reg }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Corporate Buyer -->
          <div class="space-y-1">
            <label class="text-[10px] uppercase text-muted-foreground">Buyer</label>
            <Select v-model="selectedBuyer">
              <SelectTrigger
                size="sm"
                class="w-full h-8 px-2 rounded-lg border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
              >
                <SelectValue placeholder="Buyer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="b in buyersList"
                  :key="b"
                  :value="b"
                >
                  {{ b }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Satellite Source -->
          <div class="space-y-1">
            <label class="text-[10px] uppercase text-muted-foreground">Satellite Sensor</label>
            <Select v-model="selectedSatelliteSource">
              <SelectTrigger
                size="sm"
                class="w-full h-8 px-2 rounded-lg border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
              >
                <SelectValue placeholder="Satellite Sensor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="sat in satelliteSources"
                  :key="sat"
                  :value="sat"
                >
                  {{ sat }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- PRIORITY QUEUE CARDS (FIRST 3) -->
    <section class="space-y-3">
      <div class="flex items-center justify-between text-xs font-mono">
        <span
          class="text-foreground dark:text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5"
        >
          <AlertTriangle class="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
          Priority Triage Queue (Top Scrutiny Targets)
        </span>
        <span class="text-muted-foreground"
          >Showing top {{ priorityQueue.length }} of {{ filteredProjects.length }}</span
        >
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="p in priorityQueue"
          :key="p.id"
          class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 hover:bg-card/100 dark:hover:bg-slate-900/80 hover:border-emerald-500/40 transition cursor-pointer group shadow-lg space-y-3"
          @click="openProjectDossier(p)"
        >
          <div class="flex items-center justify-between">
            <Badge
              variant="outline"
              :class="[
                p.riskTier === 'critical'
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                  : p.riskTier === 'high'
                    ? 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                    : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
                'font-mono text-[10px] uppercase flex items-center gap-1',
              ]"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="
                  p.riskTier === 'critical' || p.riskTier === 'high'
                    ? 'bg-rose-500 animate-ping'
                    : 'bg-emerald-500 dark:bg-emerald-400'
                "
              ></span>
              {{ p.riskTier }} • {{ p.status }}
            </Badge>
            <span class="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold"
              >{{ p.confidence }}% CONF</span
            >
          </div>

          <div>
            <h3
              class="text-base font-bold text-foreground dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition font-sans truncate"
            >
              {{ p.name }}
            </h3>
            <p class="text-xs text-muted-foreground font-mono mt-0.5">
              {{ p.country }} • {{ p.registryId }}
            </p>
          </div>

          <div
            class="p-2.5 rounded-xl bg-muted/60 dark:bg-black/40 border border-border/60 dark:border-white/5 font-mono text-[11px] space-y-1"
          >
            <div class="flex justify-between text-muted-foreground">
              <span>Exposure:</span>
              <strong class="text-rose-600 dark:text-rose-400">{{
                formatCurrency(p.financialExposure)
              }}</strong>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Top Buyer:</span>
              <strong class="text-sky-700 dark:text-cyan-300 truncate max-w-[140px]">{{
                p.buyers[0] || 'Unmapped'
              }}</strong>
            </div>
          </div>

          <div
            class="pt-2 border-t border-border/50 dark:border-white/5 flex items-center justify-between text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold"
          >
            <span>View Full Dossier</span>
            <ExternalLink class="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
          </div>
        </div>
      </div>
    </section>

    <!-- FULL TARGET MATRIX LIST -->
    <section class="space-y-3">
      <div class="flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span class="uppercase tracking-wider"
          >Filtered Targets Matrix ({{ filteredProjects.length }})</span
        >
        <div class="flex items-center gap-2">
          <span>Sort By:</span>
          <button
            type="button"
            class="text-foreground dark:text-white hover:text-emerald-600 dark:hover:text-emerald-300 font-semibold"
            @click="
              sortBy = 'riskScore';
              sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            "
          >
            Risk Score
          </button>
          <span>•</span>
          <button
            type="button"
            class="text-muted-foreground hover:text-foreground dark:hover:text-white"
            @click="
              sortBy = 'name';
              sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            "
          >
            Name
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <div
          v-for="p in filteredProjects"
          :key="p.id"
          class="p-4 rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 hover:bg-card/100 dark:hover:bg-slate-900/80 hover:border-emerald-500/40 transition cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono shadow-xs"
          @click="openProjectDossier(p)"
        >
          <div class="min-w-0 flex-1 space-y-1">
            <div class="flex items-center gap-2">
              <span
                class="h-2 w-2 rounded-full shrink-0"
                :class="
                  p.riskTier === 'critical'
                    ? 'bg-rose-500 animate-ping'
                    : p.riskTier === 'high'
                      ? 'bg-amber-500'
                      : p.riskTier === 'medium'
                        ? 'bg-yellow-400'
                        : 'bg-emerald-400'
                "
              ></span>
              <h4
                class="text-sm font-bold text-foreground dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition font-sans truncate"
              >
                {{ p.name }}
              </h4>
              <Badge
                variant="outline"
                class="border-border/70 dark:border-white/10 bg-muted/50 dark:bg-white/5 text-muted-foreground text-[10px]"
              >
                {{ p.creditType }}
              </Badge>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-muted-foreground text-[11px]">
              <span>{{ p.country }}</span>
              <span>•</span>
              <span class="text-foreground/80 dark:text-slate-300">{{ p.registryId }}</span>
              <span>•</span>
              <span>Buyers: {{ p.buyers.join(', ') }}</span>
            </div>
          </div>

          <div class="flex items-center justify-between md:justify-end gap-6 shrink-0">
            <div class="text-left md:text-right">
              <span class="text-muted-foreground/80 block text-[10px] uppercase"
                >Issued Credits</span
              >
              <strong class="text-foreground dark:text-white text-sm">{{
                formatNumber(p.credits)
              }}</strong>
            </div>

            <div class="text-left md:text-right">
              <span class="text-muted-foreground/80 block text-[10px] uppercase">Exposure</span>
              <strong class="text-rose-600 dark:text-rose-400 text-sm">{{
                formatCurrency(p.financialExposure)
              }}</strong>
            </div>

            <div class="text-right">
              <Badge
                variant="outline"
                :class="[
                  p.riskTier === 'critical'
                    ? 'border-rose-500/40 text-rose-700 dark:text-rose-300'
                    : p.riskTier === 'high'
                      ? 'border-amber-500/40 text-amber-700 dark:text-amber-300'
                      : 'border-emerald-500/40 text-emerald-800 dark:text-emerald-300',
                  'uppercase text-[10px]',
                ]"
              >
                {{ p.status }}
              </Badge>
            </div>

            <ExternalLink
              class="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ADD TO WATCHLIST MODAL DIALOG -->
    <Teleport to="body">
      <div
        v-if="addModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
      >
        <div
          class="w-full max-w-md p-6 rounded-2xl border border-border/80 dark:border-white/15 bg-card dark:bg-slate-950 text-foreground dark:text-slate-100 shadow-2xl space-y-4 font-mono text-xs"
        >
          <div
            class="flex items-center justify-between border-b border-border/70 dark:border-white/10 pb-3"
          >
            <h3 class="text-base font-bold text-foreground dark:text-white font-sans">
              Add Target Project to Watchlist
            </h3>
            <button
              type="button"
              class="text-muted-foreground hover:text-foreground dark:hover:text-white"
              @click="addModalOpen = false"
            >
              ✕
            </button>
          </div>

          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-muted-foreground uppercase text-[10px]">Project Name</label>
              <Input
                v-model="newProjectName"
                placeholder="e.g. Borneo Peatland Conservation"
                class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900 text-foreground dark:text-white font-mono text-xs"
              />
            </div>
            <div class="space-y-1">
              <label class="text-muted-foreground uppercase text-[10px]">Country</label>
              <Input
                v-model="newProjectCountry"
                placeholder="e.g. Indonesia"
                class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900 text-foreground dark:text-white font-mono text-xs"
              />
            </div>
            <div class="space-y-1">
              <label class="text-muted-foreground uppercase text-[10px]">Registry Serial ID</label>
              <Input
                v-model="newProjectRegistryId"
                placeholder="e.g. VCS-3301"
                class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900 text-foreground dark:text-white font-mono text-xs"
              />
            </div>
          </div>

          <div
            class="flex items-center justify-end gap-2 pt-2 border-t border-border/70 dark:border-white/10"
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              class="border-border/70 dark:border-white/10 text-xs"
              @click="addModalOpen = false"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              @click="handleAddProject"
            >
              Add Target
            </Button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
