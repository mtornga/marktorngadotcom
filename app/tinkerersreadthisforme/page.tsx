import { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import Deck from './Deck';
import CodeBlock, { Hi } from './CodeBlock';
import ArchitectureDiagram from './ArchitectureDiagram';

export const metadata: Metadata = {
  title: 'Literacy Is Going the Way of Cursive | AI Tinkerers STL',
  description:
    'A talk about Read This For Me: why written text is becoming legacy code, and how one photo becomes four different answers with a single prompt template.',
  openGraph: {
    title: 'Literacy Is Going the Way of Cursive',
    description:
      'One photo, four answers, one prompt template. A Read This For Me talk for AI Tinkerers STL.',
    images: ['/images/readthisforme/feature.png'],
  },
};

/**
 * One slide. In scroll mode this is a normal block; in presenter mode `Deck`
 * gives every direct <section> child a full viewport and a scroll-snap stop.
 */
function Slide({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <Container size="lg">{children}</Container>
    </section>
  );
}

/** Section shell using the house neo-brutalist card pattern. */
function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-4 border-neo-text p-6 md:p-10 shadow-neo mb-12 ${className}`}
    >
      {children}
    </div>
  );
}

function SlideTitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-heading font-bold text-3xl md:text-5xl mb-8 text-neo-primary ${className}`}
    >
      {children}
    </h2>
  );
}

// --- Verbatim source strings -------------------------------------------------
// Quoted exactly from PostLiterateApp. Passed as JS strings rather than JSX text
// so whitespace and quote characters survive intact.

const OCR_SNIPPET = `const request = {
    image: { content: image },
    features: [{ type: "TEXT_DETECTION" }],
};

const [result] = await client.annotateImage(request);
const fullText = detections[0].description;`;

const GEMINI_SNIPPET = `const result = await model.generateContent(prompt);
const response = await result.response;
const explanation = response.text();`;

const PROMPT_RULES = `RULES:
- Output ONLY the explanation.
- NO introductory or concluding sentences (e.g., NO "Here is a summary", NO "Important information follows").
- NO markdown formatting (no *, #, -, etc.).
- NO conversational filler.
- Use simple, direct sentences.

TEXT to simplify:
`;

const LENGTH_CHANGE_SNIPPET = `const handleLengthChange = async (newLength: ExplanationLength) => {
    if (newLength === explanationLength) return;

    setExplanationLength(newLength);

    // If we have original OCR text, re-explain with new length
    if (isExplainMode && originalOcrText) {
        await stop();
        const explanation = await explainText(originalOcrText, newLength);
        setActiveText(explanation);
        await speak(explanation);
    }
};`;

// Hand-wrapped to <= 44 columns so it never needs to scroll
// horizontally inside the two-column slide.
const SAMPLE_OCR = `PATIENT REGISTRATION & FINANCIAL RESPONSIBILITY

ASSIGNMENT OF BENEFITS
I hereby authorize payment directly to the
provider of benefits otherwise payable to me,
but not to exceed the provider's regular charges
for this period of treatment. I understand that
I am financially responsible for all charges
whether or not paid by insurance.

NOTICE: Balances not paid within 90 days of the
statement date may be referred to an outside
collection agency. A $35 fee applies to any
returned check or declined payment method.
Appointments cancelled less than 24 hours in
advance are subject to a $50 missed-visit
charge, not billable to your insurance.

Signature ______________  Date __________`;

const LENGTHS = [
  {
    key: 'short',
    variant: 'primary' as const,
    instruction:
      'Give a very brief 1-2 sentence summary. Just state what this document is and its main point.',
  },
  {
    key: 'medium',
    variant: 'accent' as const,
    instruction:
      'Give a clear explanation in 3-5 sentences. Cover the key points someone needs to know.',
  },
  {
    key: 'long',
    variant: 'secondary' as const,
    instruction:
      'Give a thorough explanation covering all important details. Be comprehensive but still use simple language.',
  },
];

const SAMPLE_OUTPUTS = [
  {
    key: 'short',
    variant: 'primary' as const,
    words: '23 words',
    text: 'This is a form from the doctor’s office about paying your bill. It says you have to pay whatever your insurance does not.',
  },
  {
    key: 'medium',
    variant: 'accent' as const,
    words: '69 words',
    text: 'This is a registration form from the doctor’s office. When you sign it, you let your insurance pay the doctor directly, but you still owe anything the insurance does not cover. If a bill goes unpaid for 90 days, it can be sent to a collection agency. If you cancel less than a day before your visit, you will be charged 50 dollars, and insurance will not pay that.',
  },
  {
    key: 'long',
    variant: 'secondary' as const,
    words: '123 words',
    text: 'This is a form the doctor’s office needs before your visit. Fill in every part, because a missing answer can delay your appointment. When you sign it, you are telling your insurance company to send payment straight to the doctor instead of to you. You are still responsible for the whole bill. If your insurance pays part of it, or none of it, the rest is yours to pay. If a bill sits unpaid for 90 days, the office can hand it to a collection agency. If a check bounces or a card is declined, they add a 35 dollar fee. If you cancel with less than 24 hours notice, you will be charged 50 dollars, and your insurance will not cover that.',
  },
];

export default function TinkerersReadThisForMePage() {
  return (
    <main className="py-8 md:py-12 bg-neo-bg">
      <Deck>
        {/* ---------- 1. Title ---------- */}
        <Slide className="min-h-[70vh] flex flex-col justify-center">
          <div className="text-center">
            <div className="mb-6">
              <Badge variant="accent" className="text-lg px-4 py-2">
                AI Tinkerers STL
              </Badge>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-neo-primary transform -rotate-1">
              Literacy Is Going the Way of Cursive
            </h1>
            <p className="text-2xl md:text-4xl text-neo-text/90 max-w-4xl mx-auto mb-6 font-heading">
              So I built the bridge tool.
            </p>
            <p className="text-lg md:text-2xl text-neo-text/70 max-w-3xl mx-auto mb-8">
              <strong>Read This For Me</strong> — point a camera at any words and
              hear them, four different ways, from one photo.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="primary">Expo / React Native</Badge>
              <Badge variant="secondary">Cloud Vision</Badge>
              <Badge variant="accent">Gemini 3.5 Flash Lite</Badge>
              <Badge variant="primary">Cloud TTS</Badge>
            </div>
            <div className="inline-block border-4 border-neo-text bg-white px-6 py-4 shadow-neo">
              <p className="font-bold text-neo-text text-lg">
                Mark Tornga &middot; marktornga.com
              </p>
              <p className="text-neo-text/70 text-base mt-1">
                Press <strong>F</strong> for presenter mode. Arrow keys to advance.
              </p>
            </div>
          </div>
        </Slide>

        {/* ---------- 2. The cursive argument ---------- */}
        <Slide>
          <Panel className="bg-neo-secondary transform rotate-1">
            <SlideTitle className="!text-neo-text">
              How a Skill Dies
            </SlideTitle>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { n: '1', t: 'Everyone can write cursive.', s: 'It is simply how writing works.' },
                { n: '2', t: 'You should learn cursive because I said so.', s: 'The reason is now the authority, not the use.' },
                { n: '3', t: 'No one can explain why we’re still teaching cursive.', s: 'It survives as ritual, then it stops.' },
              ].map((stage) => (
                <div
                  key={stage.n}
                  className="border-4 border-neo-text bg-neo-surface p-6 shadow-neo-sm"
                >
                  <div className="font-heading font-bold text-5xl text-neo-primary mb-3">
                    {stage.n}
                  </div>
                  <p className="font-heading font-bold text-xl md:text-2xl mb-3">
                    {stage.t}
                  </p>
                  <p className="text-neo-text/70 text-base md:text-lg">{stage.s}</p>
                </div>
              ))}
            </div>
            <div className="border-8 border-neo-text bg-neo-text text-neo-bg p-6 md:p-8 shadow-neo">
              <p className="font-heading font-bold text-2xl md:text-4xl mb-4">
                Now run the same three stages on <em>reading</em>.
              </p>
              <ol className="space-y-3 text-xl md:text-3xl font-heading">
                <li>
                  <span className="text-neo-secondary font-bold">1.</span> Everyone
                  can read. <span className="opacity-50 text-lg md:text-xl">— you are here</span>
                </li>
                <li>
                  <span className="text-neo-secondary font-bold">2.</span> You should
                  learn to read because I said so.
                </li>
                <li>
                  <span className="text-neo-secondary font-bold">3.</span> No one can
                  explain why we&apos;re still teaching reading.
                </li>
              </ol>
            </div>
          </Panel>
        </Slide>

        {/* ---------- 3. Everything written is legacy code ---------- */}
        <Slide>
          <Panel className="border-8 bg-neo-primary text-white transform -rotate-1">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-8">
              Everything Written Is Legacy Code
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xl md:text-2xl mb-6 opacity-95">
                  Short-form video already won. An entire generation gets its
                  instructions, its news, and its recipes without reading a
                  paragraph.
                </p>
                <p className="text-xl md:text-2xl opacity-95">
                  So when a process still <em>requires</em> reading — the clipboard
                  of forms they hand you at the doctor&apos;s office — that is not a
                  neutral design choice. That is a system written against a runtime
                  that is being deprecated.
                </p>
              </div>
              <div>
                <CodeBlock tone="dark" size="sm" className="[&_pre]:border-white">
                  {`// written English, user-facing
// status:  deprecated
// shim:    LLM translation
// removal: TBD

`}
                  <Hi>{`// we are the shim.`}</Hi>
                </CodeBlock>
              </div>
            </div>
            <div className="border-4 border-white bg-white/10 p-6 md:p-8">
              <p className="text-xl md:text-3xl font-heading font-bold">
                Everyone in this room is literate, and was raised in a literate
                world. That makes this sound insane.
              </p>
              <p className="text-lg md:text-2xl mt-4 opacity-90">
                It is going to sound less insane every year.
              </p>
            </div>
          </Panel>
        </Slide>

        {/* ---------- 4. Who It Helps ---------- */}
        <Slide>
          <Panel className="bg-neo-bg transform rotate-1">
            <SlideTitle>Who It Helps</SlideTitle>
            <p className="text-xl md:text-3xl mb-6">
              <strong>54 million adults in the U.S.</strong> read below a
              6th-grade level. Many navigate daily life by asking others for
              help, memorizing routines, or avoiding situations entirely.
            </p>
            <p className="text-xl md:text-3xl mb-6">
              <strong>Read This For Me</strong> lets people read independently and
              privately — no accounts, no history, no one watching. Just point at
              text and listen.
            </p>
            <div className="border-l-8 border-neo-accent pl-6 py-2">
              <p className="text-neo-text/90 italic text-lg md:text-2xl">
                Perfect for reading menus at restaurants, understanding medical
                paperwork, decoding official letters, and navigating signs and
                notices.
              </p>
            </div>
            <p className="text-lg md:text-xl text-neo-text/70 mt-8">
              The futurist argument is the hook. This is the actual user, today.
            </p>
          </Panel>
        </Slide>

        {/* ---------- 5. The app in ten seconds ---------- */}
        <Slide>
          <Panel className="bg-neo-surface transform -rotate-1">
            <SlideTitle>The App in Ten Seconds</SlideTitle>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: '📸', t: 'Point', d: 'At menus, forms, mail, medicine labels, signs.' },
                { icon: '👆', t: 'Tap', d: 'Clipboard reads every word. Brain explains it.' },
                { icon: '🔊', t: 'Listen', d: 'Natural voice, adjustable speed, nothing to read.' },
              ].map((step) => (
                <div key={step.t} className="text-center p-4">
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2">
                    {step.t}
                  </h3>
                  <p className="text-neo-text/80 text-lg md:text-xl">{step.d}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-[240px_1fr] gap-8 items-center">
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full max-w-[240px] mx-auto border-4 border-neo-text shadow-neo rounded-lg"
                poster="/images/readthisforme/demo-2026-08-poster.jpg"
              >
                <source
                  src="/images/readthisforme/demo-2026-08.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`border-4 border-neo-text shadow-neo overflow-hidden transform ${
                      n % 2 ? '-rotate-1' : 'rotate-1'
                    } hover:rotate-0 transition-transform`}
                  >
                    <Image
                      src={`/images/readthisforme/screenshot-${n}.png`}
                      alt={`Read This For Me screenshot ${n}`}
                      width={150}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </Slide>

        {/* ---------- 6. Architecture ---------- */}
        <Slide>
          <SlideTitle>How It Works</SlideTitle>
          <ArchitectureDiagram />
          <p className="text-lg md:text-2xl text-neo-text/80 mt-8 mb-12">
            Two paths out of one photo. The pink path never touches a language
            model. The explain path runs{' '}
            <code className="font-mono bg-neo-secondary px-2">gemini-3.5-flash-lite</code>{' '}
            — a single model now. It used to run a 50/50 split against an older
            Flash Lite so I could compare latency in production; that older model
            was deprecated, and the winner is both the survivor and the faster
            one.
          </p>
        </Slide>

        {/* ---------- 7. One capture, four outputs ---------- */}
        <Slide>
          <Panel className="bg-neo-surface transform -rotate-1">
            <SlideTitle>
              One Capture, Four Outputs — and One of Them Has No AI in It
            </SlideTitle>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-4 border-neo-text bg-neo-primary text-white p-6 md:p-8 shadow-neo">
                <h3 className="font-heading font-bold text-2xl md:text-4xl mb-4">
                  Read every word
                </h3>
                <p className="text-lg md:text-2xl mb-4 opacity-95">
                  Cloud Vision <code className="font-mono">TEXT_DETECTION</code> →
                  TTS. That is the whole feature.
                </p>
                <ul className="text-lg md:text-2xl space-y-2 opacity-95">
                  <li>No model.</li>
                  <li>No prompt.</li>
                  <li>No temperature.</li>
                  <li>No hallucination surface.</li>
                </ul>
              </div>
              <div className="border-4 border-neo-text bg-neo-accent p-6 md:p-8 shadow-neo">
                <h3 className="font-heading font-bold text-2xl md:text-4xl mb-4">
                  Explain it to me
                </h3>
                <p className="text-lg md:text-2xl mb-4">
                  Cloud Vision → Gemini → TTS, in three lengths.
                </p>
                <ul className="text-lg md:text-2xl space-y-2">
                  <li>Short.</li>
                  <li>Medium.</li>
                  <li>Long.</li>
                  <li className="font-bold">All from one prompt template.</li>
                </ul>
              </div>
            </div>
            <div className="border-l-8 border-neo-primary pl-6 py-2 mt-8">
              <p className="text-xl md:text-3xl font-heading font-bold">
                An explanation costs about 470 milliseconds and a fraction of a
                cent.
              </p>
              <p className="text-lg md:text-2xl text-neo-text/80 mt-3">
                So you stop picking one rendering on the user&apos;s behalf. You
                hand them four and let them choose.
              </p>
            </div>
            <p className="text-lg md:text-2xl text-neo-text/80 mt-6">
              And knowing which half of the product should <em>not</em> use the
              LLM is most of the design. When someone needs the exact wording of
              a legal notice, the trustworthy answer is the deterministic one.
            </p>
          </Panel>
        </Slide>

        {/* ---------- 8. The pipeline is seven lines ---------- */}
        <Slide>
          <Panel className="bg-neo-bg transform rotate-1">
            <SlideTitle>The Whole Pipeline Is Seven Lines</SlideTitle>
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-4">
                  Real world → data
                </h3>
                <CodeBlock caption="functions/index.js:126-144">
                  {OCR_SNIPPET}
                </CodeBlock>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-4">
                  Data → information
                </h3>
                <CodeBlock caption="functions/index.js:210-212">
                  {GEMINI_SNIPPET}
                </CodeBlock>
              </div>
            </div>
            <div className="border-l-8 border-neo-primary pl-6 py-2 mt-8">
              <p className="text-xl md:text-3xl font-heading font-bold">
                The first block <em>is</em> the entire &ldquo;read every
                word&rdquo; feature.
              </p>
              <p className="text-lg md:text-2xl text-neo-text/80 mt-2">
                Six lines, one API, zero prompts.
              </p>
            </div>
          </Panel>
        </Slide>

        {/* ---------- 9. The prompt ---------- */}
        <Slide>
          <Panel className="bg-neo-surface transform -rotate-1">
            <SlideTitle>There Is Exactly One Prompt</SlideTitle>
            <CodeBlock caption="functions/index.js:40-52" wrap>
              {'Task: Explain the following text simply and directly for someone with low literacy.\n\nLENGTH: '}
              <Hi>{'◄ the only line that ever changes ►'}</Hi>
              {'\n\n'}
              {PROMPT_RULES}
              <Hi>{'${text}'}</Hi>
            </CodeBlock>
            <p className="text-lg md:text-2xl text-neo-text/80 mt-8">
              Every line except <code className="font-mono font-bold">LENGTH:</code>{' '}
              is fixed. Note that the rules are almost entirely{' '}
              <strong>negative</strong> — five things not to do, one thing to do.
              Most of the work in this prompt is suppressing the model&apos;s
              instinct to be chatty at someone who is already struggling.
            </p>
            <p className="text-base md:text-lg text-neo-text/60 mt-4">
              Shown dedented, with the one long rule wrapped. The real template
              literal is indented eight spaces per line, and that whitespace is
              genuinely sent to Gemini.
            </p>
          </Panel>
        </Slide>

        {/* ---------- 10. The one-line diff ---------- */}
        <Slide>
          <Panel className="bg-neo-secondary transform rotate-1">
            <SlideTitle className="!text-neo-text">
              The Entire Difference Between Short, Medium, and Long
            </SlideTitle>
            <div className="space-y-4">
              {LENGTHS.map((l, i) => (
                <div key={l.key}>
                  {i > 0 && (
                    <p className="text-center font-mono text-sm md:text-lg text-neo-text/40 py-2">
                      — everything above and below this line is byte-identical —
                    </p>
                  )}
                  <div className="border-4 border-neo-text bg-neo-surface p-5 md:p-6 shadow-neo-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant={l.variant} className="text-base px-3 py-1">
                        {l.key}
                      </Badge>
                      <span className="font-mono text-sm md:text-base text-neo-text/50">
                        LENGTH:
                      </span>
                    </div>
                    <p className="font-mono text-lg md:text-xl leading-snug">
                      {l.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-8 border-neo-text bg-neo-text text-neo-bg p-6 md:p-8 shadow-neo mt-10">
              <p className="text-xl md:text-3xl font-heading font-bold mb-4">
                No <code className="font-mono">maxOutputTokens</code>. No{' '}
                <code className="font-mono">temperature</code>. No{' '}
                <code className="font-mono">generationConfig</code> anywhere in
                the repo.
              </p>
              <p className="text-2xl md:text-4xl font-heading font-bold text-neo-secondary">
                The token budget is a sentence of English.
              </p>
            </div>
          </Panel>
        </Slide>

        {/* ---------- 11. How the prompt got there ---------- */}
        <Slide>
          <Panel className="bg-neo-bg transform -rotate-1">
            <SlideTitle>How That Prompt Got There</SlideTitle>
            <div className="space-y-5">
              {[
                {
                  c: '1f273f5',
                  t: 'Ask nicely',
                  d: 'One sentence. "Explain this text simply to a layperson who cannot read well." It worked, and it rambled.',
                },
                {
                  c: '65e90ef',
                  t: 'Add negative constraints',
                  d: 'The RULES block appears. Structure, and five explicit prohibitions. Still one fixed length.',
                },
                {
                  c: '49aac2a',
                  t: 'Make length a parameter',
                  d: '"Keep it very concise." is deleted and replaced by the LENGTH slot. This one edit turned one summary into three.',
                },
                {
                  c: '0a7d941',
                  t: 'Deduplicate',
                  d: 'Extracted into a shared buildExplainPrompt() so /explain and /explainPipeline cannot drift apart.',
                },
              ].map((step) => (
                <div
                  key={step.c}
                  className="border-4 border-neo-text bg-neo-surface p-5 md:p-6 shadow-neo-sm flex flex-col md:flex-row md:items-center gap-4"
                >
                  <code className="font-mono font-bold text-neo-primary text-base md:text-xl shrink-0">
                    {step.c}
                  </code>
                  <div>
                    <h3 className="font-heading font-bold text-xl md:text-2xl">
                      {step.t}
                    </h3>
                    <p className="text-neo-text/80 text-base md:text-xl">
                      {step.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-lg md:text-2xl text-neo-text/80 mt-8">
              Free-form request → structured constraints → the varying part
              becomes a parameter. Same arc as any other refactor.
            </p>
          </Panel>
        </Slide>

        {/* ---------- 12. One capture, three answers ---------- */}
        <Slide>
          <Panel className="bg-neo-surface transform rotate-1">
            <SlideTitle>Three Answers, One Photo</SlideTitle>
            <p className="text-xl md:text-2xl mb-6 text-neo-text/80">
              The OCR text is cached on the device, so changing length re-calls{' '}
              <code className="font-mono bg-neo-secondary px-2">/explain</code>{' '}
              with the same string. No second capture, no second Vision call.
            </p>
            <CodeBlock caption="app/index.tsx:386-407" size="sm">
              {LENGTH_CHANGE_SNIPPET}
            </CodeBlock>
          </Panel>
        </Slide>

        {/* ---------- 13. Illustrative example: the input ---------- */}
        <Slide>
          <Panel className="bg-neo-bg transform -rotate-1">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <SlideTitle className="!mb-0">
                Output 1: Read Every Word
              </SlideTitle>
              <Badge variant="primary" className="text-base px-4 py-2">
                Illustrative example — not a live capture
              </Badge>
            </div>
            <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
              <CodeBlock tone="light" size="sm" wrap>
                {SAMPLE_OCR}
              </CodeBlock>
              <div>
                <p className="text-lg md:text-2xl mb-4">
                  Cloud Vision output, spoken back verbatim. No model touched
                  this.
                </p>
                <p className="text-base md:text-xl text-neo-text/70">
                  This is what you get today if you ask the receptionist to read
                  it to you — assuming you are willing to ask a stranger to read
                  your medical paperwork out loud in a waiting room.
                </p>
              </div>
            </div>
          </Panel>
        </Slide>

        {/* ---------- 14. Illustrative example: the three summaries ---------- */}
        <Slide>
          <Panel className="bg-neo-surface transform rotate-1">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <SlideTitle className="!mb-0">
                Outputs 2, 3, 4: Same Photo, One Prompt
              </SlideTitle>
              <Badge variant="primary" className="text-base px-4 py-2">
                Illustrative example
              </Badge>
            </div>
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {SAMPLE_OUTPUTS.map((out) => (
                <div
                  key={out.key}
                  className="border-4 border-neo-text bg-neo-bg p-5 shadow-neo-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-heading font-bold text-2xl md:text-3xl">
                      {out.key}
                    </h3>
                    <Badge variant={out.variant}>{out.words}</Badge>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    {out.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-l-8 border-neo-accent pl-6 py-2 mt-8">
              <p className="text-lg md:text-2xl">
                Written by hand for these slides to match each prompt&apos;s
                stated constraint — not captured from a live run. The point is
                the <em>shape</em> of the four outputs, not the wording.
              </p>
            </div>
          </Panel>
        </Slide>

        {/* ---------- 15. Speed ---------- */}
        <Slide>
          <Panel className="bg-neo-accent transform rotate-1">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-8">
              Where the Time Actually Goes
            </h2>
            <p className="text-lg md:text-2xl mb-8 text-neo-text/80">
              Median warm latency, measured from 82 production log entries on
              19 August 2026.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Cloud Vision (OCR)', value: '562ms', tone: 'bg-neo-surface' },
                { label: 'Gemini 3.5 Flash Lite', value: '467ms', tone: 'bg-neo-secondary' },
                { label: 'First TTS sentence', value: '228ms', tone: 'bg-neo-primary text-white' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`border-4 border-neo-text p-6 shadow-neo-sm text-center ${stat.tone}`}
                >
                  <div className="font-heading font-bold text-5xl md:text-7xl mb-2">
                    {stat.value}
                  </div>
                  <div className="text-base md:text-xl opacity-80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-4 border-neo-text bg-neo-surface p-6 shadow-neo-sm">
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-3">
                  The first call of the day cost 5,135ms
                </h3>
                <p className="text-lg md:text-xl text-neo-text/80">
                  That is one cold Vision call from this morning&apos;s logs —{' '}
                  <strong>9x the warm median</strong>. Cloud Scheduler now pings
                  the real endpoints every five minutes for about fifteen cents a
                  month. The gotcha: a dedicated warm-up function is a separate
                  Cloud Run container and warms nothing.
                </p>
              </div>
              <div className="border-4 border-neo-text bg-neo-surface p-6 shadow-neo-sm">
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-3">
                  Start talking before you finish thinking
                </h3>
                <p className="text-lg md:text-xl text-neo-text/80">
                  TTS runs one sentence at a time, and sentence N+1 loads while N
                  plays. Only the first sentence blocks audio — and that sentence
                  comes back in 228ms. The rest of the pipeline keeps working
                  while the user is already listening.
                </p>
              </div>
            </div>
          </Panel>
        </Slide>
      </Deck>
    </main>
  );
}
