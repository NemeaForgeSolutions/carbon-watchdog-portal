<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { Bell, Building2, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-vue-next';
import type { ThemeMode } from '../config/theme';
import { APP_HEADER_CONSTANTS } from '@/constants';
import Button from '@/components/ui/button/Button.vue';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { LIVE_RISK_REPORTS } from '@/data/carbonData';

const props = defineProps<{
  immersive?: boolean;
  pageTitle?: string;
  pageDescription?: string;
  themeMode: ThemeMode;
}>();

const emit = defineEmits<{
  'update:themeMode': [value: ThemeMode];
  toggleMobileNav: [];
}>();

const isDark = computed(() => props.themeMode === 'dark');

const toggleTheme = () => {
  emit('update:themeMode', isDark.value ? 'light' : 'dark');
};

const { globalSearchOpen, openProjectDossier } = useCarbonDossier();

const currentWorkspace = ref('Global Carbon Assets • Enterprise');
const workspaceDropdownOpen = ref(false);
const alertsPopoverOpen = ref(false);

const workspaces = APP_HEADER_CONSTANTS.workspaces;

// Live UTC clock
const currentUtcTime = ref('18:42:16 UTC');
let clockTimer: ReturnType<typeof setInterval> | null = null;

const updateClock = () => {
  const now = new Date();
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds = String(now.getUTCSeconds()).padStart(2, '0');
  currentUtcTime.value = `${hours}:${minutes}:${seconds} UTC`;
};

onMounted(() => {
  updateClock();
  clockTimer = setInterval(updateClock, 1000);
});

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer);
});
</script>

<template>
  <header
    class="sticky top-0 z-30 w-full border-b border-border/70 dark:border-white/10 bg-background/85 dark:bg-[#050d0a]/90 backdrop-blur-xl transition-all duration-300"
  >
    <div class="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
      <!-- Left side: Mobile trigger & Workspace Selector -->
      <div class="flex items-center gap-3">
        <!-- Mobile Sidebar Toggle -->
        <button
          type="button"
          class="lg:hidden h-8 w-8 rounded-lg border border-border/70 dark:border-white/10 text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-white/10 flex items-center justify-center transition"
          aria-label="Toggle navigation menu"
          @click="emit('toggleMobileNav')"
        >
          <Menu class="h-4 w-4" />
        </button>

        <!-- Workspace Selector Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-900/60 hover:bg-card dark:hover:bg-slate-900 hover:border-emerald-500/40 text-xs font-mono text-foreground dark:text-slate-200 transition shadow-xs"
            @click="workspaceDropdownOpen = !workspaceDropdownOpen"
          >
            <Building2 class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span class="max-w-[140px] sm:max-w-[220px] truncate font-semibold">{{
              currentWorkspace
            }}</span>
            <ChevronDown class="h-3 w-3 text-muted-foreground" />
          </button>

          <div
            v-if="workspaceDropdownOpen"
            class="absolute top-10 left-0 w-64 p-1 rounded-xl border border-border dark:border-white/15 bg-popover dark:bg-slate-950 shadow-2xl text-xs font-mono z-50 backdrop-blur-2xl text-foreground"
          >
            <div
              class="p-2 border-b border-border/70 dark:border-white/10 text-[10px] text-muted-foreground uppercase tracking-wider"
            >
              Switch Monitored Workspace
            </div>
            <button
              v-for="ws in workspaces"
              :key="ws"
              type="button"
              class="w-full text-left p-2 rounded-lg hover:bg-muted dark:hover:bg-white/10 transition"
              :class="
                currentWorkspace === ws
                  ? 'text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-500/10'
                  : 'text-foreground/80 dark:text-slate-300'
              "
              @click="
                currentWorkspace = ws;
                workspaceDropdownOpen = false;
              "
            >
              {{ ws }}
            </button>
          </div>
        </div>
      </div>

      <!-- Center: Global Quick Search Button -->
      <div class="flex-1 max-w-md hidden md:block">
        <button
          type="button"
          class="w-full h-9 px-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/50 dark:bg-slate-900/40 hover:bg-card dark:hover:bg-slate-900/80 hover:border-emerald-500/40 text-xs text-muted-foreground flex items-center justify-between transition group font-mono shadow-xs"
          @click="globalSearchOpen = true"
        >
          <span class="flex items-center gap-2">
            <Search
              class="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition"
            />
            <span>Search projects, buyers, registries...</span>
          </span>
          <span
            class="border border-border/70 dark:border-white/10 bg-card/60 dark:bg-white/5 px-1.5 py-0.5 rounded text-[10px] text-muted-foreground"
          >
            ⌘K
          </span>
        </button>
      </div>

      <!-- Right Side: Telemetry Readout, Alerts, Theme, Avatar -->
      <div class="flex items-center gap-2.5">
        <!-- Satellite Telemetry Badge -->
        <div
          class="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-mono text-xs"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping"></span>
          <div class="text-left leading-tight">
            <div
              class="text-[9px] uppercase tracking-wider text-emerald-700/80 dark:text-emerald-400/70 font-bold"
            >
              SATELLITE FEED NOMINAL
            </div>
            <div class="text-[10px] text-foreground dark:text-white font-bold">
              LAST SYNC {{ currentUtcTime }}
            </div>
          </div>
        </div>

        <!-- Global Search Button (Mobile/Tablet) -->
        <button
          type="button"
          class="md:hidden h-8 w-8 rounded-lg border border-border/70 dark:border-white/10 text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-white/10 flex items-center justify-center transition"
          aria-label="Open global search"
          @click="globalSearchOpen = true"
        >
          <Search class="h-4 w-4" />
        </button>

        <!-- Active Alerts Popover Button -->
        <div class="relative">
          <button
            type="button"
            class="h-8 px-2.5 rounded-lg border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-mono font-bold flex items-center gap-1.5 transition"
            @click="alertsPopoverOpen = !alertsPopoverOpen"
          >
            <Bell class="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
            <span>17</span>
            <span class="hidden sm:inline text-[10px] text-rose-600 dark:text-rose-400 font-normal"
              >(3 Critical)</span
            >
          </button>

          <!-- Alerts Dropdown -->
          <div
            v-if="alertsPopoverOpen"
            class="absolute right-0 top-10 w-80 p-2 rounded-xl border border-border dark:border-white/15 bg-popover dark:bg-slate-950 shadow-2xl text-xs font-mono z-50 backdrop-blur-2xl text-foreground"
          >
            <div
              class="p-2 border-b border-border/70 dark:border-white/10 flex items-center justify-between text-[11px]"
            >
              <span class="font-bold text-rose-600 dark:text-rose-400">17 ACTIVE RISK ALERTS</span>
              <span class="text-muted-foreground text-[10px]">Real-time feed</span>
            </div>
            <div class="py-1 max-h-64 overflow-y-auto space-y-1">
              <div
                v-for="alert in LIVE_RISK_REPORTS.slice(0, 3)"
                :key="alert.id"
                class="p-2 rounded-lg hover:bg-muted dark:hover:bg-white/5 cursor-pointer"
                @click="
                  alertsPopoverOpen = false;
                  openProjectDossier(alert.projectOrBuyer);
                "
              >
                <div class="flex items-center justify-between text-[10px]">
                  <span class="text-rose-600 dark:text-rose-400 font-bold uppercase">{{
                    alert.type
                  }}</span>
                  <span class="text-muted-foreground">{{ alert.timeAgo }}</span>
                </div>
                <div
                  class="text-foreground dark:text-slate-200 font-sans text-xs mt-0.5 font-medium"
                >
                  {{ alert.title }} • {{ alert.projectOrBuyer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Theme Toggle: Single button to toggle between dark and light -->
        <Button
          type="button"
          variant="ghost"
          size="icon"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          class="h-8 w-8 rounded-lg border border-border/70 dark:border-white/10 bg-muted/60 dark:bg-slate-900/60 hover:bg-card dark:hover:bg-slate-800 text-foreground dark:text-slate-200 transition shadow-xs flex items-center justify-center cursor-pointer"
          @click="toggleTheme"
        >
          <Sun
            v-if="isDark"
            class="h-4 w-4 text-amber-400 hover:text-amber-300 transition-transform duration-200 hover:rotate-45"
          />
          <Moon
            v-else
            class="h-4 w-4 text-slate-700 dark:text-slate-300 transition-transform duration-200 hover:-rotate-12"
          />
        </Button>

        <!-- User Avatar -->
        <div
          class="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0"
        >
          EV
        </div>
      </div>
    </div>
  </header>
</template>
