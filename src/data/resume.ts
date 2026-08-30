/** All site content, typed. Rendering is derived from this file only. */

export interface Bullet {
  tag: string;
  html: string;
}

export interface Job {
  company: string;
  detail?: string;
  role: string;
  note?: string;
  when: string;
  where: string;
  summary?: string;
  bullets: Bullet[];
}

export interface SkillGroup {
  name: string;
  color: string;
  items: string[];
}

export const jobs: Job[] = [
  {
    company: "Triptych Digital",
    detail: "Cantina partnership",
    role: "Forward Deployed Engineer",
    note: "First engineer hired, sole technical hire on site",
    when: "Aug 2026 to Present",
    where: "New York, NY",
    summary:
      "Cantina is a 440+ person platform backed by a16z, Benchmark, Greycroft, and Founders Fund, founded by Sean Parker. I report to the acting CTO, sit in client communications and GTM planning, and turn an ambiguous distribution deal into shipped production systems.",
    bullets: [
      {
        tag: "Distributed",
        html: "Replaced a manual six hour sequential process with a parallel pipeline: <strong>60 independent engines</strong>, up to <strong>30 concurrent</strong>, with quality scoring and selective retries so failed segments regenerate autonomously. Thirty minutes per run, a <strong>92% reduction</strong>, safe to run unattended.",
      },
      {
        tag: "Orchestration",
        html: "Generation APIs cap at 15 seconds and hold no state between calls. Designed the continuity layer that stitches <strong>eight or more stateless calls</strong> into one coherent two minute output with consistent state across every segment.",
      },
      {
        tag: "Platform",
        html: "Built <strong>TripForce</strong>: 13 role-scoped views over one backend, so the client sees delivery reporting while the team sees production internals. Tracks 1,200+ runs, 1,500+ graded outputs, 123 accounts, and per-run cost against weekly contractual targets.",
      },
      {
        tag: "Data layer",
        html: "Indexed <strong>5,900+ artifacts</strong> across Google Drive, Cloudflare R2, and the render service to reconcile what was produced against what shipped. Stood up a <strong>750 entity self-wiring knowledge graph</strong> on Postgres and pgvector, kept current by recursive enrichment passes.",
      },
      {
        tag: "Architecture",
        html: "Rearchitected process automation into callable tooling and <strong>MCP servers</strong>, making Slack, SSH, and direct API interchangeable entry points to the same primitives. Non-engineers now run production themselves.",
      },
    ],
  },
  {
    company: "Flowstage",
    detail: "placed at Triptych Management",
    role: "Forward Deployed Engineer",
    note: "First engineering intern",
    when: "May 2026 to Aug 2026",
    where: "New York, NY",
    summary:
      "Deployed as the only engineer inside Triptych Management during its seed round and pivot, then hired directly onto Triptych Digital.",
    bullets: [
      {
        tag: "Throughput",
        html: "Shipped the generation pipeline and the automated multi-platform publishing pipeline, scaling the agency to <strong>10,000+ tasks per month</strong> across 100+ distribution accounts. Scoped with non-technical stakeholders, taken to production solo.",
      },
      {
        tag: "Delivery",
        html: "Delivered a 14 week roadmap of six production workstreams in <strong>six weeks, eight weeks ahead of schedule</strong>, running weekly sprint planning one on one with the founder. Extended for a second term.",
      },
      {
        tag: "Analytics",
        html: "Built the first unified cross-campaign analytics engine over thousands of rows of performance data, combining cached metrics with live API pulls into interactive per-artist breakdowns.",
      },
    ],
  },
  {
    company: "Off Record Sounds",
    detail: "media platform, 10M+ monthly reach",
    role: "Software and Partnerships",
    when: "Mar 2025 to Apr 2026",
    where: "Remote",
    bullets: [
      {
        tag: "Systems",
        html: "Wrote a Python monitoring service watching high volume sources with real-time alerting, putting the outlet <strong>60+ seconds ahead of competitors</strong> on breaking stories.",
      },
      {
        tag: "Partnerships",
        html: "Ran label relationships, negotiating press credentials and rollout budgets with EMPIRE, Interscope, and Atlantic.",
      },
    ],
  },
];

export const project = {
  name: "Tails",
  domain: "tails.social",
  badge: "Live on the App Store",
  url: "https://tails.social",
  paragraphs: [
    "A sports conversation platform: native iOS app and web app on one backend, carrying live data across 6 sports and 10+ leagues. Solo designed, built, and shipped through App Store review.",
    "Started as a WebView wrapper, rebuilt the frontend natively when that was not good enough, and kept both clients in sync against a single API.",
  ],
  shots: [
    { src: "/tails-feed.png", alt: "Tails feed", kind: "feed" },
    { src: "/tails-games.png", alt: "Live scores in Tails", kind: "games" },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    color: "var(--sky)",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL", "Bash"],
  },
  {
    name: "Backend and data",
    color: "var(--violet)",
    items: [
      "Node.js",
      "Bun",
      "Express",
      "REST APIs",
      "PostgreSQL",
      "pgvector",
      "SQLite",
      "Docker",
      "cron and systemd",
      "Linux (Arch, Ubuntu)",
      "Git",
    ],
  },
  {
    name: "Infrastructure and tooling",
    color: "var(--rose)",
    items: [
      "MCP servers",
      "Knowledge graphs",
      "Hybrid vector retrieval",
      "Evaluation and scoring loops",
      "OpenRouter",
      "Anthropic API",
      "OpenAI API",
      "n8n",
    ],
  },
  {
    name: "Cloud, media, and frontend",
    color: "var(--peach)",
    items: [
      "DigitalOcean",
      "Cloudflare R2",
      "Google Drive API",
      "Slack API",
      "ffmpeg",
      "Shotstack",
      "React",
      "React Native",
      "Expo",
      "Tableau",
      "Power BI",
    ],
  },
];

export const education = {
  school: "University of Cincinnati",
  degree: "BASc, Information Technology",
  track: "Software Development Track · Aug 2024 to May 2028",
  blurb:
    "Co-op program: alternating semesters of full-time coursework and full-time engineering placements. Coursework in Data Structures, Algorithms, Object-Oriented Programming, Databases, and Software Engineering.",
  facts: [
    { n: "3.90", k: "Major GPA" },
    { n: "3x", k: "Dean's List" },
    { n: "2028", k: "Graduating" },
  ],
};
