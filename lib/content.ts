import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, ProjectFrontMatter } from '@/types/project';
import { Post, PostFrontMatter } from '@/types/post';

const projectsDirectory = path.join(process.cwd(), 'content/projects');
const postsDirectory = path.join(process.cwd(), 'content/posts');

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

// ============================================
// Blog Posts
// ============================================

/**
 * Get all post slugs from the content/posts directory
 */
export function getPostSlugs(): string[] {
  try {
    const files = fs.readdirSync(postsDirectory);
    return files
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => file.replace(/\.mdx?$/, ''));
  } catch (error) {
    console.warn('Posts directory not found, returning empty array');
    return [];
  }
}

/**
 * Get post data by slug
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, '');

    // Try .mdx first, then .md
    let fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${realSlug}.md`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      frontmatter: data as PostFrontMatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date || 0);
      const dateB = new Date(b.frontmatter.date || 0);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}
