<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PageHero from '@/components/PageHero.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import { API_BASE_URL, TENANT_ID } from '@/config/platform';
import {
  securityControls as controls,
  securitySummaryStats as summaryStats,
} from '@/data/siteContent';

const platformSettings = ref<Record<string, unknown> | null>(null);

const runtimeState = computed(() =>
  platformSettings.value
    ? {
        badge: 'Live tenant settings',
        description:
          'The settings endpoint responded, so the capability flags below reflect the current tenant runtime configuration.',
        badgeClass: 'border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300',
        panelClass: 'border-emerald-500/30 bg-emerald-500/5 text-card-foreground shadow-xl',
        textClass: 'text-muted-foreground',
      }
    : {
        badge: 'Fallback capability view',
        description:
          'The settings endpoint is unavailable, so this page shows the default enterprise capability surface used during diligence conversations.',
        badgeClass: 'border-amber-500/30 bg-amber-500/10 font-semibold text-amber-800 dark:text-amber-300',
        panelClass: 'border-amber-500/30 bg-amber-500/5 text-card-foreground shadow-xl',
        textClass: 'text-muted-foreground',
      },
);

const enterpriseFlags = computed(() => {
  const enterprise =
    (platformSettings.value?.enterprise as Record<string, unknown> | undefined) || {};
  return [
    { label: 'Tier', value: String(enterprise.tier || 'standard') },
    { label: 'SSO', value: enterprise.enableSso ? 'Enabled' : 'Disabled' },
    { label: 'SCIM', value: enterprise.enableScim ? 'Enabled' : 'Disabled' },
    { label: 'Webhook Push', value: enterprise.enableWebhookPush ? 'Enabled' : 'Disabled' },
    { label: 'Audit Exports', value: enterprise.enableAuditExports ? 'Enabled' : 'Disabled' },
    { label: 'API Keys', value: enterprise.enableApiKeys ? 'Enabled' : 'Disabled' },
  ];
});

onMounted(async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/settings`, {
      headers: { 'X-Tenant-ID': TENANT_ID },
    });
    if (!response.ok) {
      return;
    }
    platformSettings.value = (await response.json()) as Record<string, unknown>;
  } catch {
    platformSettings.value = null;
  }
});
</script>

<template>
  <div class="space-y-8 pb-4">
    <PageHero
      eyebrow="Trust center"
      title="Controls packaged for buyer diligence and operational review"
      description="This page translates platform security and governance into the language procurement, legal, and customer security teams expect during evaluation."
      :stats="summaryStats"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-6 xl:grid-cols-[1fr_1fr]">
      <Card class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-2xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge variant="secondary" class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300">
            Control posture
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Trust is framed around isolation, auditability, and predictable operations.
          </h3>
          <p class="mt-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
            The platform separates tenant access, preserves evidence lineage, and exposes
            operational feature flags clearly enough for customer security review without forcing
            backend deep dives.
          </p>
        </CardContent>
      </Card>

      <Card :class="['cw-card-interactive backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl', runtimeState.panelClass]">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge variant="secondary" :class="[runtimeState.badgeClass, 'inline-flex items-center gap-1.5']">
            <span class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
            {{ runtimeState.badge }}
          </Badge>
          <p :class="['mt-4 text-sm leading-6 sm:leading-7', runtimeState.textClass]">
            {{ runtimeState.description }}
          </p>
        </CardContent>
      </Card>
    </section>

    <section class="cw-animate-in cw-delay-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(control, index) in controls"
        :key="control.domain"
        :class="[
          'cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-500/50 hover:shadow-2xl',
          index === 2 && controls.length === 3 ? 'md:col-span-2 lg:col-span-1' : '',
        ]"
      >
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge variant="secondary" class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300">
            {{ control.domain }}
          </Badge>
          <ul class="mt-5 space-y-3 text-sm text-foreground">
            <li
              v-for="item in control.items"
              :key="item"
              class="border-border/80 bg-muted/50 rounded-[1.15rem] border px-4 py-3 leading-6 shadow-xs transition-colors duration-200 hover:border-sky-500/40 hover:bg-muted/70"
            >
              {{ item }}
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>

    <Card class="cw-animate-in cw-delay-3 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6 lg:p-7">
        <Badge variant="secondary" class="border-amber-500/30 bg-amber-500/10 font-semibold text-amber-800 dark:text-amber-300">
          Capability flags
        </Badge>
        <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
          Current enterprise capability surface
        </h3>
        <p class="mt-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
          Use these flags to explain how the tenant is configured today and which enterprise
          controls are already available for rollout planning.
        </p>
        <div class="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-3">
          <div
            v-for="flag in enterpriseFlags"
            :key="flag.label"
            class="cw-card-interactive border-border/80 bg-muted/50 rounded-[1.15rem] border p-3 sm:px-4 sm:py-3 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-muted/70 hover:shadow-xs"
          >
            <p class="text-muted-foreground text-[0.68rem] sm:text-xs font-bold tracking-[0.14em] uppercase">
              {{ flag.label }}
            </p>
            <p class="mt-1 text-xs sm:text-sm font-bold text-foreground">
              {{ flag.value }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
