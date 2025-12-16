import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, ProjectFrontMatter } from '@/types/project';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

/**
 * Get all project slugs from the content/projects directory
 */
export function getProjectSlugs(): string[] {
  try {
    const files = fs.readdirSync(projectsDirectory);
    return files
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => file.replace(/\.mdx?$/, ''));
  } catch (error) {
    console.warn('Projects directory not found, returning empty array');
    return [];
  }
}

/**
 * Get project data by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, '');
    const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      frontmatter: data as ProjectFrontMatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      // Sort by date, newest first
      const dateA = new Date(a.frontmatter.date || 0);
      const dateB = new Date(b.frontmatter.date || 0);
      return dateB.getTime() - dateA.getTime();
    });

  return projects;
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.frontmatter.featured === true);
}
