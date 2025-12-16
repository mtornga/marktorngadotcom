import { ProjectFrontMatter } from '@/types/project';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface ProjectHeroProps {
  frontmatter: ProjectFrontMatter;
}

export default function ProjectHero({ frontmatter }: ProjectHeroProps) {
  const { title, description, heroImage, tags, github, demo, status } = frontmatter;

  return (
    <div className="mb-16">
      {/* Hero Image */}
      {heroImage && (
        <div className="relative w-full h-96 mb-8 border-4 border-neo-text overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Status Badge */}
      {status && (
        <div className="mb-4">
          <Badge variant="accent">{status}</Badge>
        </div>
      )}

      {/* Title */}
      <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6 text-neo-primary transform -rotate-1">
        {title}
      </h1>

      {/* Description */}
      <p className="text-2xl mb-8 max-w-3xl">{description}</p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <Badge key={tag} variant="primary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        {github && (
          <Button
            href={github}
            variant="primary"
            size="lg"
          >
            View on GitHub
          </Button>
        )}
        {demo && (
          <Button
            href={demo}
            variant="secondary"
            size="lg"
          >
            Live Demo
          </Button>
        )}
      </div>
    </div>
  );
}
