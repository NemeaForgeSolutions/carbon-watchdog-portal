<script setup lang="ts">
import { ref } from 'vue';
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
  requestDemoAttendeeGuidance as attendeeGuidance,
  requestDemoBriefingAgenda as briefingAgenda,
  requestDemoPortfolioSizeOptions as portfolioSizeOptions,
  requestDemoSubmissionHighlights as submissionHighlights,
  requestDemoSummaryStats as summaryStats,
  requestDemoTeamRoleOptions as teamRoleOptions,
  requestDemoTimelineOptions as timelineOptions,
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

const company = ref('');
const fullName = ref('');
const email = ref('');
const teamRole = ref('');
const portfolioSize = ref('');
const timeline = ref('');
const goal = ref('');
const submitted = ref(false);

type DemoFieldKey =
  'company' | 'fullName' | 'email' | 'teamRole' | 'portfolioSize' | 'timeline' | 'goal';

const fieldErrors = ref<Record<DemoFieldKey, string>>({
  company: '',
  fullName: '',
  email: '',
  teamRole: '',
  portfolioSize: '',
  timeline: '',
  goal: '',
});

const clearFieldError = (field: DemoFieldKey) => {
  if (fieldErrors.value[field]) {
    fieldErrors.value[field] = '';
  }
};

const validateForm = () => {
  fieldErrors.value = {
    company: company.value.trim() ? '' : 'Enter the company name.',
    fullName: fullName.value.trim() ? '' : 'Enter the primary contact name.',
    email: EMAIL_PATTERN.test(email.value) ? '' : 'Enter a valid work email.',
    teamRole: teamRole.value ? '' : 'Select the owning team.',

    portfolioSize: portfolioSize.value ? '' : 'Select the scoped credit volume.',
    timeline: timeline.value ? '' : 'Select the decision timeline.',
    goal: goal.value.trim() ? '' : 'Describe the primary review question.',
  };

  return !Object.values(fieldErrors.value).some(Boolean);
};

const submitForm = () => {
  submitted.value = false;

  if (!validateForm()) {
    return;
  }

  submitted.value = true;
};
</script>

<template>
  <div class="space-y-8">
    <PageHero
      eyebrow="Commercial intake"
      title="Book a portfolio risk briefing"
      description="Capture the operating context for the first session so the walkthrough starts with actual project exposure, current review pressure, and the right pilot recommendation."
      :stats="summaryStats"
    />

    <section class="cw-animate-in cw-delay-1 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-2xl">
        <CardContent class="p-4 sm:p-6 lg:p-7">
          <Badge
            variant="secondary"
            class="border-amber-500/30 bg-amber-500/10 font-semibold text-amber-700 dark:text-amber-300"
          >
            Briefing request
          </Badge>
          <h3 class="mt-3 text-xl sm:text-2xl font-black text-foreground">
            Tell us who owns the claim and what needs review.
          </h3>
          <p class="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            This form stays local in the demo. In production it can route directly into CRM,
            onboarding, or a customer success queue.
          </p>

          <form
            class="mt-6"
            novalidate
            @submit.prevent="submitForm"
          >
            <FieldSet>
              <FieldLegend class="sr-only">
                Briefing request fields
              </FieldLegend>

              <FieldGroup class="gap-5">
                <div class="grid gap-5 md:grid-cols-2">
                  <Field
                    class="gap-2"
                    :data-invalid="fieldErrors.company ? true : undefined"
                  >
                    <FieldLabel for="company">
                      Company
                    </FieldLabel>
                    <Input
                      id="company"
                      v-model="company"
                      placeholder="Acme Climate Holdings"
                      :aria-invalid="fieldErrors.company ? true : undefined"
                      @update:model-value="clearFieldError('company')"
                    />
                    <FieldDescription>Use the legal or buyer-facing company name.</FieldDescription>
                    <FieldError :errors="fieldErrors.company ? [fieldErrors.company] : undefined" />
                  </Field>

                  <Field
                    class="gap-2"
                    :data-invalid="fieldErrors.fullName ? true : undefined"
                  >
                    <FieldLabel for="full-name">
                      Primary contact
                    </FieldLabel>
                    <Input
                      id="full-name"
                      v-model="fullName"
                      placeholder="Jordan Patel"
                      :aria-invalid="fieldErrors.fullName ? true : undefined"
                      @update:model-value="clearFieldError('fullName')"
                    />
                    <FieldDescription>Who should lead the first portfolio review?</FieldDescription>
                    <FieldError
                      :errors="fieldErrors.fullName ? [fieldErrors.fullName] : undefined"
                    />
                  </Field>

                  <Field
                    class="gap-2"
                    :data-invalid="fieldErrors.email ? true : undefined"
                  >
                    <FieldLabel for="work-email">
                      Work email
                    </FieldLabel>
                    <Input
                      id="work-email"
                      v-model="email"
                      type="email"
                      placeholder="jordan@acme.com"
                      :aria-invalid="fieldErrors.email ? true : undefined"
                      @update:model-value="clearFieldError('email')"
                    />
                    <FieldDescription>
                      We use this to send the agenda and follow-up notes.
                    </FieldDescription>
                    <FieldError :errors="fieldErrors.email ? [fieldErrors.email] : undefined" />
                  </Field>

                  <Field
                    class="gap-2"
                    :data-invalid="fieldErrors.teamRole ? true : undefined"
                  >
                    <FieldLabel for="team-role">
                      Owning team
                    </FieldLabel>
                    <Select
                      v-model="teamRole"
                      @update:model-value="clearFieldError('teamRole')"
                    >
                      <SelectTrigger
                        id="team-role"
                        class="w-full"
                        :aria-invalid="fieldErrors.teamRole ? true : undefined"
                      >
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="option in teamRoleOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Pick the team accountable for the buying decision.
                    </FieldDescription>
                    <FieldError
                      :errors="fieldErrors.teamRole ? [fieldErrors.teamRole] : undefined"
                    />
                  </Field>
                </div>

                <div class="grid gap-5 md:grid-cols-2">
                  <Field
                    class="gap-2"
                    :data-invalid="fieldErrors.portfolioSize ? true : undefined"
                  >
                    <FieldLabel for="portfolio-size">
                      Credits in current scope
                    </FieldLabel>
                    <Select
                      v-model="portfolioSize"
                      @update:model-value="clearFieldError('portfolioSize')"
                    >
                      <SelectTrigger
                        id="portfolio-size"
                        class="w-full"
                        :aria-invalid="fieldErrors.portfolioSize ? true : undefined"
                      >
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="option in portfolioSizeOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Helps us size the first evidence and risk walkthrough.
                    </FieldDescription>
                    <FieldError
                      :errors="fieldErrors.portfolioSize ? [fieldErrors.portfolioSize] : undefined"
                    />
                  </Field>

                  <Field
                    class="gap-2"
                    :data-invalid="fieldErrors.timeline ? true : undefined"
                  >
                    <FieldLabel for="timeline">
                      Decision timeline
                    </FieldLabel>
                    <Select
                      v-model="timeline"
                      @update:model-value="clearFieldError('timeline')"
                    >
                      <SelectTrigger
                        id="timeline"
                        class="w-full"
                        :aria-invalid="fieldErrors.timeline ? true : undefined"
                      >
                        <SelectValue placeholder="Select a timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="option in timelineOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Use the nearest reporting or procurement milestone.
                    </FieldDescription>
                    <FieldError
                      :errors="fieldErrors.timeline ? [fieldErrors.timeline] : undefined"
                    />
                  </Field>
                </div>

                <Field
                  class="gap-2"
                  :data-invalid="fieldErrors.goal ? true : undefined"
                >
                  <FieldLabel for="goal">
                    Primary review question
                  </FieldLabel>
                  <Textarea
                    id="goal"
                    v-model="goal"
                    rows="5"
                    placeholder="Example: we need project-level evidence for buyer claims before the next reporting cycle."
                    :aria-invalid="fieldErrors.goal ? true : undefined"
                    @update:model-value="clearFieldError('goal')"
                  />
                  <FieldDescription>
                    Summarize the buyer claim, disclosure deadline, or assurance question driving
                    the session.
                  </FieldDescription>
                  <FieldError :errors="fieldErrors.goal ? [fieldErrors.goal] : undefined" />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                class="w-full sm:w-auto transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Book briefing
              </Button>
            </FieldSet>
          </form>

          <div
            v-if="submitted"
            class="cw-animate-scale border-emerald-500/30 bg-emerald-500/10 mt-5 rounded-[1.35rem] border p-4"
          >
            <Badge
              variant="secondary"
              class="border-emerald-500/30 bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1.5"
            >
              <span class="cw-radar-dot h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
              Captured locally
            </Badge>
            <p class="text-foreground/90 mt-3 text-sm leading-7">
              Briefing request captured locally. In production this submission can route directly
              into CRM, onboarding, or a customer success queue.
            </p>

            <div class="mt-4 grid gap-3 sm:grid-cols-3">
              <div
                v-for="item in submissionHighlights"
                :key="item.label"
                class="cw-card-interactive border-emerald-500/25 bg-background/70 rounded-[1.15rem] border px-4 py-3 dark:bg-slate-950/30 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xs"
              >
                <p
                  class="text-emerald-700 text-[0.68rem] font-semibold tracking-[0.18em] uppercase dark:text-emerald-400"
                >
                  {{ item.label }}
                </p>
                <p class="text-foreground mt-2 text-sm font-semibold">
                  {{ item.value }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="grid gap-6">
        <Card class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl">
          <CardContent class="p-4 sm:p-6 lg:p-7">
            <Badge
              variant="secondary"
              class="border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
            >
              First-call agenda
            </Badge>
            <ul class="mt-5 space-y-3">
              <li
                v-for="item in briefingAgenda"
                :key="item"
                class="cw-card-interactive border-border/80 bg-muted/40 text-muted-foreground rounded-[1.15rem] border px-4 py-3 text-sm leading-7 transition-all duration-200 hover:bg-muted/70 hover:border-emerald-500/40 hover:text-foreground"
              >
                {{ item }}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card class="cw-card-interactive border-border/80 bg-card/85 text-card-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-2xl">
          <CardContent class="p-4 sm:p-6 lg:p-7">
            <Badge
              variant="secondary"
              class="border-sky-500/30 bg-sky-500/10 font-semibold text-sky-700 dark:text-sky-300"
            >
              Recommended attendees
            </Badge>
            <ul class="mt-5 space-y-3">
              <li
                v-for="item in attendeeGuidance"
                :key="item"
                class="cw-card-interactive border-border/80 bg-muted/40 text-muted-foreground rounded-[1.15rem] border px-4 py-3 text-sm leading-7 transition-all duration-200 hover:bg-muted/70 hover:border-sky-500/40 hover:text-foreground"
              >
                {{ item }}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>
