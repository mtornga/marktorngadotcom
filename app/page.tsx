import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ProjectGrid } from '@/components/portfolio';
import { getFeaturedProjects } from '@/lib/content';

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main className="py-20 px-4">
      {/* Hero Section */}
      <div className="container min-h-[80vh] flex items-center justify-center mb-32">
        <Card className="max-w-4xl mx-auto text-center" padding="lg">
          <h1 className="text-neo-primary mb-6 transform -rotate-1">
            Mark Tornga
          </h1>
          <p className="text-3xl font-heading font-bold mb-8">
            Highly Extensible Human
          </p>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Software engineer, maker, and builder based in St. Louis, Missouri.
            Pushing boundaries with neo-brutalist design and bold ideas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/portfolio" variant="primary">
              View Portfolio
            </Button>
            <Button href="/blog" variant="secondary">
              Read Blog
            </Button>
            <Button href="/about" variant="accent">
              About Me
            </Button>
          </div>
        </Card>
      </div>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-neo-accent mb-4 transform rotate-1">
              Featured Work
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Selected projects that push boundaries and explore new possibilities.
            </p>
          </div>
          <ProjectGrid projects={featuredProjects} />
        </div>
      )}
    </main>
  );
}
