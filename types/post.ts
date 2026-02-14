export interface PostFrontMatter {
  title: string;
  description?: string;
  date: string;
  author?: string;
  layout?: 'default' | 'readable';
  heroImage?: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontMatter;
  content: string;
}
