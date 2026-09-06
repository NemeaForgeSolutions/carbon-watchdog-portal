<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  MapPin,
  Search,
} from 'lucide-vue-next';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CARBON_PROJECTS } from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { PORTFOLIO_PAGE_SIZE } from '@/constants';

const { openProjectDossier, showToast, formatNumber } = useCarbonDossier();

// Table controls
const searchTerm = ref('');
const selectedRisk = ref<string>('All');
const selectedCreditType = ref<string>('All');

// Sorting
type SortField =
  'name' | 'country' | 'creditType' | 'credits' | 'riskScore' | 'confidence' | 'lastObservation';
const sortBy = ref<SortField>('riskScore');
const sortDirection = ref<'asc' | 'desc'>('desc');

// Selection
const selectedIds = ref<Set<string>>(new Set());

// Pagination
const currentPage = ref(1);
const pageSize = ref(PORTFOLIO_PAGE_SIZE);

const toggleSort = (field: SortField) => {
  if (sortBy.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortDirection.value = 'desc';
  }
};

const toggleSelectAll = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    selectedIds.value = new Set(filteredProjects.value.map((p) => p.id));
  } else {
    selectedIds.value.clear();
  }
};

const toggleSelectRow = (id: string) => {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id);
  } else {
    selectedIds.value.add(id);
  }
};

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
    if (selectedRisk.value !== 'All' && p.riskTier !== selectedRisk.value) return false;
    if (selectedCreditType.value !== 'All' && p.creditType !== selectedCreditType.value)
      return false;
    return true;
  }).sort((a, b) => {
    let result = 0;
    if (sortBy.value === 'riskScore') result = a.riskScore - b.riskScore;
    else if (sortBy.value === 'name') result = a.name.localeCompare(b.name);
    else if (sortBy.value === 'country') result = a.country.localeCompare(b.country);
    else if (sortBy.value === 'creditType') result = a.creditType.localeCompare(b.creditType);
    else if (sortBy.value === 'credits') result = a.credits - b.credits;
    else if (sortBy.value === 'confidence') result = a.confidence - b.confidence;
    else if (sortBy.value === 'lastObservation')
      result = a.lastObservation.localeCompare(b.lastObservation);
    return sortDirection.value === 'desc' ? -result : result;
  });
});

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / pageSize.value));

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredProjects.value.slice(start, start + pageSize.value);
});

const handleExportSelected = () => {
  const targets = filteredProjects.value.filter(
    (p) => selectedIds.value.size === 0 || selectedIds.value.has(p.id),
  );
  showToast(`Exported ${targets.length} portfolio records to institutional telemetry CSV.`);
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
            Institutional Data Table
          </Badge>
          <span class="text-xs font-mono text-muted-foreground">Carbon Credit Master Ledger</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-foreground dark:text-white font-sans mt-1">
          Portfolio Asset Surveillance
        </h1>
        <p class="text-xs text-muted-foreground max-w-2xl mt-1">
          High-density institutional ledger displaying satellite sensor integrity, registry serials,
          and corporate buyer assignments.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="border-border/80 dark:border-white/15 bg-card/60 dark:bg-white/5 text-foreground dark:text-slate-300 hover:bg-muted text-xs font-mono gap-1.5"
          @click="handleExportSelected"
        >
          <Download class="h-3.5 w-3.5" />
          Export {{ selectedIds.size > 0 ? `(${selectedIds.size})` : 'All' }}
        </Button>
      </div>
    </div>

    <!-- Filters & Table Controls -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="relative flex-1 max-w-md">
        <Search class="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          v-model="searchTerm"
          placeholder="Filter portfolio by project, location, serial ID, or buyer..."
          class="pl-9 border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs placeholder:text-muted-foreground"
        />
      </div>

      <div class="flex items-center gap-2 text-xs font-mono">
        <Select v-model="selectedRisk">
          <SelectTrigger
            class="w-[150px] h-9 px-3 rounded-xl border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs capitalize"
          >
            <SelectValue placeholder="All Risk Tiers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All"> All Risk Tiers </SelectItem>
            <SelectItem value="critical"> Critical </SelectItem>
            <SelectItem value="high"> High </SelectItem>
            <SelectItem value="medium"> Medium </SelectItem>
            <SelectItem value="low"> Low </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedCreditType">
          <SelectTrigger
            class="w-[180px] h-9 px-3 rounded-xl border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-foreground dark:text-slate-200 text-xs"
          >
            <SelectValue placeholder="All Credit Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All"> All Credit Types </SelectItem>
            <SelectItem value="Avoided Deforestation"> Avoided Deforestation </SelectItem>
            <SelectItem value="Peatland"> Peatland </SelectItem>
            <SelectItem value="Agroforestry"> Agroforestry </SelectItem>
            <SelectItem value="Reforestation"> Reforestation </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- INSTITUTIONAL GRADE DATA TABLE -->
    <div
      class="rounded-2xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl overflow-hidden shadow-2xl"
    >
      <Table class="font-mono text-xs">
        <TableHeader>
          <TableRow
            class="border-b border-border/70 dark:border-white/10 bg-muted/60 dark:bg-slate-900/80 hover:bg-muted/60 text-muted-foreground text-[10px] uppercase tracking-wider"
          >
            <TableHead class="p-3.5 w-8">
              <input
                type="checkbox"
                class="h-3.5 w-3.5 accent-emerald-500 rounded"
                :checked="
                  selectedIds.size === filteredProjects.length && filteredProjects.length > 0
                "
                @change="toggleSelectAll"
              />
            </TableHead>
            <TableHead
              class="p-3.5 cursor-pointer hover:text-foreground dark:hover:text-white transition"
              @click="toggleSort('name')"
            >
              <div class="flex items-center gap-1.5">
                <span>Project</span>
                <ArrowUpDown class="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead
              class="p-3.5 cursor-pointer hover:text-foreground dark:hover:text-white transition"
              @click="toggleSort('country')"
            >
              <div class="flex items-center gap-1.5">
                <span>Location</span>
                <ArrowUpDown class="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead class="p-3.5"> Credit Type </TableHead>
            <TableHead class="p-3.5"> Registry ID </TableHead>
            <TableHead class="p-3.5"> Buyer </TableHead>
            <TableHead
              class="p-3.5 text-right cursor-pointer hover:text-foreground dark:hover:text-white transition"
              @click="toggleSort('credits')"
            >
              <div class="flex items-center justify-end gap-1.5">
                <span>Credits</span>
                <ArrowUpDown class="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead
              class="p-3.5 cursor-pointer hover:text-foreground dark:hover:text-white transition"
              @click="toggleSort('riskScore')"
            >
              <div class="flex items-center gap-1.5">
                <span>Risk</span>
                <ArrowUpDown class="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead class="p-3.5"> Satellite Status </TableHead>
            <TableHead
              class="p-3.5 text-right cursor-pointer hover:text-foreground dark:hover:text-white transition"
              @click="toggleSort('confidence')"
            >
              <div class="flex items-center justify-end gap-1.5">
                <span>Confidence</span>
                <ArrowUpDown class="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead class="p-3.5"> Last Observation </TableHead>
            <TableHead class="p-3.5 text-right"> Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="divide-y divide-border/50 dark:divide-white/5">
          <TableRow
            v-for="p in paginatedProjects"
            :key="p.id"
            class="hover:bg-muted/40 dark:hover:bg-slate-900/70 transition cursor-pointer group border-b border-border/50 dark:border-white/5"
            :class="selectedIds.has(p.id) ? 'bg-emerald-500/10 dark:bg-emerald-950/20' : ''"
            @click="openProjectDossier(p)"
          >
            <!-- Checkbox -->
            <TableCell
              class="p-3.5"
              @click.stop
            >
              <input
                type="checkbox"
                class="h-3.5 w-3.5 accent-emerald-500 rounded"
                :checked="selectedIds.has(p.id)"
                @change="toggleSelectRow(p.id)"
              />
            </TableCell>

            <!-- Project Name -->
            <TableCell
              class="p-3.5 font-bold text-foreground dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 font-sans transition"
            >
              {{ p.name }}
            </TableCell>

            <!-- Location -->
            <TableCell class="p-3.5 text-muted-foreground">
              <div class="flex items-center gap-1">
                <MapPin class="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{{ p.country }}</span>
              </div>
            </TableCell>

            <!-- Credit Type -->
            <TableCell class="p-3.5 text-muted-foreground">
              <span
                class="border border-border/70 dark:border-white/10 bg-muted/50 dark:bg-white/5 px-2 py-0.5 rounded text-[10px]"
              >
                {{ p.creditType }}
              </span>
            </TableCell>

            <!-- Registry ID -->
            <TableCell class="p-3.5 text-foreground/80 dark:text-slate-300 font-mono text-[11px]">
              {{ p.registryId }}
            </TableCell>

            <!-- Corporate Buyer -->
            <TableCell
              class="p-3.5 text-sky-700 dark:text-cyan-300 font-semibold truncate max-w-[140px]"
            >
              {{ p.buyers[0] || 'Unassigned' }}
            </TableCell>

            <!-- Credits Issued -->
            <TableCell class="p-3.5 text-right font-bold text-foreground dark:text-white">
              {{ formatNumber(p.credits) }}
            </TableCell>

            <!-- Risk Badge with Animated Status Dot -->
            <TableCell class="p-3.5">
              <Badge
                variant="outline"
                :class="[
                  p.riskTier === 'critical'
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                    : p.riskTier === 'high'
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                      : p.riskTier === 'medium'
                        ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300'
                        : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
                  'font-mono uppercase text-[10px] inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full',
                ]"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="
                    p.riskTier === 'critical'
                      ? 'bg-rose-500 animate-ping'
                      : p.riskTier === 'high'
                        ? 'bg-amber-500 dark:bg-amber-400 animate-pulse'
                        : 'bg-emerald-500 dark:bg-emerald-400'
                  "
                ></span>
                {{ p.riskTier }}
              </Badge>
            </TableCell>

            <!-- Satellite Status -->
            <TableCell class="p-3.5">
              <span
                class="text-[10px] px-2 py-0.5 rounded font-semibold"
                :class="
                  p.status === 'Investigation' || p.status === 'Escalated Review'
                    ? 'text-rose-700 dark:text-rose-300 bg-rose-500/15 dark:bg-rose-950/40 border border-rose-500/30'
                    : 'text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 dark:bg-emerald-950/40 border border-emerald-500/30'
                "
              >
                {{ p.status }}
              </span>
            </TableCell>

            <!-- Confidence -->
            <TableCell class="p-3.5 text-right font-bold text-emerald-700 dark:text-emerald-400">
              {{ p.confidence }}%
            </TableCell>

            <!-- Last Observation -->
            <TableCell class="p-3.5 text-muted-foreground text-[11px] truncate max-w-[120px]">
              {{ p.lastObservation.split('T')[0] }}
            </TableCell>

            <!-- Action -->
            <TableCell
              class="p-3.5 text-right"
              @click.stop
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                class="h-7 px-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-white hover:bg-emerald-500/10 text-[11px] gap-1 font-semibold"
                @click="openProjectDossier(p)"
              >
                <span>Dossier</span>
                <ExternalLink class="h-3 w-3" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <!-- Pagination Footer -->
      <div
        class="p-4 border-t border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground"
      >
        <div>
          Showing {{ paginatedProjects.length }} of {{ filteredProjects.length }} assets
          <span
            v-if="selectedIds.size > 0"
            class="ml-2 text-emerald-700 dark:text-emerald-400 font-bold"
          >
            ({{ selectedIds.size }} selected)
          </span>
        </div>

        <div class="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="h-8 border-border/70 dark:border-white/10 text-xs gap-1 text-foreground dark:text-white"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <ChevronLeft class="h-3.5 w-3.5" />
            Previous
          </Button>
          <span>Page {{ currentPage }} of {{ totalPages || 1 }}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="h-8 border-border/70 dark:border-white/10 text-xs gap-1 text-foreground dark:text-white"
            :disabled="currentPage >= totalPages"
            @click="currentPage++"
          >
            Next
            <ChevronRight class="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
