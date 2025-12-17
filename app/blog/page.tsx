import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getAllPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Writing | Mark Tornga',
  description: 'Thoughts on data, automation, maker projects, and building things that work.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="py-20">
      <Container>
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-neo-primary mb-6 transform -rotate-1">
            Writing
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Maker projects, automation experiments, and lessons learned building
            systems that work.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-neo-sm hover:-translate-y-1 transition-all duration-200">
                  {post.frontmatter.heroImage && (
                    <div className="mb-4 -mx-6 -mt-6 overflow-hidden border-b-4 border-neo-text">
                      <img
                        src={post.frontmatter.heroImage}
                        alt={post.frontmatter.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <time className="text-sm text-neo-text/60 font-mono">
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="font-heading font-bold text-2xl mt-2 mb-3 text-neo-primary">
                    {post.frontmatter.title}
                  </h2>
                  {post.frontmatter.description && (
                    <p className="text-neo-text/80 mb-4">
                      {post.frontmatter.description}
                    </p>
                  )}
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.frontmatter.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-xl text-neo-text/60">
              No posts yet. Check back soon!
            </p>
          </Card>
        )}
      </Container>
    </main>
  );
}
