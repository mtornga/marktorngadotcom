import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getPostSlugs } from '@/lib/content';
import { cn } from '@/lib/utils';

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
    authors: post.frontmatter.author
      ? [{ name: post.frontmatter.author }]
      : [{ name: 'Mark Tornga' }],
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
  const isReadable = frontmatter.layout === 'readable';
  const readingTime = Math.ceil(content.split(/\s+/).length / 230);

  return (
    <main id="top" className={cn('py-20', isReadable && 'bg-white py-12 md:py-16')}>
      <Container size={isReadable ? 'sm' : 'md'}>
        {/* Post Header */}
        <header className="mb-12">
          <Link
            href="/blog"
            className={cn(
              'transition-colors font-bold mb-6 inline-block',
              isReadable
                ? 'text-zinc-700 hover:text-zinc-900'
                : 'text-neo-primary hover:text-neo-accent'
            )}
          >
            &larr; Back to Writing
          </Link>

          {frontmatter.heroImage && (
            <div
              className={cn(
                'mb-8 overflow-hidden',
                isReadable
                  ? 'rounded-lg border border-zinc-200 shadow-sm'
                  : 'border-4 border-neo-text shadow-neo'
              )}
            >
              <img
                src={frontmatter.heroImage}
                alt={frontmatter.title}
                className="w-full h-72 md:h-[28rem] object-cover"
              />
            </div>
          )}

          <time
            className={cn(
              'text-sm',
              isReadable ? 'text-zinc-500' : 'text-neo-text/60 font-mono'
            )}
          >
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {isReadable && (
              <span className="text-zinc-400"> &middot; {readingTime} min read</span>
            )}
          </time>

          {frontmatter.author && (
            <p
              className={cn(
                'mt-2 mb-2 text-base',
                isReadable ? 'text-zinc-700' : 'text-neo-text/80'
              )}
            >
              By {frontmatter.author}
            </p>
          )}

          <h1
            className={cn(
              'font-heading font-bold text-4xl md:text-5xl mt-2 mb-4',
              isReadable
                ? 'text-zinc-900 tracking-tight'
                : 'text-neo-primary transform -rotate-1'
            )}
          >
            {frontmatter.title}
          </h1>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag} variant={isReadable ? 'default' : 'accent'}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* MDX Content */}
        <article
          className={cn(
            'prose prose-lg max-w-none',
            isReadable &&
              'prose-zinc readable-article'
          )}
        >
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </article>

        {/* Footer */}
        <footer
          className={cn(
            isReadable ? 'mt-20 pt-10 border-t border-zinc-200' : 'mt-16 pt-8 border-t-4 border-neo-text'
          )}
        >
          {isReadable ? (
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-block text-zinc-700 hover:text-zinc-900 font-semibold"
              >
                &larr; More Writing
              </Link>
              <Link
                href="#top"
                className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                Back to top &uarr;
              </Link>
            </div>
          ) : (
            <Button href="/blog" variant="primary">
              &larr; More Writing
            </Button>
          )}
        </footer>
      </Container>
    </main>
  );
}
