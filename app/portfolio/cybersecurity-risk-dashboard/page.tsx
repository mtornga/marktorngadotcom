import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { getProjectBySlug } from '@/lib/content';

const PROJECT_SLUG = 'cybersecurity-risk-dashboard';

const decisionCards = [
  {
    title: 'Protect credibility before the reveal',
    decision:
      'I delayed the first flagship dashboard demo until we had strong alignment on metric definitions, audience expectations, and visual narrative.',
    why:
      'High-profile executives make fast judgments. A half-formed dashboard would have created doubt that was hard to reverse.',
  },
  {
    title: 'Make the index transparent, not mysterious',
    decision:
      'I implemented a simple weighted average at the NIST subcategory level, then paired it with visual drill-down so leaders could see how each component contributed.',
    why:
      'A board score only works if people trust how it is calculated. Transparency protected trust and prevented misleading rollups.',
  },
  {
    title: 'Deliver in layers under pressure',
    decision:
      'I released focused slices for learning and alignment, while safeguarding the final board-ready dashboard as a polished, high-confidence release.',
    why:
      'This approach let stakeholders shape direction without framing unfinished drafts as the final product.',
  },
] as const;

const timeline = [
  {
    phase: 'August to December',
    title: 'Alignment before exposure',
    detail:
      'The team faced pressure to show "the dashboard" early. I prioritized metric definition, ownership clarity, and narrative alignment before committing to a flagship reveal.',
  },
  {
    phase: 'During discovery',
    title: 'Guarded progress demos',
    detail:
      'I shared targeted intermediate views with clear framing: useful progress, but not the finished executive artifact. This preserved momentum without sacrificing trust.',
  },
  {
    phase: 'Late January reveal',
    title: 'Board-ready launch moment',
    detail:
      'With shared understanding in place, the final dashboard came together quickly and landed strongly in the first executive walkthrough.',
  },
] as const;

const executiveQuotes = [
  { quote: 'I think this is awesome.', role: 'VP, Governance and Security' },
  { quote: 'I am blown away.', role: 'CISO' },
  { quote: 'Love the landing page.', role: 'IT Leadership' },
  {
    quote:
      'You absolutely crushed it on the security dashboard project. To build a board-level presentation in two weeks is no small feat.',
    role: 'Senior Delivery Principal',
  },
] as const;

const outcomes = [
  { label: 'Metrics launched', value: '23' },
  { label: 'Alteryx workflows engineered', value: '20' },
  { label: 'Tableau dashboards delivered', value: '17' },
  { label: 'Unique source systems integrated', value: '16' },
  { label: 'Enterprise scale context', value: '~$15B' },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const project = getProjectBySlug(PROJECT_SLUG);

  if (!project) {
    return {
      title: 'Cybersecurity Risk Dashboard | Mark Tornga',
      description:
        'A story-first case study on leadership decisions and high-pressure delivery for executive cybersecurity reporting.',
    };
  }

  return {
    title: `${project.frontmatter.title} | Mark Tornga`,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      images: [
        {
          url:
            project.frontmatter.heroImage ||
            '/images/projects/cybersecurity-risk-dashboard/project-summary.png',
        },
      ],
    },
  };
}

export default function CybersecurityRiskDashboardPage() {
  return (
    <main className="py-12 md:py-20">
      <Container size="lg">
        <div className="mb-8">
          <Link href="/portfolio" className="neo-link text-base">
            Back to Portfolio
          </Link>
        </div>

        {/* 1) Hero hook */}
        <section className="border-8 border-neo-text bg-neo-primary text-white p-8 md:p-12 shadow-neo mb-12">
          <p className="font-heading text-4xl md:text-6xl mb-6 leading-tight">
            &quot;Good luck.&quot;
          </p>
          <p className="text-lg md:text-xl max-w-4xl">
            That was the closing guidance after a brainstorming session with senior security leaders at a global insurance enterprise.
            The ask sounded simple: deliver a board-ready cybersecurity dashboard. The reality was unclear definitions, high-visibility
            stakeholders, and one chance to establish confidence.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="secondary">Story-First Case Study</Badge>
            <Badge variant="accent">High-Pressure Delivery</Badge>
            <Badge variant="secondary">Executive Audience</Badge>
          </div>
        </section>

        {/* 2) Pressure context */}
        <section className="border-4 border-neo-text bg-neo-surface p-8 shadow-neo mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-5 text-neo-primary">
            Cybersecurity Risk Dashboard
          </h1>
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-text">
            Pressure Context
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-neo-text/90">
              <p>
                The project had high profile executive attention and no room for a weak first impression.
                The program started in August, but the dashboard narrative was still unsettled deep into the engagement.
              </p>
              <p>
                Data lived across 16 systems with inconsistent definitions and uneven quality. The pressure was not
                only technical; it was organizational and reputational.
              </p>
              <p>
                My leadership focus was clear: build shared understanding first, then deliver a finished story that executives
                could trust immediately.
              </p>
            </div>
            <figure className="border-4 border-neo-text shadow-neo overflow-hidden bg-white">
              <img
                src="/images/projects/cybersecurity-risk-dashboard/workflow-map.png"
                alt="Map of data sources, workflow steps, and dashboard pages used to assemble cybersecurity reporting"
                width={1999}
                height={1127}
                loading="lazy"
                className="w-full h-auto"
              />
              <figcaption className="text-sm text-neo-text/80 p-4 border-t-4 border-neo-text">
                Decision implication: complexity was managed through structure, not by oversimplifying risk signals.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 3) Decision framework */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary transform -rotate-1">
            What I Chose and Why
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {decisionCards.map((card) => (
              <Card key={card.title} className="h-full" hover={false}>
                <h3 className="font-heading font-bold text-2xl mb-3 text-neo-primary">{card.title}</h3>
                <p className="font-semibold mb-3 text-neo-text">{card.decision}</p>
                <p className="text-neo-text/80">{card.why}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 4) Delivery strategy timeline */}
        <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-3xl mb-8 text-neo-primary">
            Delivery Strategy Timeline
          </h2>
          <div className="space-y-8">
            {timeline.map((item) => (
              <div key={item.title} className="border-l-4 border-neo-accent pl-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-neo-text/70 mb-2">{item.phase}</p>
                <h3 className="font-heading font-bold text-2xl mb-2">{item.title}</h3>
                <p className="text-neo-text/85">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5) Product reveal gallery */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary">
            Product Reveal Gallery
          </h2>
          <div className="space-y-8">
            <figure className="border-4 border-neo-text shadow-neo overflow-hidden bg-white">
              <img
                src="/images/projects/cybersecurity-risk-dashboard/landing-page.gif"
                alt="Animated landing page view of the executive cybersecurity dashboard"
                width={1388}
                height={792}
                loading="lazy"
                className="w-full h-auto"
              />
              <figcaption className="text-sm text-neo-text/80 p-4 border-t-4 border-neo-text">
                Decision implication: the opening view answers board-level questions quickly, then directs attention to priority risk areas.
              </figcaption>
            </figure>
            <figure className="border-4 border-neo-text shadow-neo overflow-hidden bg-white">
              <img
                src="/images/projects/cybersecurity-risk-dashboard/detail-drilldown.gif"
                alt="Animated drill-down view showing how users move from summary metrics to detailed evidence"
                width={1388}
                height={792}
                loading="lazy"
                className="w-full h-auto"
              />
              <figcaption className="text-sm text-neo-text/80 p-4 border-t-4 border-neo-text">
                Decision implication: transparency in drill-down preserved trust in the headline index.
              </figcaption>
            </figure>
            <figure className="border-4 border-neo-text shadow-neo overflow-hidden bg-white">
              <img
                src="/images/projects/cybersecurity-risk-dashboard/metric-trends.jpg"
                alt="Static trends view showing metric performance over time across cybersecurity domains"
                width={1999}
                height={1131}
                loading="lazy"
                className="w-full h-auto"
              />
              <figcaption className="text-sm text-neo-text/80 p-4 border-t-4 border-neo-text">
                Decision implication: trend framing shifted conversation from snapshot debate to trajectory and accountability.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 6) Executive reaction wall */}
        <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            Executive Reaction Wall
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {executiveQuotes.map((entry) => (
              <Card key={`${entry.role}-${entry.quote}`} className="h-full" hover={false}>
                <p className="text-xl font-semibold mb-4 text-neo-text">
                  &quot;{entry.quote}&quot;
                </p>
                <p className="text-sm uppercase tracking-wide text-neo-text/70">{entry.role}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 7) Contrast proof */}
        <section className="border-4 border-neo-text bg-neo-surface p-8 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            Contrast Proof: Clarity Under Pressure
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="border-4 border-neo-text shadow-neo overflow-hidden bg-white">
              <img
                src="/images/projects/cybersecurity-risk-dashboard/competitor-view-1.png"
                alt="Alternative consultant dashboard approach used as a contrast reference"
                width={1201}
                height={636}
                loading="lazy"
                className="w-full h-auto"
              />
              <figcaption className="text-sm text-neo-text/80 p-4 border-t-4 border-neo-text">
                Contrast reference: a denser approach with weaker scannability for executive readouts.
              </figcaption>
            </figure>
            <div className="space-y-4 text-neo-text/90">
              <p>
                This comparison is not about criticizing another team. It is evidence of delivery strategy.
                My approach optimized for executive comprehension under time pressure.
              </p>
              <p>
                The design intentionally balanced summary and traceability so leaders could make decisions quickly
                without losing confidence in the underlying detail.
              </p>
              <p>
                In board contexts, visual clarity is a risk control. Better readability leads to better decisions.
              </p>
            </div>
          </div>
        </section>

        {/* 8) Outcomes and leadership takeaways */}
        <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            Outcomes and Leadership Takeaways
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {outcomes.map((item) => (
              <div key={item.label} className="border-4 border-neo-text bg-white p-4 text-center shadow-neo-sm">
                <p className="font-heading font-bold text-3xl text-neo-primary mb-2">{item.value}</p>
                <p className="text-sm text-neo-text/80">{item.label}</p>
              </div>
            ))}
          </div>

          <figure className="border-4 border-neo-text shadow-neo overflow-hidden bg-white mb-8">
            <img
              src="/images/projects/cybersecurity-risk-dashboard/project-summary.png"
              alt="Project summary slide highlighting delivery milestones and measurable impact"
              width={1999}
              height={1127}
              loading="lazy"
              className="w-full h-auto"
            />
            <figcaption className="text-sm text-neo-text/80 p-4 border-t-4 border-neo-text">
              Decision implication: trust built from disciplined sequencing, clear definitions, and a finished first impression.
            </figcaption>
          </figure>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-3 text-neo-primary">What changed for the organization</h3>
              <ul className="list-disc list-inside space-y-2 text-neo-text/85">
                <li>Moved from manual, email-driven reporting to scalable source-of-truth analytics.</li>
                <li>Established a trusted board narrative for cybersecurity posture and movement over time.</li>
                <li>Created a foundation that supported project extension and expansion after handoff.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-2xl mb-3 text-neo-primary">What this says about how I lead</h3>
              <ul className="list-disc list-inside space-y-2 text-neo-text/85">
                <li>I protect executive trust by sequencing delivery for confidence, not optics.</li>
                <li>I simplify high-stakes decisions without hiding the underlying mechanics.</li>
                <li>I translate ambiguity into clear action, then execute fast when alignment is real.</li>
              </ul>
            </div>
          </div>

          <div className="border-4 border-neo-text bg-neo-accent p-6">
            <h3 className="font-heading font-bold text-2xl mb-3">Technical Footprint</h3>
            <p className="text-neo-text/90">
              16 integrated sources including SIEM, IAM, endpoint, vulnerability, and governance platforms; 20 Alteryx workflows;
              17 Tableau dashboards; and an index model designed for transparent executive decision support.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
