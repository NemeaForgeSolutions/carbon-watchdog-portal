<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { notFoundRecoveryLinks as recoveryLinks } from '@/data/siteContent';

const route = useRoute();
const attemptedPath = computed(() => route.fullPath);

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
    class="not-found-shell relative min-h-[76vh] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[var(--panel-border)] shadow-[var(--shadow-lg)] lg:min-h-[calc(100vh-12rem)]"
  >
    <div class="not-found-background absolute inset-0"></div>
    <div
      class="relative z-10 grid min-h-[76vh] items-center gap-6 sm:gap-8 p-3.5 sm:p-6 lg:min-h-[calc(100vh-12rem)] lg:grid-cols-[minmax(320px,0.42fr)_minmax(0,1fr)] lg:p-8"
    >
      <article
        class="cw-animate-in rounded-[1.25rem] sm:rounded-[1.5rem] border border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/62 p-5 sm:p-7 backdrop-blur-xl shadow-2xl"
      >
        <p
          class="m-0 text-[0.66rem] font-bold tracking-[0.28em] text-emerald-700 dark:text-emerald-400 uppercase inline-flex items-center gap-2"
        >
          <span
            class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500"
            aria-hidden="true"
          ></span>
          Route integrity alert
        </p>
        <h2
          class="mt-3 text-[clamp(1.45rem,3.4vw,2.45rem)] leading-[1.1] font-black text-[var(--title)] capitalize"
          style="font-family: Sora, 'Avenir Next', sans-serif"
        >
          404: signal lost in carbon orbit
        </h2>
        <p class="mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-[var(--text-muted)]">
          The URL you requested does not exist in this monitoring portal. Think of it as a drift
          outside our known project and buyer constellation.
        </p>

        <p class="mt-4 text-[0.85rem] sm:text-[0.92rem] text-[var(--text-soft)]">
          Requested path:
          <span
            class="ml-1 sm:ml-2 inline-block rounded-full border border-[var(--chip-border)] bg-[var(--chip-bg)] px-2.5 py-1 font-mono text-[0.76rem] sm:text-[0.8rem] text-[var(--title)] break-all"
            >{{ attemptedPath }}</span
          >
        </p>

        <div class="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
          <RouterLink
            v-for="link in recoveryLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full border border-border/70 dark:border-white/10 bg-secondary dark:bg-white/6 px-3.5 py-2 text-xs sm:text-sm font-bold text-secondary-foreground dark:text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-emerald-500/50 hover:bg-emerald-500/10 active:scale-95 focus-visible:shadow-[var(--focus-ring)]"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </article>

      <div
        ref="sceneRef"
        class="not-found-scene relative aspect-[4/3] min-h-[240px] sm:aspect-auto sm:min-h-[360px] lg:min-h-full"
        :style="sceneStyle"
        aria-hidden="true"
        @pointermove="onPointerMove"
        @pointerleave="resetPointer"
      >
        <div class="not-found-parallax">
          <svg
            class="not-found-svg"
            viewBox="0 0 1200 920"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient
                id="nfGlow"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(650 442) rotate(90) scale(360 360)"
              >
                <stop
                  stop-color="#22C55E"
                  stop-opacity="0.28"
                />
                <stop
                  offset="1"
                  stop-color="#22C55E"
                  stop-opacity="0"
                />
              </radialGradient>
              <radialGradient
                id="nfCore"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(650 442) rotate(90) scale(210 210)"
              >
                <stop stop-color="#ECFDF5" />
                <stop
                  offset="0.2"
                  stop-color="#86EFAC"
                />
                <stop
                  offset="0.56"
                  stop-color="#14532D"
                />
                <stop
                  offset="1"
                  stop-color="#020617"
                />
              </radialGradient>
            </defs>

            <g class="nf-grid">
              <path
                d="M110 680C278 590 438 548 650 548C862 548 1022 590 1190 680"
                stroke="#94A3B8"
                stroke-opacity="0.12"
                stroke-width="2"
              />
              <path
                d="M158 734C314 644 454 610 650 610C846 610 986 644 1142 734"
                stroke="#94A3B8"
                stroke-opacity="0.1"
                stroke-width="2"
              />
              <path
                d="M280 782C408 708 514 670 650 670C786 670 892 708 1020 782"
                stroke="#94A3B8"
                stroke-opacity="0.08"
                stroke-width="2"
              />
            </g>

            <g class="nf-rift-field">
              <circle
                cx="650"
                cy="442"
                r="284"
                fill="url(#nfGlow)"
              />
              <ellipse
                class="nf-rift-ring"
                cx="650"
                cy="442"
                rx="306"
                ry="116"
                stroke="#22C55E"
                stroke-opacity="0.12"
                stroke-width="3"
              />
              <ellipse
                class="nf-rift-ring nf-rift-ring-alt"
                cx="650"
                cy="442"
                rx="348"
                ry="138"
                stroke="#7DD3FC"
                stroke-opacity="0.1"
                stroke-width="2"
                stroke-dasharray="10 14"
              />
            </g>

            <g class="nf-core-group">
              <circle
                class="nf-core"
                cx="650"
                cy="442"
                r="176"
                fill="url(#nfCore)"
              />
              <path
                class="nf-crack"
                d="M612 286L668 388L622 446L684 560"
                stroke="#020617"
                stroke-opacity="0.66"
                stroke-width="18"
                stroke-linecap="round"
              />
              <path
                class="nf-crack"
                d="M702 322L660 392L706 458L662 532"
                stroke="#052E2B"
                stroke-opacity="0.72"
                stroke-width="10"
                stroke-linecap="round"
              />
              <g class="nf-fragments">
                <path
                  d="M508 360C548 330 586 324 620 346C578 376 548 404 526 436C500 418 488 390 508 360Z"
                  fill="#0F766E"
                  fill-opacity="0.4"
                />
                <path
                  d="M722 346C766 370 792 412 784 458C734 438 698 438 662 458C676 414 692 382 722 346Z"
                  fill="#38BDF8"
                  fill-opacity="0.22"
                />
                <path
                  d="M588 516C632 498 672 502 716 536C680 570 632 582 592 568C574 552 570 532 588 516Z"
                  fill="#22C55E"
                  fill-opacity="0.24"
                />
              </g>
            </g>

            <g class="nf-orbit nf-orbit-one">
              <ellipse
                cx="650"
                cy="442"
                rx="334"
                ry="146"
                stroke="#E2E8F0"
                stroke-opacity="0.16"
                stroke-width="2"
              />
              <g class="nf-card nf-card-one">
                <circle
                  cx="984"
                  cy="442"
                  r="11"
                  fill="#F8FAFC"
                />
                <circle
                  cx="984"
                  cy="442"
                  r="26"
                  fill="#34D399"
                  fill-opacity="0.12"
                />
                <g transform="translate(1010 416)">
                  <rect
                    width="136"
                    height="48"
                    rx="18"
                    fill="#020617"
                    fill-opacity="0.78"
                    stroke="#94A3B8"
                    stroke-opacity="0.22"
                  />
                  <text
                    x="16"
                    y="19"
                    fill="#ECFDF5"
                    font-size="12"
                    font-weight="700"
                    letter-spacing="1"
                  >
                    BUYER EXPOSURE
                  </text>
                  <text
                    x="16"
                    y="33"
                    fill="#94A3B8"
                    font-size="10"
                  >
                    Portfolio map
                  </text>
                </g>
              </g>
            </g>

            <g class="nf-orbit nf-orbit-two">
              <ellipse
                cx="650"
                cy="442"
                rx="250"
                ry="324"
                stroke="#7DD3FC"
                stroke-opacity="0.14"
                stroke-width="2"
                stroke-dasharray="8 12"
              />
              <g class="nf-card nf-card-two">
                <circle
                  cx="650"
                  cy="118"
                  r="11"
                  fill="#F8FAFC"
                />
                <circle
                  cx="650"
                  cy="118"
                  r="26"
                  fill="#38BDF8"
                  fill-opacity="0.12"
                />
                <g transform="translate(676 88)">
                  <rect
                    width="124"
                    height="48"
                    rx="18"
                    fill="#020617"
                    fill-opacity="0.78"
                    stroke="#94A3B8"
                    stroke-opacity="0.22"
                  />
                  <text
                    x="16"
                    y="19"
                    fill="#ECFDF5"
                    font-size="12"
                    font-weight="700"
                    letter-spacing="1"
                  >
                    CREDIT STREAM
                  </text>
                  <text
                    x="16"
                    y="33"
                    fill="#94A3B8"
                    font-size="10"
                  >
                    Registry trace
                  </text>
                </g>
              </g>
            </g>

            <g class="nf-orbit nf-orbit-three">
              <ellipse
                cx="650"
                cy="442"
                rx="388"
                ry="170"
                stroke="#A7F3D0"
                stroke-opacity="0.12"
                stroke-width="2"
              />
              <g class="nf-card nf-card-three">
                <circle
                  cx="262"
                  cy="442"
                  r="11"
                  fill="#F8FAFC"
                />
                <circle
                  cx="262"
                  cy="442"
                  r="26"
                  fill="#22C55E"
                  fill-opacity="0.12"
                />
                <g transform="translate(86 416)">
                  <rect
                    width="118"
                    height="48"
                    rx="18"
                    fill="#020617"
                    fill-opacity="0.78"
                    stroke="#94A3B8"
                    stroke-opacity="0.22"
                  />
                  <text
                    x="16"
                    y="19"
                    fill="#ECFDF5"
                    font-size="12"
                    font-weight="700"
                    letter-spacing="1"
                  >
                    RISK SIGNAL
                  </text>
                  <text
                    x="16"
                    y="33"
                    fill="#94A3B8"
                    font-size="10"
                  >
                    Integrity drift
                  </text>
                </g>
              </g>
            </g>

            <g class="nf-orbit nf-orbit-four">
              <ellipse
                cx="650"
                cy="442"
                rx="168"
                ry="364"
                stroke="#34D399"
                stroke-opacity="0.14"
                stroke-width="2"
                stroke-dasharray="6 10"
              />
              <g class="nf-card nf-card-four">
                <circle
                  cx="650"
                  cy="806"
                  r="11"
                  fill="#F8FAFC"
                />
                <circle
                  cx="650"
                  cy="806"
                  r="26"
                  fill="#34D399"
                  fill-opacity="0.12"
                />
                <g transform="translate(676 778)">
                  <rect
                    width="118"
                    height="48"
                    rx="18"
                    fill="#020617"
                    fill-opacity="0.78"
                    stroke="#94A3B8"
                    stroke-opacity="0.22"
                  />
                  <text
                    x="16"
                    y="19"
                    fill="#ECFDF5"
                    font-size="12"
                    font-weight="700"
                    letter-spacing="1"
                  >
                    AUDIT TRAIL
                  </text>
                  <text
                    x="16"
                    y="33"
                    fill="#94A3B8"
                    font-size="10"
                  >
                    Review chain
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
.not-found-shell {
  background: linear-gradient(150deg, rgba(2, 6, 23, 0.96), rgba(5, 36, 31, 0.92));
}

.not-found-background {
  background:
    radial-gradient(circle at 18% 22%, rgba(56, 189, 248, 0.16), transparent 18%),
    radial-gradient(circle at 78% 18%, rgba(34, 197, 94, 0.16), transparent 20%),
    radial-gradient(circle at 64% 80%, rgba(16, 185, 129, 0.12), transparent 22%),
    linear-gradient(145deg, #020617 0%, #071816 48%, #020617 100%);
}

.not-found-scene {
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
}

.not-found-parallax {
  height: 100%;
  transform: perspective(1600px) rotateX(calc(var(--pointer-y, 0) * -5deg))
    rotateY(calc(var(--pointer-x, 0) * 7deg))
    translate3d(calc(var(--pointer-x, 0) * -12px), calc(var(--pointer-y, 0) * -10px), 0);
  transform-style: preserve-3d;
  transition: transform 180ms ease-out;
}

.not-found-svg {
  width: 100%;
  height: 100%;
  min-height: 240px;
}

.nf-grid {
  animation: nf-grid-drift 16s ease-in-out infinite;
}

.nf-rift-field {
  transform-origin: 650px 442px;
  animation: nf-rift-pulse 8s ease-in-out infinite;
}

.nf-rift-ring-alt {
  animation: nf-rift-spin 24s linear infinite;
  transform-origin: 650px 442px;
}

.nf-core-group {
  transform-origin: 650px 442px;
  animation: nf-core-float 9s ease-in-out infinite;
}

.nf-core,
.nf-fragments,
.nf-crack {
  transform-origin: 650px 442px;
  animation: nf-core-rotate 24s linear infinite;
}

.nf-orbit {
  transform-origin: 650px 442px;
}

.nf-orbit-one {
  animation: nf-orbit-a 16s linear infinite;
}

.nf-orbit-two {
  animation: nf-orbit-b 21s linear infinite reverse;
}

.nf-orbit-three {
  animation: nf-orbit-c 26s linear infinite;
}

.nf-orbit-four {
  animation: nf-orbit-d 20s linear infinite reverse;
}

.nf-card {
  animation: nf-card-hover 6.2s ease-in-out infinite;
}

.nf-card-two {
  animation-delay: -1.4s;
}

.nf-card-three {
  animation-delay: -2.8s;
}

.nf-card-four {
  animation-delay: -3.7s;
}

@keyframes nf-grid-drift {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
}

@keyframes nf-rift-pulse {
  0%,
  100% {
    opacity: 0.52;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.96;
    transform: scale(1.04);
  }
}

@keyframes nf-rift-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes nf-core-float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-14px);
  }
}

@keyframes nf-core-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes nf-orbit-a {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes nf-orbit-b {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes nf-orbit-c {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes nf-orbit-d {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes nf-card-hover {
  0%,
  100% {
    opacity: 0.88;
    transform: translateY(0px);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px);
  }
}

@media (max-width: 640px) {
  .not-found-svg {
    min-height: 240px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .not-found-parallax,
  .nf-grid,
  .nf-rift-field,
  .nf-rift-ring-alt,
  .nf-core-group,
  .nf-core,
  .nf-fragments,
  .nf-crack,
  .nf-orbit,
  .nf-card {
    animation: none !important;
  }

  .not-found-parallax {
    transform: none !important;
    transition: none !important;
  }
}
</style>
