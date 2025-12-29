import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Read This For Me | Help Test an Accessibility App',
  description: 'Point your camera at any text, tap to hear it read aloud. A privacy-first app helping adults navigate everyday reading challenges.',
  openGraph: {
    title: 'Read This For Me | Beta Testers Wanted',
    description: 'Help test an app that reads text aloud for people who need it most.',
    images: ['/images/readthisforme/icon.png'],
  },
};

export default function ReadThisForMeAppPage() {
  return (
    <main className="py-12 md:py-20">
      <Container size="lg">
        {/* Feature Graphic Banner */}
        <section className="mb-12">
          <div className="border-4 border-neo-text shadow-neo overflow-hidden transform -rotate-1">
            <Image
              src="/images/readthisforme/feature.png"
              alt="Read This For Me - Point. Snap. Listen."
              width={1024}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl md:text-6xl mb-4 text-neo-primary transform -rotate-1">
            Read This For Me
          </h1>
          <p className="text-xl md:text-2xl text-neo-text/80 max-w-2xl mx-auto mb-6">
            Point. Snap. Listen.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="primary">Android App</Badge>
            <Badge variant="accent">Beta Testing</Badge>
            <Badge variant="secondary">Privacy First</Badge>
          </div>
        </section>

        {/* What It Does */}
        <section className="border-4 border-neo-text bg-neo-surface p-8 shadow-neo mb-12 transform rotate-1">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            What It Does
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="font-heading font-bold text-xl mb-2">1. Point</h3>
              <p className="text-neo-text/80">
                Open the app and point your camera at any text — menus, forms, mail, medicine labels, signs
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-4">👆</div>
              <h3 className="font-heading font-bold text-xl mb-2">2. Tap</h3>
              <p className="text-neo-text/80">
                Tap the speaker button to hear the words read aloud in a natural voice
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="font-heading font-bold text-xl mb-2">3. Understand</h3>
              <p className="text-neo-text/80">
                Tap the brain button to hear a simplified explanation of complex text
              </p>
            </div>
          </div>
        </section>

        {/* Demo Video */}
        <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo mb-12 transform -rotate-1">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            See It In Action
          </h2>
          <div className="max-w-[240px] mx-auto">
            <video
              controls
              className="w-full border-4 border-neo-text shadow-neo rounded-lg"
              poster="/images/readthisforme/screenshot-1.png"
            >
              <source src="/images/readthisforme/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* Screenshots */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-3xl mb-8 text-center text-neo-primary">
            Screenshots
          </h2>
          <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="border-4 border-neo-text shadow-neo overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform">
              <Image
                src="/images/readthisforme/screenshot-1.png"
                alt="App screenshot - scanning a patch"
                width={150}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="border-4 border-neo-text shadow-neo overflow-hidden transform rotate-1 hover:rotate-0 transition-transform">
              <Image
                src="/images/readthisforme/screenshot-2.png"
                alt="App screenshot - scanning a vitamin bottle"
                width={150}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="border-4 border-neo-text shadow-neo overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform">
              <Image
                src="/images/readthisforme/screenshot-3.png"
                alt="App screenshot - playback controls"
                width={150}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="border-4 border-neo-text shadow-neo overflow-hidden transform rotate-1 hover:rotate-0 transition-transform">
              <Image
                src="/images/readthisforme/screenshot-4.png"
                alt="App screenshot - explanation mode"
                width={150}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            Who It Helps
          </h2>
          <p className="text-lg mb-6">
            <strong>54 million adults in the U.S.</strong> read below a 6th-grade level. Many navigate daily life
            by asking others for help, memorizing routines, or avoiding situations entirely.
          </p>
          <p className="text-lg mb-6">
            <strong>Read This For Me</strong> lets people read independently and privately — no accounts,
            no history, no one watching. Just point at text and listen.
          </p>
          <div className="border-l-4 border-neo-accent pl-6 py-2">
            <p className="text-neo-text/90 italic">
              Perfect for reading menus at restaurants, understanding medical paperwork,
              decoding official letters, and navigating signs and notices.
            </p>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="border-4 border-neo-text bg-neo-accent p-8 shadow-neo mb-12 transform rotate-1">
          <h2 className="font-heading font-bold text-3xl mb-6">
            Privacy First
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-xl mb-3">What We DON&apos;T Do</h3>
              <ul className="space-y-2 text-neo-text/90">
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">✕</span>
                  No accounts or sign-ups
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">✕</span>
                  No photos saved to servers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">✕</span>
                  No tracking or history
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neo-primary font-bold">✕</span>
                  No personal data collection
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3">How It Works</h3>
              <p className="text-neo-text/90">
                Your photo is processed in real-time, converted to speech, then <strong>immediately discarded</strong>.
                Everything is forgotten after it speaks. No one — not even us — knows what you read.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-4 border-neo-text bg-neo-surface p-8 shadow-neo mb-12 transform -rotate-1">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="primary">TTS</Badge>
                <div>
                  <h3 className="font-bold">Natural Voice</h3>
                  <p className="text-neo-text/80 text-sm">High-quality Google Cloud text-to-speech</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="accent">Speed</Badge>
                <div>
                  <h3 className="font-bold">Adjustable Playback</h3>
                  <p className="text-neo-text/80 text-sm">0.5x to 2x speed to match your pace</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary">AI</Badge>
                <div>
                  <h3 className="font-bold">Explain Mode</h3>
                  <p className="text-neo-text/80 text-sm">AI simplifies complex text into plain language</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="primary">Icons</Badge>
                <div>
                  <h3 className="font-bold">Icon-Based UI</h3>
                  <p className="text-neo-text/80 text-sm">No reading required to use the app</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="accent">Help</Badge>
                <div>
                  <h3 className="font-bold">Audio Help</h3>
                  <p className="text-neo-text/80 text-sm">Tap ? to hear instructions spoken aloud</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary">Simple</Badge>
                <div>
                  <h3 className="font-bold">Zero Learning Curve</h3>
                  <p className="text-neo-text/80 text-sm">No settings, no tutorials, just open and use</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beta Testing CTA */}
        <section className="border-8 border-neo-text bg-neo-primary text-white p-8 md:p-12 shadow-neo mb-12 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Help Me Get This App Published
          </h2>
          <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Google Play requires <strong>20 testers</strong> who use the app for at least <strong>14 consecutive days</strong>
            before I can publish publicly. Your help would mean the world.
          </p>
          <div className="bg-white/10 border-4 border-white/30 p-6 rounded-lg mb-8 max-w-xl mx-auto">
            <h3 className="font-bold text-xl mb-3">What&apos;s Involved:</h3>
            <ul className="text-left space-y-2 opacity-90 list-none">
              <li>✓ Install the app via Google Play (closed testing link)</li>
              <li>✓ Open it at least once per day for 14 days</li>
              <li>✓ Use it however you like — read menus, labels, mail, anything</li>
              <li>✓ Optional: Share feedback on what could be better</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Button
              href="https://play.google.com/store/apps/details?id=com.marktornga.readforme"
              variant="secondary"
              className="text-lg px-8 py-4"
            >
              Join the Beta
            </Button>
            <Button
              href="https://github.com/mtornga/PostLiterateApp"
              variant="accent"
              className="text-lg px-8 py-4"
            >
              View on GitHub
            </Button>
            <Button
              href="mailto:readformeapp@gmail.com?subject=Beta%20Testing%20Help"
              variant="primary"
              className="text-lg px-8 py-4 !bg-white !text-neo-primary"
            >
              Email for Help
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo mb-12">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            Questions?
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Is it free?</h3>
              <p className="text-neo-text/80">
                Yes, completely free. No ads, no in-app purchases, no premium tiers.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">What about iOS?</h3>
              <p className="text-neo-text/80">
                iOS version is planned after the Android launch. The app is built with React Native,
                so it&apos;s ready to go — just need to get through Apple&apos;s review process next.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Is my data really private?</h3>
              <p className="text-neo-text/80">
                Yes. Images are processed in real-time and immediately discarded. There are no accounts,
                no analytics tracking what you read, and no way for anyone to see your usage history.
                The <a href="https://mtornga.github.io/PostLiterateApp/" className="neo-link">privacy policy</a> is
                designed to be readable and honest.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Who made this?</h3>
              <p className="text-neo-text/80">
                I&apos;m Mark Tornga, a software engineer in St. Louis. I built this because I believe
                technology should help people live more independently — without requiring them to
                hand over their data or their dignity.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-8">
          <p className="text-xl text-neo-text/80 mb-6">
            Thanks for reading. If this resonates with you, I&apos;d love your help.
          </p>
          <Button
            href="https://play.google.com/store/apps/details?id=com.marktornga.readforme"
            variant="primary"
            className="text-lg px-8 py-4"
          >
            Become a Beta Tester
          </Button>
        </section>
      </Container>
    </main>
  );
}
