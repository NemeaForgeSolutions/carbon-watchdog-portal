export interface BuildPhase {
  id: string;
  title: string;
  timeline: string;
  goal: string;
  tasks: string[];
  output: string;
}

export interface WatchlistProject {
  id: string;
  name: string;
  country: string;
  activity: string;
  status: 'Flagged' | 'Watch' | 'Control' | 'Domestic watch';
  topBuyerExposure: string;
  why: string;
}


export interface BuyerSpotlightRow {
  project: string;
  country: string;
  tonnes: string;
  status: string;
}

export interface NextAction {
  title: string;
  body: string;
}


export interface ComparisonGroup {
  buyer: string;
  verdict: string;
  rows: Array<{ project: string; tonnes: string; status: 'Flagged' | 'Control' | 'Unreviewed' }>;
}

export const buildPhases: BuildPhase[] = [
  {
    id: '0',
    title: 'Pick and lock targets',
    timeline: '~0.5 day',
    goal: 'Lock the exact project set so the imagery work has a fixed target.',
    tasks: [
      'Confirm the 13-project target list and freeze scope before imagery work starts.',
      'Pull exact boundary polygons from each Verra PDD.',
      'Record project id, centroid, hectares, methodology, and validator for every site.',
    ],
    output: 'One GeoJSON + metadata file per locked project.',
  },
  {
    id: '1',
    title: 'Imagery pipeline',
    timeline: '2–3 days',
    goal: 'Prove the pipeline on a single project before scaling to the whole set.',
    tasks: [
      'Set up Google Earth Engine and the Python API.',
      'Start with Cordillera Azul or Kasigau Corridor I as the pilot.',
      'Pull Sentinel-2 optical scenes, cloud-mask them, and compute NDVI.',
      'Pull Sentinel-1 SAR over the same date range for the cloud-proof backbone.',
    ],
    output: 'Plotted NDVI + SAR time series for one project.',
  },
  {
    id: '2',
    title: 'Change detection engine',
    timeline: '3–5 days',
    goal: 'Turn a time series into dated, located, explainable flags.',
    tasks: [
      'Set a baseline per project, starting with the first-year average.',
      'Detect sustained drops versus baseline with a moving average and threshold.',
      'Upgrade to proper change-point detection after the simple version works.',
      'Classify likely cause from optical and SAR pattern differences.',
    ],
    output: 'Event list with date, location, magnitude, and rough cause.',
  },
  {
    id: '3',
    title: 'RAG reporting layer',
    timeline: '3–5 days',
    goal: 'Make the output legible to someone who has never seen an NDVI chart.',
    tasks: [
      'Ingest registry documents, PDDs, methodologies, and claimed carbon data.',
      'Build retrieval over documents and detected events.',
      'Generate a plain-language report comparing claimed versus observed conditions.',
      'Keep the honest scope limits in the template itself.',
    ],
    output: 'One generated risk report per project.',
  },
  {
    id: '4',
    title: 'Demo dashboard',
    timeline: '3–5 days',
    goal: 'Build the one screen the whole project exists to produce.',
    tasks: [
      'Map the 13 monitored projects and color-code them by risk.',
      'Add click-through from pin to time series to flagged events to report.',
      'Ship the money shot with before/after imagery side by side.',
      'Add a buyer-exposure overlay so the map turns into a pitch.',
    ],
    output: 'Clickable demo that works without narration.',
  },
  {
    id: '5',
    title: 'Package as proof',
    timeline: '2–3 days',
    goal: 'Convert the prototype into something a stranger can evaluate fast.',
    tasks: [
      'Write a short note on projects monitored and what was detected.',
      'Clean the repo for public review.',
      'Move into outreach once the first real flag is caught.',
    ],
    output: 'Shareable artifact and the start of buyer conversations.',
  },
];

export const portfolioThemes = [
  {
    label: 'Forest integrity',
    title: 'Crown cover, fire pressure, and fragmentation',
    body: 'Track how the canopy changes around issuance and expose any pressure that would weaken claim quality.',
  },
  {
    label: 'Coastal buffers',
    title: 'Mangrove stability and shoreline drift',
    body: 'Monitor erosion, sediment changes, and encroachment across the fragile blue-carbon frontier.',
  },
  {
    label: 'Buyer exposure',
    title: 'Credits mapped to the companies carrying the risk',
    body: 'Translate project integrity into actual portfolio exposure so sustainability teams can act with confidence.',
  },
];

export const targetWatchlist: WatchlistProject[] = [
  {
    id: '902',
    name: 'Kariba REDD+ Project',
    country: 'Zimbabwe',
    activity: 'ARR, REDD',
    status: 'Flagged',
    topBuyerExposure: 'Greenchoice 4.29M t · Gucci 2.94M t',
    why: 'The exact project behind Delta’s lawsuit exposure.',
  },
  {
    id: '1477',
    name: 'Katingan Peatland Restoration',
    country: 'Indonesia',
    activity: 'ARR, REDD, WRC',
    status: 'Flagged',
    topBuyerExposure: 'Shell 11.93M t',
    why: 'Shell’s single largest credit purchase and also held by Larsen & Toubro.',
  },
  {
    id: '934',
    name: 'The Mai Ndombe REDD+ Project',
    country: 'DR Congo',
    activity: 'REDD',
    status: 'Flagged',
    topBuyerExposure: 'Eni Upstream 8.43M t · Shell 5.78M t',
    why: 'Largest project by area in the set and best chance of a visible change signal.',
  },
  {
    id: '985',
    name: 'Cordillera Azul National Park',
    country: 'Peru',
    activity: 'REDD',
    status: 'Flagged',
    topBuyerExposure: 'Shell 7.02M t · DL 2.39M t',
    why: 'The flagship phantom credits case from major investigations.',
  },
  {
    id: '674',
    name: 'Rimba Raya Biodiversity Reserve',
    country: 'Indonesia',
    activity: 'REDD',
    status: 'Flagged',
    topBuyerExposure: 'Audi AG 2.42M t · Volkswagen 1.33M t',
    why: 'Held by Princeton Digital Group India, a strong India plus global-brand overlap.',
  },
  {
    id: '1382',
    name: 'Envira Amazonia Project',
    country: 'Brazil',
    activity: 'REDD',
    status: 'Flagged',
    topBuyerExposure: 'Geopost 2.87M t · Delta 217K t',
    why: 'Acre-state REDD project in the same scrutiny wave as Kariba and Cordillera Azul.',
  },
  {
    id: '612',
    name: 'Kasigau Corridor — Phase II',
    country: 'Kenya',
    activity: 'REDD',
    status: 'Flagged',
    topBuyerExposure: 'Shell 1.96M t · Netflix 242K t',
    why: 'Wildlife Works’ second Kasigau phase and a strong candidate for satellite drift.',
  },
  {
    id: '562',
    name: 'Kasigau Corridor — Phase I',
    country: 'Kenya',
    activity: 'REDD',
    status: 'Flagged',
    topBuyerExposure: 'Kering 189K t · BHP 100K t',
    why: 'Original Kasigau project with a long documentation trail.',
  },
  {
    id: '944',
    name: 'Alto Mayo Conservation Initiative',
    country: 'Peru',
    activity: 'REDD',
    status: 'Flagged',
    topBuyerExposure: 'Disney ~1.52M t combined',
    why: 'Disney’s largest single AFOLU exposure plus Gucci and Church & Dwight.',
  },
  {
    id: '1112',
    name: 'The Russas Project',
    country: 'Brazil',
    activity: 'REDD',
    status: 'Watch',
    topBuyerExposure: '4 named Indian buyers, ~2.9K t',
    why: 'The strongest India-domestic REDD story in the set.',
  },
  {
    id: '1408',
    name: 'Chyulu Hills REDD+ Project',
    country: 'Kenya',
    activity: 'REDD',
    status: 'Control',
    topBuyerExposure: 'Gucci 750K t · Apple 555K t',
    why: 'Same brands as flagged projects, but a useful clean control.',
  },
  {
    id: '1650',
    name: 'Keo Seima Wildlife Sanctuary',
    country: 'Cambodia',
    activity: 'REDD',
    status: 'Control',
    topBuyerExposure: 'Grab (combined) 751K t',
    why: 'Also held by RAYCHEM RPG India, but reads as stable.',
  },
  {
    id: '2404',
    name: 'MTPL Reforestation, India',
    country: 'India',
    activity: 'ARR',
    status: 'Domestic watch',
    topBuyerExposure: '11 Indian buyers, ~2.0K t',
    why: 'The only fully domestic pick and the most locally relatable demo.',
  },
];


export const buyerSpotlight: BuyerSpotlightRow[] = [
  {
    project: 'Katingan Peatland Restoration',
    country: 'Indonesia',
    tonnes: '1,000,000',
    status: 'Flagged',
  },
  { project: 'Southern Cardamom REDD+', country: 'Cambodia', tonnes: '500,987', status: 'Flagged' },
  {
    project: 'Cordillera Azul National Park',
    country: 'Peru',
    tonnes: '275,000',
    status: 'Flagged',
  },
  {
    project: 'Rimba Raya Biodiversity Reserve',
    country: 'Indonesia',
    tonnes: '250,000',
    status: 'Flagged',
  },
  { project: 'Envira Amazonia Project', country: 'Brazil', tonnes: '216,884', status: 'Flagged' },
  { project: 'RMDLT Portel-Para REDD', country: 'Brazil', tonnes: '101,356', status: 'Unreviewed' },
  { project: 'Kariba REDD+ Project', country: 'Zimbabwe', tonnes: '100,000', status: 'Flagged' },
  {
    project: 'Conservation Coast REDD+',
    country: 'Guatemala',
    tonnes: '71,439',
    status: 'Unreviewed',
  },
  {
    project: 'TIST Program, Kenya (VCS 009)',
    country: 'Kenya',
    tonnes: '46,000',
    status: 'Unreviewed',
  },
  {
    project: 'TIST Program, Uganda (VCS 006)',
    country: 'Uganda',
    tonnes: '34,197',
    status: 'Unreviewed',
  },
  { project: 'Kasigau Corridor — Phase I', country: 'Kenya', tonnes: '29,837', status: 'Flagged' },
  {
    project: 'TIST Program, Uganda (VCS 005)',
    country: 'Uganda',
    tonnes: '10,644',
    status: 'Unreviewed',
  },
  {
    project: 'Uchindile & Mapanda Reforestation',
    country: 'Tanzania',
    tonnes: '6,236',
    status: 'Unreviewed',
  },
  { project: 'Kasigau Corridor — Phase II', country: 'Kenya', tonnes: '2,342', status: 'Flagged' },
  {
    project: 'TIST Program, Kenya (VCS 005)',
    country: 'Kenya',
    tonnes: '1,400',
    status: 'Unreviewed',
  },
  {
    project: 'TIST Program, Uganda (VCS 001)',
    country: 'Uganda',
    tonnes: '124',
    status: 'Unreviewed',
  },
];

export const nextActions: NextAction[] = [
  {
    title: 'Pull GeoJSON boundaries',
    body: 'Get boundary polygons for the target projects from their Verra PDDs before any imagery work starts.',
  },
  {
    title: 'Set up Google Earth Engine',
    body: 'Create the Earth Engine account and connect the Python API for the imagery pipeline.',
  },
  {
    title: 'Build the pilot',
    body: 'Run the pipeline on Cordillera Azul or Kasigau Phase I first, then expand to the full list.',
  },
  {
    title: 'Scale to all 13 targets',
    body: 'Once the first time series looks right, move the same logic to the full watchlist.',
  },
  {
    title: 'Build Phase 2 to 4',
    body: 'Sequence change detection, RAG reporting, and the dashboard instead of mixing them.',
  },
  {
    title: 'Ship the Phase 5 write-up',
    body: 'Package the monitored projects, the detected signals, and the clean GitHub repo into one shareable proof artifact.',
  },
  {
    title: 'Start outreach',
    body: 'Use the Delta or Shell view as the concrete hook for real EU sustainability contacts.',
  },
];

export const comparisonGroups: ComparisonGroup[] = [
  {
    buyer: 'Gucci',
    verdict: 'Same buyer, different verdict',
    rows: [
      { project: 'Kariba', tonnes: '2.94M t', status: 'Flagged' },
      { project: 'Alto Mayo', tonnes: '350K t', status: 'Flagged' },
      { project: 'Chyulu Hills', tonnes: '750K t', status: 'Control' },
    ],
  },
  {
    buyer: 'Disney',
    verdict: 'Exposure with a safer control',
    rows: [
      { project: 'Alto Mayo', tonnes: '1.52M t', status: 'Flagged' },
      { project: 'Keo Seima', tonnes: '287K t', status: 'Control' },
    ],
  },
  {
    buyer: 'Shell',
    verdict: 'Scale flag across the biggest footprint',
    rows: [
      { project: 'Katingan', tonnes: '11.93M t', status: 'Flagged' },
      { project: 'Cordillera Azul', tonnes: '7.02M t', status: 'Flagged' },
      { project: 'Mai Ndombe', tonnes: '8.43M t', status: 'Flagged' },
      { project: 'Kasigau II', tonnes: '1.96M t', status: 'Flagged' },
    ],
  },
];


export const provenanceNotes = [
  'Projects and buyer figures come from the registry extracts already generated in the repository output folder.',
  'Flagged status for some projects is extrapolated from the same scrutiny wave as the already-verified cases.',
  'Any names or tonnage values should be rechecked against the underlying retirement records before external use.',
];
