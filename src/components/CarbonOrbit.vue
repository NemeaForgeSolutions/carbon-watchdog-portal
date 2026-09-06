<script setup lang="ts">
import { computed, ref } from 'vue';
import { CARBON_ORBIT_CONSTANTS } from '@/constants';

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
    class="orbit-shell relative overflow-hidden rounded-[2rem] border border-slate-400/20 shadow-[0_30px_80px_rgba(2,8,6,0.28)]"
  >
    <div class="orbit-background absolute inset-0"></div>
    <div class="orbit-noise absolute inset-0 opacity-40"></div>

    <div
      class="relative z-10 grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:p-8 xl:p-10"
    >
      <div
        class="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-slate-950/58 p-5 backdrop-blur-xl sm:rounded-[1.75rem] sm:p-6 lg:p-7 xl:p-8"
      >
        <p class="m-0 text-[0.7rem] font-extrabold tracking-[0.28em] text-emerald-300 uppercase">
          {{ props.eyebrow }}
        </p>
        <h2
          class="m-0 mt-3 sm:mt-4 max-w-[14ch] text-[clamp(1.85rem,5.5vw,5.2rem)] leading-[0.96] sm:leading-[0.92] tracking-[-0.05em] text-white"
        >
          {{ props.title }}
        </h2>
        <p class="m-0 mt-3 sm:mt-4 max-w-[58ch] text-sm sm:text-base leading-6 sm:leading-7 text-emerald-50/82 lg:text-lg">
          {{ props.description }}
        </p>

        <div class="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          <div
            v-for="(stat, index) in props.stats"
            :key="stat.label"
            :class="[
              'grid gap-1.5 sm:gap-2 rounded-[1.15rem] border border-white/10 bg-white/[0.06] p-3.5 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm',
              index === 2 && props.stats.length === 3 ? 'col-span-2 sm:col-span-1' : '',
            ]"
          >
            <span class="text-[0.66rem] sm:text-[0.68rem] font-bold tracking-[0.16em] text-emerald-300 uppercase">{{
              stat.label
            }}</span>
            <strong class="text-xl sm:text-2xl font-black text-white">{{ stat.value }}</strong>
          </div>
        </div>

        <div class="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="badge in orbitBadges"
            :key="badge.label"
            class="rounded-[1.15rem] border border-white/10 bg-slate-900/52 p-3 sm:px-4 sm:py-3 backdrop-blur-sm"
          >
            <p class="text-[0.64rem] sm:text-[0.66rem] font-bold tracking-[0.14em] text-emerald-300 uppercase">
              {{ badge.label }}
            </p>
            <p class="mt-1 text-xs sm:text-sm text-slate-200">
              {{ badge.value }}
            </p>
          </div>
        </div>
      </div>

      <div
        ref="sceneRef"
        class="orbit-scene relative aspect-[4/3] min-h-[260px] rounded-[1.5rem] border border-white/10 bg-white/[0.03] sm:aspect-[16/10] sm:min-h-[360px] sm:rounded-[1.75rem] lg:aspect-auto lg:min-h-[520px]"
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
              <radialGradient
                id="cwGlow"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(650 450) rotate(90) scale(340 340)"
              >
                <stop stop-color="#34D399" stop-opacity="0.34" />
                <stop offset="1" stop-color="#34D399" stop-opacity="0" />
              </radialGradient>
              <radialGradient
                id="cwPlanet"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(650 430) rotate(90) scale(230 230)"
              >
                <stop stop-color="#F0FDFA" />
                <stop offset="0.18" stop-color="#99F6E4" />
                <stop offset="0.48" stop-color="#0F766E" />
                <stop offset="1" stop-color="#020617" />
              </radialGradient>
              <linearGradient
                id="cwBeam"
                x1="274"
                y1="184"
                x2="898"
                y2="676"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#67E8F9" stop-opacity="0.4" />
                <stop offset="1" stop-color="#34D399" stop-opacity="0.02" />
              </linearGradient>
              <linearGradient
                id="cwArc"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop stop-color="#E2E8F0" stop-opacity="0.7" />
                <stop offset="1" stop-color="#34D399" stop-opacity="0.2" />
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

            <g class="field field-back">
              <ellipse
                cx="650"
                cy="690"
                rx="360"
                ry="62"
                fill="#020617"
                fill-opacity="0.56"
              />
              <ellipse
                cx="650"
                cy="700"
                rx="296"
                ry="44"
                fill="#0F172A"
                fill-opacity="0.44"
              />
            </g>

            <g class="mesh-grid">
              <path
                d="M130 676C256 598 430 546 646 546C862 546 1036 598 1162 676"
                stroke="#94A3B8"
                stroke-opacity="0.15"
                stroke-width="2"
              />
              <path
                d="M172 726C298 640 446 598 646 598C846 598 994 640 1120 726"
                stroke="#94A3B8"
                stroke-opacity="0.11"
                stroke-width="2"
              />
              <path
                d="M240 770C360 690 490 648 646 648C802 648 932 690 1052 770"
                stroke="#94A3B8"
                stroke-opacity="0.08"
                stroke-width="2"
              />
              <path
                d="M410 552L330 762"
                stroke="#94A3B8"
                stroke-opacity="0.08"
                stroke-width="2"
              />
              <path
                d="M542 536L486 790"
                stroke="#94A3B8"
                stroke-opacity="0.08"
                stroke-width="2"
              />
              <path
                d="M758 536L812 790"
                stroke="#94A3B8"
                stroke-opacity="0.08"
                stroke-width="2"
              />
              <path
                d="M892 552L972 762"
                stroke="#94A3B8"
                stroke-opacity="0.08"
                stroke-width="2"
              />
            </g>

            <g class="beam-layer">
              <path
                d="M210 208L670 420L1080 714"
                stroke="url(#cwBeam)"
                stroke-width="28"
                stroke-linecap="round"
              />
              <path
                d="M280 232L672 420L980 680"
                stroke="#E2E8F0"
                stroke-opacity="0.06"
                stroke-width="2"
                stroke-dasharray="8 12"
              />
            </g>

            <g class="planet-system">
              <circle
                cx="650"
                cy="430"
                r="250"
                fill="url(#cwGlow)"
                filter="url(#cwBlur)"
              />
              <ellipse
                class="scan-band"
                cx="650"
                cy="428"
                rx="286"
                ry="86"
                stroke="#34D399"
                stroke-opacity="0.2"
                stroke-width="3"
              />
              <ellipse
                class="scan-band scan-band-alt"
                cx="650"
                cy="428"
                rx="242"
                ry="68"
                stroke="#7DD3FC"
                stroke-opacity="0.18"
                stroke-width="2"
              />
              <circle
                class="planet-body"
                cx="650"
                cy="430"
                r="194"
                fill="url(#cwPlanet)"
              />
              <path
                class="planet-shore"
                d="M564 356C588 338 630 330 656 346C688 366 728 356 752 382C780 410 760 446 734 464C710 480 692 516 642 516C584 516 540 484 516 446C498 416 518 382 564 356Z"
                fill="#0B3B3C"
                fill-opacity="0.58"
              />
              <path
                class="planet-shore planet-shore-alt"
                d="M642 286C678 276 726 294 746 326C768 360 752 398 720 412C686 428 652 418 626 390C598 360 602 302 642 286Z"
                fill="#86EFAC"
                fill-opacity="0.18"
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
                stroke="#E2E8F0"
                stroke-opacity="0.14"
                stroke-width="1.5"
              />
            </g>

            <g class="orbital-set orbital-set-a">
              <ellipse
                cx="650"
                cy="430"
                rx="330"
                ry="138"
                stroke="#A7F3D0"
                stroke-opacity="0.18"
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
                  fill-opacity="0.12"
                />
                <g transform="translate(1004 406)">
                  <rect
                    width="112"
                    height="44"
                    rx="18"
                    fill="#020617"
                    fill-opacity="0.74"
                    stroke="#94A3B8"
                    stroke-opacity="0.2"
                  />
                  <text
                    x="18"
                    y="19"
                    fill="#ECFDF5"
                    font-size="12"
                    font-weight="700"
                    letter-spacing="1.5"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[0].label }}
                  </text>
                  <text
                    x="18"
                    y="31"
                    fill="#94A3B8"
                    font-size="10"
                  >{{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[0].desc }}</text>
                </g>
              </g>
            </g>

            <g class="orbital-set orbital-set-b">
              <ellipse
                cx="650"
                cy="430"
                rx="264"
                ry="304"
                stroke="#7DD3FC"
                stroke-opacity="0.16"
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
                  fill-opacity="0.14"
                />
                <g transform="translate(678 98)">
                  <rect
                    width="112"
                    height="44"
                    rx="18"
                    fill="#020617"
                    fill-opacity="0.74"
                    stroke="#94A3B8"
                    stroke-opacity="0.2"
                  />
                  <text
                    x="18"
                    y="19"
                    fill="#ECFDF5"
                    font-size="12"
                    font-weight="700"
                    letter-spacing="1.5"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[1].label }}
                  </text>
                  <text
                    x="18"
                    y="31"
                    fill="#94A3B8"
                    font-size="10"
                  >{{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[1].desc }}</text>
                </g>
              </g>
            </g>

            <g class="orbital-set orbital-set-c">
              <ellipse
                cx="650"
                cy="430"
                rx="398"
                ry="174"
                stroke="#E2E8F0"
                stroke-opacity="0.12"
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
                  fill-opacity="0.14"
                />
                <g transform="translate(92 404)">
                  <rect
                    width="130"
                    height="44"
                    rx="18"
                    fill="#020617"
                    fill-opacity="0.74"
                    stroke="#94A3B8"
                    stroke-opacity="0.2"
                  />
                  <text
                    x="18"
                    y="19"
                    fill="#ECFDF5"
                    font-size="12"
                    font-weight="700"
                    letter-spacing="1.5"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[2].label }}
                  </text>
                  <text
                    x="18"
                    y="31"
                    fill="#94A3B8"
                    font-size="10"
                  >{{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[2].desc }}</text>
                </g>
              </g>
            </g>

            <g class="orbital-set orbital-set-d">
              <ellipse
                cx="650"
                cy="430"
                rx="188"
                ry="362"
                stroke="#34D399"
                stroke-opacity="0.14"
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
                  fill-opacity="0.12"
                />
                <g transform="translate(676 764)">
                  <rect
                    width="128"
                    height="44"
                    rx="18"
                    fill="#020617"
                    fill-opacity="0.74"
                    stroke="#94A3B8"
                    stroke-opacity="0.2"
                  />
                  <text
                    x="18"
                    y="19"
                    fill="#ECFDF5"
                    font-size="12"
                    font-weight="700"
                    letter-spacing="1.5"
                  >
                    {{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[3].label }}
                  </text>
                  <text
                    x="18"
                    y="31"
                    fill="#94A3B8"
                    font-size="10"
                  >{{ CARBON_ORBIT_CONSTANTS.telemetryFeeds[3].desc }}</text>
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
  background: linear-gradient(145deg, rgba(2, 6, 23, 0.96), rgba(6, 24, 27, 0.92));
}

.orbit-background {
  background:
    radial-gradient(circle at 16% 20%, rgba(52, 211, 153, 0.16), transparent 24%),
    radial-gradient(circle at 82% 18%, rgba(56, 189, 248, 0.16), transparent 20%),
    radial-gradient(circle at 64% 82%, rgba(13, 148, 136, 0.16), transparent 22%),
    linear-gradient(145deg, #020617 0%, #071c20 48%, #020617 100%);
}

.orbit-noise {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 48px 48px;
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
