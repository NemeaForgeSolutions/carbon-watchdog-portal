<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CheckCircle2, ChevronRight, Database, Upload } from 'lucide-vue-next';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import {
  ONBOARDING_INITIAL_ORG,
  ONBOARDING_INITIAL_TEAM,
  ONBOARDING_SLIDER_DEFAULTS,
} from '@/constants';

const router = useRouter();
const { showToast } = useCarbonDossier();

const currentStep = ref(1);

// Step 1: Organization
const orgName = ref(ONBOARDING_INITIAL_ORG.orgName);
const orgIndustry = ref(ONBOARDING_INITIAL_ORG.orgIndustry);
const orgHq = ref(ONBOARDING_INITIAL_ORG.orgHq);
const portfolioSize = ref(ONBOARDING_INITIAL_ORG.portfolioSize);

// Step 2: Team
const teamMembers = ref([...ONBOARDING_INITIAL_TEAM]);
const inviteEmail = ref('');
const inviteRole = ref('Analyst');

const addTeamMember = () => {
  if (!inviteEmail.value.trim()) return;
  teamMembers.value.push({
    email: inviteEmail.value,
    role: inviteRole.value,
  });
  inviteEmail.value = '';
  showToast('Team member added.');
};

// Step 3: Portfolio Import
const csvUploaded = ref(false);
const registryConnected = ref(false);

const handleSimulatedDrop = () => {
  csvUploaded.value = true;
  showToast('Simulated CSV uploaded: 48 project polygon boundaries & retirement serials parsed.');
};

const handleConnectRegistry = () => {
  registryConnected.value = true;
  showToast('Connected to Verra VCS & Gold Standard API ledgers.');
};

// Step 4: Alert Configuration (Functional Sliders)
const alertSensitivity = ref(ONBOARDING_SLIDER_DEFAULTS.alertSensitivity);
const confidenceCutoff = ref(ONBOARDING_SLIDER_DEFAULTS.confidenceCutoff);
const criticalExposureThreshold = ref(ONBOARDING_SLIDER_DEFAULTS.criticalExposureThreshold);

const nextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const finishOnboarding = () => {
  showToast('Workspace fully provisioned! Entering Carbon Watchdog Command Center.');
  router.push('/');
};
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8 py-6 pb-16">
    <!-- Progress Indicator -->
    <div class="space-y-3">
      <div class="flex items-center justify-between text-xs font-mono">
        <Badge
          variant="secondary"
          class="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] uppercase tracking-wider"
        >
          Workspace Onboarding Setup
        </Badge>
        <span class="text-muted-foreground dark:text-slate-400">Step {{ currentStep }} of 5</span>
      </div>

      <!-- Step Bar -->
      <div
        class="grid grid-cols-5 gap-1.5 h-2 bg-muted dark:bg-slate-900 rounded-full border border-border/70 dark:border-white/10 overflow-hidden"
      >
        <div
          v-for="s in 5"
          :key="s"
          class="h-full transition-all duration-500"
          :class="s <= currentStep ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-transparent'"
        ></div>
      </div>
    </div>

    <!-- STEP 1: ORGANIZATION -->
    <Card
      v-if="currentStep === 1"
      class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-xl dark:shadow-2xl"
    >
      <CardContent class="p-6 sm:p-8 space-y-5">
        <div>
          <span
            class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-bold"
            >Step 1</span
          >
          <h2 class="text-2xl font-black text-foreground dark:text-white font-sans mt-1">
            Organization Profile
          </h2>
          <p class="text-xs text-muted-foreground dark:text-slate-400 mt-1">
            Set up your institution identity and legal portfolio baseline.
          </p>
        </div>

        <div class="space-y-4 pt-2 font-mono text-xs">
          <div class="space-y-1">
            <label class="text-muted-foreground dark:text-slate-400 uppercase text-[10px]"
              >Organization Name</label
            >
            <Input
              v-model="orgName"
              placeholder="e.g. Horizon Climate Capital"
              class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
            />
          </div>

          <div class="space-y-1">
            <label class="text-muted-foreground dark:text-slate-400 uppercase text-[10px]"
              >Industry & Mandate</label
            >
            <Input
              v-model="orgIndustry"
              placeholder="e.g. Asset Management & ESG Investment"
              class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
            />
          </div>

          <div class="space-y-1">
            <label class="text-muted-foreground dark:text-slate-400 uppercase text-[10px]"
              >Global Headquarters</label
            >
            <Input
              v-model="orgHq"
              placeholder="e.g. London, United Kingdom"
              class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
            />
          </div>

          <div class="space-y-1">
            <label class="text-muted-foreground dark:text-slate-400 uppercase text-[10px]"
              >Portfolio Size Under Watch</label
            >
            <Input
              v-model="portfolioSize"
              placeholder="e.g. $100M+ Offset Assets"
              class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
            />
          </div>
        </div>

        <div class="pt-4 border-t border-border/70 dark:border-white/10 flex justify-end">
          <Button
            type="button"
            class="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold gap-1.5"
            @click="nextStep"
          >
            Continue to Team Setup <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- STEP 2: TEAM -->
    <Card
      v-if="currentStep === 2"
      class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-xl dark:shadow-2xl"
    >
      <CardContent class="p-6 sm:p-8 space-y-5">
        <div>
          <span
            class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-bold"
            >Step 2</span
          >
          <h2 class="text-2xl font-black text-foreground dark:text-white font-sans mt-1">
            Authorized Team & Roles
          </h2>
          <p class="text-xs text-muted-foreground dark:text-slate-400 mt-1">
            Assign analyst, governance, and administrative access permissions.
          </p>
        </div>

        <!-- Add Member Input -->
        <div class="flex flex-col sm:flex-row gap-2 pt-2 font-mono text-xs">
          <Input
            v-model="inviteEmail"
            placeholder="colleague@institution.com"
            class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs flex-1"
          />
          <Select v-model="inviteRole">
            <SelectTrigger
              class="w-[140px] h-9 px-3 rounded-xl border-border/70 dark:border-white/10 bg-card dark:bg-slate-900 text-xs font-mono text-foreground dark:text-slate-200"
            >
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin"> Admin </SelectItem>
              <SelectItem value="Analyst"> Analyst </SelectItem>
              <SelectItem value="Viewer"> Viewer </SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="button"
            class="bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-mono"
            @click="addTeamMember"
          >
            Add
          </Button>
        </div>

        <!-- Team List -->
        <div class="space-y-2 pt-2 font-mono text-xs">
          <div
            v-for="m in teamMembers"
            :key="m.email"
            class="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 flex items-center justify-between"
          >
            <span class="text-foreground dark:text-slate-200">{{ m.email }}</span>
            <Badge
              variant="outline"
              class="border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px]"
            >
              {{ m.role }}
            </Badge>
          </div>
        </div>

        <div
          class="pt-4 border-t border-border/70 dark:border-white/10 flex items-center justify-between"
        >
          <Button
            type="button"
            variant="ghost"
            class="text-xs font-mono text-muted-foreground dark:text-slate-400"
            @click="prevStep"
          >
            Back
          </Button>
          <Button
            type="button"
            class="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold gap-1.5"
            @click="nextStep"
          >
            Continue to Portfolio Import <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- STEP 3: PORTFOLIO IMPORT -->
    <Card
      v-if="currentStep === 3"
      class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-xl dark:shadow-2xl"
    >
      <CardContent class="p-6 sm:p-8 space-y-5">
        <div>
          <span
            class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-bold"
            >Step 3</span
          >
          <h2 class="text-2xl font-black text-foreground dark:text-white font-sans mt-1">
            Portfolio Ingestion
          </h2>
          <p class="text-xs text-muted-foreground dark:text-slate-400 mt-1">
            Upload target polygon coordinates or connect directly to voluntary registries.
          </p>
        </div>

        <!-- CSV Dropzone -->
        <div
          class="border-2 border-dashed border-border/80 hover:border-emerald-500/50 rounded-2xl p-8 text-center bg-muted/30 dark:bg-slate-900/30 transition cursor-pointer space-y-3"
          @click="handleSimulatedDrop"
        >
          <div
            class="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto"
          >
            <Upload class="h-6 w-6" />
          </div>
          <div>
            <span class="text-sm font-bold text-foreground dark:text-white font-sans block">
              {{
                csvUploaded
                  ? '✓ portfolio_extract_2026.csv Uploaded'
                  : 'Drag & drop portfolio CSV or click to browse'
              }}
            </span>
            <span class="text-xs text-muted-foreground dark:text-slate-400 font-mono mt-1 block">
              Accepts Verra VCS serials, project boundary GeoJSONs, or registry spreadsheets.
            </span>
          </div>
        </div>

        <!-- Simulated Registry Connector Button -->
        <div
          class="p-4 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
        >
          <div>
            <strong class="text-foreground dark:text-white block font-sans"
              >Simulated Registry Connector</strong
            >
            <span class="text-muted-foreground dark:text-slate-400"
              >Directly sync active retirements from Verra & Gold Standard.</span
            >
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 text-xs font-bold gap-1.5"
            @click="handleConnectRegistry"
          >
            <Database class="h-3.5 w-3.5" />
            {{ registryConnected ? '✓ Registry Linked' : 'Connect Registry' }}
          </Button>
        </div>

        <div
          class="pt-4 border-t border-border/70 dark:border-white/10 flex items-center justify-between"
        >
          <Button
            type="button"
            variant="ghost"
            class="text-xs font-mono text-muted-foreground dark:text-slate-400"
            @click="prevStep"
          >
            Back
          </Button>
          <Button
            type="button"
            class="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold gap-1.5"
            @click="nextStep"
          >
            Continue to Alert Settings <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- STEP 4: ALERT CONFIGURATION (FUNCTIONAL SLIDERS) -->
    <Card
      v-if="currentStep === 4"
      class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/70 backdrop-blur-xl shadow-xl dark:shadow-2xl"
    >
      <CardContent class="p-6 sm:p-8 space-y-6">
        <div>
          <span
            class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-bold"
            >Step 4</span
          >
          <h2 class="text-2xl font-black text-foreground dark:text-white font-sans mt-1">
            Risk Alert Configuration
          </h2>
          <p class="text-xs text-muted-foreground dark:text-slate-400 mt-1">
            Adjust statistical anomaly sensitivity and notification thresholds.
          </p>
        </div>

        <div class="space-y-5 font-mono text-xs">
          <!-- Slider 1: Alert Sensitivity -->
          <div
            class="p-4 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 space-y-2"
          >
            <div class="flex items-center justify-between">
              <span class="text-foreground dark:text-slate-300 font-bold uppercase"
                >Alert Sensitivity</span
              >
              <strong class="text-emerald-600 dark:text-emerald-400 text-sm"
                >{{ alertSensitivity }}%</strong
              >
            </div>
            <input
              v-model.number="alertSensitivity"
              type="range"
              min="50"
              max="99"
              class="w-full accent-emerald-500"
            />
            <span class="text-[11px] text-muted-foreground dark:text-slate-400 font-sans block"
              >Defines optical canopy loss detection sensitivity.</span
            >
          </div>

          <!-- Slider 2: Confidence Cutoff -->
          <div
            class="p-4 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 space-y-2"
          >
            <div class="flex items-center justify-between">
              <span class="text-foreground dark:text-slate-300 font-bold uppercase"
                >Confidence Cutoff</span
              >
              <strong class="text-cyan-600 dark:text-cyan-400 text-sm"
                >{{ confidenceCutoff }}%</strong
              >
            </div>
            <input
              v-model.number="confidenceCutoff"
              type="range"
              min="60"
              max="99"
              class="w-full accent-cyan-500"
            />
            <span class="text-[11px] text-muted-foreground dark:text-slate-400 font-sans block"
              >Minimum multi-sensor agreement score before generating an executive risk flag.</span
            >
          </div>

          <!-- Slider 3: Critical Exposure Threshold -->
          <div
            class="p-4 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 space-y-2"
          >
            <div class="flex items-center justify-between">
              <span class="text-foreground dark:text-slate-300 font-bold uppercase"
                >Critical Exposure Threshold</span
              >
              <strong class="text-rose-600 dark:text-rose-400 text-sm"
                >${{ criticalExposureThreshold }}M USD</strong
              >
            </div>
            <input
              v-model.number="criticalExposureThreshold"
              type="range"
              min="5"
              max="100"
              class="w-full accent-rose-500"
            />
            <span class="text-[11px] text-muted-foreground dark:text-slate-400 font-sans block"
              >Threshold for mandatory peer review and legal counsel dispatch.</span
            >
          </div>
        </div>

        <div
          class="pt-4 border-t border-border/70 dark:border-white/10 flex items-center justify-between"
        >
          <Button
            type="button"
            variant="ghost"
            class="text-xs font-mono text-muted-foreground dark:text-slate-400"
            @click="prevStep"
          >
            Back
          </Button>
          <Button
            type="button"
            class="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold gap-1.5"
            @click="nextStep"
          >
            Complete Configuration <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- STEP 5: FINAL SCREEN - WORKSPACE READY -->
    <Card
      v-if="currentStep === 5"
      class="border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card dark:from-emerald-950/40 dark:via-slate-950/80 dark:to-slate-950 shadow-2xl backdrop-blur-xl text-center"
    >
      <CardContent class="p-8 sm:p-12 space-y-6">
        <div
          class="h-16 w-16 rounded-3xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20"
        >
          <CheckCircle2 class="h-8 w-8" />
        </div>

        <div class="space-y-2">
          <Badge
            variant="secondary"
            class="border-emerald-500/40 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] tracking-widest uppercase"
          >
            INITIALIZATION COMPLETE
          </Badge>
          <h2
            class="text-3xl sm:text-4xl font-black text-foreground dark:text-white font-sans tracking-tight"
          >
            WORKSPACE READY
          </h2>
          <p
            class="text-sm text-muted-foreground dark:text-slate-300 max-w-lg mx-auto leading-relaxed"
          >
            Your institutional climate intelligence console is fully synchronized. Continuous
            orbital surveillance across Sentinel-1 SAR and Sentinel-2 optical is nominal.
          </p>
        </div>

        <div
          class="p-4 rounded-2xl bg-muted/50 dark:bg-black/40 border border-border/70 dark:border-white/10 max-w-md mx-auto grid grid-cols-3 gap-2 font-mono text-xs"
        >
          <div>
            <span class="text-[10px] text-muted-foreground uppercase block">Workspace</span>
            <strong class="text-foreground dark:text-white">{{ orgName.split(' ')[0] }}</strong>
          </div>
          <div>
            <span class="text-[10px] text-muted-foreground uppercase block">Team</span>
            <strong class="text-emerald-600 dark:text-emerald-400"
              >{{ teamMembers.length }} Members</strong
            >
          </div>
          <div>
            <span class="text-[10px] text-muted-foreground uppercase block">Telemetry</span>
            <strong class="text-cyan-600 dark:text-cyan-400">Active</strong>
          </div>
        </div>

        <div class="pt-4">
          <Button
            type="button"
            class="bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase tracking-widest font-black text-sm px-8 py-3.5 shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-transform"
            @click="finishOnboarding"
          >
            ENTER COMMAND CENTER
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
