import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Literacy Is Going the Way of Cursive | AI Tinkerers STL',
  description:
    'Presentation on Read This For Me: why written text is becoming legacy code, and how one photo becomes four different answers from a single prompt template.',
  openGraph: {
    title: 'Literacy Is Going the Way of Cursive',
    description:
      'One photo, four answers, one prompt template. A Read This For Me talk for AI Tinkerers STL.',
    images: ['/images/readthisforme/feature.png'],
  },
};

const EVENT_URL =
  'https://st-louis.aitinkerers.org/p/ai-tinkerers-st-louis-august-2026-meetup';

// Lightbox component for fullscreen images
function LightboxImage({
  src,
  alt,
  className = '',
  priority = false,
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

export default function AITinkerersReadThisForMePage() {
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
              Literacy Is Going the Way of Cursive
            </h1>
            <p className="text-2xl md:text-3xl text-neo-text/90 max-w-4xl mx-auto mb-4 font-heading">
              So I built the bridge tool.
            </p>
            <p className="text-lg md:text-xl text-neo-text/70 max-w-3xl mx-auto mb-8">
              <strong>Read This For Me</strong> — point a camera at any words and
              hear them, four different ways, from a single photo.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="primary">Expo / React Native</Badge>
              <Badge variant="secondary">Cloud Vision</Badge>
              <Badge variant="accent">Gemini 3.5 Flash Lite</Badge>
              <Badge variant="primary">Cloud TTS</Badge>
            </div>
            <div className="mt-8 inline-block border-4 border-neo-text bg-white px-6 py-4 shadow-neo">
              <p className="font-bold text-neo-text">
                Presented at AI Tinkerers St. Louis on August 19, 2026, hosted by
                Sketch Development Services.
              </p>
              <a
                href={EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-bold text-neo-primary underline hover:text-neo-accent"
              >
                View the August 2026 meetup page
              </a>
            </div>
          </div>
        </section>

        {/* Demo */}
        <section className="border-8 border-neo-text bg-white p-4 md:p-8 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-neo-primary text-center">
            Live at AI Tinkerers STL
          </h2>
          <p className="text-neo-text/70 text-center mb-6">
            The demo recording shown on the night — one capture, read back four
            different ways.
          </p>
          <div className="grid md:grid-cols-[280px_1fr] gap-8 items-center">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full max-w-[280px] mx-auto border-4 border-neo-text shadow-neo"
              poster="/images/readthisforme/demo-2026-08-poster.jpg"
            >
              <source src="/images/readthisforme/demo-2026-08.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <LightboxImage
                  key={n}
                  src={`/images/readthisforme/screenshot-${n}.png`}
                  alt={`Read This For Me screenshot ${n}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* The Problem / Who it helps */}
        <section className="border-4 border-neo-text bg-neo-surface p-8 md:p-12 shadow-neo mb-12 transform rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary">
            Who It Helps
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-neo-text/80 mb-4">
                <strong>54 million adults in the U.S.</strong> read below a
                6th-grade level. Many navigate daily life by asking others for
                help, memorizing routines, or avoiding situations entirely.
              </p>
              <p className="text-neo-text/80 mb-4">
                Read This For Me lets people read independently and privately —
                no accounts, no history, no one watching. Just point at text and
                listen.
              </p>
              <ul className="space-y-2 text-neo-text/80">
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">*</span>
                  Menus at restaurants
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">*</span>
                  Medical paperwork
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">*</span>
                  Official letters and notices
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">*</span>
                  Signs, labels, and mail
                </li>
              </ul>
            </div>
            <div className="border-4 border-neo-text bg-neo-accent p-6">
              <h3 className="font-bold text-xl mb-4">Why I Think It Grows</h3>
              <p className="text-neo-text/90 mb-4">
                That is the user today, and it is reason enough to build this.
                But I do not think the problem stays this size.
              </p>
              <p className="text-neo-text/80">
                Short-form video already won. An entire generation gets its
                instructions, its news, and its recipes without reading a
                paragraph.
              </p>
            </div>
          </div>
        </section>

        {/* Legacy code */}
        <section className="border-8 border-neo-text bg-neo-primary text-white p-8 md:p-12 shadow-neo mb-12 transform -rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Everything Written Is Legacy Code
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-lg md:text-xl opacity-95 mb-6">
                When a process still <em>requires</em> reading — the clipboard of
                forms they hand you at the doctor&apos;s office — that is not a
                neutral design choice. That is a system written against a runtime
                that is being deprecated.
              </p>
              <p className="text-lg md:text-xl opacity-95">
                Everyone in this room is literate, and was raised in a literate
                world. That makes this sound insane. It is going to sound less
                insane every year.
              </p>
            </div>
            <div className="border-4 border-white bg-white/10 p-6 font-mono text-sm md:text-base">
              <p className="opacity-90">{'// written English, user-facing'}</p>
              <p className="opacity-90">{'// status:  deprecated'}</p>
              <p className="opacity-90">{'// shim:    LLM translation'}</p>
              <p className="opacity-90 mb-4">{'// removal: TBD'}</p>
              <p className="font-bold text-neo-secondary">{'// we are the shim.'}</p>
            </div>
          </div>
          <div className="border-4 border-white bg-white/10 p-6 md:p-8">
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
              How a Skill Dies
            </h3>
            <ol className="space-y-3 text-lg md:text-2xl font-heading">
              <li>
                <span className="text-neo-secondary font-bold">1.</span> Everyone
                can write cursive.
              </li>
              <li>
                <span className="text-neo-secondary font-bold">2.</span> You should
                learn cursive because I said so.
              </li>
              <li>
                <span className="text-neo-secondary font-bold">3.</span> No one can
                explain why we&apos;re still teaching cursive.
              </li>
            </ol>
            <p className="text-lg md:text-2xl mt-6 opacity-90">
              Now run the same three stages on <em>reading</em>. Stage one is
              where we are standing.
            </p>
          </div>
        </section>

        {/* The app */}
        <section className="border-4 border-neo-text bg-neo-secondary p-8 md:p-12 shadow-neo mb-12 transform rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary">
            The App in Ten Seconds
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-4 border-neo-text p-6 shadow-neo">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="font-heading font-bold text-xl mb-2">Point</h3>
              <p className="text-neo-text/80 text-sm">
                At menus, forms, mail, medicine labels, signs.
              </p>
            </div>
            <div className="bg-white border-4 border-neo-text p-6 shadow-neo">
              <div className="text-4xl mb-4">👆</div>
              <h3 className="font-heading font-bold text-xl mb-2">Tap</h3>
              <p className="text-neo-text/80 text-sm">
                Clipboard reads every word. Brain explains it.
              </p>
            </div>
            <div className="bg-white border-4 border-neo-text p-6 shadow-neo">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="font-heading font-bold text-xl mb-2">Listen</h3>
              <p className="text-neo-text/80 text-sm">
                Natural voice, adjustable speed, nothing to read.
              </p>
            </div>
          </div>
        </section>

        {/* Four outputs */}
        <section className="border-4 border-neo-text bg-white p-8 md:p-12 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary">
            One Capture, Four Outputs
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-4 border-neo-text bg-neo-primary text-white p-6 shadow-neo">
              <h3 className="font-heading font-bold text-2xl mb-4">
                Read every word
              </h3>
              <p className="opacity-95 mb-4">
                Cloud Vision <code className="font-mono">TEXT_DETECTION</code> →
                TTS. That is the whole feature.
              </p>
              <ul className="space-y-2 opacity-95">
                <li>No model.</li>
                <li>No prompt.</li>
                <li>No temperature.</li>
                <li>No hallucination surface.</li>
              </ul>
            </div>
            <div className="border-4 border-neo-text bg-neo-accent p-6 shadow-neo">
              <h3 className="font-heading font-bold text-2xl mb-4">
                Explain it to me
              </h3>
              <p className="mb-4">
                Cloud Vision → Gemini → TTS, in three lengths.
              </p>
              <ul className="space-y-2">
                <li>Short.</li>
                <li>Medium.</li>
                <li>Long.</li>
                <li className="font-bold">All from one prompt template.</li>
              </ul>
            </div>
          </div>
          <div className="border-l-8 border-neo-primary pl-6 py-2 mt-8">
            <p className="text-xl md:text-2xl font-heading font-bold">
              An explanation costs about 470 milliseconds and a fraction of a
              cent.
            </p>
            <p className="text-neo-text/80 mt-3">
              So you stop picking one rendering on the user&apos;s behalf. You hand
              them four and let them choose. Knowing which half of the product
              should <em>not</em> use the LLM is most of the design — when someone
              needs the exact wording of a legal notice, the trustworthy answer is
              the deterministic one.
            </p>
          </div>
        </section>

        {/* The prompt */}
        <section className="border-4 border-neo-text bg-neo-surface p-8 md:p-12 shadow-neo mb-12 transform -rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-neo-primary">
            There Is Exactly One Prompt
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-neo-text/80 mb-4">
                Every line of the template is fixed except one:{' '}
                <code className="font-mono font-bold bg-neo-secondary px-2">
                  LENGTH:
                </code>
                . Short, medium, and long are byte-identical prompts apart from a
                single sentence of English.
              </p>
              <p className="text-neo-text/80 mb-4">
                The rules are almost entirely <strong>negative</strong> — five
                things not to do, one thing to do. Most of the work in this prompt
                is suppressing the model&apos;s instinct to be chatty at someone
                who is already struggling.
              </p>
              <p className="text-neo-text/80">
                No <code className="font-mono">maxOutputTokens</code>. No{' '}
                <code className="font-mono">temperature</code>. No{' '}
                <code className="font-mono">generationConfig</code> anywhere in the
                repo. The token budget is a sentence of English.
              </p>
            </div>
            <div className="border-4 border-neo-text bg-neo-text text-neo-bg p-6 font-mono text-sm md:text-base shadow-neo">
              <p className="mb-3 opacity-80">RULES:</p>
              <p className="opacity-80">- Output ONLY the explanation.</p>
              <p className="opacity-80">- NO introductory sentences.</p>
              <p className="opacity-80">- NO markdown formatting.</p>
              <p className="opacity-80">- NO conversational filler.</p>
              <p className="opacity-80 mb-4">- Use simple, direct sentences.</p>
              <p className="font-bold text-neo-secondary">
                ◄ only LENGTH: ever changes ►
              </p>
            </div>
          </div>
        </section>

        {/* Timing */}
        <section className="border-4 border-neo-text bg-neo-accent p-8 md:p-12 shadow-neo mb-12 transform rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Where the Time Actually Goes
          </h2>
          <p className="text-neo-text/80 mb-8">
            Median warm latency, measured from 82 production log entries on
            19 August 2026.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Cloud Vision (OCR)', value: '562ms', tone: 'bg-neo-surface' },
              { label: 'Gemini 3.5 Flash Lite', value: '467ms', tone: 'bg-neo-secondary' },
              { label: 'First TTS sentence', value: '228ms', tone: 'bg-neo-primary text-white' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`border-4 border-neo-text p-6 shadow-neo text-center ${stat.tone}`}
              >
                <div className="font-heading font-bold text-4xl md:text-5xl mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-4 border-neo-text bg-neo-surface p-6 shadow-neo">
              <h3 className="font-heading font-bold text-xl mb-3">
                The first call of the day cost 5,135ms
              </h3>
              <p className="text-neo-text/80">
                One cold Vision call — <strong>9x the warm median</strong>. Cloud
                Scheduler now pings the real endpoints every five minutes for about
                fifteen cents a month. The gotcha: a dedicated warm-up function is a
                separate Cloud Run container and warms nothing.
              </p>
            </div>
            <div className="border-4 border-neo-text bg-neo-surface p-6 shadow-neo">
              <h3 className="font-heading font-bold text-xl mb-3">
                Start talking before you finish thinking
              </h3>
              <p className="text-neo-text/80">
                TTS runs one sentence at a time, and sentence N+1 loads while N
                plays. Only the first sentence blocks audio — and that sentence comes
                back in 228ms. The rest of the pipeline keeps working while the user
                is already listening.
              </p>
            </div>
          </div>
        </section>

        {/* Key Insight */}
        <section className="border-8 border-neo-text bg-neo-secondary p-8 md:p-12 shadow-neo mb-12 transform -rotate-1">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            The Key Insight
          </h2>
          <p className="text-xl md:text-2xl text-neo-text/90 mb-6">
            When an explanation costs half a second and a fraction of a cent, you
            stop choosing one rendering of a document on the reader&apos;s behalf.
          </p>
          <ul className="mt-4 space-y-3 text-lg text-neo-text/80">
            <li className="flex items-start gap-3">
              <span className="text-neo-primary font-bold text-xl">1.</span>
              Give the reader every length and let them pick
            </li>
            <li className="flex items-start gap-3">
              <span className="text-neo-primary font-bold text-xl">2.</span>
              Keep the deterministic path deterministic — no model in it at all
            </li>
            <li className="flex items-start gap-3">
              <span className="text-neo-primary font-bold text-xl">3.</span>
              Put the varying part of the prompt in a parameter, not a second prompt
            </li>
            <li className="flex items-start gap-3">
              <span className="text-neo-primary font-bold text-xl">4.</span>
              Start speaking before the pipeline finishes thinking
            </li>
          </ul>
        </section>

        {/* Links */}
        <section className="text-center py-8">
          <h2 className="font-heading font-bold text-2xl mb-6 text-neo-primary">
            Learn More
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/tinkerersreadthisforme" variant="primary">
              Full Slide Deck
            </Button>
            <Button href="/portfolio/readthisforme" variant="secondary">
              Read This For Me
            </Button>
            <Button
              href="https://play.google.com/store/apps/details?id=com.marktornga.readforme"
              variant="accent"
            >
              Get the App
            </Button>
            <Button href="https://github.com/mtornga/PostLiterateApp" variant="secondary">
              Source on GitHub
            </Button>
            <Button href={EVENT_URL} variant="primary">
              AI Tinkerers Event Page
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
