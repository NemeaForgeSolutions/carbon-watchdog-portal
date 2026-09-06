<script setup lang="ts">
import { ArrowUp } from '@lucide/vue';
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { THEME_PALETTE, THEME_STORAGE_KEY, type ThemeMode } from './config/theme';
import { FOOTER_NAV_SECTIONS, PRIMARY_NAV_ITEMS, SCROLL_TOP_THRESHOLD } from './constants';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import { useSeo } from '@/composables/useSeo';

const route = useRoute();

const themeMode = ref<ThemeMode>('system');
const systemPrefersDark = ref(false);
const showBackToTop = ref(false);

let mediaQuery: MediaQueryList | null = null;
let onColorSchemeChange: ((_event: MediaQueryListEvent) => void) | null = null;

const onScroll = () => {
  if (typeof window === 'undefined') return;
  showBackToTop.value = window.scrollY > SCROLL_TOP_THRESHOLD;
};

const scrollToTop = () => {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const setSystemPreference = () => {
  if (typeof window === 'undefined') return;
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemPrefersDark.value = mediaQuery.matches;

  onColorSchemeChange = (event: MediaQueryListEvent) => {
    systemPrefersDark.value = event.matches;
  };

  mediaQuery.addEventListener('change', onColorSchemeChange);
};

const resolvedTheme = computed<'dark' | 'light'>(() => {
  if (themeMode.value === 'dark') return 'dark';
  if (themeMode.value === 'light') return 'light';
  return systemPrefersDark.value ? 'dark' : 'light';
});

const currentTheme = computed(() => {
  const metaTheme = route.meta.theme;
  return THEME_PALETTE[metaTheme || 'forest'];
});

const isImmersiveRoute = computed(() => route.name === 'not-found');

const currentBackgroundImage = computed(() =>
  resolvedTheme.value === 'dark'
    ? currentTheme.value.darkBackgroundImage
    : currentTheme.value.lightBackgroundImage,
);

const pageTitle = computed(() => String(route.meta.title || 'Overview'));
const pageDescription = computed(() =>
  String(route.meta.description || currentTheme.value.description),
);

watch(themeMode, (mode) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }
});

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-ui-theme', resolvedTheme.value);
    document.documentElement.classList.toggle('dark', resolvedTheme.value === 'dark');
  }
});

useSeo({
  title: pageTitle,
  description: pageDescription,
  path: computed(() => route.path),
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (storedMode && ['system', 'dark', 'light'].includes(storedMode)) {
      themeMode.value = storedMode;
    }
  }

  setSystemPreference();
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll);
  }

  if (mediaQuery && onColorSchemeChange) {
    mediaQuery.removeEventListener('change', onColorSchemeChange);
  }
});
</script>

<template>
  <a
    href="#main-content"
    class="border-border bg-background/90 text-foreground sr-only fixed top-[-999px] left-4 z-50 rounded-full border px-4 py-2 text-sm font-semibold shadow-lg transition focus:not-sr-only focus:top-4"
  >
    Skip to content
  </a>

  <div
    class="relative min-h-screen overflow-hidden"
    :style="{ backgroundImage: currentBackgroundImage }"
  >
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute top-24 -left-20 h-96 w-96 rounded-full opacity-60 blur-3xl transition-all duration-700"
        :style="{ background: currentTheme.glow }"
      ></div>
      <div
        class="absolute top-10 right-[-5rem] h-[32rem] w-[32rem] rounded-full bg-sky-500/10 opacity-70 blur-3xl"
      ></div>
      <div
        class="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background/40 to-transparent"
      ></div>
      <div
        class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background/60 to-transparent"
      ></div>
    </div>

    <div
      :class="[
        'relative z-10 mx-auto flex min-h-screen w-full flex-col',
        isImmersiveRoute
          ? 'px-0 py-0'
          : 'max-w-[1440px] gap-5 sm:gap-6 px-3 pt-2.5 pb-10 sm:px-6 sm:pt-4 lg:px-8',
      ]"
    >
      <div :class="isImmersiveRoute ? 'relative z-30' : 'sticky top-2 sm:top-4 z-40'">
        <AppHeader
          :immersive="isImmersiveRoute"
          :page-title="pageTitle"
          :page-description="pageDescription"
          :primary-nav-items="PRIMARY_NAV_ITEMS"
          :theme-mode="themeMode"
          @update:theme-mode="themeMode = $event"
        />
      </div>

      <main
        id="main-content"
        :class="isImmersiveRoute ? 'pt-0 pb-0' : 'flex-1 pt-1 sm:pt-2'"
      >
        <RouterView v-slot="{ Component }">
          <Transition
            enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            enter-from-class="translate-y-2.5 opacity-0 scale-[0.995]"
            enter-to-class="translate-y-0 opacity-100 scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="translate-y-0 opacity-100 scale-100"
            leave-to-class="-translate-y-1.5 opacity-0 scale-[0.995]"
            mode="out-in"
          >
            <component
              :is="Component"
              :key="route.fullPath"
            />
          </Transition>
        </RouterView>
      </main>

      <AppFooter
        v-if="!isImmersiveRoute"
        :sections="FOOTER_NAV_SECTIONS"
      />
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0 scale-90"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-4 opacity-0 scale-90"
    >
      <button
        v-if="showBackToTop"
        type="button"
        class="border-border/80 bg-card/90 text-foreground fixed right-3.5 bottom-3.5 sm:right-5 sm:bottom-5 z-30 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-primary/50 hover:shadow-2xl active:scale-95"
        @click="scrollToTop"
      >
        <ArrowUp class="text-primary h-4 w-4" />
        Back to top
      </button>
    </Transition>
  </div>
</template>
