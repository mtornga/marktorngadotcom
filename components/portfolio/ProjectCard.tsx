import Link from 'next/link';
import { Project } from '@/types/project';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { slug, frontmatter } = project;
  const { title, description, href, heroImage, tags, status } = frontmatter;
  const cardHref = href || `/portfolio/${slug}`;

  return (
    <Link href={cardHref}>
      <Card className="group cursor-pointer h-full flex flex-col" padding="md">
        {/* Hero Image */}
        {heroImage && (
          <div className="relative w-full h-48 mb-4 overflow-hidden border-4 border-neo-text">
            <img
              src={heroImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Status Badge */}
        {status && (
          <div className="mb-3">
            <Badge variant="accent">{status}</Badge>
          </div>
        )}

        {/* Title */}
        <h3 className="font-heading font-bold text-2xl mb-3 text-neo-primary group-hover:text-neo-accent transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base mb-4 flex-grow line-clamp-3">{description}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
            {tags.length > 4 && (
              <Badge variant="default">+{tags.length - 4}</Badge>
            )}
          </div>
        )}
      </Card>
    </Link>
  );
}
