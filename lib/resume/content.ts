export interface ResumeMetric {
  value: string;
  label: string;
  note: string;
}

export interface ResumeLevel {
  value: number;
  label: string;
  summary: string;
}

export interface ResumeProject {
  name: string;
  impact: string;
  stack: string[];
  bullets: string[];
}

export interface ResumeExperience {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
}

export interface ResumeSkillGroup {
  title: string;
  skills: string[];
}

export interface ResumeQuote {
  quote: string;
  attribution: string;
}

export interface ResumePdfSkillCluster {
  title: string;
  details: string;
}

export interface ResumePdfExperienceEntry {
  company: string;
  role: string;
  location: string;
  bullets: string[];
}

export interface ResumePdfProjectEntry {
  name: string;
  detail: string;
}

export interface ResumeExpandedProject {
  name: string;
  problem: string;
  approach: string[];
  outcomes: string[];
  tools: string[];
}

export interface ResumeExpandedExperienceNote {
  company: string;
  notes: string[];
}

export const resumePdfPath = '/resume/Mark_Tornga_Resume_2026-02-09.pdf';

export const resumeLevels: ResumeLevel[] = [
  {
    value: 0,
    label: 'Quick Bite',
    summary: 'Fast skim with headline evidence only.',
  },
  {
    value: 1,
    label: 'Resume',
    summary: 'Standard resume depth for initial review.',
  },
  {
    value: 2,
    label: 'Resume+',
    summary: 'Expanded technical and delivery detail.',
  },
  {
    value: 3,
    label: 'Everything Ever',
    summary: 'Full depth with broad context and supporting detail.',
  },
];

export const resumeIdentity = {
  name: 'Mark Tornga',
  location: 'Ballwin, MO',
  email: 'mtornga@gmail.com',
  linkedin: 'https://linkedin.com/in/marktornga',
  github: 'https://github.com/mtornga',
  motif: 'Highly extensible human',
  headline: 'Data and AI systems leader building production analytics and automation',
  summary:
    'I design and ship data platforms, analytics products, and AI workflows that scale from experimentation to enterprise adoption.',
};

export const resumeMetrics: ResumeMetric[] = [
  {
    value: '~1,400',
    label: 'Monthly active analytics users',
    note: 'Scaled governed BI adoption across functions.',
  },
  {
    value: '85%',
    label: 'LLM cost reduction',
    note: 'Two-pass architecture for high-volume bid classification.',
  },
  {
    value: '~300',
    label: 'Hours saved',
    note: 'Automated product description generation.',
  },
  {
    value: '23k -> 8k',
    label: 'Claims backlog reduction',
    note: 'SQL automation and workflow redesign in ~90 days.',
  },
  {
    value: '1M+',
    label: 'Bids/year classified',
    note: 'AI triage to surface high-confidence sales opportunities.',
  },
];

export const currentWork = {
  title: 'Current Work',
  role: 'Tableau Implementation Consultant (Contract)',
  company: 'Abstrakt Cloud Solutions',
  dates: 'Nov 2025 - Present',
  bullets: [
    'Support Salesforce-funded Tableau Cloud jump starts with a focus on connectivity, semantic modeling readiness, and governance foundations.',
    'Partner with CFOs, engineering leaders, and Salesforce admins to de-risk implementation architecture and migration decisions.',
  ],
};

export const aiProjectHighlights: ResumeProject[] = [
  {
    name: 'Fire Protection Lead Intelligence',
    impact:
      'Classified 1M+ annual bids with a two-pass LLM system to surface high-confidence fire protection opportunities while cutting model cost by 85%.',
    stack: ['Azure AI Foundry', 'Microsoft Fabric', 'PySpark', 'Python'],
    bullets: [
      'Designed cheap-first, expensive-on-low-confidence inference flow to preserve precision at scale.',
      'Delivered decision-ready lead sets to sales workflows from massive noisy bid streams.',
      'Established prompt iteration and validation loops for ongoing quality control.',
    ],
  },
  {
    name: 'Mueller Product Description Automation',
    impact:
      'Standardized ~87,000 product descriptions and saved ~300 analyst hours using LLM-assisted normalization.',
    stack: ['GPT-4', 'Azure AI Foundry', 'Fabric Notebooks'],
    bullets: [
      'Applied a 13-element content standard across inconsistent vendor source material.',
      'Built evaluation datasets to track accuracy by prompt revision.',
      'Improved consistency and reduced manual remediation load.',
    ],
  },
  {
    name: 'Wildlife UGV Spatial Intelligence Research',
    impact:
      'Built end-to-end computer vision and tracking pipelines that convert detections into navigable coordinates for autonomous response.',
    stack: ['PyTorch', 'YOLO', 'RT-DETR', 'OpenCV', 'Docker'],
    bullets: [
      'Trained custom models under low-light and long-range constraints.',
      'Implemented calibration with AprilTags and homography transforms.',
      'Integrated detection outputs with rover controls for closed-loop prototyping.',
    ],
  },
];

export const experience: ResumeExperience[] = [
  {
    company: 'Core and Main',
    role: 'Senior Manager, Data Analytics | Manager, Data Analytics',
    dates: '2023 - 2025',
    location: 'St. Louis, MO',
    bullets: [
      'Led enterprise BI modernization into a Microsoft Fabric-based data estate with governed semantic models.',
      'Reverse-engineered 200+ D365 Finance and Operations tables into bronze/silver/gold data products using PySpark and Fabric notebooks.',
      'Unified D365 and legacy ERP data into shared KPI-ready master topics for finance, operations, and sales.',
      'Partnered with CFO and CIO on governance, metric stewardship, and tool consolidation aligned to compliance requirements.',
      'Shipped six AI initiatives, including OCR + LLM workflows and AI learning tools adopted by business teams.',
      'Scaled data literacy through Power BI and analytics training programs delivered to hundreds of employees.',
    ],
  },
  {
    company: 'Slalom, Inc.',
    role: 'Senior Consultant',
    dates: '2018 - 2023',
    location: 'St. Louis, MO',
    bullets: [
      'Delivered 18 engagements across 8 clients in financial services, communications, energy, and healthcare.',
      'Built board-facing cybersecurity metrics dashboards aligned to NIST with 16 data sources and executive-ready drilldown design.',
      'Designed SQL workflows that reduced a claims backlog from ~23,000 to ~8,000 and accelerated time-to-resolution.',
      'Built event-driven GCP pipelines using Pub/Sub, Cloud Functions, BigQuery, and CI/CD automation.',
      'Recognized as 2020 Slalom-Tableau Rockstar and led a data and analytics week attended by 420+ participants.',
    ],
  },
  {
    company: 'Unyson Logistics',
    role: 'Manager, Business Intelligence Analyst',
    dates: '2016 - 2018',
    location: 'St. Louis, MO',
    bullets: [
      'Managed and mentored a team of up to 11 analysts with structured onboarding and technical curriculum.',
      'Built cross-docking dashboard operations used daily for 5+ years without redesign.',
      'Trained technical and non-technical users in SQL, Excel, Tableau, and Alteryx.',
    ],
  },
];

export const skillGroups: ResumeSkillGroup[] = [
  {
    title: 'Data Platforms and Engineering',
    skills: ['Microsoft Fabric', 'D365 F&O', 'PySpark/SparkSQL', 'SQL', 'dbt', 'Power BI'],
  },
  {
    title: 'AI and Automation',
    skills: ['Azure AI Foundry', 'OpenAI/GPT models', 'LLM evaluation loops', 'OCR pipelines', 'Prompt architecture'],
  },
  {
    title: 'Software and Infrastructure',
    skills: ['Python', 'TypeScript', 'Docker', 'GCP', 'AWS', 'GitHub Actions'],
  },
  {
    title: 'Leadership and Delivery',
    skills: ['Team building', 'Stakeholder alignment', 'Governance', 'Data literacy programs', 'Executive communication'],
  },
];

export const educationAndCerts: string[] = [
  'Michigan State University - B.A., Supply Chain Management',
  'Saint Louis University - Data Analytics Certification',
  'AWS Certified Solutions Architect - Associate (2021)',
  'Tableau Certified Associate Consultant (2020)',
  'Apache Airflow Fundamentals (2021)',
  'Microsoft Azure Fundamentals (2020)',
];

export const resumeQuotes: ResumeQuote[] = [
  {
    quote:
      'Mark and his team have successfully delivered six AI projects, becoming early adopters and educators in the field.',
    attribution: 'Vice President of Finance',
  },
  {
    quote:
      'Mark quickly became a trusted leader and partner with a strong technical skillset and strategic mindset.',
    attribution: 'Vice President of Finance',
  },
  {
    quote:
      'What stands out most is Mark\'s poise in tough situations. His composure under pressure translated into client confidence.',
    attribution: 'Solution Architect',
  },
  {
    quote:
      'If I were assembling a team for a critical data project, I\'d want Mark on it.',
    attribution: 'Senior Architect',
  },
];

export const resumePdfSummary =
  'Analytics engineer and AI practitioner with 8+ years delivering enterprise data products, AI/ML solutions, and scalable analytics platforms. Combines deep SQL, Python, and cloud engineering with a track record of translating ambiguous business problems into production systems.';

export const resumePdfSkillClusters: ResumePdfSkillCluster[] = [
  {
    title: 'Analytics Engineering',
    details: 'SQL (T-SQL, SparkSQL), PySpark, dbt, data modeling, star schema, semantic layers, KPI governance',
  },
  {
    title: 'AI / ML',
    details: 'Azure AI Foundry, OpenAI, LLM orchestration, prompt engineering, PyTorch, YOLO, computer vision',
  },
  {
    title: 'Cloud and Infrastructure',
    details: 'Microsoft Fabric, Azure, GCP, AWS, Docker, Terraform, Airflow, GitHub Actions, CI/CD',
  },
  {
    title: 'BI and Visualization',
    details: 'Power BI, Tableau, Looker, executive dashboards, adoption measurement, data storytelling',
  },
  {
    title: 'Data Platforms',
    details: 'Fabric lakehouse, Synapse Link, BigQuery, Snowflake, Hadoop/Hive, NiFi, REST APIs, metadata management',
  },
  {
    title: 'Delivery and Leadership',
    details: 'Agile/Scrum, Azure DevOps, stakeholder alignment, requirements gathering, cross-functional collaboration',
  },
];

export const resumePdfExperience: ResumePdfExperienceEntry[] = [
  {
    company: 'Core and Main',
    role: 'Senior Manager, Data Analytics (2025) | Manager, Data Analytics (2023 - 2025)',
    location: 'St. Louis, MO',
    bullets: [
      'Launched six production AI projects using Azure AI Foundry + OpenAI; flagship two-pass LLM lead classifier reduced inference cost by ~85% and attributed ~$1.5M in won deals at less than ~$5 model spend.',
      'Built a Fabric lakehouse from 200+ D365 F&O tables through bronze/silver/gold with PySpark/SparkSQL, validation checks, and lineage documentation.',
      'Unified D365 and legacy ERP data into governed semantic models supporting Finance, Ops, Sales, and Accounting with ~1,400 monthly active Power BI users.',
      'Automated OCR + LLM data enrichment to reduce a 40-hour/week manual workflow to 4 hours and standardized ~87K SKUs, saving ~300 analyst hours.',
      'Operationalized cost analytics by joining Fabric compute usage, Power BI Admin activity, and employee roster data.',
    ],
  },
  {
    company: 'Slalom Consulting',
    role: 'Senior Consultant, Data Engineering and Analytics (2018 - 2023)',
    location: 'St. Louis, MO',
    bullets: [
      'Delivered analytics and engineering outcomes across 8 clients and 18 engagements in financial services, healthcare, communications, and energy.',
      'Designed 22 NIST-aligned cybersecurity metrics for a $16B global insurer and automated collection from 16 data sources into board-facing Tableau dashboards.',
      'Reduced a Fortune 50 insurer claims backlog from ~23,000 to ~8,000 via SQL automation (CTEs, window functions, temp tables) in ~90 days.',
      'Built event-driven GCP pipelines using Pub/Sub, Cloud Functions, BigQuery, IAM, and GitHub Actions CI/CD.',
      'Recognized as a 2020 Slalom-Tableau Rockstar; led a Data and Analytics week with 420+ attendees and won 1st place in the 2023 Slalom D&A Hackathon.',
    ],
  },
  {
    company: 'Abstrakt Cloud Solutions',
    role: 'Tableau Consultant (Contract)',
    location: 'St. Louis, MO',
    bullets: [
      'Delivered Tableau implementation and stakeholder advisory across concurrent Jump Start engagements.',
    ],
  },
  {
    company: 'Unyson Logistics',
    role: 'Manager, Business Intelligence Analyst (2016 - 2018)',
    location: 'St. Louis, MO',
    bullets: [
      'Managed up to 11 analysts, built SQL/Tableau/Alteryx training pathways, and delivered a cross-docking dashboard used daily without alteration for 5+ years.',
    ],
  },
];

export const resumePdfProjects: ResumePdfProjectEntry[] = [
  {
    name: 'Fire Protection Lead Classification',
    detail: 'Classified ~1M bids/year with a two-pass LLM architecture, cutting cost by ~85% while producing high-confidence sales leads.',
  },
  {
    name: 'Invoice OCR Automation',
    detail: 'Combined Azure Vision + GPT to reduce a manual invoice extraction process from 40 hours/week to 4 hours using confidence-scored review workflows.',
  },
  {
    name: 'Product Description Standardization',
    detail: 'Generated standardized descriptions for ~87,000 products across 13 data elements with evaluation tracking per prompt revision.',
  },
  {
    name: 'LLM Interaction Learning Games',
    detail: 'Built two browser-based, single-file learning games that teach scalable prompting and OCR workflows with near-zero infrastructure.',
  },
  {
    name: 'Fabric Lakehouse and Multi-ERP Unification',
    detail: 'Engineered bronze/silver/gold data products from D365 + legacy ERP to support governed, company-wide reporting.',
  },
  {
    name: 'Cybersecurity Risk Metrics',
    detail: 'Delivered board/CISO-ready risk dashboards aligned to NIST using 16 source systems and executive drill-down views.',
  },
  {
    name: 'Insurance Claims Backlog Resolution',
    detail: 'Designed SQL automation that moved claims backlog from ~23,000 to ~8,000 in ~90 days.',
  },
  {
    name: 'Computer Vision and Robotics Research',
    detail: 'Built wildlife detection pipelines with PyTorch, YOLO, RT-DETR, and spatial calibration for robotic navigation.',
  },
  {
    name: 'IoT Sensor Network',
    detail: 'Built an independent Raspberry Pi monitoring stack with Docker, NiFi, MySQL, Flask, and Python automation.',
  },
];

export const currentWorkExtendedBullets: string[] = [
  'Configured Tableau Cloud authentication, creator access, and secure data connectivity for Salesforce and SQL Server environments.',
  'Implemented foundational Salesforce object models for scalable downstream analytics and Tableau Pulse readiness.',
  'Led cloud-to-database troubleshooting across IP safelisting, driver alignment, and Bridge-vs-direct connector decisions.',
  'Advised migration strategy from vendor-hosted Tableau Server deployments and created implementation readiness plans with CFO, engineering, and admin stakeholders.',
];

export const resumeExpandedExperienceNotes: ResumeExpandedExperienceNote[] = [
  {
    company: 'Core and Main',
    notes: [
      'Led enterprise data modernization from fragmented tooling into a governed Microsoft Fabric estate with semantic model standards.',
      'Mapped D365 entities/forms/UI logic to underlying tables using the D365 UI and Argano AOT browser, then onboarded 200+ tables into Synapse Link.',
      'Reverse-engineered D365 business logic into gold topic tables (InvoiceLine, InventoryOnHand, PurchaseOrderHeader) and unified with legacy ERP master topics.',
      'Partnered with CFO/CIO to establish KPI stewardship, governance routines, and tool consolidation aligned to SOX expectations.',
      'Expanded organization-wide analytics literacy through Power BI training and responsible AI enablement programs.',
    ],
  },
  {
    company: 'Slalom, Inc.',
    notes: [
      'Worked directly with VPs, CISOs, and business leaders to translate ambiguous priorities into scoped, executable data solutions.',
      'Built complete delivery workflows from requirements and data flow design through implementation, dashboard UX, and executive readouts.',
      'Won 1st place in the 2023 Slalom Data and Analytics Hackathon using Python, Google Maps API, BigQuery, and Tableau.',
    ],
  },
  {
    company: 'Unyson Logistics',
    notes: [
      'Owned analyst recruiting, technical onboarding, and coaching programs for a BI team of up to 11 analysts.',
      'Built practical enablement curricula for technical and non-technical users across SQL, Excel, Tableau, and Alteryx.',
    ],
  },
];

export const resumeExpandedProjects: ResumeExpandedProject[] = [
  {
    name: 'Fire Protection Lead Intelligence',
    problem: 'Sales teams had massive bid data with low signal, making high-confidence opportunity detection difficult.',
    approach: [
      'Built a two-pass model strategy: cheap model first, expensive model only on low-confidence records.',
      'Implemented the workflow in Microsoft Fabric notebooks + lakehouses with Python and Azure Key Vault.',
      'Mapped predictions to operational categories and lead timing windows for seller actionability.',
    ],
    outcomes: [
      'Triaged ~1M bids/year into a few hundred high-confidence leads for sellers.',
      'Cut inference cost by ~85% and attributed ~$1.5M in won deals with less than ~$5 in LLM spend.',
      'Presented outcome metrics to executive audiences, including board-level reviews.',
    ],
    tools: ['Azure AI Foundry', 'OpenAI models', 'Microsoft Fabric', 'Python', 'PySpark'],
  },
  {
    name: 'Invoice OCR Automation for Pricing',
    problem: 'Pricing analysts spent ~40 hours/week manually extracting invoice data and could not keep up with volume.',
    approach: [
      'Used Brainware OCR fields + Azure Vision + GPT semantic extraction to capture pricing-relevant fields.',
      'Benchmarked five OCR/model combinations using a 100-invoice evaluation set for cost/accuracy tradeoffs.',
      'Built a browser UI with confidence scoring, conditional review cues, and bounding-box visual verification.',
    ],
    outcomes: [
      'Reduced manual workload from ~40 hours/week to ~4 while lowering burnout risk.',
      'Enabled CSV export and optional Fabric lakehouse delivery for downstream analysis.',
      'Captured human corrections for prompt refinement and continuous quality improvements.',
    ],
    tools: ['Azure Vision', 'GPT-4o/GPT-4o-mini', 'HTML/CSS/JS', 'Fabric lakehouse', 'Brainware OCR'],
  },
  {
    name: 'Mueller Product Description Automation',
    problem: 'Product descriptions were inconsistent, manually maintained, and costly to normalize at scale.',
    approach: [
      'Generated descriptions with GPT-4 in Azure AI Foundry using a 13-element content standard.',
      'Normalized entity variants (for example, ST LOUIS vs SAINT LOUIS) and structured output for BI reuse.',
      'Built per-element evaluation datasets to measure precision per prompt revision.',
    ],
    outcomes: [
      'Standardized ~87,000 products and saved ~300 analyst hours.',
      'Improved consistency and reduced manual remediation time.',
    ],
    tools: ['GPT-4', 'Azure AI Foundry', 'Fabric notebooks', 'Evaluation datasets'],
  },
  {
    name: 'Reporting Strategy Catalog Platform',
    problem: 'Organizations lacked a reliable inventory of reports and duplicated analytics assets.',
    approach: [
      'Built a React + SQLite catalog app that tracks report names, personas, fields, platforms, links, and screenshots.',
      'Added OCR + LLM enrichment to auto-fill metadata from screenshots.',
      'Added consolidation analysis prompts to identify duplicate reports and retirement opportunities.',
    ],
    outcomes: [
      'Created a practical foundation for BI governance and rationalization decisions.',
      'Enabled faster report discovery and reduced duplicate reporting effort.',
    ],
    tools: ['React', 'SQLite', 'OCR pipelines', 'LLM APIs'],
  },
  {
    name: 'LLM Interaction Learning Games',
    problem: 'Business users often treat LLMs as chatbots and miss scalable workflow patterns.',
    approach: [
      'Built two multi-level browser games shipped as single HTML/CSS/JS files for frictionless distribution.',
      'Game 1 teaches one-prompt-at-scale data cleanup across messy ERP email rows.',
      'Game 2 compares manual invoice extraction vs LLM extraction with timed feedback.',
    ],
    outcomes: [
      'Demonstrated practical AI literacy without standing up platform infrastructure.',
      'Helped teams understand prompting, OCR primitives, and evaluation loops through hands-on interaction.',
    ],
    tools: ['GitHub Copilot GPT-5', 'Azure AI Foundry models', 'HTML/CSS/JS'],
  },
  {
    name: 'Wildlife UGV Spatial Intelligence Research',
    problem: 'Autonomous response requires robust wildlife detection and spatial translation under difficult conditions.',
    approach: [
      'Created end-to-end CV pipelines with dataset prep, training, and evaluation on real/simulated feeds.',
      'Trained YOLO and RT-DETR models for low-light, occlusion, and long-range scenarios.',
      'Implemented AprilTag + homography calibration and multi-object tracking for rover navigation.',
    ],
    outcomes: [
      'Converted detections into navigable coordinates and validated closed-loop vision-to-motion experiments.',
      'Established reproducible model environments with Docker and cloud GPU testing.',
    ],
    tools: ['Python', 'PyTorch', 'CUDA', 'YOLO', 'RT-DETR', 'OpenCV', 'Docker', 'GCP Cloud Functions'],
  },
];

export const resumeQuoteLibrary: ResumeQuote[] = [
  {
    quote:
      'Mark and his team have successfully delivered six AI projects, becoming early adopters and educators in the field.',
    attribution: 'Vice President of Finance, Core and Main',
  },
  {
    quote:
      'Mark quickly became a trusted leader and partner. His strong technical skills and strategic mindset enabled immediate impact.',
    attribution: 'Vice President of Finance, Core and Main',
  },
  {
    quote:
      'Mark built a strong team through hands-on training and development, creating some of the highest engagement and retention we have seen.',
    attribution: 'Vice President of Finance, Core and Main',
  },
  {
    quote:
      'You absolutely crushed it on the security dashboard project. You earned the trust and respect of everyone involved.',
    attribution: 'Senior Delivery Principal, Slalom',
  },
  {
    quote:
      'Mark constantly adapted to a complex and shifting landscape and steered conversations to actionable outcomes.',
    attribution: 'Senior Consultant Lead, Slalom',
  },
  {
    quote:
      'Mark shows rare poise in tough situations. His composure under pressure translated directly into client confidence.',
    attribution: 'Solution Architect, Slalom',
  },
  {
    quote:
      'One of the most positive experiences I have had on a project. If I were assembling a team for a critical data project, I would want Mark on it.',
    attribution: 'Senior Architect, Slalom',
  },
  {
    quote:
      'Mark rapidly helped a healthcare client go from drowning in 23,000 unpaid claims to visibility and automation that reduced backlog to under 8,000.',
    attribution: 'Client VP, Fortune 50 Health Insurer',
  },
  {
    quote:
      'Mark took a freelance role to support our Tableau practice and made an immediate impact with high-quality delivery and expertise.',
    attribution: 'VP of Delivery, Abstrakt Cloud Solutions',
  },
];

export function getVisibleCount(level: number, base: number, max: number): number {
  if (level <= 0) return Math.min(base, max);
  if (level === 1) return Math.min(base + 1, max);
  if (level === 2) return Math.min(base + 2, max);
  return max;
}
