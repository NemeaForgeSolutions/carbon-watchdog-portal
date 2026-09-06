<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Orbit, Search, Shield, X } from 'lucide-vue-next';
import { CARBON_BUYERS, CARBON_PROJECTS, REGULATORY_FRAMEWORKS } from '@/data/carbonData';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { GLOBAL_SEARCH_CONSTANTS } from '@/constants';

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const router = useRouter();
const query = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const { openProjectDossier, openBuyerDossier } = useCarbonDossier();

const filteredProjects = computed(() => {
  if (!query.value.trim())
    return CARBON_PROJECTS.slice(0, GLOBAL_SEARCH_CONSTANTS.defaultProjectLimit);
  const q = query.value.toLowerCase();
  return CARBON_PROJECTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      p.registryId.toLowerCase().includes(q) ||
      p.creditType.toLowerCase().includes(q),
  );
});

const filteredBuyers = computed(() => {
  if (!query.value.trim()) return CARBON_BUYERS.slice(0, GLOBAL_SEARCH_CONSTANTS.defaultBuyerLimit);
  const q = query.value.toLowerCase();
  return CARBON_BUYERS.filter(
    (b) => b.name.toLowerCase().includes(q) || b.industry.toLowerCase().includes(q),
  );
});

const filteredRegulations = computed(() => {
  if (!query.value.trim())
    return REGULATORY_FRAMEWORKS.slice(0, GLOBAL_SEARCH_CONSTANTS.defaultRegulationLimit);
  const q = query.value.toLowerCase();
  return REGULATORY_FRAMEWORKS.filter(
    (r) => r.name.toLowerCase().includes(q) || r.authority.toLowerCase().includes(q),
  );
});

const close = () => {
  query.value = '';
  emit('update:open', false);
};

const handleSelectProject = (project: any) => {
  close();
  openProjectDossier(project);
};

const handleSelectBuyer = (buyer: any) => {
  close();
  openBuyerDossier(buyer);
};

const handleSelectRegulation = () => {
  close();
  router.push('/compliance');
};

const onKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    emit('update:open', !props.open);
  } else if (e.key === 'Escape' && props.open) {
    close();
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 dark:bg-black/80 backdrop-blur-md"
      @click.self="close"
    >
      <div
        class="w-full max-w-2xl rounded-2xl border border-border/80 dark:border-white/10 bg-card dark:bg-slate-950 text-foreground dark:text-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <!-- Search Input Header -->
        <div
          class="p-4 border-b border-border/70 dark:border-white/10 flex items-center gap-3 bg-muted/40 dark:bg-slate-900/60"
        >
          <Search class="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Search projects, corporate buyers, registries, or regulations..."
            class="flex-1 bg-transparent border-0 text-sm sm:text-base text-foreground dark:text-white placeholder:text-muted-foreground focus:outline-none focus:ring-0"
            autofocus
          />
          <span
            class="text-[10px] font-mono text-muted-foreground border border-border/70 dark:border-white/10 bg-card/60 dark:bg-white/5 px-2 py-0.5 rounded"
          >
            ESC to close
          </span>
          <button
            type="button"
            class="text-muted-foreground hover:text-foreground dark:hover:text-white p-1 rounded"
            aria-label="Close search"
            @click="close"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <!-- Search Results List -->
        <div class="overflow-y-auto p-4 space-y-5 flex-1">
          <!-- Monitored Projects -->
          <div>
            <div
              class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between"
            >
              <span>Monitored Carbon Projects</span>
              <span>{{ filteredProjects.length }} results</span>
            </div>
            <div class="space-y-1">
              <button
                v-for="p in filteredProjects"
                :key="p.id"
                type="button"
                class="w-full text-left p-2.5 rounded-xl hover:bg-muted/70 dark:hover:bg-slate-900 border border-transparent hover:border-border/70 dark:hover:border-white/10 flex items-center justify-between transition group"
                @click="handleSelectProject(p)"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                    :class="
                      p.riskTier === 'critical' || p.riskTier === 'high'
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                        : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                    "
                  >
                    <Orbit class="h-4 w-4" />
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm font-semibold text-foreground dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 block truncate"
                    >
                      {{ p.name }}
                    </span>
                    <span class="text-xs text-muted-foreground font-mono">
                      {{ p.country }} • {{ p.registryId }} • {{ p.creditType }}
                    </span>
                  </div>
                </div>

                <div class="text-right shrink-0">
                  <span
                    class="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full"
                    :class="
                      p.riskTier === 'critical'
                        ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                        : p.riskTier === 'high'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                          : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                    "
                  >
                    {{ p.riskTier }}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <!-- Monitored Corporate Buyers -->
          <div>
            <div
              class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between"
            >
              <span>Corporate Buyers & Exposure</span>
              <span>{{ filteredBuyers.length }} results</span>
            </div>
            <div class="space-y-1">
              <button
                v-for="b in filteredBuyers"
                :key="b.id"
                type="button"
                class="w-full text-left p-2.5 rounded-xl hover:bg-muted/70 dark:hover:bg-slate-900 border border-transparent hover:border-border/70 dark:hover:border-white/10 flex items-center justify-between transition group"
                @click="handleSelectBuyer(b)"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="h-8 w-8 rounded-lg bg-sky-500/20 text-sky-700 dark:text-cyan-300 flex items-center justify-center font-mono font-bold text-xs shrink-0"
                  >
                    {{ b.initials }}
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm font-semibold text-foreground dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 block truncate"
                    >
                      {{ b.name }}
                    </span>
                    <span class="text-xs text-muted-foreground font-mono">
                      {{ b.industry }} • Exposure: ${{
                        (b.financialExposure / 1000000).toFixed(1)
                      }}M
                    </span>
                  </div>
                </div>

                <div class="text-right shrink-0">
                  <span class="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                    {{ b.highRiskPercentage }}% High Risk
                  </span>
                </div>
              </button>
            </div>
          </div>

          <!-- Compliance & Regulations -->
          <div>
            <div class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Compliance Frameworks
            </div>
            <div class="space-y-1">
              <button
                v-for="r in filteredRegulations"
                :key="r.id"
                type="button"
                class="w-full text-left p-2.5 rounded-xl hover:bg-muted/70 dark:hover:bg-slate-900 border border-transparent hover:border-border/70 dark:hover:border-white/10 flex items-center justify-between transition group"
                @click="handleSelectRegulation"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="h-8 w-8 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0"
                  >
                    <Shield class="h-4 w-4" />
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm font-semibold text-foreground dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 block truncate"
                    >
                      {{ r.name }}
                    </span>
                    <span class="text-xs text-muted-foreground font-mono">
                      {{ r.authority }} • {{ r.effectiveDate }}
                    </span>
                  </div>
                </div>

                <span class="text-[10px] font-mono text-muted-foreground">
                  {{ r.status }}
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer Shortcuts -->
        <div
          class="p-3 border-t border-white/10 bg-slate-900/40 text-[11px] font-mono text-slate-400 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <span>Press <strong class="text-white">↵</strong> to select</span>
            <span>Press <strong class="text-white">↑↓</strong> to navigate</span>
          </div>
          <span>Carbon Watchdog Global Telemetry Search</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
