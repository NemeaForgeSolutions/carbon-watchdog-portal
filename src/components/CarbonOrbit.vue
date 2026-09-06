<script setup lang="ts">
import { computed, ref } from 'vue';
import { CARBON_ORBIT_CONSTANTS } from '@/constants';
import { useTheme } from '@/composables/useTheme';

const { isDark } = useTheme();

const orbitBadges = CARBON_ORBIT_CONSTANTS.badges;

type OrbitStat = {
  label: string;
  value: string;
};

const props = defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  stats: OrbitStat[];
}>();

const sceneRef = ref<HTMLElement | null>(null);
const pointerX = ref(0);
const pointerY = ref(0);

const sceneStyle = computed(() => ({
  '--pointer-x': pointerX.value.toFixed(4),
  '--pointer-y': pointerY.value.toFixed(4),
}));

const onPointerMove = (event: PointerEvent) => {
  const bounds = sceneRef.value?.getBoundingClientRect();
  if (!bounds) return;

  const offsetX = (event.clientX - bounds.left) / bounds.width;
  const offsetY = (event.clientY - bounds.top) / bounds.height;

  pointerX.value = (offsetX - 0.5) * 2;
  pointerY.value = (offsetY - 0.5) * 2;
};

const resetPointer = () => {
  pointerX.value = 0;
  pointerY.value = 0;
};
</script>

<template>
  <section
    class="orbit-shell relative overflow-hidden rounded-3xl border border-border/70 dark:border-white/10 shadow-xl dark:shadow-2xl transition-colors duration-300"
  >
    <div class="orbit-background absolute inset-0"></div>
    <div class="orbit-noise absolute inset-0 opacity-40"></div>

    <div
      class="relative z-10 grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:p-7 xl:p-8"
    >
      <!-- Left: Telemetry & Narrative Card -->
      <div
        class="flex h-full flex-col justify-between rounded-2xl border border-border/70 dark:border-white/10 bg-card/85 dark:bg-slate-950/60 p-5 sm:p-6 lg:p-7 backdrop-blur-xl shadow-md sm:rounded-3xl transition-colors"
      >
        <div>
          <div class="flex items-center gap-2">
            <span
              class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-300 uppercase"
            >
              <span
                class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              ></span>
              {{ props.eyebrow }}
            </span>
          </div>

          <h2
            class="m-0 mt-3 sm:mt-4 max-w-[15ch] text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] leading-[1.06] sm:leading-[1.02] tracking-tight font-black font-sans text-foreground dark:text-white"
          >
            {{ props.title }}
          </h2>

          <p
            class="m-0 mt-3 sm:mt-4 max-w-[58ch] text-xs sm:text-sm lg:text-base leading-relaxed text-muted-foreground dark:text-slate-300"
          >
            {{ props.description }}
          </p>
        </div>

        <!-- Telemetry Stats Grid -->
        <div class="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          <div
            v-for="(stat, index) in props.stats"
            :key="stat.label"
            :class="[
              'grid gap-1 rounded-xl sm:rounded-2xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-white/[0.04] p-3 sm:p-3.5 shadow-2xs backdrop-blur-sm transition-colors hover:border-emerald-500/30',
              index === 2 && props.stats.length === 3 ? 'col-span-2 sm:col-span-1' : '',
            ]"
          >
            <span
              class="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-300 uppercase truncate"
            >
              {{ stat.label }}
            </span>
            <strong
              class="text-lg sm:text-xl font-black font-mono tracking-tight text-foreground dark:text-white"
            >
              {{ stat.value }}
            </strong>
          </div>
        </div>

        <!-- Sensor Coverage Strip -->
        <div class="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="badge in orbitBadges"
            :key="badge.label"
            class="rounded-xl border border-border/60 dark:border-white/10 bg-card/60 dark:bg-slate-900/50 p-2.5 sm:px-3 sm:py-2.5 backdrop-blur-sm transition-colors hover:border-emerald-500/40"
          >
            <p
              class="text-[10px] font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase truncate"
            >
              {{ badge.label }}
            </p>
            <p class="mt-0.5 text-xs font-semibold text-foreground/85 dark:text-slate-300 truncate">
              {{ badge.value }}
            </p>
          </div>
        </div>
      </div>

      <!-- Right: Interactive 3D Orbital Scene -->
      <div
        ref="sceneRef"
        class="orbit-scene relative aspect-[4/3] min-h-[280px] rounded-2xl sm:rounded-3xl border border-border/70 dark:border-white/10 bg-card/40 dark:bg-slate-950/40 sm:aspect-[16/10] sm:min-h-[380px] lg:aspect-auto lg:min-h-[500px] backdrop-blur-xl shadow-inner overflow-hidden"
        :style="sceneStyle"
        aria-hidden="true"
        @pointermove="onPointerMove"
        @pointerleave="resetPointer"
      >
        <div class="orbit-parallax">
          <svg
            class="orbit-svg"
            viewBox="0 0 1200 920"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <!-- Atmospheric Glow (Light & Dark Variants) -->
              <radialGradient
                id="cwGlowLight"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(650 430) rotate(90) scale(330 330)"
              >
                <stop
                  stop-color="#10B981"
                  stop-opacity="0.25"
                />
                <stop
                  offset="1"
                  stop-color="#10B981"
                  stop-opacity="0"
                />
              </radialGradient>
              <radialGradient
                id="cwGlowDark"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(650 430) rotate(90) scale(340 340)"
              >
                <stop
                  stop-color="#34D399"
                  stop-opacity="0.34"
                />
                <stop
                  offset="1"
                  stop-color="#34D399"
                  stop-opacity="0"
                />
              </radialGradient>

              <!-- Planetary Body Gradient (Theme Adaptive) -->
              <radialGradient
                id="cwPlanetLight"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(650 420) rotate(90) scale(230 230)"
              >
                <stop stop-color="#F0FDF4" />
                <stop
                  offset="0.22"
                  stop-color="#A7F3D0"
                />
                <stop
                  offset="0.52"
                  stop-color="#0D9488"
                />
                <stop
                  offset="0.85"
                  stop-color="#065F46"
                />
                <stop
                  offset="1"
                  stop-color="#064E3B"
                />
              </radialGradient>
              <radialGradient
                id="cwPlanetDark"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(650 430) rotate(90) scale(230 230)"
              >
                <stop stop-color="#F0FDFA" />
                <stop
                  offset="0.18"
                  stop-color="#99F6E4"
                />
                <stop
                  offset="0.48"
                  stop-color="#0F766E"
                />
                <stop
                  offset="1"
                  stop-color="#020617"
                />
              </radialGradient>

              <!-- Radar Sweep Beam (Theme Adaptive) -->
              <linearGradient
                id="cwBeamLight"
                x1="274"
                y1="184"
                x2="898"
                y2="676"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stop-color="#0284C7"
                  stop-opacity="0.24"
                />
                <stop
                  offset="1"
                  stop-color="#10B981"
                  stop-opacity="0.02"
                />
              </linearGradient>
              <linearGradient
                id="cwBeamDark"
                x1="274"
                y1="184"
                x2="898"
                y2="676"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stop-color="#67E8F9"
                  stop-opacity="0.4"
                />
                <stop
                  offset="1"
                  stop-color="#34D399"
                  stop-opacity="0.02"
                />
              </linearGradient>

              <linearGradient
                id="cwArc"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  stop-color="#94A3B8"
                  stop-opacity="0.6"
                />
                <stop
                  offset="1"
                  stop-color="#10B981"
                  stop-opacity="0.25"
                />
              </linearGradient>
              <filter
                id="cwBlur"
                x="0"
                y="0"
                width="1200"
                height="920"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feGaussianBlur stdDeviation="18" />
              </filter>
            </defs>

            <!-- Ground shadow field -->
            <g class="field field-back">
              <ellipse
                cx="650"
                cy="690"
                rx="360"
                ry="62"
                :fill="isDark ? '#020617' : '#64748B'"
                :fill-opacity="isDark ? 0.56 : 0.12"
              />
              <ellipse
                cx="650"
                cy="700"
                rx="296"
                ry="44"
                :fill="isDark ? '#0F172A' : '#334155'"
                :fill-opacity="isDark ? 0.44 : 0.08"
              />
            </g>

            <!-- Coordinate Mesh Grid -->
            <g class="mesh-grid">
              <path
                d="M130 676C256 598 430 546 646 546C862 546 1036 598 1162 676"
                stroke="#94A3B8"
                :stroke-opacity="isDark ? 0.15 : 0.22"
                stroke-width="2"
              />
              <path
                d="M172 726C298 640 446 598 646 598C846 598 994 640 1120 726"
                stroke="#94A3B8"
                :stroke-opacity="isDark ? 0.11 : 0.18"
                stroke-width="2"
              />
              <path
                d="M240 770C360 690 490 648 646 648C802 648 932 690 1052 770"
                stroke="#94A3B8"
                :stroke-opacity="isDark ? 0.08 : 0.14"
                stroke-width="2"
              />
              <path
                d="M410 552L330 762"
                stroke="#94A3B8"
                :stroke-opacity="isDark ? 0.08 : 0.14"
                stroke-width="2"
              />
              <path
                d="M542 536L486 790"
                stroke="#94A3B8"
                :stroke-opacity="isDark ? 0.08 : 0.14"
                stroke-width="2"
              />
              <path
                d="M758 536L812 790"
                stroke="#94A3B8"
                :stroke-opacity="isDark ? 0.08 : 0.14"
                stroke-width="2"
              />
              <path
                d="M892 552L972 762"
                stroke="#94A3B8"
                :stroke-opacity="isDark ? 0.08 : 0.14"
                stroke-width="2"
              />
            </g>

            <!-- Radar Sensor Sweeps -->
            <g class="beam-layer">
              <path
                d="M210 208L670 420L1080 714"
                :stroke="isDark ? 'url(#cwBeamDark)' : 'url(#cwBeamLight)'"
                stroke-width="28"
                stroke-linecap="round"
              />
              <path
                d="M280 232L672 420L980 680"
                :stroke="isDark ? '#E2E8F0' : '#64748B'"
                :stroke-opacity="isDark ? 0.06 : 0.16"
                stroke-width="2"
                stroke-dasharray="8 12"
              />
            </g>

            <!-- Planetary System -->
            <g class="planet-system">
              <circle
                cx="650"
                cy="430"
                r="250"
                :fill="isDark ? 'url(#cwGlowDark)' : 'url(#cwGlowLight)'"
                filter="url(#cwBlur)"
              />
              <ellipse
                class="scan-band"
                cx="650"
                cy="428"
                rx="286"
                ry="86"
                :stroke="isDark ? '#34D399' : '#059669'"
                :stroke-opacity="isDark ? 0.2 : 0.32"
                stroke-width="3"
              />
              <ellipse
                class="scan-band scan-band-alt"
                cx="650"
                cy="428"
                rx="242"
                ry="68"
                :stroke="isDark ? '#7DD3FC' : '#0284C7'"
                :stroke-opacity="isDark ? 0.18 : 0.28"
                stroke-width="2"
              />
              <circle
                class="planet-body"
                cx="650"
                cy="430"
                r="194"
                :fill="isDark ? 'url(#cwPlanetDark)' : 'url(#cwPlanetLight)'"
              />
              <path
                class="planet-shore"
                d="M564 356C588 338 630 330 656 346C688 366 728 356 752 382C780 410 760 446 734 464C710 480 692 516 642 516C584 516 540 484 516 446C498 416 518 382 564 356Z"
                :fill="isDark ? '#0B3B3C' : '#047857'"
                :fill-opacity="isDark ? 0.58 : 0.65"
              />
              <path
                class="planet-shore planet-shore-alt"
                d="M642 286C678 276 726 294 746 326C768 360 752 398 720 412C686 428 652 418 626 390C598 360 602 302 642 286Z"
                :fill="isDark ? '#86EFAC' : '#34D399'"
                :fill-opacity="isDark ? 0.18 : 0.35"
              />
              <ellipse
                class="equator equator-one"
                cx="650"
                cy="430"
                rx="170"
                ry="56"
                stroke="url(#cwArc)"
                stroke-width="2"
              />
              <ellipse
                class="equator equator-two"
                cx="650"
                cy="430"
                rx="118"
                ry="176"
                :stroke="isDark ? '#E2E8F0' : '#64748B'"
                :stroke-opacity="isDark ? 0.14 : 0.25"
                stroke-width="1.5"
              />
            </g>

            <!-- Orbital Constellation A: Sentinel-2 Optical -->
            <g class="orbital-set orbital-set-a">
              <ellipse
                cx="650"
                cy="430"
                rx="330"
                ry="138"
                :stroke="isDark ? '#A7F3D0' : '#059669'"
                :stroke-opacity="isDark ? 0.18 : 0.3"
                stroke-width="2"
              />
              <g class="satellite satellite-a">
                <circle
                  cx="980"
                  cy="430"
                  r="11"
                  fill="#FEF3C7"
                />
                <circle
                  cx="980"
                  cy="430"
                  r="26"
                  fill="#34D399"
                  fill-opacity="0.2"
                />
                <g transform="translate(1004 406)">
                  <rect
                    width="112"
                    height="44"
                    rx="18"
                    :fill="isDark ? '#020617' : '#FFFFFF'"
                    :fill-opacity="isDark ? 0.82 : 0.94"
                    :stroke="isDark ? '#94A3B8' : '#CBD5E1'"
                    :stroke-opacity="isDark ? 0.2 : 0.8"
                  />
                  <text
                    x="18"
                    y="19"
                    :fill="isDark ? '#ECFDF5' : '#047857'"
                    font-size="12"
                    font-weight="700"
                    font-family="'JetBrains Mono', monospace"
                    letter-spacing="1.5"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[0].label }}
                  </text>
                  <text
                    x="18"
                    y="31"
                    :fill="isDark ? '#94A3B8' : '#64748B'"
                    font-size="10"
                    font-family="'Plus Jakarta Sans', sans-serif"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[0].desc }}
                  </text>
                </g>
              </g>
            </g>

            <!-- Orbital Constellation B: Sentinel-1 Radar -->
            <g class="orbital-set orbital-set-b">
              <ellipse
                cx="650"
                cy="430"
                rx="264"
                ry="304"
                :stroke="isDark ? '#7DD3FC' : '#0284C7'"
                :stroke-opacity="isDark ? 0.16 : 0.28"
                stroke-width="2"
                stroke-dasharray="8 12"
              />
              <g class="satellite satellite-b">
                <circle
                  cx="650"
                  cy="126"
                  r="10"
                  fill="#E0F2FE"
                />
                <circle
                  cx="650"
                  cy="126"
                  r="22"
                  fill="#38BDF8"
                  fill-opacity="0.2"
                />
                <g transform="translate(678 98)">
                  <rect
                    width="112"
                    height="44"
                    rx="18"
                    :fill="isDark ? '#020617' : '#FFFFFF'"
                    :fill-opacity="isDark ? 0.82 : 0.94"
                    :stroke="isDark ? '#94A3B8' : '#CBD5E1'"
                    :stroke-opacity="isDark ? 0.2 : 0.8"
                  />
                  <text
                    x="18"
                    y="19"
                    :fill="isDark ? '#ECFDF5' : '#0369A1'"
                    font-size="12"
                    font-weight="700"
                    font-family="'JetBrains Mono', monospace"
                    letter-spacing="1.5"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[1].label }}
                  </text>
                  <text
                    x="18"
                    y="31"
                    :fill="isDark ? '#94A3B8' : '#64748B'"
                    font-size="10"
                    font-family="'Plus Jakarta Sans', sans-serif"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[1].desc }}
                  </text>
                </g>
              </g>
            </g>

            <!-- Orbital Constellation C: Buyer Map Exposure -->
            <g class="orbital-set orbital-set-c">
              <ellipse
                cx="650"
                cy="430"
                rx="398"
                ry="174"
                :stroke="isDark ? '#E2E8F0' : '#64748B'"
                :stroke-opacity="isDark ? 0.12 : 0.24"
                stroke-width="2"
              />
              <g class="satellite satellite-c">
                <circle
                  cx="252"
                  cy="430"
                  r="11"
                  fill="#DCFCE7"
                />
                <circle
                  cx="252"
                  cy="430"
                  r="24"
                  fill="#22C55E"
                  fill-opacity="0.2"
                />
                <g transform="translate(92 404)">
                  <rect
                    width="130"
                    height="44"
                    rx="18"
                    :fill="isDark ? '#020617' : '#FFFFFF'"
                    :fill-opacity="isDark ? 0.82 : 0.94"
                    :stroke="isDark ? '#94A3B8' : '#CBD5E1'"
                    :stroke-opacity="isDark ? 0.2 : 0.8"
                  />
                  <text
                    x="18"
                    y="19"
                    :fill="isDark ? '#ECFDF5' : '#15803D'"
                    font-size="12"
                    font-weight="700"
                    font-family="'JetBrains Mono', monospace"
                    letter-spacing="1.5"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[2].label }}
                  </text>
                  <text
                    x="18"
                    y="31"
                    :fill="isDark ? '#94A3B8' : '#64748B'"
                    font-size="10"
                    font-family="'Plus Jakarta Sans', sans-serif"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[2].desc }}
                  </text>
                </g>
              </g>
            </g>

            <!-- Orbital Constellation D: Alert Engine Signal Review -->
            <g class="orbital-set orbital-set-d">
              <ellipse
                cx="650"
                cy="430"
                rx="188"
                ry="362"
                :stroke="isDark ? '#34D399' : '#10B981'"
                :stroke-opacity="isDark ? 0.14 : 0.28"
                stroke-width="2"
                stroke-dasharray="6 10"
              />
              <g class="satellite satellite-d">
                <circle
                  cx="650"
                  cy="792"
                  r="11"
                  fill="#F0FDFA"
                />
                <circle
                  cx="650"
                  cy="792"
                  r="24"
                  fill="#34D399"
                  fill-opacity="0.2"
                />
                <g transform="translate(676 764)">
                  <rect
                    width="128"
                    height="44"
                    rx="18"
                    :fill="isDark ? '#020617' : '#FFFFFF'"
                    :fill-opacity="isDark ? 0.82 : 0.94"
                    :stroke="isDark ? '#94A3B8' : '#CBD5E1'"
                    :stroke-opacity="isDark ? 0.2 : 0.8"
                  />
                  <text
                    x="18"
                    y="19"
                    :fill="isDark ? '#ECFDF5' : '#047857'"
                    font-size="12"
                    font-weight="700"
                    font-family="'JetBrains Mono', monospace"
                    letter-spacing="1.5"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[3].label }}
                  </text>
                  <text
                    x="18"
                    y="31"
                    :fill="isDark ? '#94A3B8' : '#64748B'"
                    font-size="10"
                    font-family="'Plus Jakarta Sans', sans-serif"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[3].desc }}
                  </text>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.orbit-shell {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(240, 253, 250, 0.82));
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

:global(.dark) .orbit-shell,
:global([data-ui-theme='dark']) .orbit-shell {
  background: linear-gradient(145deg, rgba(2, 6, 23, 0.96), rgba(6, 24, 27, 0.92));
}

.orbit-background {
  background:
    radial-gradient(circle at 18% 20%, rgba(16, 185, 129, 0.14), transparent 32%),
    radial-gradient(circle at 82% 18%, rgba(14, 165, 233, 0.1), transparent 28%),
    radial-gradient(circle at 65% 82%, rgba(20, 184, 166, 0.1), transparent 30%),
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.96) 0%,
      rgba(240, 253, 250, 0.78) 50%,
      rgba(248, 250, 252, 0.94) 100%
    );
  transition: background 0.3s ease;
}

:global(.dark) .orbit-background,
:global([data-ui-theme='dark']) .orbit-background {
  background:
    radial-gradient(circle at 16% 20%, rgba(52, 211, 153, 0.16), transparent 26%),
    radial-gradient(circle at 82% 18%, rgba(56, 189, 248, 0.14), transparent 22%),
    radial-gradient(circle at 64% 82%, rgba(13, 148, 136, 0.16), transparent 24%),
    linear-gradient(145deg, #020617 0%, #071c20 48%, #020617 100%);
}

.orbit-noise {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px);
  background-size: 48px 48px;
}

:global(.dark) .orbit-noise,
:global([data-ui-theme='dark']) .orbit-noise {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
}

.orbit-scene {
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
}

.orbit-parallax {
  height: 100%;
  transform: perspective(1600px) rotateX(calc(var(--pointer-y, 0) * -5deg))
    rotateY(calc(var(--pointer-x, 0) * 7deg))
    translate3d(calc(var(--pointer-x, 0) * -12px), calc(var(--pointer-y, 0) * -10px), 0);
  transform-style: preserve-3d;
  transition: transform 180ms ease-out;
}

.orbit-svg {
  width: 100%;
  height: 100%;
  min-height: 240px;
}

.mesh-grid {
  animation: grid-sway 18s ease-in-out infinite;
  transform-origin: 650px 680px;
}

.beam-layer {
  animation: beam-pulse 7s ease-in-out infinite;
  transform-origin: 650px 430px;
}

.planet-system {
  transform-origin: 650px 430px;
  animation: planet-float 11s ease-in-out infinite;
}

.planet-body {
  transform-origin: 650px 430px;
  animation: planet-rotate 28s linear infinite;
}

.planet-shore,
.planet-shore-alt,
.equator {
  transform-origin: 650px 430px;
  animation: planet-rotate 34s linear infinite;
}

.scan-band {
  transform-origin: 650px 430px;
  animation: scan-breathe 8s ease-in-out infinite;
}

.scan-band-alt {
  animation-delay: -4s;
}

.orbital-set {
  transform-origin: 650px 430px;
}

.orbital-set-a {
  animation: orbit-spin-a 18s linear infinite;
}

.orbital-set-b {
  animation: orbit-spin-b 24s linear infinite reverse;
}

.orbital-set-c {
  animation: orbit-spin-c 28s linear infinite;
}

.orbital-set-d {
  animation: orbit-spin-d 22s linear infinite reverse;
}

.satellite {
  animation: satellite-pulse 6.4s ease-in-out infinite;
}

.satellite-b {
  animation-delay: -1.5s;
}

.satellite-c {
  animation-delay: -2.8s;
}

.satellite-d {
  animation-delay: -3.9s;
}

@keyframes grid-sway {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }

  50% {
    transform: translateY(8px) scale(1.01);
  }
}

@keyframes beam-pulse {
  0%,
  100% {
    opacity: 0.48;
    transform: scale(1);
  }

  50% {
    opacity: 0.88;
    transform: scale(1.02);
  }
}

@keyframes planet-float {
  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-14px);
  }
}

@keyframes planet-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes scan-breathe {
  0%,
  100% {
    opacity: 0.24;
    transform: scale(0.98);
  }

  50% {
    opacity: 0.82;
    transform: scale(1.03);
  }
}

@keyframes orbit-spin-a {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-spin-b {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-spin-c {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-spin-d {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes satellite-pulse {
  0%,
  100% {
    opacity: 0.88;
    transform: translateY(0px);
  }

  50% {
    opacity: 1;
    transform: translateY(-6px);
  }
}

@media (max-width: 1024px) {
  .orbit-svg {
    min-height: 320px;
  }
}

@media (max-width: 640px) {
  .orbit-svg {
    min-height: 240px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orbit-parallax,
  .mesh-grid,
  .beam-layer,
  .planet-system,
  .planet-body,
  .planet-shore,
  .planet-shore-alt,
  .equator,
  .scan-band,
  .orbital-set,
  .satellite {
    animation: none !important;
  }

  .orbit-parallax {
    transform: none !important;
    transition: none !important;
  }
}
</style>
