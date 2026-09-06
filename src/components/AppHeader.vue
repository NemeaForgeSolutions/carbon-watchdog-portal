<script setup lang="ts">
import { Menu, Orbit } from '@lucide/vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import type { ThemeMode } from '../config/theme';
import type { NavItem } from '../constants/navigation';
import { APP_HEADER_CONSTANTS, themeOptions } from '@/constants';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Sheet from '@/components/ui/sheet/Sheet.vue';
import SheetContent from '@/components/ui/sheet/SheetContent.vue';

defineProps<{
  immersive: boolean;
  pageTitle: string;
  pageDescription: string;
  primaryNavItems: NavItem[];
  themeMode: ThemeMode;
}>();

const emit = defineEmits<{
  'update:themeMode': [value: ThemeMode];
}>();

const mobileNavOpen = ref(false);
</script>

<template>
  <Card
    :class="[
      'border-border/80 bg-background/84 z-20 backdrop-blur-2xl',
      immersive
        ? 'mx-3 mt-3 rounded-[1.25rem] shadow-[0_18px_48px_rgba(15,23,42,0.16)] sm:mx-6 sm:mt-4 sm:rounded-[1.5rem] lg:mx-8'
        : 'rounded-[1.25rem] shadow-[0_20px_56px_rgba(15,23,42,0.12)] sm:rounded-[1.5rem]',
    ]"
  >
    <CardContent :class="immersive ? 'p-3 sm:p-4 lg:p-5' : 'p-3 sm:p-4 lg:p-5'">
      <div class="flex items-center justify-between gap-2 sm:gap-4">
        <RouterLink to="/" class="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div
            :class="[
              'grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-300 to-sky-200 text-slate-950 shadow-[0_12px_30px_rgba(16,185,129,0.35)] transition-all duration-300 group-hover:shadow-[0_14px_34px_rgba(16,185,129,0.5)] group-hover:scale-105',
              immersive ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-9 w-9 sm:h-11 sm:w-11',
            ]"
          >
            <Orbit class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-700 ease-out group-hover:rotate-180" />
          </div>

          <div class="min-w-0">
            <p
              class="hidden text-[0.6rem] font-bold tracking-[0.22em] text-emerald-600 uppercase dark:text-emerald-400 sm:block"
            >
              {{ APP_HEADER_CONSTANTS.eyebrow }}
            </p>
            <h1
              :class="[
                'text-foreground truncate font-black tracking-[-0.04em] transition-colors duration-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
                immersive ? 'text-base sm:text-xl' : 'text-lg sm:text-2xl',
              ]"
            >
              {{ APP_HEADER_CONSTANTS.brand }}
            </h1>
          </div>
        </RouterLink>

        <nav
          class="hidden flex-1 items-center justify-center gap-1.5 px-3 xl:flex"
          :aria-label="APP_HEADER_CONSTANTS.navAriaLabel"
        >
          <RouterLink
            v-for="item in primaryNavItems"
            :key="item.to"
            :to="item.to"
            :class="[
              'rounded-full border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0',
              item.to === APP_HEADER_CONSTANTS.briefingTo
                ? 'border-emerald-500/40 bg-emerald-500/10 px-4 py-2 font-semibold text-emerald-700 hover:border-emerald-500/60 hover:bg-emerald-500/20 hover:shadow-sm dark:text-emerald-300'
                : 'border-transparent bg-muted/40 px-3 py-2 text-muted-foreground hover:border-emerald-500/30 hover:bg-muted/80 hover:text-foreground hover:shadow-xs',
            ]"
            active-class="!border-emerald-500/40 !bg-emerald-500/15 !text-emerald-700 dark:!text-emerald-300 font-semibold shadow-xs"
            exact-active-class="!border-emerald-500/40 !bg-emerald-500/15 !text-emerald-700 dark:!text-emerald-300 font-semibold shadow-xs"
          >
            {{ item.label }}
          </RouterLink>
        </nav>


        <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <!-- Desktop/tablet multi-option pill -->
          <div
            class="border-border/80 bg-muted/60 hidden items-center gap-1 rounded-full border p-1 backdrop-blur-md sm:inline-flex"
          >
            <Button
              v-for="option in themeOptions"
              :key="option.value"
              type="button"
              variant="ghost"
              size="icon"
              :aria-label="option.label"
              :title="option.label"
              :class="[
                'h-8 w-8 rounded-full transition-all duration-200',
                themeMode === option.value
                  ? 'bg-background text-foreground ring-border/80 shadow-sm ring-1'
                  : 'text-muted-foreground hover:text-foreground',
              ]"
              @click="emit('update:themeMode', option.value)"
            >
              <component :is="option.icon" class="h-4 w-4" />
            </Button>
          </div>

          <!-- Mobile single theme toggle button -->
          <Button
            type="button"
            variant="outline"
            size="icon"
            class="border-border/80 bg-muted/60 text-foreground h-9 w-9 rounded-full sm:hidden"
            :aria-label="`Current theme: ${themeMode}. Tap to change`"
            :title="`Theme: ${themeMode}`"
            @click="
              emit(
                'update:themeMode',
                themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'system' : 'light',
              )
            "
          >
            <component
              :is="themeOptions.find((o) => o.value === themeMode)?.icon || themeOptions[0].icon"
              class="h-4 w-4"
            />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            class="border-border/80 bg-muted/60 text-foreground h-9 w-9 rounded-full xl:hidden"
            aria-label="Open menu"
            @click="mobileNavOpen = true"
          >
            <Menu class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>

  <Sheet :open="mobileNavOpen" @update:open="mobileNavOpen = $event">
    <SheetContent
      class="border-border/80 bg-card/95 text-card-foreground flex h-full max-h-[100dvh] flex-col overflow-y-auto p-5 backdrop-blur-2xl sm:p-6"
    >
      <div class="space-y-5">
        <div>
          <p
            class="text-[0.64rem] font-bold tracking-[0.24em] text-emerald-600 uppercase dark:text-emerald-400"
          >
            {{ APP_HEADER_CONSTANTS.mobileNavTitle }}
          </p>
          <h2 class="mt-2 text-xl font-black text-foreground">
            {{ APP_HEADER_CONSTANTS.brand }}
          </h2>
          <p class="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
            {{ pageDescription }}
          </p>
        </div>

        <div class="space-y-2">
          <p class="text-[0.68rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
            {{ APP_HEADER_CONSTANTS.themePreferenceLabel }}
          </p>
          <div
            class="border-border/80 bg-muted/60 grid grid-cols-3 gap-1 rounded-2xl border p-1 backdrop-blur-md"
          >
            <button
              v-for="option in themeOptions"
              :key="option.value"
              type="button"
              :class="[
                'inline-flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all',
                themeMode === option.value
                  ? 'bg-background text-foreground ring-border/80 shadow-xs ring-1'
                  : 'text-muted-foreground hover:text-foreground',
              ]"
              @click="emit('update:themeMode', option.value)"
            >
              <component :is="option.icon" class="h-3.5 w-3.5" />
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>

        <nav class="grid gap-2" :aria-label="APP_HEADER_CONSTANTS.mobileNavAriaLabel">
          <RouterLink
            v-for="item in primaryNavItems"
            :key="item.to"
            :to="item.to"
            :class="[
              'rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-200',
              item.to === APP_HEADER_CONSTANTS.briefingTo
                ? 'border-emerald-500/40 bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-300'
                : 'border-border/70 bg-muted/50 text-foreground hover:border-emerald-500/40 hover:bg-muted/80',
            ]"
            @click="mobileNavOpen = false"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

      </div>
    </SheetContent>
  </Sheet>
</template>
