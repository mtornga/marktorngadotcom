import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Agent Mail: Middle Management for AI Agents | AI Tinkerers STL',
  description: 'Presentation on using MCP Agent Mail to coordinate autonomous agents for wildlife detection computer vision.',
  openGraph: {
    title: 'Agent Mail: Middle Management for AI Agents',
    description: 'How I use headless agents and MCP Agent Mail to run a continuous retraining loop for wildlife detection.',
  },
};

// Lightbox component for fullscreen images
function LightboxImage({
  src,
  alt,
  className = '',
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative group cursor-pointer">
      <a href={src} target="_blank" rel="noopener noreferrer" className="block">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className={`w-full h-auto border-4 border-neo-text shadow-neo transition-transform hover:scale-[1.02] ${className}`}
          priority={priority}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 bg-neo-primary text-white px-3 py-1 text-sm font-bold border-2 border-neo-text shadow-neo transition-opacity">
            Click to fullscreen
          </span>
        </div>
      </a>
    </div>
  );
}

export default function AITinkerersAgentMailPage() {
  return (
    <main className="py-8 md:py-12 bg-neo-bg min-h-screen">
      <Container size="lg">
        {/* Title Slide */}
        <section className="min-h-[60vh] flex flex-col justify-center mb-16">
          <div className="text-center">
            <div className="mb-6">
              <Badge variant="accent" className="text-lg px-4 py-2">AI Tinkerers STL</Badge>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-neo-primary transform -rotate-1">
              Agent Mail System
            </h1>
            <p className="text-2xl md:text-3xl text-neo-text/90 max-w-4xl mx-auto mb-4 font-heading">
              A Replacement for Software Engineering Talent
            </p>
            <p className="text-lg md:text-xl text-neo-text/70 max-w-3xl mx-auto mb-8">
              How I use headless agents and MCP Agent Mail to ensure quality and continuous operation of my sprawling computer vision project.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="primary">Claude</Badge>
              <Badge variant="secondary">MCP Agent Mail</Badge>
              <Badge variant="accent">YOLOv8</Badge>
              <Badge variant="primary">cron</Badge>
            </div>
            <div className="mt-8 inline-block border-4 border-neo-text bg-white px-6 py-4 shadow-neo">
              <p className="font-bold text-neo-text">
                Presented at the Sketch Development office on February 4, 2026.
              </p>
              <a
                href="https://www.linkedin.com/posts/sketch-development-services_we-had-another-great-ai-tinkerers-event-last-activity-7425298933364543488-SPsj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAL14CoBlrx_f4ZZq0RPceDr7461jGy0qR0"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-bold text-neo-primary underline hover:text-neo-accent"
              >
                View event post on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Presentation Photo */}
        <section className="border-8 border-neo-text bg-white p-4 md:p-8 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-neo-primary text-center">
            Live at AI Tinkerers STL
          </h2>
          <p className="text-neo-text/70 text-center mb-6">
            Full-size presentation photo from Sketch Development office, February 4, 2026.
          </p>
          <LightboxImage
            src="/images/aitinkerers/MarkPresentsAgentMail1.jpeg"
            alt="Mark presenting Agent Mail at AI Tinkerers STL at the Sketch Development office on February 4, 2026"
            priority
          />
        </section>

        {/* The Problem / My Situation */}
        <section className="border-4 border-neo-text bg-neo-surface p-8 md:p-12 shadow-neo mb-12 transform rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary">
            The Problem
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">DeerAI Tracking Response</h3>
              <p className="text-neo-text/80 mb-4">
                A computer vision system that detects, tracks, and deters deer using:
              </p>
              <ul className="space-y-2 text-neo-text/80">
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">*</span>
                  Multiple Wyze/Reolink cameras covering property
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">*</span>
                  YOLOv8 + MegaDetector for animal detection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">*</span>
                  Kalman filtering for multi-object tracking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">*</span>
                  Continuous retraining pipeline on new data
                </li>
              </ul>
            </div>
            <div className="border-4 border-neo-text bg-neo-accent p-6">
              <h3 className="font-bold text-xl mb-4">My Weakness</h3>
              <p className="text-neo-text/90 mb-4">
                I have <strong>strong middle management muscles</strong> but <strong>very weak software engineering muscles</strong>.
              </p>
              <p className="text-neo-text/80">
                The project sprawls across data pipelines, model training, inference servers, and mobile notifications. Keeping it all running is a full-time job I don&apos;t have time for.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="border-4 border-neo-text bg-neo-secondary p-8 md:p-12 shadow-neo mb-12 transform -rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary">
            The Solution: Hire Middle Managers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-4 border-neo-text p-6 shadow-neo">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="font-heading font-bold text-xl mb-2">Night Watchman</h3>
              <p className="text-neo-text/80 text-sm">
                Runs nightly via cron. Checks system health, validates data pipelines, reports anomalies.
              </p>
            </div>
            <div className="bg-white border-4 border-neo-text p-6 shadow-neo">
              <div className="text-4xl mb-4">☀️</div>
              <h3 className="font-heading font-bold text-xl mb-2">Day Watchman</h3>
              <p className="text-neo-text/80 text-sm">
                Monitors inference quality during active hours. Escalates detection failures.
              </p>
            </div>
            <div className="bg-white border-4 border-neo-text p-6 shadow-neo">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-heading font-bold text-xl mb-2">Model Training Master</h3>
              <p className="text-neo-text/80 text-sm">
                Coordinates retraining cycles. Validates new model performance before deployment.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-neo-text/90">
              By monitoring their communications in the project mail inbox, I can <strong>manage agents</strong> instead of writing code.
            </p>
          </div>
        </section>

        {/* MCP Agent Mail */}
        <section className="border-4 border-neo-text bg-white p-8 md:p-12 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary">
            MCP Agent Mail
          </h2>
          <div className="mb-6">
            <Button
              href="https://github.com/Dicklesworthstone/mcp_agent_mail"
              variant="primary"
              className="mr-4"
            >
              View on GitHub
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">What It Is</h3>
              <p className="text-neo-text/80 mb-4">
                An MCP (Model Context Protocol) server that provides a messaging system for AI agents to communicate with each other and with humans.
              </p>
              <ul className="space-y-2 text-neo-text/80">
                <li className="flex items-start gap-2">
                  <span className="text-neo-accent font-bold">+</span>
                  Project-based organization
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-accent font-bold">+</span>
                  Agent identity registration
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-accent font-bold">+</span>
                  Inbox/outbox messaging
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-accent font-bold">+</span>
                  File reservations for coordination
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-accent font-bold">+</span>
                  Thread-based conversations
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Why It&apos;s Manager-Friendly</h3>
              <p className="text-neo-text/80 mb-4">
                Instead of debugging code or reading logs, I read <strong>email threads</strong> between my agents.
              </p>
              <div className="border-l-4 border-neo-primary pl-4 py-2 bg-neo-surface">
                <p className="text-neo-text/90 italic">
                  &ldquo;Night Watchman noticed the inference queue backed up at 2am. Model Training Master is investigating whether the last deployment caused a regression.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section Header */}
        <section className="text-center mb-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-neo-primary mb-2">
            Demo Assets
          </h2>
          <p className="text-neo-text/70">Click any image to view fullscreen</p>
        </section>

        {/* Demo GIF */}
        <section className="border-8 border-neo-text bg-neo-primary p-4 md:p-8 shadow-neo mb-12">
          <h3 className="font-heading font-bold text-2xl mb-4 text-white text-center">
            Agent Mail Demo
          </h3>
          <LightboxImage
            src="/images/aitinkerers/AgentMailDemo.gif"
            alt="Agent Mail demo showing two agents communicating"
            priority
          />
        </section>

        {/* Deer Project Images */}
        <section className="mb-12">
          <h3 className="font-heading font-bold text-2xl mb-6 text-neo-primary">
            DeerAI Agent Screenshots
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-bold mb-2 text-neo-text/70">Night Watchman Agent</p>
              <LightboxImage
                src="/images/aitinkerers/DeerNightWatchman.png"
                alt="Night Watchman agent running nightly checks"
              />
            </div>
            <div>
              <p className="text-sm font-bold mb-2 text-neo-text/70">Model Trainer Agent</p>
              <LightboxImage
                src="/images/aitinkerers/DeerModelTrainer.png"
                alt="Model Training Master coordinating retraining"
              />
            </div>
            <div>
              <p className="text-sm font-bold mb-2 text-neo-text/70">Queue Enricher Agent</p>
              <LightboxImage
                src="/images/aitinkerers/DeerQueueEnricher.png"
                alt="Queue Enricher processing detection data"
              />
            </div>
            <div>
              <p className="text-sm font-bold mb-2 text-neo-text/70">Mobile Notifications</p>
              <div className="grid grid-cols-2 gap-4">
                <LightboxImage
                  src="/images/aitinkerers/DeerMobileNotification.JPEG"
                  alt="Mobile notification from deer detection"
                />
                <LightboxImage
                  src="/images/aitinkerers/DeerMobileReviewApp.JPEG"
                  alt="Mobile app for reviewing detections"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Demo Setup Images */}
        <section className="mb-12">
          <h3 className="font-heading font-bold text-2xl mb-6 text-neo-primary">
            Demo Setup Screenshots
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-bold mb-2 text-neo-text/70">Agent Bash Starter</p>
              <LightboxImage
                src="/images/aitinkerers/AgentBashStarter.png"
                alt="Starting agents from bash"
              />
            </div>
            <div>
              <p className="text-sm font-bold mb-2 text-neo-text/70">Agent Prompt</p>
              <LightboxImage
                src="/images/aitinkerers/DemoAgentPrompt.png"
                alt="Agent prompt configuration"
              />
            </div>
            <div>
              <p className="text-sm font-bold mb-2 text-neo-text/70">Two Agents Working</p>
              <LightboxImage
                src="/images/aitinkerers/DemoTwoAgentsWorking.png"
                alt="Two agents communicating"
              />
            </div>
          </div>
        </section>

        {/* Key Insight */}
        <section className="border-8 border-neo-text bg-neo-accent p-8 md:p-12 shadow-neo mb-12 transform rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            The Key Insight
          </h2>
          <p className="text-xl md:text-2xl text-neo-text/90 mb-6">
            You don&apos;t need to be a great software engineer to build complex systems.
          </p>
          <p className="text-lg text-neo-text/80">
            You need to be a good <strong>manager</strong> who can:
          </p>
          <ul className="mt-4 space-y-3 text-lg text-neo-text/80">
            <li className="flex items-start gap-3">
              <span className="text-neo-primary font-bold text-xl">1.</span>
              Define clear responsibilities for each agent
            </li>
            <li className="flex items-start gap-3">
              <span className="text-neo-primary font-bold text-xl">2.</span>
              Establish communication protocols
            </li>
            <li className="flex items-start gap-3">
              <span className="text-neo-primary font-bold text-xl">3.</span>
              Monitor the conversation and intervene when needed
            </li>
            <li className="flex items-start gap-3">
              <span className="text-neo-primary font-bold text-xl">4.</span>
              Let the agents figure out the implementation details
            </li>
          </ul>
        </section>

        {/* Links */}
        <section className="text-center py-8">
          <h2 className="font-heading font-bold text-2xl mb-6 text-neo-primary">
            Learn More
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="https://github.com/Dicklesworthstone/mcp_agent_mail"
              variant="primary"
            >
              MCP Agent Mail
            </Button>
            <Button
              href="/portfolio/deeraitrackingresponse"
              variant="secondary"
            >
              DeerAI Project
            </Button>
            <Button
              href="https://github.com/mtornga"
              variant="accent"
            >
              My GitHub
            </Button>
            <Button
              href="https://www.linkedin.com/posts/sketch-development-services_we-had-another-great-ai-tinkerers-event-last-activity-7425298933364543488-SPsj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAL14CoBlrx_f4ZZq0RPceDr7461jGy0qR0"
              variant="secondary"
            >
              AI Tinkerers LinkedIn Post
            </Button>
          </div>
          <p className="mt-8 text-neo-text/60">
            Mark Tornga | marktornga.com | AI Tinkerers STL
          </p>
        </section>
      </Container>
    </main>
  );
}
