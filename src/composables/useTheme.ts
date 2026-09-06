import { computed, ref, watch, watchEffect } from 'vue';
import { THEME_STORAGE_KEY, type ThemeMode } from '@/config/theme';

const themeMode = ref<ThemeMode>('light');
const systemPrefersDark = ref(false);
let initialized = false;

function ensureInitialized() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemPrefersDark.value = mediaQuery.matches;

  mediaQuery.addEventListener('change', (event: MediaQueryListEvent) => {
    systemPrefersDark.value = event.matches;
  });

  const userExplicit = window.localStorage.getItem('carbon-watchdog-theme-user-explicit');
  const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;

  if (userExplicit === 'true' && (storedMode === 'dark' || storedMode === 'light')) {
    themeMode.value = storedMode;
  } else if (storedMode === 'system') {
    themeMode.value = systemPrefersDark.value ? 'dark' : 'light';
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode.value);
  } else {
    themeMode.value = 'light';
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
  }

  watch(themeMode, (mode) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    window.localStorage.setItem('carbon-watchdog-theme-user-explicit', 'true');
  });

  watchEffect(() => {
    const isDarkActive =
      themeMode.value === 'dark' || (themeMode.value === 'system' && systemPrefersDark.value);
    const active = isDarkActive ? 'dark' : 'light';
    document.documentElement.setAttribute('data-ui-theme', active);
    document.documentElement.classList.toggle('dark', active === 'dark');
  });
}

export function useTheme() {
  ensureInitialized();

  const resolvedTheme = computed<'dark' | 'light'>(() => {
    if (themeMode.value === 'dark') return 'dark';
    if (themeMode.value === 'light') return 'light';
    return systemPrefersDark.value ? 'dark' : 'light';
  });

  const isDark = computed(() => resolvedTheme.value === 'dark');

  const toggleTheme = () => {
    themeMode.value = isDark.value ? 'light' : 'dark';
  };

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode;
  };

  return {
    themeMode,
    resolvedTheme,
    isDark,
    toggleTheme,
    setThemeMode,
  };
}
