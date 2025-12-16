import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Container from '@/components/layout/Container';
import { ProjectHero } from '@/components/portfolio';
import { getProjectBySlug, getProjectSlugs } from '@/lib/content';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each project
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.frontmatter.title} | Mark Tornga`,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      images: project.frontmatter.heroImage
        ? [{ url: project.frontmatter.heroImage }]
        : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <main className="py-20">
      <Container size="md">
        {/* Project Hero */}
        <ProjectHero frontmatter={frontmatter} />

        {/* MDX Content */}
        <article className="prose prose-lg max-w-none">
          <MDXRemote source={content} />
        </article>
      </Container>
    </main>
  );
}
