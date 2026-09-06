import type { ThemeName } from '../types';

export type { ThemeName };
export type ThemeMode = 'system' | 'dark' | 'light';

export const THEME_STORAGE_KEY = 'carbon-watchdog-theme-mode';

export const THEME_PALETTE: Record<
  ThemeName,
  {
    title: string;
    description: string;
    darkBackgroundImage: string;
    lightBackgroundImage: string;
    glow: string;
    accent: string;
  }
> = {
  forest: {
    title: 'Forest Atlas',
    description: 'Integrity-focused monitoring with an ecological signal lens.',
    darkBackgroundImage:
      'radial-gradient(ellipse 80% 50% at 20% -10%, rgba(16, 185, 129, 0.28), transparent 60%), radial-gradient(circle at 85% 15%, rgba(14, 165, 233, 0.22), transparent 45%), radial-gradient(circle at 50% 110%, rgba(5, 150, 105, 0.18), transparent 50%), linear-gradient(180deg, #050d0a 0%, #071913 40%, #040907 100%)',
    lightBackgroundImage:
      'radial-gradient(ellipse 80% 40% at 15% -5%, rgba(16, 185, 129, 0.22), transparent 55%), radial-gradient(circle at 88% 12%, rgba(56, 189, 248, 0.18), transparent 45%), radial-gradient(circle at 50% 105%, rgba(52, 211, 153, 0.14), transparent 55%), linear-gradient(180deg, #f3fcf6 0%, #e9f6ef 45%, #f4faf7 100%)',
    glow: 'rgba(16, 185, 129, 0.55)',
    accent: '#10b981',
  },
  ember: {
    title: 'Risk Ember',
    description: 'A sharper compliance view for escalations and rapid response.',
    darkBackgroundImage:
      'radial-gradient(ellipse 80% 50% at 20% -10%, rgba(249, 115, 22, 0.26), transparent 60%), radial-gradient(circle at 85% 15%, rgba(239, 68, 68, 0.22), transparent 45%), radial-gradient(circle at 50% 110%, rgba(245, 158, 11, 0.16), transparent 50%), linear-gradient(180deg, #130a06 0%, #1c0e08 40%, #0b0503 100%)',
    lightBackgroundImage:
      'radial-gradient(ellipse 80% 40% at 15% -5%, rgba(251, 146, 60, 0.22), transparent 55%), radial-gradient(circle at 88% 12%, rgba(248, 113, 113, 0.18), transparent 45%), radial-gradient(circle at 50% 105%, rgba(253, 186, 116, 0.14), transparent 55%), linear-gradient(180deg, #fff9f5 0%, #fff1ea 45%, #fff7f4 100%)',
    glow: 'rgba(249, 115, 22, 0.55)',
    accent: '#f97316',
  },
  midnight: {
    title: 'Midnight Portfolio',
    description: 'A calm analytical view for buyer exposure and concentration analysis.',
    darkBackgroundImage:
      'radial-gradient(ellipse 80% 50% at 20% -10%, rgba(99, 102, 241, 0.28), transparent 60%), radial-gradient(circle at 85% 15%, rgba(14, 165, 233, 0.22), transparent 45%), radial-gradient(circle at 50% 110%, rgba(129, 140, 248, 0.16), transparent 50%), linear-gradient(180deg, #060919 0%, #0a1226 40%, #03050e 100%)',
    lightBackgroundImage:
      'radial-gradient(ellipse 80% 40% at 15% -5%, rgba(129, 140, 248, 0.2), transparent 55%), radial-gradient(circle at 88% 12%, rgba(56, 189, 248, 0.18), transparent 45%), radial-gradient(circle at 50% 105%, rgba(165, 180, 252, 0.14), transparent 55%), linear-gradient(180deg, #f5f8ff 0%, #edf3ff 45%, #f7faff 100%)',
    glow: 'rgba(99, 102, 241, 0.55)',
    accent: '#6366f1',
  },
  glacier: {
    title: 'Glacier Method',
    description: 'The technical pipeline, radar feeds, and transparent math.',
    darkBackgroundImage:
      'radial-gradient(ellipse 80% 50% at 20% -10%, rgba(56, 189, 248, 0.26), transparent 60%), radial-gradient(circle at 85% 15%, rgba(45, 212, 191, 0.2), transparent 45%), radial-gradient(circle at 50% 110%, rgba(14, 165, 233, 0.16), transparent 50%), linear-gradient(180deg, #031016 0%, #071a24 40%, #02080c 100%)',
    lightBackgroundImage:
      'radial-gradient(ellipse 80% 40% at 15% -5%, rgba(125, 211, 252, 0.22), transparent 55%), radial-gradient(circle at 88% 12%, rgba(45, 212, 191, 0.18), transparent 45%), radial-gradient(circle at 50% 105%, rgba(186, 230, 253, 0.15), transparent 55%), linear-gradient(180deg, #f0fbff 0%, #e6f7fc 45%, #f6fcff 100%)',
    glow: 'rgba(56, 189, 248, 0.55)',
    accent: '#0ea5e9',
  },
  carbon: {
    title: 'Carbon Watch',
    description: 'A crisp control surface for enterprise compliance and board reporting.',
    darkBackgroundImage:
      'radial-gradient(ellipse 80% 50% at 20% -10%, rgba(148, 163, 184, 0.22), transparent 60%), radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.18), transparent 45%), radial-gradient(circle at 50% 110%, rgba(71, 85, 105, 0.16), transparent 50%), linear-gradient(180deg, #07090b 0%, #0f1416 40%, #040506 100%)',
    lightBackgroundImage:
      'radial-gradient(ellipse 80% 40% at 15% -5%, rgba(148, 163, 184, 0.18), transparent 55%), radial-gradient(circle at 88% 12%, rgba(16, 185, 129, 0.16), transparent 45%), radial-gradient(circle at 50% 105%, rgba(203, 213, 225, 0.15), transparent 55%), linear-gradient(180deg, #f7faf9 0%, #eff4f3 45%, #f8fbfb 100%)',
    glow: 'rgba(16, 185, 129, 0.45)',
    accent: '#10b981',
  },
};
