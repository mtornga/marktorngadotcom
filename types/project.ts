export interface ProjectFrontMatter {
  title: string;
  description: string;
  date: string;
  featured?: boolean;
  href?: string;
  heroImage?: string;
  tags?: string[];
  github?: string;
  demo?: string;
  status?: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontMatter;
  content: string;
}
