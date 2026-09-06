<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next';

import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { THEME_PALETTE } from './config/theme';
import { FOOTER_NAV_SECTIONS, SCROLL_TOP_THRESHOLD } from './constants';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import BuyerDossierSheet from '@/components/BuyerDossierSheet.vue';
import GlobalSearchModal from '@/components/GlobalSearchModal.vue';
import ProjectDossierSheet from '@/components/ProjectDossierSheet.vue';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import { useSeo } from '@/composables/useSeo';
import { useTheme } from '@/composables/useTheme';

const route = useRoute();
const {
  selectedProject,
  projectDossierOpen,
  selectedBuyer,
  buyerDossierOpen,
  globalSearchOpen,
  toastMessage,
} = useCarbonDossier();

const { themeMode, resolvedTheme } = useTheme();

const showBackToTop = ref(false);
const sidebarCollapsed = ref(false);
const mobileSidebarOpen = ref(false);

const onScroll = () => {
  if (typeof window === 'undefined') return;
  showBackToTop.value = window.scrollY > SCROLL_TOP_THRESHOLD;
};

const scrollToTop = () => {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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

useSeo({
  title: pageTitle,
  description: pageDescription,
  path: computed(() => route.path),
});

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll);
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

  <!-- Main Shell with Persistent Left Navigation -->
  <div
    class="relative min-h-screen flex bg-background text-foreground overflow-x-hidden transition-colors duration-300"
    :style="{ backgroundImage: currentBackgroundImage }"
  >
    <!-- Background Atmospheric Glows (Preserved) -->
    <div class="pointer-events-none absolute inset-0 z-0">
      <div
        class="absolute top-24 left-1/4 h-96 w-96 rounded-full opacity-40 blur-3xl transition-all duration-700"
        :style="{ background: currentTheme.glow }"
      ></div>
      <div
        class="absolute top-48 right-10 h-[32rem] w-[32rem] rounded-full bg-sky-500/10 opacity-50 blur-3xl"
      ></div>
      <div
        class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background/40 to-transparent"
      ></div>
      <div
        class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background/60 to-transparent"
      ></div>
    </div>

    <!-- Desktop Persistent Left Sidebar Spacer (reserves layout space in flex row) -->
    <div
      v-if="!isImmersiveRoute"
      :class="[
        'hidden lg:block shrink-0 transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64',
      ]"
      aria-hidden="true"
    ></div>

    <!-- Desktop Persistent Left Sidebar (Fixed rigidly to viewport, never moves or jitters on scroll) -->
    <div
      v-if="!isImmersiveRoute"
      :class="[
        'hidden lg:block fixed top-0 bottom-0 left-0 z-40 transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64',
      ]"
    >
      <AppSidebar
        :collapsed="sidebarCollapsed"
        @update:collapsed="sidebarCollapsed = $event"
      />
    </div>

    <!-- Mobile Slide-Over Sidebar Drawer -->
    <div
      v-if="mobileSidebarOpen && !isImmersiveRoute"
      class="fixed inset-0 z-50 flex lg:hidden"
    >
      <div
        class="fixed inset-0 bg-black/80 backdrop-blur-sm"
        @click="mobileSidebarOpen = false"
      ></div>
      <div
        class="relative z-10 w-72 h-full bg-card dark:bg-[#040907] border-r border-border/70 dark:border-white/10 shadow-2xl flex flex-col"
      >
        <AppSidebar
          :collapsed="false"
          @update:collapsed="mobileSidebarOpen = false"
        />
      </div>
    </div>

    <!-- Right Workspace Area -->
    <div class="flex-1 flex flex-col min-w-0 z-10 relative">
      <!-- Global Top Bar -->
      <AppHeader
        v-if="!isImmersiveRoute"
        :immersive="isImmersiveRoute"
        :page-title="pageTitle"
        :page-description="pageDescription"
        :theme-mode="themeMode"
        @update:theme-mode="themeMode = $event"
        @toggle-mobile-nav="mobileSidebarOpen = !mobileSidebarOpen"
      />

      <!-- Main Workspace Container -->
      <main
        id="main-content"
        :class="[
          'relative z-10 flex-1 w-full',
          isImmersiveRoute ? 'p-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6',
        ]"
      >
        <RouterView v-slot="{ Component }">
          <Transition
            enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            enter-from-class="translate-y-2 opacity-0 scale-[0.995]"
            enter-to-class="translate-y-0 opacity-100 scale-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100 scale-100"
            leave-to-class="-translate-y-1 opacity-0 scale-[0.995]"
            mode="out-in"
          >
            <component
              :is="Component"
              :key="route.fullPath"
            />
          </Transition>
        </RouterView>
      </main>

      <!-- Grounded Footer -->
      <AppFooter
        v-if="!isImmersiveRoute"
        :sections="FOOTER_NAV_SECTIONS"
      />
    </div>

    <!-- Global Project Dossier Drawer -->
    <ProjectDossierSheet
      :open="projectDossierOpen"
      :project="selectedProject"
      @update:open="projectDossierOpen = $event"
    />

    <!-- Global Buyer Dossier Drawer -->
    <BuyerDossierSheet
      :open="buyerDossierOpen"
      :buyer="selectedBuyer"
      @update:open="buyerDossierOpen = $event"
    />

    <!-- Global Search Modal (⌘K) -->
    <GlobalSearchModal
      :open="globalSearchOpen"
      @update:open="globalSearchOpen = $event"
    />

    <!-- Global Floating Action Feedback Toast -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-8 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-8 opacity-0 scale-95"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 max-w-md p-3.5 rounded-2xl border border-emerald-500/40 bg-slate-950/95 text-slate-100 shadow-2xl backdrop-blur-xl flex items-center gap-3 font-mono text-xs"
      >
        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
        <span class="flex-1 font-sans text-xs text-slate-200">{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- Back to Top Button -->
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
        class="border-white/20 bg-slate-900/90 text-slate-200 fixed right-3.5 bottom-3.5 sm:right-5 sm:bottom-5 z-30 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-emerald-500/50 active:scale-95"
        @click="scrollToTop"
      >
        <ArrowUp class="text-emerald-400 h-4 w-4" />
        Top
      </button>
    </Transition>
  </div>
</template>
