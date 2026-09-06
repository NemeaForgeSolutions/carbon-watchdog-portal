<script setup lang="ts">
import { ref } from 'vue';
import {
  Bell,
  Building2,
  CheckCircle2,
  Database,
  Lock,
  Moon,
  Palette,
  Save,
  ScrollText,
  Sliders,
  Sun,
  Users,
} from 'lucide-vue-next';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCarbonDossier } from '@/composables/useCarbonDossier';
import {
  SETTINGS_INITIAL_ORG,
  SETTINGS_INITIAL_TEAM,
  SETTINGS_SLIDER_DEFAULTS,
  SETTINGS_WEBHOOK_DEFAULT,
} from '@/constants';
import { useTheme } from '@/composables/useTheme';

const { showToast } = useCarbonDossier();
const { isDark, toggleTheme } = useTheme();

const activeTab = ref<
  'org' | 'team' | 'notifications' | 'thresholds' | 'appearance' | 'data' | 'security' | 'audit'
>('org');

// Settings local state
const orgName = ref(SETTINGS_INITIAL_ORG.orgName);
const orgIndustry = ref(SETTINGS_INITIAL_ORG.orgIndustry);
const orgHq = ref(SETTINGS_INITIAL_ORG.orgHq);
const portfolioSize = ref(SETTINGS_INITIAL_ORG.portfolioSize);

const teamMembers = ref([...SETTINGS_INITIAL_TEAM]);
const newInviteEmail = ref('');
const newInviteRole = ref('Analyst');

const notifyEmail = ref(true);
const notifySlack = ref(true);
const notifyWebhook = ref(SETTINGS_WEBHOOK_DEFAULT);

// Thresholds sliders
const alertSensitivity = ref(SETTINGS_SLIDER_DEFAULTS.alertSensitivity);
const confidenceCutoff = ref(SETTINGS_SLIDER_DEFAULTS.confidenceCutoff);
const criticalThresholdMillions = ref(SETTINGS_SLIDER_DEFAULTS.criticalThresholdMillions);

const showGridlines = ref(true);

const handleSave = () => {
  showToast('Settings saved successfully to local workspace configuration.');
};

const handleAddMember = () => {
  if (!newInviteEmail.value.trim()) return;

  teamMembers.value.push({
    name: newInviteEmail.value.split('@')[0],
    email: newInviteEmail.value,
    role: newInviteRole.value,
  });
  newInviteEmail.value = '';
  showToast('Team invitation dispatched.');
};

const auditLogs = ref([
  {
    time: '2026-09-06 18:40:12 UTC',
    user: 'Dr. Elena Vance',
    action: 'Modified Alert Sensitivity to 85%',
  },
  {
    time: '2026-09-06 16:15:30 UTC',
    user: 'Marcus Holloway',
    action: 'Triggered Full SAR Pipeline Re-Scan for VCS-902',
  },
  {
    time: '2026-09-06 12:00:04 UTC',
    user: 'Sarah Chen, JD',
    action: 'Generated Legal Evidence Pack for Delta Air Lines',
  },
  {
    time: '2026-09-05 21:11:45 UTC',
    user: 'System Sentinel',
    action: 'Autonomous Ingestion: 48 Sentinel-1 Scenes Processed',
  },
]);
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 dark:border-white/10 pb-5"
    >
      <div>
        <div class="flex items-center gap-2">
          <Badge
            variant="secondary"
            class="border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-700 dark:text-emerald-300 uppercase tracking-widest"
          >
            Workspace Configuration
          </Badge>
          <span class="text-xs font-mono text-muted-foreground dark:text-slate-400"
            >Institutional Governance Console</span
          >
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-foreground dark:text-white font-sans mt-1">
          Settings & Environment Controls
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <Button
          type="button"
          size="sm"
          class="bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase text-xs font-bold gap-1.5 shadow-md"
          @click="handleSave"
        >
          <Save class="h-3.5 w-3.5" />
          Save Changes
        </Button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <Tabs
      v-model="activeTab"
      class="space-y-6"
    >
      <TabsList
        class="flex flex-wrap h-auto w-full justify-start gap-1.5 p-1 rounded-2xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-slate-900/60 backdrop-blur-md text-xs font-mono"
      >
        <TabsTrigger
          v-for="t in [
            { id: 'org', label: 'Organization', icon: Building2 },
            { id: 'team', label: 'Team & RBAC', icon: Users },
            { id: 'thresholds', label: 'Alert Thresholds', icon: Sliders },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'data', label: 'Data Preferences', icon: Database },
            { id: 'security', label: 'Security & SSO', icon: Lock },
            { id: 'audit', label: 'Audit Log', icon: ScrollText },
          ]"
          :key="t.id"
          :value="t.id"
          class="flex items-center gap-2 px-3 py-2 rounded-xl transition font-medium text-xs font-mono data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-800 dark:data-[state=active]:text-emerald-300 data-[state=active]:border data-[state=active]:border-emerald-500/30"
        >
          <component
            :is="t.icon"
            class="h-3.5 w-3.5"
          />
          <span>{{ t.label }}</span>
        </TabsTrigger>
      </TabsList>

      <!-- SECTION 1: ORGANIZATION -->
      <TabsContent value="org">
        <Card
          class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
        >
          <CardContent class="p-6 space-y-4">
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Organization Profile
            </h3>
            <p class="text-xs text-muted-foreground dark:text-slate-400">
              Configure corporate identity and legal jurisdiction attributes for ESG compliance
              reporting.
            </p>

            <div class="grid sm:grid-cols-2 gap-4 pt-2">
              <div class="space-y-1.5">
                <label class="text-xs font-mono text-muted-foreground dark:text-slate-400 uppercase"
                  >Organization Name</label
                >
                <Input
                  v-model="orgName"
                  class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
                />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-mono text-muted-foreground dark:text-slate-400 uppercase"
                  >Primary Industry</label
                >
                <Input
                  v-model="orgIndustry"
                  class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
                />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-mono text-muted-foreground dark:text-slate-400 uppercase"
                  >Global Headquarters</label
                >
                <Input
                  v-model="orgHq"
                  class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
                />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-mono text-muted-foreground dark:text-slate-400 uppercase"
                  >Portfolio Scope Size</label
                >
                <Input
                  v-model="portfolioSize"
                  class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- SECTION 2: TEAM & RBAC -->
      <TabsContent value="team">
        <Card
          class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
        >
          <CardContent class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
                  Authorized Personnel & Roles
                </h3>
                <p class="text-xs text-muted-foreground dark:text-slate-400">
                  Role-Based Access Control (RBAC) enforced per enterprise directory standards.
                </p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 pt-2">
              <Input
                v-model="newInviteEmail"
                placeholder="colleague@institution.com"
                class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs flex-1"
              />
              <Select v-model="newInviteRole">
                <SelectTrigger
                  class="w-[180px] h-9 px-3 rounded-lg border-border/70 dark:border-white/10 bg-card dark:bg-slate-900/60 text-xs font-mono text-foreground dark:text-slate-200"
                >
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin"> Admin </SelectItem>
                  <SelectItem value="Lead Analyst"> Lead Analyst </SelectItem>
                  <SelectItem value="Compliance Reviewer"> Compliance Reviewer </SelectItem>
                  <SelectItem value="Viewer"> Viewer </SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                size="sm"
                class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono"
                @click="handleAddMember"
              >
                Invite User
              </Button>
            </div>

            <div class="space-y-2 pt-3">
              <div
                v-for="m in teamMembers"
                :key="m.email"
                class="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <strong class="text-foreground dark:text-white block">{{ m.name }}</strong>
                  <span class="text-muted-foreground dark:text-slate-400 text-[11px]">{{
                    m.email
                  }}</span>
                </div>
                <Badge
                  variant="outline"
                  class="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px]"
                >
                  {{ m.role }}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- SECTION 3: ALERT THRESHOLDS (FUNCTIONAL SLIDERS) -->
      <TabsContent value="thresholds">
        <Card
          class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
        >
          <CardContent class="p-6 space-y-5">
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Risk Detection Sensitivity & Cutoffs
            </h3>
            <p class="text-xs text-muted-foreground dark:text-slate-400">
              Calibrate probabilistic thresholds for autonomous anomaly flagging and portfolio
              alerts.
            </p>

            <div class="space-y-6 pt-2 font-mono text-xs">
              <!-- Slider 1 -->
              <div
                class="space-y-2 p-4 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40"
              >
                <div class="flex items-center justify-between">
                  <span class="text-foreground dark:text-slate-300 font-bold uppercase"
                    >Alert Sensitivity Cutoff</span
                  >
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold text-sm"
                    >{{ alertSensitivity }}%</span
                  >
                </div>
                <input
                  v-model.number="alertSensitivity"
                  type="range"
                  min="50"
                  max="99"
                  class="w-full accent-emerald-500"
                />
                <p class="text-[11px] text-muted-foreground dark:text-slate-400 font-sans">
                  Determines the sigma deviation required before an optical NDVI or SAR backscatter
                  drift raises an alert.
                </p>
              </div>

              <!-- Slider 2 -->
              <div
                class="space-y-2 p-4 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40"
              >
                <div class="flex items-center justify-between">
                  <span class="text-foreground dark:text-slate-300 font-bold uppercase"
                    >Confidence Score Threshold</span
                  >
                  <span class="text-cyan-600 dark:text-cyan-400 font-bold text-sm"
                    >{{ confidenceCutoff }}%</span
                  >
                </div>
                <input
                  v-model.number="confidenceCutoff"
                  type="range"
                  min="60"
                  max="99"
                  class="w-full accent-cyan-500"
                />
                <p class="text-[11px] text-muted-foreground dark:text-slate-400 font-sans">
                  Multi-sensor cross-validation bar (Sentinel-1 SAR + Sentinel-2 MSI) before
                  auto-publishing to executive feed.
                </p>
              </div>

              <!-- Slider 3 -->
              <div
                class="space-y-2 p-4 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40"
              >
                <div class="flex items-center justify-between">
                  <span class="text-foreground dark:text-slate-300 font-bold uppercase"
                    >Critical Exposure Escalation Threshold</span
                  >
                  <span class="text-rose-600 dark:text-rose-400 font-bold text-sm"
                    >${{ criticalThresholdMillions }}M USD</span
                  >
                </div>
                <input
                  v-model.number="criticalThresholdMillions"
                  type="range"
                  min="5"
                  max="100"
                  class="w-full accent-rose-500"
                />
                <p class="text-[11px] text-muted-foreground dark:text-slate-400 font-sans">
                  Automatically marks corporate buyer portfolios as Critical Urgency when exposed
                  credits exceed this value.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- SECTION 4: NOTIFICATIONS -->
      <TabsContent value="notifications">
        <Card
          class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
        >
          <CardContent class="p-6 space-y-4">
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Notification Channels & Dispatch
            </h3>
            <p class="text-xs text-muted-foreground dark:text-slate-400">
              Manage real-time paging and automated legal disclosure dispatch.
            </p>

            <div class="space-y-3 pt-2 text-xs font-mono">
              <label
                class="flex items-center gap-3 p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 cursor-pointer"
              >
                <input
                  v-model="notifyEmail"
                  type="checkbox"
                  class="h-4 w-4 accent-emerald-500 rounded"
                />
                <div>
                  <span class="text-foreground dark:text-white font-bold block"
                    >Instant Email Escalations</span
                  >
                  <span class="text-muted-foreground dark:text-slate-400 text-[11px]"
                    >Send executive briefings when projects hit Critical Review.</span
                  >
                </div>
              </label>

              <label
                class="flex items-center gap-3 p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 cursor-pointer"
              >
                <input
                  v-model="notifySlack"
                  type="checkbox"
                  class="h-4 w-4 accent-emerald-500 rounded"
                />
                <div>
                  <span class="text-foreground dark:text-white font-bold block"
                    >Slack / Teams Risk Desk Webhook</span
                  >
                  <span class="text-muted-foreground dark:text-slate-400 text-[11px]"
                    >Real-time SAR anomaly stream into #esg-risk-assurance.</span
                  >
                </div>
              </label>

              <div class="space-y-1.5 pt-2">
                <label class="text-muted-foreground dark:text-slate-400 text-[11px]"
                  >Webhook Endpoint URL</label
                >
                <Input
                  v-model="notifyWebhook"
                  class="border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/60 text-foreground dark:text-white font-mono text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- SECTION 5: APPEARANCE -->
      <TabsContent value="appearance">
        <Card
          class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
        >
          <CardContent class="p-6 space-y-4">
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Console Appearance & Display
            </h3>
            <p class="text-xs text-muted-foreground dark:text-slate-400">
              Aerospace terminal visual parameters (preserves institutional palette).
            </p>

            <div class="space-y-3 pt-2 text-xs font-mono">
              <div
                class="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <span class="text-foreground dark:text-slate-200">Terminal Base Palette</span>
                <span class="text-emerald-700 dark:text-emerald-400 font-bold"
                  >Ecological Mint & High-Contrast Dark</span
                >
              </div>

              <!-- Interface Theme Mode Toggle -->
              <div
                class="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <div>
                  <span class="text-foreground dark:text-white font-bold block"
                    >Interface Theme</span
                  >
                  <span class="text-muted-foreground dark:text-slate-400 text-[11px]">
                    Current mode:
                    <span class="capitalize text-emerald-600 dark:text-emerald-400 font-bold">{{
                      isDark ? 'Dark Mode' : 'Light Mode'
                    }}</span>
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  class="gap-2 border-border/70 dark:border-white/10 bg-card dark:bg-slate-900/80 text-foreground dark:text-white hover:bg-muted font-mono text-xs cursor-pointer"
                  @click="toggleTheme"
                >
                  <Sun
                    v-if="isDark"
                    class="h-3.5 w-3.5 text-amber-400"
                  />
                  <Moon
                    v-else
                    class="h-3.5 w-3.5 text-slate-700 dark:text-slate-300"
                  />
                  <span>Toggle {{ isDark ? 'Light' : 'Dark' }}</span>
                </Button>
              </div>

              <label
                class="flex items-center gap-3 p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 cursor-pointer"
              >
                <input
                  v-model="showGridlines"
                  type="checkbox"
                  class="h-4 w-4 accent-emerald-500 rounded"
                />
                <div>
                  <span class="text-foreground dark:text-white font-bold block"
                    >Display Telemetry Gridlines</span
                  >
                  <span class="text-muted-foreground dark:text-slate-400 text-[11px]"
                    >Enables subtle latitude and radar grid overlays on graphs.</span
                  >
                </div>
              </label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- SECTION 6: DATA PREFERENCES -->
      <TabsContent value="data">
        <Card
          class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
        >
          <CardContent class="p-6 space-y-4">
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Data Sources & Registry Sync
            </h3>
            <p class="text-xs text-muted-foreground dark:text-slate-400">
              Satellite sensor frequency and voluntary carbon market registry ledger connections.
            </p>

            <div class="space-y-2.5 pt-2 text-xs font-mono">
              <div
                class="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <div>
                  <span class="text-foreground dark:text-white font-bold block"
                    >ESA Copernicus Sentinel-1 SAR</span
                  >
                  <span class="text-muted-foreground dark:text-slate-400 text-[11px]"
                    >All-weather cloud-penetrating radar feed</span
                  >
                </div>
                <Badge
                  variant="outline"
                  class="border-emerald-500/40 text-emerald-700 dark:text-emerald-400"
                >
                  Sync Active (6-day cycle)
                </Badge>
              </div>

              <div
                class="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <div>
                  <span class="text-foreground dark:text-white font-bold block"
                    >ESA Copernicus Sentinel-2 MSI</span
                  >
                  <span class="text-muted-foreground dark:text-slate-400 text-[11px]"
                    >10m 13-band optical multispectral feed</span
                  >
                </div>
                <Badge
                  variant="outline"
                  class="border-emerald-500/40 text-emerald-700 dark:text-emerald-400"
                >
                  Sync Active (5-day revisit)
                </Badge>
              </div>

              <div
                class="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <div>
                  <span class="text-foreground dark:text-white font-bold block"
                    >Verra VCS Public API</span
                  >
                  <span class="text-muted-foreground dark:text-slate-400 text-[11px]"
                    >Issuance and retirement ledger reconciliation</span
                  >
                </div>
                <Badge
                  variant="outline"
                  class="border-cyan-500/40 text-cyan-700 dark:text-cyan-400"
                >
                  Connected (Simulated)
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- SECTION 7: SECURITY & SSO -->
      <TabsContent value="security">
        <Card
          class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
        >
          <CardContent class="p-6 space-y-4">
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Enterprise Trust & Authentication
            </h3>
            <p class="text-xs text-muted-foreground dark:text-slate-400">
              SAML 2.0 / OIDC Identity Provider integration parameters.
            </p>

            <div
              class="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-950/20 text-xs font-mono space-y-2"
            >
              <div class="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                <CheckCircle2 class="h-4 w-4" />
                <span>Tenant Isolation Protocol Active</span>
              </div>
              <p class="text-foreground/90 dark:text-slate-300 font-sans">
                Each enterprise customer operates within a cryptographically isolated tenant
                namespace with client-side key wrapping.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- SECTION 8: AUDIT LOG -->
      <TabsContent value="audit">
        <Card
          class="border-border/70 dark:border-white/10 bg-card/90 dark:bg-slate-950/60 backdrop-blur-xl"
        >
          <CardContent class="p-6 space-y-4">
            <h3 class="text-lg font-bold text-foreground dark:text-white font-sans">
              Immutable Security Audit Trail
            </h3>
            <p class="text-xs text-muted-foreground dark:text-slate-400">
              Verifiable tamper-evident log of administrative and analyst actions.
            </p>

            <div class="space-y-2 pt-2">
              <div
                v-for="(log, i) in auditLogs"
                :key="i"
                class="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/40 dark:bg-slate-900/40 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1"
              >
                <div class="flex items-center gap-2">
                  <span class="text-emerald-700 dark:text-emerald-400 font-bold">{{
                    log.user
                  }}</span>
                  <span class="text-foreground/90 dark:text-slate-300">• {{ log.action }}</span>
                </div>
                <span class="text-[10px] text-muted-foreground">{{ log.time }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
