<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { ChevronLeft, ChevronRight, Orbit, ShieldCheck } from 'lucide-vue-next';

import { SIDEBAR_NAV_GROUPS } from '@/constants';

defineProps<{
  collapsed: boolean;
}>();

const emit = defineEmits<{
  'update:collapsed': [value: boolean];
}>();

const route = useRoute();
const userMenuOpen = ref(false);

const navGroups = SIDEBAR_NAV_GROUPS;
</script>

<template>
  <aside
    :class="[
      'h-full w-full flex flex-col border-r border-border/70 dark:border-white/10 bg-card/90 dark:bg-[#040907]/95 backdrop-blur-2xl transition-all duration-300 select-none shadow-xl dark:shadow-2xl text-foreground overflow-hidden',
      collapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Brand Header -->
    <div
      class="h-16 flex items-center justify-between px-3.5 border-b border-border/70 dark:border-white/10 shrink-0"
    >
      <RouterLink
        to="/"
        class="flex items-center gap-2.5 min-w-0 group"
      >
        <div
          class="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-sky-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20 shrink-0 transition-transform duration-300 group-hover:scale-105"
        >
          <Orbit class="h-5 w-5" />
        </div>
        <div
          v-if="!collapsed"
          class="min-w-0"
        >
          <span
            class="text-sm font-black tracking-tight text-foreground dark:text-white block truncate font-sans"
          >
            CARBON WATCHDOG
          </span>
          <span
            class="text-[9px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block font-semibold"
          >
            Climate Intel OS
          </span>
        </div>
      </RouterLink>

      <button
        type="button"
        class="h-7 w-7 rounded-lg border border-border/70 dark:border-white/10 text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-white/10 flex items-center justify-center transition"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="emit('update:collapsed', !collapsed)"
      >
        <ChevronRight
          v-if="collapsed"
          class="h-4 w-4"
        />
        <ChevronLeft
          v-else
          class="h-4 w-4"
        />
      </button>
    </div>

    <!-- Navigation Scroll Area -->
    <div class="flex-1 overflow-y-auto px-2 py-4 space-y-5">
      <div
        v-for="group in navGroups"
        :key="group.title"
        class="space-y-1"
      >
        <div
          v-if="!collapsed"
          class="px-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/80 dark:text-slate-500 mb-1"
        >
          {{ group.title }}
        </div>

        <div class="space-y-0.5">
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            :class="[
              'group flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 relative',
              route.path === item.to
                ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-500/30 shadow-xs'
                : 'text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted/80 dark:hover:bg-white/[0.04]',
              collapsed ? 'justify-center' : '',
            ]"
            :title="collapsed ? item.label : undefined"
          >
            <component
              :is="item.icon"
              class="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
              :class="
                route.path === item.to
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-muted-foreground group-hover:text-foreground dark:group-hover:text-white'
              "
            />
            <span
              v-if="!collapsed"
              class="truncate"
            >
              {{ item.label }}
            </span>

            <!-- Active Indicator Pill -->
            <span
              v-if="route.path === item.to"
              class="absolute right-2 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
            ></span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Bottom Status & Telemetry -->
    <div
      class="p-2.5 border-t border-border/70 dark:border-white/10 shrink-0 space-y-2 bg-muted/40 dark:bg-black/40"
    >
      <!-- Status Readout -->
      <div
        class="p-2 rounded-xl border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono flex items-center gap-2"
        :class="collapsed ? 'justify-center' : ''"
      >
        <span
          class="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shrink-0"
        ></span>
        <div
          v-if="!collapsed"
          class="min-w-0"
        >
          <span
            class="font-bold block text-[10px] tracking-wider uppercase text-emerald-800 dark:text-emerald-300"
          >
            SATELLITE FEEDS NOMINAL
          </span>
          <span class="text-[9px] text-emerald-700/90 dark:text-emerald-400/80 block">
            Orbit Sync: 100% Active
          </span>
        </div>
      </div>

      <!-- User Menu / Workspace Switcher -->
      <div class="relative">
        <button
          type="button"
          class="w-full p-1.5 rounded-xl border border-border/70 dark:border-white/10 hover:border-border dark:hover:border-white/20 bg-card/80 dark:bg-slate-900/60 hover:bg-card dark:hover:bg-slate-900 flex items-center gap-2 text-left transition shadow-xs"
          :class="collapsed ? 'justify-center' : ''"
          @click="userMenuOpen = !userMenuOpen"
        >
          <div
            class="h-7 w-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-xs shrink-0"
          >
            EV
          </div>
          <div
            v-if="!collapsed"
            class="min-w-0 flex-1"
          >
            <span class="text-xs font-bold text-foreground dark:text-white block truncate">
              Dr. Elena Vance
            </span>
            <span class="text-[10px] text-muted-foreground font-mono block truncate">
              Chief Risk Officer
            </span>
          </div>
        </button>

        <!-- Dropdown menu -->
        <div
          v-if="userMenuOpen"
          class="absolute bottom-12 left-0 right-0 p-1.5 rounded-xl border border-border dark:border-white/15 bg-popover dark:bg-slate-950 shadow-2xl text-xs font-mono space-y-1 z-50 backdrop-blur-xl text-foreground"
        >
          <div class="p-2 border-b border-border/70 dark:border-white/10 text-[11px]">
            <span class="text-muted-foreground block">Workspace:</span>
            <strong class="text-foreground dark:text-white">Global Carbon Holdings</strong>
          </div>
          <RouterLink
            to="/settings"
            class="flex items-center gap-2 p-2 rounded-lg text-foreground/80 hover:text-foreground dark:text-slate-300 dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
            @click="userMenuOpen = false"
          >
            <Settings class="h-3.5 w-3.5" />
            <span>Workspace Settings</span>
          </RouterLink>
          <RouterLink
            to="/pricing"
            class="flex items-center gap-2 p-2 rounded-lg text-foreground/80 hover:text-foreground dark:text-slate-300 dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
            @click="userMenuOpen = false"
          >
            <ShieldCheck class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Enterprise Plan</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </aside>
</template>
