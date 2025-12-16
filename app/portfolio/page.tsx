import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { ProjectGrid } from '@/components/portfolio';
import { getAllProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Portfolio | Mark Tornga',
  description: 'Projects and work by Mark Tornga - from AI systems to data engineering.',
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <main className="py-20">
      <Container>
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-neo-primary mb-6 transform rotate-1">
            Portfolio
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Building systems that push boundaries. From computer vision to data platforms,
            each project explores what's possible when you combine technical depth with
            creative problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectGrid projects={projects} />
      </Container>
    </main>
  );
}
