import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ProjectGrid } from '@/components/portfolio';
import { getFeaturedProjects } from '@/lib/content';

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main className="home-page px-4">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <Card className="max-w-4xl mx-auto text-center" padding="lg">
            <h1 className="text-neo-primary mb-6 transform -rotate-1">
              Mark Tornga
            </h1>
            <p className="text-3xl font-heading font-bold mb-4">
              Data + AI Leader
            </p>
            <p className="text-xl mb-4 max-w-2xl mx-auto">
              Enterprise data architecture. Analytics platforms. Computer vision + robotics.
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-neo-text/80">
              Currently the (only) Lead Analytics Engineer at Mercy. Open to consulting engagements.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/contact" variant="primary">
                Work With Me
              </Button>
              <Button href="/portfolio" variant="secondary">
                View Portfolio
              </Button>
              <Button href="/resume" variant="accent">
                Resume
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="home-featured">
          <div className="container">
            <div className="home-featured-intro text-center">
              <h2 className="text-neo-accent mb-4 inline-block transform rotate-1">
                Featured Work
              </h2>
              <p className="text-xl max-w-2xl mx-auto">
                Selected projects that push boundaries and explore new possibilities.
              </p>
            </div>
            <div className="home-featured-grid">
              <ProjectGrid projects={featuredProjects} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
