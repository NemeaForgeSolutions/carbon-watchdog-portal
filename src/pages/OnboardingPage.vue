<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import PageHero from '@/components/PageHero.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import {
  onboardingImportSourceOptions as importSourceOptions,
  onboardingIndustryOptions as industryOptions,
  onboardingInviteRoleOptions as inviteRoleOptions,
  onboardingRegionOptions as regionOptions,
  onboardingSteps as steps,
} from '@/data/siteContent';
import { EMAIL_PATTERN } from '@/constants';
import Input from '@/components/ui/input/Input.vue';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { useOnboarding } from '@/composables/useOnboarding';

type FeedbackTone = 'success' | 'error' | 'info';

const {
  status,
  importJobs,
  loading,
  errorMessage,
  refreshOnboarding,
  startOnboarding,
  inviteUser,
  queueImport,
  completeOnboarding,
} = useOnboarding();

const organizationName = ref('');
const industry = ref('');
const region = ref('');
const websiteUrl = ref('');
const adminEmail = ref('');

const inviteEmail = ref('');
const inviteRole = ref('analyst');
const importSource = ref('csv');
const importDescription = ref('Initial project registry upload');

const actionMessage = ref('');
const feedbackTone = ref<FeedbackTone>('info');
const submitting = ref(false);

type OrganizationFieldKey = 'organizationName' | 'adminEmail' | 'websiteUrl';
type InviteFieldKey = 'inviteEmail' | 'inviteRole';
type ImportFieldKey = 'importSource';

const organizationFieldErrors = ref<Record<OrganizationFieldKey, string>>({
  organizationName: '',
  adminEmail: '',
  websiteUrl: '',
});

const inviteFieldErrors = ref<Record<InviteFieldKey, string>>({
  inviteEmail: '',
  inviteRole: '',
});

const importFieldErrors = ref<Record<ImportFieldKey, string>>({
  importSource: '',
});

const emailPattern = EMAIL_PATTERN;


let refreshTimer: number | null = null;

const summaryStats = computed(() => [
  { label: 'Current step', value: status.value?.currentStep || 'organization' },
  { label: 'Completed steps', value: String(status.value?.completedSteps.length || 0) },
  { label: 'Pending steps', value: String(status.value?.pendingSteps.length || steps.length) },
]);

const completionRatio = computed(() => {
  const completed = status.value?.completedSteps.length || 0;
  return Math.round((completed / steps.length) * 100);
});

const hasActiveImports = computed(() =>
  importJobs.value.some((job) => job.status === 'queued' || job.status === 'processing'),
);

const statusHighlights = computed(() => [
  { label: 'Queued', value: String(status.value?.importQueued || 0) },
  { label: 'Processing', value: String(status.value?.importRunning || 0) },
  { label: 'Completed', value: String(status.value?.importDone || 0) },
  { label: 'Failed', value: String(status.value?.importFailed || 0) },
]);

const feedbackMessage = computed(() => {
  if (actionMessage.value) return actionMessage.value;
  if (errorMessage.value) return errorMessage.value;
  if (loading.value) return 'Loading onboarding status...';
  return '';
});

const feedbackCardClass = computed(() => {
  if (actionMessage.value) {
    return feedbackTone.value === 'success'
      ? 'border-emerald-500/25 bg-emerald-500/10 backdrop-blur'
      : 'border-amber-500/25 bg-amber-500/10 backdrop-blur';
  }

  if (errorMessage.value) return 'border-amber-500/25 bg-amber-500/10 backdrop-blur';
  return 'border-sky-500/25 bg-sky-500/10 backdrop-blur';
});

const feedbackBadgeClass = computed(() => {
  if (actionMessage.value) {
    return feedbackTone.value === 'success'
      ? 'border-emerald-500/25 bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-300'
      : 'border-amber-500/25 bg-amber-500/15 font-semibold text-amber-700 dark:text-amber-300';
  }

  if (errorMessage.value)
    return 'border-amber-500/25 bg-amber-500/15 font-semibold text-amber-700 dark:text-amber-300';
  return 'border-sky-500/25 bg-sky-500/15 font-semibold text-sky-700 dark:text-sky-300';
});

const feedbackBadgeLabel = computed(() => {
  if (actionMessage.value) return feedbackTone.value === 'success' ? 'Updated' : 'Attention';
  if (errorMessage.value) return 'Attention';
  return 'Syncing';
});

const feedbackTextClass = computed(() => {
  if (actionMessage.value) {
    return feedbackTone.value === 'success'
      ? 'text-emerald-950 dark:text-emerald-50/90'
      : 'text-amber-950 dark:text-amber-50/90';
  }

  if (errorMessage.value) return 'text-amber-950 dark:text-amber-50/90';
  return 'text-sky-950 dark:text-sky-50/90';
});

const setFeedback = (message: string, tone: FeedbackTone) => {
  actionMessage.value = message;
  feedbackTone.value = tone;
};

const resetFeedback = () => {
  actionMessage.value = '';
  feedbackTone.value = 'info';
};

const isValidOptionalUrl = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) return true;

  try {
    const parsedValue = new window.URL(trimmedValue);
    return parsedValue.protocol === 'http:' || parsedValue.protocol === 'https:';
  } catch {
    return false;
  }
};

const clearOrganizationFieldError = (field: OrganizationFieldKey) => {
  if (organizationFieldErrors.value[field]) {
    organizationFieldErrors.value[field] = '';
  }
};

const clearInviteFieldError = (field: InviteFieldKey) => {
  if (inviteFieldErrors.value[field]) {
    inviteFieldErrors.value[field] = '';
  }
};

const clearImportFieldError = (field: ImportFieldKey) => {
  if (importFieldErrors.value[field]) {
    importFieldErrors.value[field] = '';
  }
};

const validateOrganizationForm = () => {
  organizationFieldErrors.value = {
    organizationName: organizationName.value.trim() ? '' : 'Enter the organization name.',
    adminEmail: emailPattern.test(adminEmail.value.trim()) ? '' : 'Enter a valid admin email.',
    websiteUrl: isValidOptionalUrl(websiteUrl.value)
      ? ''
      : 'Enter a valid website URL, including https://.',
  };

  return !Object.values(organizationFieldErrors.value).some(Boolean);
};

const validateInviteForm = () => {
  inviteFieldErrors.value = {
    inviteEmail: emailPattern.test(inviteEmail.value.trim()) ? '' : 'Enter a valid reviewer email.',
    inviteRole: inviteRole.value ? '' : 'Select a reviewer role.',
  };

  return !Object.values(inviteFieldErrors.value).some(Boolean);
};

const validateImportForm = () => {
  importFieldErrors.value = {
    importSource: importSource.value ? '' : 'Select a source type.',
  };

  return !Object.values(importFieldErrors.value).some(Boolean);
};

const importStatusClass = (statusValue: string) => {
  if (statusValue === 'completed')
    return 'border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300';
  if (statusValue === 'failed')
    return 'border-red-500/30 bg-red-500/10 font-semibold text-red-700 dark:text-red-300';
  if (statusValue === 'processing')
    return 'border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300';
  return 'border-amber-500/30 bg-amber-500/10 font-semibold text-amber-700 dark:text-amber-300';
};

const onStart = async () => {
  resetFeedback();

  if (!validateOrganizationForm()) {
    return;
  }

  organizationName.value = organizationName.value.trim();
  adminEmail.value = adminEmail.value.trim();
  websiteUrl.value = websiteUrl.value.trim();
  submitting.value = true;
  try {
    await startOnboarding({
      organizationName: organizationName.value,
      industry: industry.value,
      region: region.value,
      websiteUrl: websiteUrl.value,
      adminEmail: adminEmail.value,
    });
    setFeedback(
      'Organization profile saved. Continue with reviewer access and import setup.',
      'success',
    );
  } catch {
    setFeedback('Could not start onboarding. Please verify API availability.', 'error');
  } finally {
    submitting.value = false;
  }
};

const onInvite = async () => {
  resetFeedback();

  if (!validateInviteForm()) {
    return;
  }

  inviteEmail.value = inviteEmail.value.trim();
  submitting.value = true;
  try {
    await inviteUser({ email: inviteEmail.value, role: inviteRole.value });
    setFeedback('Reviewer invite queued successfully.', 'success');
    inviteEmail.value = '';
  } catch {
    setFeedback('Unable to queue invite right now.', 'error');
  } finally {
    submitting.value = false;
  }
};

const onImport = async () => {
  resetFeedback();

  if (!validateImportForm()) {
    return;
  }

  importDescription.value = importDescription.value.trim();
  submitting.value = true;
  try {
    await queueImport({ sourceType: importSource.value, description: importDescription.value });
    setFeedback('Import job queued. Readiness will update as processing completes.', 'success');
  } catch {
    setFeedback('Unable to queue import.', 'error');
  } finally {
    submitting.value = false;
  }
};

const onComplete = async () => {
  resetFeedback();
  submitting.value = true;
  try {
    await completeOnboarding();
    setFeedback('Onboarding marked complete. Tenant is now operational.', 'success');
  } catch {
    setFeedback('Unable to complete onboarding.', 'error');
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  void refreshOnboarding();
  refreshTimer = window.setInterval(() => {
    if (hasActiveImports.value) {
      void refreshOnboarding();
    }
  }, 4000);
});

onBeforeUnmount(() => {
  if (refreshTimer !== null) {
    window.clearInterval(refreshTimer);
  }
});
</script>

<template>
  <div class="space-y-8">
    <PageHero
      eyebrow="Customer onboarding"
      title="Configure a tenant, invite reviewers, and activate ingestion"
      description="This workflow captures the organization profile, establishes reviewer access, queues initial registry imports, and tracks readiness toward the first monitored report."
      :stats="summaryStats"
    />

    <Card class="cw-animate-in cw-delay-1 border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6 lg:p-7">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge
              variant="secondary"
              class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1.5"
            >
              <span class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
              Launch readiness
            </Badge>
            <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
              Track setup progress without leaving the workflow.
            </h3>
          </div>

          <p class="text-foreground text-sm font-semibold">
            {{ completionRatio }}% complete
          </p>
        </div>

        <div class="bg-muted mt-4 h-2 rounded-full overflow-hidden">
          <div
            class="h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-700 ease-out"
            :style="{ width: `${completionRatio}%` }"
          ></div>
        </div>

        <div class="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 sm:gap-3">
          <div
            v-for="step in steps"
            :key="step.key"
            class="rounded-[1.15rem] border p-2.5 sm:p-3 text-[0.68rem] sm:text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300"
            :class="
              status?.completedSteps.includes(step.key)
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'border-border/80 bg-muted/40 text-muted-foreground'
            "
          >
            {{ step.label }}
          </div>
        </div>

        <div class="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-2 xl:grid-cols-4 sm:gap-3">
          <div
            v-for="item in statusHighlights"
            :key="item.label"
            class="cw-card-interactive border-border/80 bg-muted/40 rounded-[1.15rem] border p-3.5 sm:p-4 transition-all duration-300 hover:border-emerald-500/40 hover:bg-muted/60 hover:shadow-sm"
          >
            <p
              class="text-muted-foreground text-[0.66rem] sm:text-[0.68rem] font-semibold tracking-[0.18em] uppercase"
            >
              {{ item.label }}
            </p>
            <p class="text-foreground mt-1 sm:mt-2 text-xl sm:text-2xl font-black">
              {{ item.value }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <section class="cw-animate-in cw-delay-2 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            Organization profile
          </Badge>
          <h3 class="mt-3 text-2xl font-black text-foreground">
            Register the operating entity.
          </h3>

          <form
            class="mt-6"
            novalidate
            @submit.prevent="onStart"
          >
            <FieldSet>
              <FieldLegend class="sr-only">
                Organization profile fields
              </FieldLegend>

              <FieldGroup class="gap-5">
                <div class="grid gap-5 md:grid-cols-2">
                  <Field
                    class="gap-2"
                    :data-invalid="organizationFieldErrors.organizationName ? true : undefined"
                  >
                    <FieldLabel for="organization-name">
                      Organization name
                    </FieldLabel>
                    <Input
                      id="organization-name"
                      v-model="organizationName"
                      placeholder="Acme Climate Holdings"
                      :aria-invalid="organizationFieldErrors.organizationName ? true : undefined"
                      @update:model-value="clearOrganizationFieldError('organizationName')"
                    />
                    <FieldDescription>
                      Register the legal or operating entity for this tenant workspace.
                    </FieldDescription>
                    <FieldError
                      :errors="
                        organizationFieldErrors.organizationName
                          ? [organizationFieldErrors.organizationName]
                          : undefined
                      "
                    />
                  </Field>

                  <Field
                    class="gap-2"
                    :data-invalid="organizationFieldErrors.adminEmail ? true : undefined"
                  >
                    <FieldLabel for="admin-email">
                      Admin email
                    </FieldLabel>
                    <Input
                      id="admin-email"
                      v-model="adminEmail"
                      type="email"
                      placeholder="owner@acme.com"
                      :aria-invalid="organizationFieldErrors.adminEmail ? true : undefined"
                      @update:model-value="clearOrganizationFieldError('adminEmail')"
                    />
                    <FieldDescription>
                      This address becomes the initial organization owner in the workflow.
                    </FieldDescription>
                    <FieldError
                      :errors="
                        organizationFieldErrors.adminEmail
                          ? [organizationFieldErrors.adminEmail]
                          : undefined
                      "
                    />
                  </Field>

                  <Field class="gap-2">
                    <FieldLabel for="industry">
                      Industry
                    </FieldLabel>
                    <Select v-model="industry">
                      <SelectTrigger
                        id="industry"
                        class="w-full"
                      >
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="option in industryOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Optional, but useful for benchmark context and buyer positioning.
                    </FieldDescription>
                  </Field>

                  <Field class="gap-2">
                    <FieldLabel for="region">
                      Primary region
                    </FieldLabel>
                    <Select v-model="region">
                      <SelectTrigger
                        id="region"
                        class="w-full"
                      >
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="option in regionOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Optional. Use the main operating or reporting jurisdiction for the tenant.
                    </FieldDescription>
                  </Field>
                </div>

                <Field
                  class="gap-2"
                  :data-invalid="organizationFieldErrors.websiteUrl ? true : undefined"
                >
                  <FieldLabel for="website-url">
                    Website
                  </FieldLabel>
                  <Input
                    id="website-url"
                    v-model="websiteUrl"
                    type="url"
                    placeholder="https://acme.com"
                    :aria-invalid="organizationFieldErrors.websiteUrl ? true : undefined"
                    @update:model-value="clearOrganizationFieldError('websiteUrl')"
                  />
                  <FieldDescription>
                    Optional. Add the public site if the organization has one.
                  </FieldDescription>
                  <FieldError
                    :errors="
                      organizationFieldErrors.websiteUrl
                        ? [organizationFieldErrors.websiteUrl]
                        : undefined
                    "
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                class="w-full sm:w-auto"
                :disabled="submitting"
              >
                Save organization profile
              </Button>
            </FieldSet>
          </form>
        </CardContent>
      </Card>

      <div class="grid gap-6">
        <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
          <CardContent class="p-4 sm:p-6 lg:p-7">
            <Badge
              variant="secondary"
              class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300"
            >
              Reviewer access
            </Badge>
            <form
              class="mt-5"
              novalidate
              @submit.prevent="onInvite"
            >
              <FieldSet>
                <FieldLegend class="sr-only">
                  Reviewer access fields
                </FieldLegend>

                <FieldGroup class="gap-5">
                  <Field
                    class="gap-2"
                    :data-invalid="inviteFieldErrors.inviteEmail ? true : undefined"
                  >
                    <FieldLabel for="invite-email">
                      Reviewer email
                    </FieldLabel>
                    <Input
                      id="invite-email"
                      v-model="inviteEmail"
                      type="email"
                      placeholder="analyst@acme.com"
                      :aria-invalid="inviteFieldErrors.inviteEmail ? true : undefined"
                      @update:model-value="clearInviteFieldError('inviteEmail')"
                    />
                    <FieldDescription>
                      Queue access for the reviewer who should validate early data quality.
                    </FieldDescription>
                    <FieldError
                      :errors="
                        inviteFieldErrors.inviteEmail ? [inviteFieldErrors.inviteEmail] : undefined
                      "
                    />
                  </Field>

                  <Field
                    class="gap-2"
                    :data-invalid="inviteFieldErrors.inviteRole ? true : undefined"
                  >
                    <FieldLabel for="invite-role">
                      Role
                    </FieldLabel>
                    <Select
                      v-model="inviteRole"
                      @update:model-value="clearInviteFieldError('inviteRole')"
                    >
                      <SelectTrigger
                        id="invite-role"
                        class="w-full"
                        :aria-invalid="inviteFieldErrors.inviteRole ? true : undefined"
                      >
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="option in inviteRoleOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Choose the initial permission level for the invited reviewer.
                    </FieldDescription>
                    <FieldError
                      :errors="
                        inviteFieldErrors.inviteRole ? [inviteFieldErrors.inviteRole] : undefined
                      "
                    />
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  variant="secondary"
                  class="w-full"
                  :disabled="submitting"
                >
                  Queue reviewer invite
                </Button>
              </FieldSet>
            </form>
          </CardContent>
        </Card>

        <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
          <CardContent class="p-4 sm:p-6 lg:p-7">
            <Badge
              variant="secondary"
              class="border-amber-500/30 bg-amber-500/10 font-semibold text-amber-700 dark:text-amber-300"
            >
              Data ingestion
            </Badge>
            <form
              class="mt-5"
              novalidate
              @submit.prevent="onImport"
            >
              <FieldSet>
                <FieldLegend class="sr-only">
                  Data ingestion fields
                </FieldLegend>

                <FieldGroup class="gap-5">
                  <Field
                    class="gap-2"
                    :data-invalid="importFieldErrors.importSource ? true : undefined"
                  >
                    <FieldLabel for="import-source">
                      Source type
                    </FieldLabel>
                    <Select
                      v-model="importSource"
                      @update:model-value="clearImportFieldError('importSource')"
                    >
                      <SelectTrigger
                        id="import-source"
                        class="w-full"
                        :aria-invalid="importFieldErrors.importSource ? true : undefined"
                      >
                        <SelectValue placeholder="Select a source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="option in importSourceOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Select the first registry or feed type you want the worker to process.
                    </FieldDescription>
                    <FieldError
                      :errors="
                        importFieldErrors.importSource
                          ? [importFieldErrors.importSource]
                          : undefined
                      "
                    />
                  </Field>

                  <Field class="gap-2">
                    <FieldLabel for="import-description">
                      Import description
                    </FieldLabel>
                    <Textarea
                      id="import-description"
                      v-model="importDescription"
                      rows="4"
                    />
                    <FieldDescription>
                      Optional. Describe the batch, registry export, or readiness goal for this
                      import.
                    </FieldDescription>
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  variant="outline"
                  class="w-full"
                  :disabled="submitting"
                >
                  Queue import
                </Button>
              </FieldSet>
            </form>
          </CardContent>
        </Card>

        <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
          <CardContent class="p-4 sm:p-6 lg:p-7">
            <Badge
              variant="secondary"
              class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
            >
              Go-live control
            </Badge>
            <p class="text-muted-foreground mt-4 text-sm leading-7">
              Mark the tenant complete once the organization, reviewer access, import readiness, and
              baseline reporting steps are all verified.
            </p>
            <Button
              class="mt-5 w-full"
              :disabled="submitting"
              @click="onComplete"
            >
              Mark onboarding complete
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>

    <Card class="border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl">
      <CardContent class="p-4 sm:p-6 lg:p-7">
        <Badge
          variant="secondary"
          class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
        >
          Import jobs
        </Badge>
        <h3 class="mt-3 text-2xl font-black text-foreground">
          Track ingestion status and failure details.
        </h3>

        <div
          v-if="importJobs.length === 0"
          class="border-border/80 bg-muted/40 text-muted-foreground mt-5 rounded-[1.15rem] border px-4 py-3 text-sm"
        >
          No import jobs yet. Queue a CSV, registry API, or S3 job to start the pipeline.
        </div>

        <div class="mt-5 space-y-4">
          <div
            v-for="job in importJobs"
            :key="job.id"
            class="border-border/80 bg-muted/40 mt-5 rounded-[1.35rem] border p-4 shadow-sm backdrop-blur-sm"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="text-foreground text-sm font-semibold">
                {{ job.sourceType }}: {{ job.description || 'Import job' }}
              </p>
              <span
                class="rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase"
                :class="importStatusClass(job.status)"
              >
                {{ job.status }}
              </span>
            </div>

            <div class="bg-muted mt-3 h-2 rounded-full">
              <div
                class="h-2 rounded-full bg-sky-500 dark:bg-sky-400"
                :style="{ width: `${job.progressPercent || 0}%` }"
              ></div>
            </div>

            <p class="text-muted-foreground mt-2 text-xs">
              Created: {{ job.createdAt }}
              <span v-if="job.completedAt"> | Completed: {{ job.completedAt }}</span>
            </p>
            <p
              v-if="job.errorMessage"
              class="mt-2 text-xs text-red-600 dark:text-red-300"
            >
              {{ job.errorMessage }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card
      v-if="feedbackMessage"
      :class="feedbackCardClass"
    >
      <CardContent class="p-6">
        <Badge
          variant="secondary"
          :class="feedbackBadgeClass"
        >
          {{ feedbackBadgeLabel }}
        </Badge>
        <p :class="['mt-4 text-sm leading-7', feedbackTextClass]">
          {{ feedbackMessage }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
