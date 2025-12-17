import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getPostBySlug, getPostSlugs } from '@/lib/content';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} | Mark Tornga`,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.heroImage
        ? [{ url: post.frontmatter.heroImage }]
        : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main className="py-20">
      <Container size="md">
        {/* Post Header */}
        <header className="mb-12">
          <Link
            href="/blog"
            className="text-neo-primary hover:text-neo-accent transition-colors font-bold mb-6 inline-block"
          >
            &larr; Back to Writing
          </Link>

          {frontmatter.heroImage && (
            <div className="mb-8 border-4 border-neo-text shadow-neo overflow-hidden">
              <img
                src={frontmatter.heroImage}
                alt={frontmatter.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          <time className="text-sm text-neo-text/60 font-mono">
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          <h1 className="font-heading font-bold text-4xl md:text-5xl mt-2 mb-4 text-neo-primary transform -rotate-1">
            {frontmatter.title}
          </h1>

          {frontmatter.description && (
            <p className="text-xl text-neo-text/80 mb-6">
              {frontmatter.description}
            </p>
          )}

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* MDX Content */}
        <article className="prose prose-lg max-w-none">
          <MDXRemote source={content} />
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-4 border-neo-text">
          <Button href="/blog" variant="primary">
            &larr; More Writing
          </Button>
        </footer>
      </Container>
    </main>
  );
}
